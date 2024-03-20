import CustomRouter from "../CustomRouter.js";
import { users } from "../../data/mongo/Manager.mongo.js";
import { orders } from "../../data/mongo/Manager.mongo.js";
import passport from "../../middlewares/passport.js";

export default class OrdersRouter extends CustomRouter {
  init() {
    this.read("/", passport.authenticate("jwt", { session: false }), ["USER"], async (req, res, next) => {
      try {
        const sortAndPaginate = {
          lean: true,
        };
        const user = await users.readByEmail(req.user.email);
        const filter = {
          user_id: user._id,
        };
        const userOrders = await orders.read({ filter, sortAndPaginate });
        return res.render("orders", {
          orders: userOrders.docs,
        });
      } catch (error) {
        return next(error);
      }
    });
  }
}
