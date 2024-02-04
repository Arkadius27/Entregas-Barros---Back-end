import User from "./models/User.model.js";
import Product from "./models/Product.model.js";

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

  async read() {
    try {
      return await this.model.find();
      if (all.lenght === 0) {
        const error = new Error("No products found");
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
      if (!one) {
        const error = new Error("Product not found");
        error.status = 404;
        throw error;
      } else {
        return one;
      }
    } catch (error) {
      throw error;
    }
  }

  async update(id, data) {
    try {
      const one = await this.model.findByIdAndUpdate(id, data, { new: true });
      if (!one) {
        const error = new Error("Product not found");
        error.status = 404;
        throw error;
      } else {
        return one;
      }
    } catch (error) {
      throw error;
    }
  }

  async destroy(id) {
    try {
      const one = await this.model.findByIdAndDelete(id);
      if (!one) {
        const error = new Error("Product not found");
        error.status = 404;
        throw error;
      } else {
        return one;
      }
    } catch (error) {
      throw error;
    }
  }
}

const users = new MongoManager(User);
const products = new MongoManager(Product);
// const orders = 

export default { users, products };