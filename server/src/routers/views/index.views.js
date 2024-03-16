import { Router } from "express";
import productsRouter from "./products.views.js";
import usersRouter from "./users.views.js";
import ordersRouter from "./orders.views.js";
// import products from "../../data/fs/ProductManager.fs.js";
import { products } from "../../data/mongo/Manager.mongo.js";

const viewsRouter = Router();

viewsRouter.get("/", async (req, res, next) => {
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

viewsRouter.use("/products", productsRouter);
viewsRouter.use("/users", usersRouter);
viewsRouter.use("/orders", ordersRouter);

export default viewsRouter;
