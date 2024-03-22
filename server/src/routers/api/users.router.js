import CustomRouter from "../CustomRouter.js";
// import users from "../../data/fs/UserManager.fs.js"
import { users } from "../../data/mongo/Manager.mongo.js";
import {
  create,
  destroy,
  read,
  readOne,
  update,
} from "../../controllers/users.controller.js";

export default class UsersRouter extends CustomRouter {
  init() {
    this.create("/", ["ADMIN"], create);

    this.read("/", ["PUBLIC"], read);

    this.read("/:uid", ["USER"], readOne);

    this.update("/:uid", ["ADMIN"], update);

    this.destroy("/:uid", ["ADMIN"], destroy);
  }
}
