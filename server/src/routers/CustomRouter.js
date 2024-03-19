import { Router } from "express";

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
    res.error400 = (message) => res.status(400).json({ statusCode: 400, message });
    res.error401 = () => res.status(401).json({ statusCode: 401, message: "Bad Auth" });
    res.error403 = () => res.status(403).json({ statusCode: 403, message: "Forbidden" });
    res.error404 = () => res.status(404).json({ statusCode: 404, message: "Not Found" });
    return next();
  }

  create(path, ...cbs) {
    this.router.post(path, this.responses, this.applyCb(cbs));
  }
  read(path, ...cbs) {
    this.router.get(path, this.responses, this.applyCb(cbs));
  }
  update(path, ...cbs) {
    this.router.put(path, this.responses, this.applyCb(cbs));
  }
  destroy(path, ...cbs) {
    this.router.delete(path, this.responses, this.applyCb(cbs));
  }
  use(path, ...cbs) {
    this.router.use(path, this.responses, this.applyCb(cbs));
  }
}
