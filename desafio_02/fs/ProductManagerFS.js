const fs = require('fs').promises;
const path = require('path');

class ProductManager {
  static dataFile = path.join(__dirname, 'data', 'products.json');

  static async read() {
    try {
      const data = await fs.readFile(this.dataFile, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      if (error.code === 'ENOENT') {
        await fs.writeFile(this.dataFile, JSON.stringify([], null, 2));
        return [];
      } else {
        throw error;
      }
    }
  }

  static async readOne(id) {
    const products = await this.read();
    return products.find(product => product.id === id);
  }

  static async create(data) {
    const products = await this.read();
    const product = {
      id: products.length > 0 ? products[products.length - 1].id + 1 : 1,
      ...data
    };
    products.push(product);
    await fs.writeFile(this.dataFile, JSON.stringify(products, null, 2));
    return product;
  }
}

// create() method
async function createProducts() {
  const productsData = [
    { title: 'Product1', photo: "img/route1", price: 100, stock: 10 },
    { title: 'Product2', photo: "img/route2", price: 200, stock: 20 },
    { title: 'Product3', photo: "img/route3", price: 300, stock: 30 },
  ];

  for (const data of productsData) {
    const product = await ProductManager.create(data);
    console.log('Created product:', product);
  }
}
createProducts().catch(console.error);

// read() method
async function readProducts() {
  const products = await ProductManager.read();
  console.log('Products:', products);
}
readProducts().catch(console.error);

// readOne() method
async function readOneProduct() {
  const product = await ProductManager.readOne(2);
  console.log('Product:', product);
}
readOneProduct().catch(console.error);