import CustomRouter from "../CustomRouter.js";
// import products from "../../data/fs/ProductManager.fs.js";
import { products } from "../../data/mongo/Manager.mongo.js";

export default class ProductsRouter extends CustomRouter {
  init() {
    this.read("/", ["PUBLIC"], async (req, res, next) => {
      try {
        const all = await products.read({});
        return res.render("real", { products: all.docs.map((product) => product.toJSON())});
      } catch (error) {
        return next(error);
      }
    });
    
    this.read("/form", ["ADMIN"], (req, res, next) => {
      try {
        return res.render("form");
      } catch (error) {
        return next(error);
      }
    });
  }
}

