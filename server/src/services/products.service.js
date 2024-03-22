import { products } from "../data/mongo/Manager.mongo.js";

class ProductsService {
  constructor() {
    this.model = products;
  }
  create = async (data) => {
    try {
      const newProduct = await this.model.create(data);
      return newProduct;
    } catch (error) {
      throw error;
    }
  };
  read = async ({ filter, sortAndPaginate }) => {
    try {
      const allProducts = await this.model.read({ filter, sortAndPaginate });
      return allProducts;
    } catch (error) {
      throw error;
    }
  };
  readOne = async (pid) => {
    try {
      const oneProduct = await this.model.readOne(pid);
      return oneProduct;
    } catch (error) {
      throw error;
    }
  };
  update = async (pid, data) => {
    try {
      const updatedProduct = await this.model.update(pid, data);
      return updatedProduct;
    } catch (error) {
      throw error;
    }
  };
  destroy = async (pid) => {
    try {
      const deletedProduct = await this.model.destroy(pid);
      return deletedProduct;
    } catch (error) {
      throw error;
    }
  };
}

const service = new ProductsService();
export default service;