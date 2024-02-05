import User from "./models/User.model.js";
import Product from "./models/Product.model.js";
import Order from "./models/Order.model.js";

import notFoundOne from "../../utils/notFoundOne.js";

class MongoManager {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    try {
      const one = await this.model.create(data);
      return one._id;
    } catch (error) {
      throw error;
    }
  }

  // async report(id) {}

  async read(obj) {
    try {
      let { filter, sort } = obj;
      if (!filter) filter = {};
      if (!sort) sort = { _id: 1 };
      const all = await this.model
        .find(filter)
        .populate("uid")
        .populate("pid")
        .sort(sort);
      if (all.length === 0) {
        const error = new Error("No documents found");
        error.status = 404;
        throw error;
      } else {
        return all;
      }
    } catch (error) {
      throw error;
    }
  }

  async readOne(id) {
    try {
      const one = await this.model.findById(id);
      notFoundOne(one);
      return one;
    } catch (error) {
      throw error;
    }
  }

  async update(id, data) {
    try {
      const one = await this.model.findByIdAndUpdate(id, data, { new: true });
      notFoundOne(one);
      return one;
    } catch (error) {
      throw error;
    }
  }

  // async report(uid) {}

  async destroy(id) {
    try {
      const one = await this.model.findByIdAndDelete(id);
      notFoundOne(one);
      return one;
    } catch (error) {
      throw error;
    }
  }
}

const users = new MongoManager(User);
const products = new MongoManager(Product);
const orders = new MongoManager(Order);

export { users, products, orders };
