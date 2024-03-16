import { Router } from "express";
import productsRouter from "./products.views.js";
import usersRouter from "./users.views.js";
// import products from "../../data/fs/ProductManager.fs.js";
import { products } from "../../data/mongo/Manager.mongo.js";

const viewsRouter = Router();

viewsRouter.get("/", async (req, res, next) => {
  try {
    const all = await products.read({});
    return res.render("index", { products: all.docs.map((product) => product.toJSON())});
  } catch (error) {
    return next(error);
  }
});

viewsRouter.use("/products", productsRouter);
viewsRouter.use("/users", usersRouter);

export default viewsRouter;
