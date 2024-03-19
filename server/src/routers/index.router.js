import { Router } from "express";
import ApiRouter from "./api/index.api.js";
import ViewsRouter from "./views/index.views.js";
import CustomRouter from "./CustomRouter.js";

const api = new ApiRouter();
const views = new ViewsRouter();

export default class IndexRouter extends CustomRouter {
  init() {
    this.router.use("/api", api.getRouter());
    this.router.use("/", views.getRouter());
  }
}
