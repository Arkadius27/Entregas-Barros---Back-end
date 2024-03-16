class Usermanager {
  // static class properties
  static #users = [];

  constructor() {}

  create(data) {
    const user = {
      id:
        Usermanager.#users.length === 0
          ? 1
          : Usermanager.#users[Usermanager.#users.length - 1].id + 1,
      name: data.name,
      photo: data.photo,
      email: data.email,
    };

    Usermanager.#users.push(user);
  }

  read() {
    return Usermanager.#users;
  }

  readOne(id) {
    return Usermanager.#users.find((each) => each.id === Number(id));
  }
}

const users = new Usermanager();
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
