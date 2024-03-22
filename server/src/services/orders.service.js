import { orders } from "../data/mongo/Manager.mongo.js";

class OrdersService {
  constructor() {
    this.model = orders;
  }
  create = async (data) => {
    try {
      const newOrder = await this.model.create(data);
      return newOrder;
    } catch (error) {
      throw error;
    }
  };
  read = async ({ filter, sortAndPaginate }) => {
    try {
      const allOrders = await this.model.read({ filter });
      return allOrders;
    } catch (error) {
      throw error;
    }
  };
  readOne = async (oid) => {
    try {
      const oneOrder = await this.model.readOne(oid);
      return oneOrder;
    } catch (error) {
      throw error;
    }
  };
  readByUser = async ({ filter }) => {
    try {
      const allOrders = await this.model.readByUser({ filter });
      return allOrders;
    } catch (error) {
      throw error;
    }
  };
  update = async (oid, data) => {
    try {
      const updatedOrder = await this.model.update(oid, data);
      return updatedOrder;
    } catch (error) {
      throw error;
    }
  };
  report = async (uid) => {
    try {
      const report = await this.model.report(uid);
      return report;
    } catch (error) {
      throw error;
    }
  };
  destroy = async (oid) => {
    try {
      const deletedOrder = await this.model.destroy(oid);
      return deletedOrder;
    } catch (error) {
      throw error;
    }
  };
};

const service = new OrdersService();
export default service;