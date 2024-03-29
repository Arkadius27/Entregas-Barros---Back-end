import { Router } from "express";
// import products from "../../data/fs/ProductManager.fs.js";
import { products } from "../../data/mongo/Manager.mongo.js";

const productsRouter = Router();

productsRouter.post("/", async (req, res, next) => {
  try {
    const data = req.body;
    const newProduct = await products.create(data);
    if (newProduct === "Missing data for product creation") {
      return res.status(400).json({ success: false, error: newProduct });
    } else {
      return res.status(201).json({ success: true, response: newProduct });
    }
  } catch (error) {
    return next(error);
  }
});

productsRouter.get("/", async (req, res, next) => {
  try {
    const sortAndPaginate = {
      limit: req.query.limit || 20,
      page: req.query.page || 1,
    }
    const filter = {};
    if (req.query.title) {
      filter.title = new RegExp(req.query.title.trim(), "i");
    }
    if (req.query.price === "desc") {
      sortAndPaginate.sort = { price: -1 };
    } else {
      sortAndPaginate.sort = { price: 1 };
    }
    const allProducts = await products.read({filter, sortAndPaginate});
    if (Array.isArray(allProducts)) {
      return res.status(200).json({ success: true, response: allProducts });
    } else {
      return res.status(404).json({ success: false, error: allProducts });
    }
  } catch (error) {
    return next(error);
  }
});

productsRouter.get("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const oneProduct = await products.readOne(pid);
    if (typeof oneProduct === "object") {
      return res.status(200).json({ success: true, response: oneProduct });
    } else {
      return res.status(404).json({ success: false, error: oneProduct });
    }
  } catch (error) {
    return next(error);
  }
});

productsRouter.put("/:pid", async (req, res, next) => {
  const { pid } = req.params;
  const data = req.body;
  const updatedProduct = await products.update(pid, data);
  try {
    if (typeof updatedProduct === "object") {
      return res.status(200).json({ success: true, response: updatedProduct });
    } else {
      return res.status(400).json({ success: false, error: updatedProduct });
    }
  } catch (error) {
    return next(error);
  }
});

productsRouter.delete("/:pid", async (req, res, next) => {
  const { pid } = req.params;
  const deletedProduct = await products.destroy(pid);
  try {
    if (typeof deletedProduct === "object") {
      return res.status(200).json({ success: true, response: deletedProduct });
    } else {
      return res.status(400).json({ success: false, error: deletedProduct });
    }
  } catch (error) {
    return next(error);
  }
});

export default productsRouter;
