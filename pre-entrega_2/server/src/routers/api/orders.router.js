import { Router } from "express";
// import orders from "../../data/fs/OrdersManager.fs.js";
import { orders } from "../../data/mongo/Manager.mongo.js";

const ordersRouter = Router();

ordersRouter.post("/", async (req, res, next) => {
  try {
    const data = req.body;
    const newOrder = await orders.create(data);
    if (newOrder === "Missing data for order creation") {
      return res.status(400).json({ success: false, error: newOrder });
    } else {
      return res.status(201).json({ success: true, response: newOrder });
    }
  } catch (error) {
    return next(error);
  }
});

ordersRouter.get("/", async (req, res, next) => {
  try {
    let filter = {};
    if (req.query.uid) {
      filter = {uid: req.query.uid};
    }
    const allOrders = await orders.read({filter});
    if (Array.isArray(allOrders)) {
      return res.status(200).json({ success: true, response: allOrders });
    } else {
      return res.status(404).json({ success: false, error: allOrders });
    }
  } catch (error) {
    return next(error);
  }
});

ordersRouter.get("/:oid", async (req, res, next) => {
  try {
    const { oid } = req.params;
    const oneOrder = await orders.readOne(oid);
    if (typeof oneOrder === "object") {
      return res.status(200).json({ success: true, response: oneOrder });
    } else {
      return res.status(404).json({ success: false, error: oneOrder });
    }
  } catch (error) {
    return next(error);
  }
});

//ordersRouter.get("/total/:uid", async (req, res, next) => {});

ordersRouter.put("/:oid", async (req, res, next) => {
  const { oid } = req.params;
  const data = req.body;
  const updatedOrder = await orders.update(oid, data);
  try {
    if (typeof updatedOrder === "object") {
      return res.status(200).json({ success: true, response: updatedOrder });
    } else {
      return res.status(400).json({ success: false, error: updatedOrder });
    }
  } catch (error) {
    return next(error);
  }
});

ordersRouter.delete("/:oid", async (req, res, next) => {
  try {
    const { oid } = req.params;
    const deletedOrder = await orders.destroy(oid);
    if (typeof deletedOrder === "object") {
      return res.status(200).json({ success: true, response: deletedOrder });
    } else {
      return res.status(404).json({ success: false, error: deletedOrder });
    }
  } catch (error) {
    return next(error);
  }
});

export default ordersRouter;