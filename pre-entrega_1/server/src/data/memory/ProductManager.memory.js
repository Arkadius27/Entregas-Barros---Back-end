import crypto from "crypto";

class ProductManager {
  // static class properties
  static #products = [];

  constructor() {}

  create(data) {
    const product = {
      id: crypto.randomBytes(12).toString("hex"),
      title: data.title,
      photo: data.photo,
      price: data.price,
      stock: data.stock,
    };

    ProductManager.#products.push(product);
  }

  read() {
    return ProductManager.#products;
  }

  readOne(id) {
    return ProductManager.#products.find((each) => each.id === (id));
  }

  update(id, data) {
    try {
      const one = ProductManager.#products.find((prod) => prod.id === id);
      if (one) {
        if (data.title) {
          one.title = data.title;
        }
        if (data.photo) {
          one.photo = data.photo;
        }
        if (data.price) {
          one.price = data.price;
        }
        if (data.stock) {
          one.stock = data.stock;
        }
        console.log("Product updated");
        return one;
      } else {
        throw new Error("Product not found");
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }


  destroy(id) {
    try {
      const one = ProductManager.#products.find((prod) => prod.id === id);
      if (one) {
        ProductManager.#products = ProductManager.#products.filter((prod) => prod.id !== id);
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

// const products = new ProductManager();
// products.create({
//   title: "White Shirt - Male",
//   photo: "./images/imgP1.png",
//   price: 15,
//   stock: 30,
// });
// products.create({
//   title: "Red Shirt - Female",
//   photo: "./images/imgP2.png",
//   price: 18,
//   stock: 24,
// });
// products.create({
//   title: "Blue Shorts - Kids",
//   photo: "./images/imgP3.png",
//   price: 25,
//   stock: 45,
// });
