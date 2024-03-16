import { Router } from "express";
import users from "../../data/fs/UserManager.fs.js";

const usersRouter = Router();

usersRouter.use("/auth/register", (req, res, next) => {
  try {
    return res.render("register");
  } catch (error) {
    return next(error);
  }
});

usersRouter.use("/auth/login", (req, res, next) => {
  try {
    return res.render("login");
  } catch (error) {
    return next(error);
  }
});

export default usersRouter;