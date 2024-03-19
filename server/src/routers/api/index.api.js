import CustomRouter from "../CustomRouter.js";
import ProductsRouter from "./products.router.js";
import UsersRouter from "./users.router.js";
import OrdersRouter from "./orders.router.js";
import SessionsRouter from "./sessions.router.js";
import passCallBackMid from "../../middlewares/passCallBack.mid.js";

const product = new ProductsRouter();
const user = new UsersRouter();
const orders = new OrdersRouter();
const session = new SessionsRouter();

export default class ApiRouter extends CustomRouter {
  init() {
    this.router.use("/products", product.getRouter());
    this.router.use("/users", user.getRouter());
    this.router.use("/orders", passCallBackMid("jwt"), orders.getRouter());
    this.router.use("/sessions", session.getRouter());
  }
}
