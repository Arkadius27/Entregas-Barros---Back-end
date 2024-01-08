import fs from "fs";
import crypto from "crypto";

class OrdersManager {
  static #orders = [];

  init() {
    const exists = fs.existsSync(this.path);
    if (!exists) {
      fs.writeFileSync(this.path, JSON.stringify([], null, 2));
    } else {
      OrdersManager.#orders = JSON.parse(fs.readFileSync(this.path, "utf-8"));
    }
  }

  constructor(path) {
    this.path = path;
    this.init();
  }

  async create(data) {
    try {
      if (!data.pid || !data.uid || !data.quantity || !data.state) {
        return "Missing data for product creation";
      } else {
        const one = {
          id: crypto.randomBytes(12).toString("hex"),
          pid: data.pid,
          uid: data.uid,
          quantity: data.quantity,
          state: data.state,
        };
        OrdersManager.#orders.push(one);
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(OrdersManager.#orders, null, 2)
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
      if (OrdersManager.#orders.length === 0) {
        throw new Error("No orders found");
      } else {
        return OrdersManager.#orders;
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  async readByUser(uid) {
    try {
      const orders = OrdersManager.#orders.filter((order) => order.uid === uid);
      if (orders.length > 0) {
        console.log(orders);
        return orders;
      } else {
        return "Orders not found";
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  async update(id, quantity, state) {
    try {
      const order = OrdersManager.#orders.find((order) => order.id === id);
      if (!order) {
        return `Order with id ${id} not found`;
      }
      if (quantity !== undefined) {
        order.quantity = quantity;
      }
      if (state !== undefined) {
        order.state = state;
      }
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(OrdersManager.#orders, null, 2)
      );
      return order;
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  async destroy(id) {
    try {
      const one = OrdersManager.#orders.find((prod) => prod.id === id);
      if (one) {
        OrdersManager.#orders = OrdersManager.#orders.filter(
          (order) => order.id !== id
        );
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(OrdersManager.#orders, null, 2)
        );
        console.log("Order deleted");
        return one;
      } else {
        return "Order not found";
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
}

const orders = new OrdersManager("./src/data/fs/files/orders.json");

export default orders;
