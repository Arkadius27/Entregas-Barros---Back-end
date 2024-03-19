import CustomRouter from "../CustomRouter.js";
import productsRouter from "./products.views.js";
import usersRouter from "./users.views.js";
import ordersRouter from "./orders.views.js";
// import products from "../../data/fs/ProductManager.fs.js";
import { products } from "../../data/mongo/Manager.mongo.js";

export default class ViewsRouter extends CustomRouter {
  init() {
    this.read("/", async (req, res, next) => {
      try {
        const sortAndPaginate = {
          limit: req.query.limit || 8,
          page: req.query.page || 1,
          lean: true,
        };
        const filter = {};
        if (req.query.title) {
          filter.title = new RegExp(req.query.title.trim(), "i");
        }
        const all = await products.read({ filter, sortAndPaginate });
        console.log(all);
        return res.render("index", {
          products: all.docs, // lean evita esto: all.docs.map((product) => product.toJSON())
          next: all.nextPage,
          prev: all.prevPage,
          filter: req.query.title,
          limit: all.limit,
        });
      } catch (error) {
        return next(error);
      }
    });
    this.router.use("/products", productsRouter);
    this.router.use("/users", usersRouter);
    this.router.use("/orders", ordersRouter);
  }
}

