const fs = require("fs");
const crypto = require("crypto");

class UserManager {
  static #users = [];

  init() {
    const exists = fs.existsSync(this.path);
    if (!exists) {
      fs.writeFileSync(this.path, JSON.stringify([], null, 2));
    } else {
      UserManager.#users = JSON.parse(fs.readFileSync(this.path, "utf-8"));
    }
  }

  constructor(path) {
    this.path = path;
    this.init();
  }

  async create(data) {
    try {
      if (!data.name || !data.photo || !data.email) {
        throw new Error("Missing data for user creation");
      } else {
        const one = {
          id: crypto.randomBytes(12).toString("hex"),
          name: data.name,
          photo: data.photo,
          email: data.email,
        };
        UserManager.#users.push(one);
        await fs.writeFile(
          this.path,
          JSON.stringify(UserManager.#users, null, 2)
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
      if (UserManager.#users.length === 0) {
        throw new Error("No users found");
      } else {
        console.log(UserManager.#users);
        return UserManager.#users;
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  async readOne(id) {
    try {
      if (UserManager.#users.length === 0) {
        throw new Error("No users found");
      } else {
        const one = UserManager.#users.find((user) => user.id === id);
        if (!one) {
          throw new Error("User not found");
        } else {
          console.log(one);
          return one;
        }
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
}

const users = new UserManager("./fs/data/users.json");

users.create({
  name: "Agustin Barros",
  photo: "img/agustinphoto.png",
  email: "agustin@email.com",
});
users.create({
  name: "Juan Perez",
  photo: "img/juanphoto.png",
  email: "",
});

users.read();

users.readOne("123456789"); // User not found