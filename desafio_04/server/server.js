import express from "express";
import morgan from "morgan";
import { engine } from "express-handlebars";
import { createServer } from "http";
import { Server } from "socket.io";

import router from "./src/routers/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.js";
import pathHandler from "./src/middlewares/pathHandler.js";
import __dirname from "./utils.js";

import products from "./src/data/fs/ProductManager.fs.js";

const server = express();
const PORT = 8080;
const readyMessage = () => console.log(`Server running on port ${PORT}`);

// server.listen(PORT, readyMessage);

const httpServer = createServer(server);
const socketServer = new Server(httpServer);

httpServer.listen(PORT, readyMessage);

socketServer.on("connection", (socket) => {
  // console.log(socket.id);
  socket.emit("all products", products.read());
  socket.on("new product", async (data) => {
    try {
      // console.log(data);
      await products.create(data);
      socket.emit("all products", products.read());
    } catch (error) {
      console.log(error);
    }
  });
});

// templates
server.engine("hbs", engine({ extname: ".hbs" }));
server.set("view engine", "hbs");
server.set("views", "./src/views");
// middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(__dirname + "/public"));
server.use(morgan("dev"));
// routers
server.use("/", router);
server.use(errorHandler);
server.use(pathHandler);
