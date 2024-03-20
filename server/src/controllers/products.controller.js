import { products } from "../data/mongo/Manager.mongo.js";

class ProductsController {
  constructor() {
    this.model = products;
  }
  create = async (req, res, next) => {
    try {
      const data = req.body;
      const newProduct = await this.model.create(data);
      if (newProduct === "Missing data for product creation") {
        return res.status(400).json({ success: false, error: newProduct });
      } else {
        return res.success201(newProduct);
      }
    } catch (error) {
      return next(error);
    }
  }
}

export default ProductsController;
const controller = new ProductsController();
const create = controller.create;
export { create };