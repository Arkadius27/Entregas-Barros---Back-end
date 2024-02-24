import { Types } from "mongoose";

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

  async read({ filter, sortAndPaginate }) {
    try {
      const all = await this.model.paginate(filter, sortAndPaginate);
      if (all.totalPages === 0) {
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

  async readByEmail(email) {
    try {
      const one = await this.model.findOne({ email });
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

  async report(uid) {
    try {
      const report = await this.model.aggregate([
        { $match: { uid: new Types.ObjectId(uid) } },
        {
          $lookup: {
            from: "products",
            foreignField: "_id",
            localField: "pid",
            as: "pid",
          },
        },
        {
          $replaceRoot: {
            newRoot: {
              $mergeObjects: [{ $arrayElemAt: ["$pid", 0] }, "$$ROOT"],
            },
          },
        },
        { $set: { subtotal: { $multiply: ["$price", "$quantity"] } } },
        { $group: { _id: uid, total: { $sum: "$subtotal" } } },
        {
          $project: {
            _id: 0,
            uid: "$_id",
            total: "$total",
            currency: "USD",
            date: new Date(),
          },
        },
      ]);
      return report;
    } catch (error) {
      throw error;
    }
  }

  async destroy(id) {
    try {
      const one = await this.model.findByIdAndDelete(id);
      notFoundOne(one);
      return one;
    } catch (error) {
      throw error;
    }
  }

  async stats({ filter }) {
    try {
      let stats = await this.model.filter(filter).explain("executionStats");
      stats = {
        quantity: stats.executionStats.nReturned,
        executionTime: stats.executionStats.executionTimeMillis,
      };
      return stats;
    } catch (error) {
      throw error;
    }
  }
}

const users = new MongoManager(User);
const products = new MongoManager(Product);
const orders = new MongoManager(Order);

export { users, products, orders };
