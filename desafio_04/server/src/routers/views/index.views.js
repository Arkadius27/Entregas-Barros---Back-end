import { Router } from "express";
import productsRouter from "./products.views.js";

const viewsRouter = Router();

viewsRouter.get("/", (req, res, next) => {
  try {
    const mainProducts = ["PS5", "Xbox Series X", "Switch Oled"]
    return res.render("index", {products: mainProducts});
  } catch (error) {
    return next(error);
  }
});

viewsRouter.use("/products", productsRouter);

export default viewsRouter;
