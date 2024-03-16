import express from "express";
import morgan from "morgan";

import router from "./src/routers/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.js";
import pathHandler from "./src/middlewares/pathHandler.js";
import __dirname from "./utils.js";

const server = express();
const PORT = 8080;
const readyMessage = () => console.log(`Server running on port ${PORT}`);

server.listen(PORT, readyMessage);

// middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(__dirname + "/public"));
server.use(morgan("dev"));
// routers
server.use("/", router);
server.use(errorHandler);
server.use(pathHandler);
