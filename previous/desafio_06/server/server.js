import express from "express";
import morgan from "morgan";
import { engine } from "express-handlebars";
import { createServer } from "http";
import { Server } from "socket.io";
import cookieParser from "cookie-parser";
import expressSession from "express-session";
import sessionFileStore from "session-file-store";
import MongoStore from "connect-mongo";

import "dotenv/config.js";
import dbConnection from "./src/utils/dbConnection.js";

import router from "./src/routers/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.js";
import pathHandler from "./src/middlewares/pathHandler.js";
import __dirname from "./utils.js";

import products from "./src/data/fs/ProductManager.fs.js";

const server = express();
const PORT = process.env.PORT || 8080;
const readyMessage = () => {
  console.log(`Server running on port ${PORT}`);
  dbConnection();
};

// server.listen(PORT, readyMessage);

const httpServer = createServer(server);
const socketServer = new Server(httpServer);

httpServer.listen(PORT, readyMessage);

socketServer.on("connection", (socket) => {
  console.log(`client ${socket.id} connected`);
  socket.emit("all products", products.read());
  socket.on("new product", async (data) => {
    try {
      await products.create(data);
      socketServer.emit("all products", await products.read());
    } catch (error) {
      console.log(error);
    }
  });
});

// templates
server.engine("hbs", engine({ extname: ".hbs" }));
server.set("view engine", "hbs");
server.set("views", "./src/views");

const FileStore = sessionFileStore(expressSession);

// middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(__dirname + "/public"));
server.use(morgan("dev"));
server.use(cookieParser());
// MONOGO STORE
server.use(
  expressSession({
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
      ttl: 7 * 24 * 60 * 60,
      mongoUrl: process.env.DB_LINK,
    }),
  })
);
// MEMORY STORE
// server.use(
//   expressSession({
//     store: new FileStore({ path:"./src/sessions", ttl: 10, retries: 3}),
//     secret: process.env.SECRET_KEY,
//     resave: true,
//     saveUninitialized: true,
//     cookie: { maxAge: 60000 },
//   })
// );
// FILE STORE
// server.use(
//   expressSession({
//     store: new FileStore({
//       path: "./src/data/fs/files/sessions",
//       ttl: 10,
//       retries: 3,
//     }),
//     secret: process.env.SECRET_KEY,
//     resave: true,
//     saveUninitialized: true,
//   })
// );

// routers
server.use("/", router);
server.use(errorHandler);
server.use(pathHandler);
