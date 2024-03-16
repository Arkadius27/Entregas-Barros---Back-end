import crypto from "crypto";

class OrdersManager {
  static #orders = [];

  create(data) {
    const order = {
      id: crypto.randomBytes(12).toString("hex"),
      pid: data.pid,
      uid: data.uid,
      quantity: data.quantity,
      state: data.state,
    };

    OrdersManager.#orders.push(order);
  }

  read() {
    return OrdersManager.#orders;
  }

  readOne(id) {
    return OrdersManager.#orders.find((each) => each.id === (id));
  }

  update(id, data) {
    try {
      const one = OrdersManager.#orders.find((ord) => ord.id === id);
      if (one) {
        if (data.pid) {
          one.pid = data.pid;
        }
        if (data.uid) {
          one.uid = data.uid;
        }
        if (data.quantity) {
          one.quantity = data.quantity;
        }
        if (data.state) {
          one.state = data.state;
        }
        console.log("Order updated");
        return one;
      } else {
        throw new Error("Order not found");
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  destroy(id) {
    try {
      const one = OrdersManager.#orders.find((ord) => ord.id === id);
      if (one) {
        OrdersManager.#orders = OrdersManager.#orders.filter((ord) => ord.id !== id);
        console.log("Order deleted");
        return one;
      } else {
        throw new Error("Order not found");
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
}