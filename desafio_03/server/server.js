import express from "express";
import users from "./data/fs/UserManager.fs.js";
import products from "./data/fs/ProductManager.fs.js";

const server = express();

const PORT = 8080;
const readyMessage = () => console.log(`Server running on port ${PORT}`);

// middlewares
server.use(express.urlencoded({ extended: true }));

server.listen(PORT, readyMessage);

// Product endpoints
server.get("/api/products", async (req, res) => {
  const allProducts = await products.read();
  try {
    if (Array.isArray(allProducts)) {
      return res.status(200).json({ success: true, response: allProducts });
    } else {
      return res.status(404).json({ success: false, error: allProducts });
    }
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

server.get("/api/products/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const oneProduct = await products.readOne(pid);
    if (typeof oneProduct === "object") {
      return res.status(200).json({ success: true, response: oneProduct });
    } else {
      return res.status(404).json({ success: false, error: oneProduct });
    }
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// User endpoints
server.get("/api/users", async (req, res) => {
  const allUsers = await users.read();
  try {
    if (Array.isArray(allUsers)) {
      return res.status(200).json({ success: true, response: allUsers });
    } else {
      return res.status(404).json({ success: false, error: allUsers });
    }
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

server.get("/api/users/:uid", async (req, res) => {
  try {
    const { uid } = req.params;
    const oneUser = await users.readOne(uid);
    if (typeof oneUser === "object") {
      return res.status(200).json({ success: true, response: oneUser });
    } else {
      return res.status(404).json({ success: false, error: oneUser });
    }
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});