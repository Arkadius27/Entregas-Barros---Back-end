import { Router } from "express";

export default class CustomRouter {
  constructor() {
    this.router = Router();
    this.init();
  }

  init() {}

  getRouter() {
    return this.router;
  }

  applyCb(cbs) {
    return cbs.map((each) => async (...params) => {
      try {
        await each.apply(this, params);
      } catch (error) {
        params[1].json({ statusCode: 500, message: error.message });
      }
    });
  }

  create(path, ...cbs) {
    this.router.post(path, this.applyCb(cbs));
  }
  read(path, ...cbs) {
    this.router.get(path, this.applyCb(cbs));
  }
  update(path, ...cbs) {
    this.router.put(path, this.applyCb(cbs));
  }
  destroy(path, ...cbs) {
    this.router.delete(path, this.applyCb(cbs));
  }
  use(path, ...cbs) {
    this.router.use(path, this.applyCb(cbs));
  }
}
