import { Router } from "express";
import jwt from "jsonwebtoken";
import { users } from "../data/mongo/Manager.mongo.js";

export default class CustomRouter {
  constructor() {
    this.router = Router();
    this.init();
  }

  init() {}

  getRouter() {
    return this.router;
  }

  applyCb(cbs) {
    return cbs.map((each) => async (...params) => {
      try {
        await each.apply(this, params);
      } catch (error) {
        params[1].json({ statusCode: 500, message: error.message });
      }
    });
  }

  responses = (req, res, next) => {
    res.success200 = (payload) => res.status(200).json(payload);
    res.success201 = (payload) => res.status(201).json(payload);
    res.error400 = (message) =>
      res.status(400).json({ statusCode: 400, message });
    res.error401 = () =>
      res.status(401).json({ statusCode: 401, message: "Bad Auth" });
    res.error403 = () =>
      res.status(403).json({ statusCode: 403, message: "Forbidden" });
    res.error404 = () =>
      res.status(404).json({ statusCode: 404, message: "Not Found" });
    return next();
  };

  policies = (arrayOfPolicies) => async (req, res, next) => {
    try {
      if (arrayOfPolicies.includes("PUBLIC")) return next();
    let token = req.cookies[token];
    if (!token) {
      return res.error401();
    } else {
      const data = jwt.verify(token, process.env.JWT_SECRET);
      if (!data) {
        return res.error400("Bad token");
      } else {
        const { email, role } = data;
        if (
          (role === 0 && arrayOfPolicies.includes("USER")) ||
          (role === 1 && arrayOfPolicies.includes("ADMIN")) ||
          (role === 2 && arrayOfPolicies.includes("PREMIUM"))
        ) {
          const user = await users.readByEmail(email);
        } else {
          return res.error403();
        }
      }
    }
    } catch (error) {
      return next(error);
    }
  };

  create(path, policies, ...cbs) {
    this.router.post(path, this.responses, this.policies(policies), this.applyCb(cbs));
  }
  read(path, policies, ...cbs) {
    this.router.get(path, this.responses, this.policies(policies), this.applyCb(cbs));
  }
  update(path, policies, ...cbs) {
    this.router.put(path, this.responses, this.policies(policies), this.applyCb(cbs));
  }
  destroy(path, policies, ...cbs) {
    this.router.delete(path, this.responses, this.policies(policies), this.applyCb(cbs));
  }
  use(path, ...cbs) {
    this.router.use(path, this.responses, this.applyCb(cbs));
  }
}
