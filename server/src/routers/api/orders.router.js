import CustomRouter from "../CustomRouter.js";
// import orders from "../../data/fs/OrdersManager.fs.js";
import { orders } from "../../data/mongo/Manager.mongo.js";
import {
  create,
  destroy,
  read,
  readByUser,
  readOne,
  report,
  update,
} from "../../controllers/orders.controller.js";

export default class OrdersRouter extends CustomRouter {
  init() {
    this.create("/", ["ADMIN"], create);

    this.read("/", ["PUBLIC"], read);

    this.read("/:oid", ["PUBLIC"], readOne);

    this.read("/user/:uid", ["PUBLIC"], readByUser);

    this.update("/:oid", ["ADMIN"], update);

    this.read("/total/:uid", ["PUBLIC"], report);

    this.destroy("/:oid", ["ADMIN"], destroy);
  }
}
