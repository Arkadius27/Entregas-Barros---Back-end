import CustomRouter from "../CustomRouter.js";
import { users } from "../../data/mongo/Manager.mongo.js";
import has8char from "../../middlewares/has8char.js";
import passCallBack from "../../middlewares/passCallBack.mid.js";
import passport from "passport";
import {
  createLogin,
  createMe,
  createRegister,
  createSignout,
  readBadAuth,
  readGoogle,
} from "../../controllers/sessions.controller.js";

export default class SessionsRouter extends CustomRouter {
  init() {
    this.create("/login", ["PUBLIC"], passCallBack("login"), createLogin);

    this.create(
      "/google",
      ["PUBLIC"],
      passport.authenticate("google", { scope: ["email", "profile"] })
    );

    this.read(
      "/google/callback",
      ["PUBLIC"],
      passport.authenticate("google", {
        session: false,
        failureRedirect: "/api/sessions/badauth",
      }),
      readGoogle
    );

    this.create(
      "/register",
      ["PUBLIC"],
      has8char,
      passCallBack("register"),
      createRegister
    );

    this.create("/signout", ["PUBLIC"], passCallBack("jwt"), createSignout);

    this.create("/me", ["PUBLIC"], passCallBack("jwt"), createMe);

    this.read("/badauth", ["PUBLIC"], readBadAuth);
  }
}
