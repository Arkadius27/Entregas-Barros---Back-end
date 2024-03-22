import service from "../services/products.service.js";

class ProductsController {
  constructor() {
    this.service = service;
  }
  create = async (req, res, next) => {
    try {
      const data = req.body;
      const newProduct = await this.service.create(data);
      if (newProduct === "Missing data for product creation") {
        return res.status(400).json({ success: false, error: newProduct });
      } else {
        return res.success201(newProduct);
      }
    } catch (error) {
      return next(error);
    }
  };
  read = async (req, res, next) => {
    try {
      const sortAndPaginate = {
        limit: req.query.limit || 20,
        page: req.query.page || 1,
      };
      const filter = {};
      if (req.query.title) {
        filter.title = new RegExp(req.query.title.trim(), "i");
      }
      if (req.query.price === "desc") {
        sortAndPaginate.sort = { price: -1 };
      } else {
        sortAndPaginate.sort = { price: 1 };
      }
      const allProducts = await this.service.read({ filter, sortAndPaginate });
      if (Array.isArray(allProducts)) {
        return res.success200(allProducts);
      } else {
        return res.status(404).json({ success: false, error: allProducts });
      }
    } catch (error) {
      return next(error);
    }
  };
  readOne = async (req, res, next) => {
    try {
      const { pid } = req.params;
      const oneProduct = await this.service.readOne(pid);
      if (typeof oneProduct === "object") {
        return res.success200(oneProduct);
      } else {
        return res.status(404).json({ success: false, error: oneProduct });
      }
    } catch (error) {
      return next(error);
    }
  };
  update = async (req, res, next) => {
    const { pid } = req.params;
    const data = req.body;
    const updatedProduct = await this.service.update(pid, data);
    try {
      if (typeof updatedProduct === "object") {
        return res.success200(updatedProduct);
      } else {
        return res.status(400).json({ success: false, error: updatedProduct });
      }
    } catch (error) {
      return next(error);
    }
  };
  destroy = async (req, res, next) => {
    const { pid } = req.params;
    const deletedProduct = await this.service.destroy(pid);
    try {
      if (typeof deletedProduct === "object") {
        return res.success200(deletedProduct);
      } else {
        return res.status(400).json({ success: false, error: deletedProduct });
      }
    } catch (error) {
      return next(error);
    }
  };
}

export default ProductsController;
const controller = new ProductsController();
const { create, read, readOne, update, destroy } = controller;
export { create, read, readOne, update, destroy };
