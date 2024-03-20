import CustomRouter from "../CustomRouter.js";
import users from "../../data/fs/UserManager.fs.js";

export default class UsersRouter extends CustomRouter {
  init() {
    this.use("/auth/register", (req, res, next) => {
      try {
        return res.render("register");
      } catch (error) {
        return next(error);
      }
    });
    
    this.use("/auth/login", (req, res, next) => {
      try {
        return res.render("login");
      } catch (error) {
        return next(error);
      }
    });
  }
}

