import fs from "fs";
import crypto from "crypto";

class ProductManager {
  static #products = [];

  init() {
    const exists = fs.existsSync(this.path);
    if (!exists) {
      fs.writeFileSync(this.path, JSON.stringify([], null, 2));
    } else {
      ProductManager.#products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
    }
  }

  // ------------------ OR ------------------ ???
  // init() {
  //   let data = fs.readFileSync(this.filePath, "utf-8");
  //   if (data) {
  //     this.data = JSON.parse(data);
  //   } else {
  //     this.data = [];
  //   }
  // }

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
        console.log(ProductManager.#products);
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
        ProductManager.#products.filter((prod) => prod.id !== id);
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

export default ProductManager;

const products = new ProductManager("./data/fs/files/products.json");

await products.create({
  title: "PS5",
  photo: "img/ps5photo.png",
  price: 750,
  stock: 10,
});
await products.create({
  title: "Xbox Series X",
  photo: "img/xboxphoto.png",
  price: 700,
  stock: 8,
});

products.read();

products.readOne("1"); // retorna "product not found"
products.readOne("84a865f00ab91f21d59c5543"); // retorna el producto con ese id

products.destroy("1"); // retorna "product not found"
products.destroy("9f90d05b5c6a817728412ae4"); // borra el producto