import CustomRouter from "../CustomRouter.js";
import { users } from "../../data/mongo/Manager.mongo.js";
import has8char from "../../middlewares/has8char.js";
// import isValidPass from "../../middlewares/isValidPass.js";
import passCallBack from "../../middlewares/passCallBack.mid.js";
import passport from "passport";

export default class SessionsRouter extends CustomRouter {
  init() {
    this.create(
      "/login",
      passCallBack("login"),
      ["ADMIN"],
      async (req, res, next) => {
        try {
          return res
            .cookie("token", req.token, {
              maxAge: 7 * 24 * 60 * 60,
              httpOnly: true,
            })
            .json({ statusCode: 200, message: "Logged in!" });
        } catch (error) {
          return next(error);
        }
      }
    );

    this.create(
      "/google",
      ["ADMIN"],
      passport.authenticate("google", { scope: ["email", "profile"] })
    );

    this.read(
      "/google/callback",
      passport.authenticate("google", {
        session: false,
        failureRedirect: "/api/sessions/badauth",
      }),
      ["PUBLIC"],
      async (req, res, next) => {
        try {
          return res.json({
            message: "Logged in with Google!",
            session: req.session,
          });
        } catch (error) {
          return next(error);
        }
      }
    );

    this.create(
      "/register",
      has8char,
      passCallBack("register"),
      ["PUBLIC"],
      async (req, res, next) => {
        try {
          return res.json({ statusCode: 201, message: "Registered!" });
        } catch (error) {
          return next(error);
        }
      }
    );

    this.create(
      "/signout",
      passCallBack("jwt"),
      ["PUBLIC"],
      async (req, res, next) => {
        try {
          return res.clearCookie("token").json({
            statusCode: 200,
            message: "Signed out!",
          });
        } catch (error) {
          return next(error);
        }
      }
    );

    this.create(
      "/me",
      passCallBack("jwt"),
      ["PUBLIC"],
      async (req, res, next) => {
        try {
          const user = {
            email: req.user.email,
            role: req.user.role,
            photo: req.user.photo,
          };
          return res.json({
            statusCode: 200,
            response: user,
          });
        } catch (error) {
          return next(error);
        }
      }
    );

    this.read("/badauth", ["PUBLIC"], (req, res, next) => {
      try {
        return res.json({ message: "Bad authentication" });
      } catch (error) {
        return next(error);
      }
    });
  }
}
