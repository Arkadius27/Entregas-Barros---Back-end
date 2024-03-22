import service from "../services/orders.service.js";

class OrdersController {
  constructor() {
    this.service = service;
  }
  create = async (req, res, next) => {
    try {
      const data = req.body;
      const newOrder = await this.service.create(data);
      if (newOrder === "Missing data for order creation") {
        return res.status(400).json({ success: false, error: newOrder });
      } else {
        return res.status(201).json({ success: true, response: newOrder });
      }
    } catch (error) {
      return next(error);
    }
  }
  read = async (req, res, next) => {
    try {
      const sortAndPaginate = {
        limit: req.query.limit || 20,
        page: req.query.page || 1,
      }
      const filter = {};
      if (req.query.uid) {
        filter.uid = req.query.uid;
      }
      if (req.query.status) {
        filter.status = req.query.status;
      }
      if (req.query.status === "desc") {
        sortAndPaginate.sort = { status: -1 }
      } else {
        sortAndPaginate.sort = { status: 1 }
      }
      const allOrders = await this.service.read({ filter });
      if (Array.isArray(allOrders)) {
        return res.status(200).json({ success: true, response: allOrders });
      } else {
        return res.status(404).json({ success: false, error: allOrders });
      }
    } catch (error) {
      return next(error);
    }
  }
  readOne = async (req, res, next) => {
    try {
      const { oid } = req.params;
      const oneOrder = await this.service.readOne(oid);
      if (typeof oneOrder === "object") {
        return res.status(200).json({ success: true, response: oneOrder });
      } else {
        return res.status(404).json({ success: false, error: oneOrder });
      }
    } catch (error) {
      return next(error);
    }
  }
  readByUser = async (req, res, next) => {
    try {
      const { uid } = req.params;
      const filter = { user_id: uid };
      const allOrders = await this.service.read({ filter });
      if (typeof allOrders === "object") {
        return res.status(200).json({ success: true, response: allOrders });
      } else {
        return res.status(404).json({ success: false, error: allOrders });
      }
    } catch (error) {
      return next(error);
    }
  }
  update = async (req, res, next) => {
    const { oid } = req.params;
    const data = req.body;
    const updatedOrder = await this.service.update(oid, data);
    try {
      if (typeof updatedOrder === "object") {
        return res.status(200).json({ success: true, response: updatedOrder });
      } else {
        return res.status(400).json({ success: false, error: updatedOrder });
      }
    } catch (error) {
      return next(error);
    }
  }
  report = async (req, res, next) => {
    try {
      const { uid } = req.params;
      const report = await this.service.report(uid);
      if (Array.isArray(report)) {
        return res.status(200).json({ success: true, response: report });
      } else {
        return res.status(404).json({ success: false, error: report });
      }
    } catch (error) {
      return next(error);
    }
  }
  destroy = async (req, res, next) => {
    try {
      const { oid } = req.params;
      const deletedOrder = await this.service.destroy(oid);
      if (typeof deletedOrder === "object") {
        return res.status(200).json({ success: true, response: deletedOrder });
      } else {
        return res.status(404).json({ success: false, error: deletedOrder });
      }
    } catch (error) {
      return next(error);
    }
  }
}

export default OrdersController;
const controller = new OrdersController();
const { create, read, readOne, readByUser, report, update, destroy } = controller;
export { create, read, readOne, readByUser, report, update, destroy };