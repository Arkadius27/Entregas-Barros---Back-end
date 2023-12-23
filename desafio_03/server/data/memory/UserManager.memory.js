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

  destroy(id) {
    try {
      const one = UserManager.#users.find((user) => user.id === id);
      if (one) {
        UserManager.#users.filter((user) => user.id !== id);
        fs.promises.writeFile(
          this.path,
          JSON.stringify(UserManager.#users, null, 2)
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

const users = new UserManager();
users.create({
  name: "Agustin",
  photo: "./images/imgU1.png",
  email: "user1.agustin@email.com",
});
users.create({
  name: "Felipe",
  photo: "./images/imgU2.png",
  email: "user2.felipe@email.com",
});
users.create({
  name: "Martin",
  photo: "./images/imgU3.png",
  email: "user3.martin@email.com",
});

console.log(users.read());
console.log(users.readOne(2));
