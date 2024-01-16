import { Router } from "express";
import realRouter from "./products.views.js";

const viewsRouter = Router();

viewsRouter.get("/", (req, res, next) => {
  try {
    const mainProducts = ["PS5", "Xbox Series X", "Switch Oled"]
    return res.render("index", {products: mainProducts});
  } catch (error) {
    return next(error);
  }
});

viewsRouter.use("/products", realRouter);

export default viewsRouter;
