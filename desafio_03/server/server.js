import express from "express";
import ProductManager from "./data/fs/ProductManager.fs.js";
import UserManager from "./data/fs/UserManager.fs.js";

const server = express();

const PORT = 8080;
const readyMessage = () => console.log(`Server running on port ${PORT}`);

server.listen(PORT, readyMessage);

// Product endpoints
server.get("/api/products", (req, res) => {
  const products = ProductManager.read();
  if (products.length > 0) {
    res.status(200).send({ success: true, response: products });
  } else {
    res.status(404).send({ success: false, message: "not found!" });
  }
});

server.get("/api/products/:pid", (req, res) => {
  const product = ProductManager.readOne(req.params.pid);
  if (product) {
    res.status(200).send({ success: true, response: product });
  } else {
    res.status(404).send({ success: false, message: "not found!" });
  }
});

// User endpoints
server.get("/api/users", (req, res) => {
  const users = UserManager.read();
  if (users.length > 0) {
    res.status(200).send({ success: true, response: users });
  } else {
    res.status(404).send({ success: false, message: "not found!" });
  }
});

server.get("/api/users/:uid", (req, res) => {
  const user = UserManager.readOne(req.params.uid);
  if (user) {
    res.status(200).send({ success: true, response: user });
  } else {
    res.status(404).send({ success: false, message: "not found!" });
  }
});