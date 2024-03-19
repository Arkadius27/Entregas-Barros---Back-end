import CustomRouter from "../CustomRouter.js";
import ProductsRouter from "./products.router.js";
import usersRouter from "./users.router.js";
import ordersRouter from "./orders.router.js";
import sessionsRouter from "./sessions.router.js";
import passCallBackMid from "../../middlewares/passCallBack.mid.js";

const product = new ProductsRouter(); 

export default class ApiRouter extends CustomRouter {
  init() {
    this.router.use("/products", product.getRouter());
    this.router.use("/users", usersRouter);
    this.router.use("/orders", passCallBackMid("jwt"), ordersRouter);
    this.router.use("/sessions", sessionsRouter);
  }
}
