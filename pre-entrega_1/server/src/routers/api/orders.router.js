import { Router } from "express";
import orders from "../../data/fs/OrdersManager.fs.js";

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

ordersRouter.get("/:oid", async (req, res, next) => {
  try {
    const { oid } = req.params;
    const userOrders = await orders.readByUser(oid);
    if (typeof userOrders === "object") {
      return res.status(200).json({ success: true, response: userOrders });
    } else {
      return res.status(404).json({ success: false, error: userOrders });
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