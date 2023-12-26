import express from "express";
// import users from "./data/fs/UserManager.fs.js";
import products from "./data/fs/ProductManager.fs.js";
import e from "express";

const server = express();

const PORT = 8080;
const readyMessage = () => console.log(`Server running on port ${PORT}`);

// middlewares
server.use(express.urlencoded({ extended: true }));

server.listen(PORT, readyMessage);

// Product endpoints
server.get("/api/products", (req, res) => {
  const allProducts = products.read();
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

server.get("/api/products/:pid", (req, res) => {
  try {
    const { pid } = req.params;
    const oneProduct = products.readOne(pid);
    
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// User endpoints
