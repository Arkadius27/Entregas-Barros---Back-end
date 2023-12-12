class ProductManager {
  // static class properties
  static #products = [];

  constructor() {}

  create(data) {
    const product = {
      id:
        ProductManager.#products.length === 0
          ? 1
          : ProductManager.#products[ProductManager.#products.length - 1].id + 1,
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
    return ProductManager.#products.find((each) => each.id === Number(id));
  }
}

const products = new ProductManager();
products.create({
  title: "White Shirt - Male",
  photo: "./images/imgP1.png",
  price: 15,
  stock: 30,
});
products.create({
  title: "Red Shirt - Female",
  photo: "./images/imgP2.png",
  price: 18,
  stock: 24,
});
products.create({
  title: "Blue Shorts - Kids",
  photo: "./images/imgP3.png",
  price: 25,
  stock: 45,
});

console.log(products.read());
console.log(products.readOne(3));
console.log(products.readOne(1));

