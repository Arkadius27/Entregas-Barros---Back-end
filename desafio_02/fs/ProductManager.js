const fs = require("fs");
const crypto = require("crypto");

class ProductManager {
  static #products = [];

  init() {
    const exists = fs.existsSync(this.path);
    // console.log(exists);
    if (!exists) {
      fs.writeFileSync(this.path, JSON.stringify([], null, 2)); // sync pq es un metodo de inicializacion bloqueante
    } else {
      ProductManager.#products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
    }
  }

  constructor(path) {
    this.path = path;
    this.init();
  }

  async create(data) {
    // no es bloqueante, se puede crear un producto mientras se lee otro, etc
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
        // console.log("ID generated: " + one.id);
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
}

const products = new ProductManager("./fs/data/products.json");

products.create({
  title: "PS5",
  photo: "img/ps5photo.png",
  price: 750,
  stock: 10,
});
products.create({
  // retorna "missing data for product creation"
  title: "Xbox Series X",
});

products.read();

products.readOne("1"); // retorna "product not found"
products.readOne("97d6dc2e6ba1aa705fccf0b5"); // retorna el producto con ese id
