import { Router } from "express";
import { users } from "../../data/mongo/Manager.mongo.js";
import has8char from "../../middlewares/has8char.js";
// import isValidPass from "../../middlewares/isValidPass.js";
import passCallBack from "../../middlewares/passCallBack.mid.js";
import passport from "passport";

const sessionsRouter = Router();

sessionsRouter.post(
  "/login",
  passCallBack("login"),
  async (req, res, next) => {
    try {
      return res
        .cookie("token", req.token, {
          maxAge: 7 * 24 * 60 * 60,
          httpOnly: true,
        })
        .json({ statusCode: 200, message: "Logged in!", });
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
        .json({ message: "Logged in with Google!", session: req.session });
    } catch (error) {
      return next(error);
    }
  }
);

sessionsRouter.post(
  "/register",
  has8char,
  passCallBack("register"),
  async (req, res, next) => {
    try {
      return res.json({ statusCode: 201, message: "Registered!" });
    } catch (error) {
      return next(error);
    }
  }
);

sessionsRouter.post("/signout", passCallBack("jwt"),
  async (req, res, next) => {
    try {
      return res.clearCookie("token").json({
        statusCode: 200,
        message: "Signed out!",
      });
    } catch (error) {
      return next(error);
    }
  });

sessionsRouter.post("/me", passCallBack("jwt"), async (req, res, next) => {
  try {
    const user = {
      email: req.user.email,
      role: req.user.role,
      photo: req.user.photo,
    }
    return res.json({
      statusCode: 200,
      response: user
    })
  } catch (error) {
    return next(error);
  }
});

sessionsRouter.get("/badauth", (req, res, next) => {
  try {
    return res.json({ message: "Bad authentication" });
  } catch (error) {
    return next(error);
  }
});

export default sessionsRouter;
