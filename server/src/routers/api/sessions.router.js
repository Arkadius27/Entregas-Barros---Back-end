import { Router } from "express";
import { users } from "../../data/mongo/Manager.mongo.js";
import has8char from "../../middlewares/has8char.js";
// import isValidPass from "../../middlewares/isValidPass.js";
import passport from "../../middlewares/passport.js";

const sessionsRouter = Router();

sessionsRouter.post(
  "/login",
  passport.authenticate("login", {
    session: false,
    failureRedirect: "/api/sessions/badauth",
  }),
  async (req, res, next) => {
    try {
      return res
        .status(200)
        .json({ message: "Logged in!", token: req.token });
    } catch (error) {
      return next(error);
    }
  }
);

sessionsRouter.post(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

sessionsRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/api/sessions/badauth",
  }),
  async (req, res, next) => {
    try {
      return res
        .status(200)
        .json({ message: "Logged in with Google!", session: req.session });
    } catch (error) {
      return next(error);
    }
  }
);

sessionsRouter.post(
  "/register",
  has8char,
  passport.authenticate("register", {
    session: false,
    failureRedirect: "/api/sessions/badauth",
  }),
  async (req, res, next) => {
    try {
      return res.status(201).json({ message: "Registered!" });
    } catch (error) {
      return next(error);
    }
  }
);

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

sessionsRouter.get("/badauth", (req, res, next) => {
  try {
    return res.status(401).json({ message: "Bad authentication" });
  } catch (error) {
    return next(error);
  }
});

export default sessionsRouter;
