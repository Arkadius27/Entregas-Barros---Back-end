import crypto from "crypto";

class UserManager {
  // static class properties
  static #users = [];

  constructor() {}

  create(data) {
    const user = {
      id: crypto.randomBytes(12).toString("hex"),
      name: data.name,
      photo: data.photo,
      email: data.email,
    };

    UserManager.#users.push(user);
  }

  read() {
    return UserManager.#users;
  }

  readOne(id) {
    return UserManager.#users.find((each) => each.id === id);
  }

  update(id, data) {
    try {
      const one = UserManager.#users.find((user) => user.id === id);
      if (one) {
        if (data.name) {
          one.name = data.name;
        }
        if (data.photo) {
          one.photo = data.photo;
        }
        if (data.email) {
          one.email = data.email;
        }
        console.log("User updated");
        return one;
      } else {
        throw new Error("User not found");
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  destroy(id) {
    try {
      const one = UserManager.#users.find((prod) => prod.id === id);
      if (one) {
        UserManager.#users = UserManager.#users.filter(
          (prod) => prod.id !== id
        );
        console.log("User deleted");
        return one;
      } else {
        throw new Error("User not found");
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
}

// const users = new UserManager();
// users.create({
//   name: "Agustin",
//   photo: "./images/imgU1.png",
//   email: "user1.agustin@email.com",
// });
// users.create({
//   name: "Felipe",
//   photo: "./images/imgU2.png",
//   email: "user2.felipe@email.com",
// });
// users.create({
//   name: "Martin",
//   photo: "./images/imgU3.png",
//   email: "user3.martin@email.com",
// });
