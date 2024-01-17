import { Router } from "express";
import productsRouter from "./products.views.js";
import usersRouter from "./users.views.js";
import products from "../../data/fs/ProductManager.fs.js";

const viewsRouter = Router();

viewsRouter.get("/", async (req, res, next) => {
  try {
    const all = await products.read();
    return res.render("index", { products: all });
  } catch (error) {
    return next(error);
  }
});

// viewsRouter.get("/", (req, res, next) => {

// });

viewsRouter.use("/products", productsRouter);
viewsRouter.use("/users", usersRouter);

export default viewsRouter;
