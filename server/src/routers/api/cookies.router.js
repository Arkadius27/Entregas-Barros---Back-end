import { Router } from "express";

const cookiesRouter = Router();

cookiesRouter.get("/set/:mode", (req, res, next) => {
  try {
    const { mode } = req.params;
    const { maxAge } = 60000 * 5;
    return res
      .status(200)
      .cookie("mode", mode, { maxAge })
      .json({ success: true, response: `cookie mode set to ${mode}` });
  } catch (error) {
    return next(error);
  }
});

cookiesRouter.get("/get", (req, res, next) => {
  try {
    const mode = req.cookies.mode;
    return res
      .status(200)
      .json({ success: true, response: mode });
  } catch (error) {
    return next(error);
  }
});

cookiesRouter.get("/clear", (req, res, next) => {
  try {
    res.clearCookie("mode");
    return res
      .status(200)
      .json({ success: true, response: "cookie mode cleared" });
  } catch (error) {
    return next(error);
  }
});

export default cookiesRouter;
