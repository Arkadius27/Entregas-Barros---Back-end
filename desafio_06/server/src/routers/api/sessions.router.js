import { Router } from "express";
import session from "express-session";

const sessionsRouter = Router();

sessionsRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (email && password === "hola1234") {
      req.session.email = email;
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

sessionsRouter.post("/signout", async (req, res, next) => {
  try {
    if (!req.session.email) {
      const error = new Error("No active session");
      error.statusCode = 400;
      throw error;
    }
    req.session.destroy();
    return res
      .status(200)
      .json({ message: "Signed out." });
  } catch (error) {
    return next(error);
  }
});

export default sessionsRouter;
