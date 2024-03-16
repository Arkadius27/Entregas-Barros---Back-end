import { Router } from "express";
import users from "../../data/fs/UserManager.fs.js"

const usersRouter = Router();

usersRouter.post("/", async (req, res, next) => {
  try {
    const data = req.body;
    const newUser = await users.create(data);
    if (newUser === "Missing data for user creation") {
      return res.status(400).json({ success: false, error: newUser });
    } else {
      return res.status(201).json({ success: true, response: newUser });
    }
  } catch (error) {
    return next(error);
  }
});

usersRouter.get("/", async (req, res, next) => {
  const allUsers = await users.read();
  try {
    if (Array.isArray(allUsers)) {
      return res.status(200).json({ success: true, response: allUsers });
    } else {
      return res.status(404).json({ success: false, error: allUsers });
    }
  } catch (error) {
    return next(error);
  }
});

usersRouter.get("/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    const oneUser = await users.readOne(uid);
    if (typeof oneUser === "object") {
      return res.status(200).json({ success: true, response: oneUser });
    } else {
      return res.status(404).json({ success: false, error: oneUser });
    }
  } catch (error) {
    return next(error);
  }
});

export default usersRouter;