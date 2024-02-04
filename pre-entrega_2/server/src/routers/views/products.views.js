import { Router } from "express";
import products from "../../data/fs/ProductManager.fs.js";

const productsRouter = Router();

productsRouter.get("/", async (req, res, next) => {
  try {
    const all = await products.read();
    return res.render("real", { products: all });
  } catch (error) {
    return next(error);
  }
});

productsRouter.get("/form", (req, res, next) => {
  try {
    return res.render("form");
  } catch (error) {
    return next(error);
  }
});

export default productsRouter;