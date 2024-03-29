import { Router } from "express";
import { users } from "../../data/mongo/Manager.mongo.js";
import has8char from "../../middlewares/has8char.js";
import isValidPass from "../../middlewares/isValidPass.js";

const sessionsRouter = Router();

sessionsRouter.post("/login", isValidPass, async (req, res, next) => {
  try {
    const { email, password, role } = req.body;
    if (email && password === "hola1234") {
      req.session.email = email;
      req.session.role = role;
      return res
        .status(200)
        .json({ message: `Welcome ${email}!`, session: req.session });
    }
    const error = new Error("Invalid credentials");
    error.statusCode = 401;
    throw error;
  } catch (error) {
    return next(error);
  }
});

sessionsRouter.post("/me", async (req, res, next) => {
  try {
    if (req.session.email) {
      return res
        .status(200)
        .json({ message: `Signed in as: ${req.session.email}!` });
    }
    const error = new Error("No authenticated user found.");
    error.statusCode = 400;
    throw error;
  } catch (error) {
    return next(error);
  }
});

sessionsRouter.post("/register", has8char, async (req, res, next) => {
  try {
    const data = req.body;
    await users.create(data);
    return res.status(201).json({ message: "Registered!" });
  } catch (error) {
    return next(error);
  }
});

sessionsRouter.post("/signout", async (req, res, next) => {
  try {
    if (!req.session.email) {
      const error = new Error("No active session");
      error.statusCode = 400;
      throw error;
    }
    req.session.destroy();
    return res.status(200).json({ message: "Signed out." });
  } catch (error) {
    return next(error);
  }
});

export default sessionsRouter;
