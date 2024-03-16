import fs from "fs";
import crypto from "crypto";

class ProductManager {
  static #products = [];

  init() {
    const exists = fs.existsSync(this.path);
    if (!exists) {
      fs.writeFileSync(this.path, JSON.stringify([], null, 2));
    } else {
      ProductManager.#products = JSON.parse(
        fs.readFileSync(this.path, "utf-8")
      );
    }
  }

  constructor(path) {
    this.path = path;
    this.init();
  }

  async create(data) {
    try {
      if (!data.title || !data.photo || !data.price || !data.stock) {
        throw new Error("Missing data for product creation");
      } else {
        const one = {
          id: crypto.randomBytes(12).toString("hex"),
          title: data.title,
          photo: data.photo,
          price: data.price,
          stock: data.stock,
        };
        ProductManager.#products.push(one);
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(ProductManager.#products, null, 2)
        );
        return one;
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  async read() {
    try {
      if (ProductManager.#products.length === 0) {
        throw new Error("No products found");
      } else {
       // console.log(ProductManager.#products);
        return ProductManager.#products;
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  async readOne(id) {
    try {
      const one = ProductManager.#products.find((prod) => prod.id === id);
      if (one) {
        console.log(one);
        return one;
      } else {
        throw new Error("Product not found");
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  async destroy(id) {
    try {
      const one = ProductManager.#products.find((prod) => prod.id === id);
      if (one) {
        ProductManager.#products = ProductManager.#products.filter(
          (prod) => prod.id !== id
        );
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(ProductManager.#products, null, 2)
        );
        console.log("Product deleted");
        return one;
      } else {
        throw new Error("Product not found");
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
}

const products = new ProductManager("./data/fs/files/products.json");

export default products;
