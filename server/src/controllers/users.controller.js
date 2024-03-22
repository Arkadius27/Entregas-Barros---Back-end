import service from "../services/users.service.js";

class UsersController {
  constructor() {
    this.service = service;
  }
  create = async (req, res, next) => {
    try {
      const data = req.body;
      const newUser = await this.service.create(data);
      if (newUser === "Missing data for user creation") {
        return res.status(400).json({ success: false, error: newUser });
      } else {
        return res.status(201).json({ success: true, response: newUser });
      }
    } catch (error) {
      return next(error);
    }
  }
  read = async (req, res, next) => {
    try {
      const sortAndPaginate = {
        limit: req.query.limit || 10,
        page: req.query.page || 1,
      }
      const filter = {};
      if (req.query.email) {
        filter.email = new RegExp(req.query.email.trim(), "i");
      }
      if (req.query.name === "desc") {
        sortAndPaginate.sort = { name: -1 };
      } else {
        sortAndPaginate.sort = { name: 1 };
      }
      const allUsers = await this.service.read({filter, sortAndPaginate});
      if (Array.isArray(allUsers)) {
        return res.status(200).json({ success: true, response: allUsers });
      } else {
        return res.status(404).json({ success: false, error: allUsers });
      }
    } catch (error) {
      return next(error);
    }
  }
  readOne = async (req, res, next) => {
    try {
      const { uid } = req.params;
      const oneUser = await this.service.readOne(uid);
      if (typeof oneUser === "object") {
        return res.status(200).json({ success: true, response: oneUser });
      } else {
        return res.status(404).json({ success: false, error: oneUser });
      }
    } catch (error) {
      return next(error);
    }
  }
  update = async (req, res, next) => {
    try {
      const { uid } = req.params;
      const data = req.body;
      const updatedUser = await this.service.update(uid, data);
      if (typeof updatedUser === "object") {
        return res.status(200).json({ success: true, response: updatedUser });
      } else {
        return res.status(404).json({ success: false, error: updatedUser });
      }
    } catch (error) {
      return next(error);
    }
  }
  destroy = async (req, res, next) => {
    try {
      const { uid } = req.params;
      const deletedUser = await this.service.destroy(uid);
      if (typeof deletedUser === "object") {
        return res.status(200).json({ success: true, response: deletedUser });
      } else {
        return res.status(404).json({ success: false, error: deletedUser });
      }
    } catch (error) {
      return next(error);
    }
  }
}

export default UsersController;
const controller = new UsersController();
const { create, read, readOne, update, destroy } = controller;
export { create, read, readOne, update, destroy };