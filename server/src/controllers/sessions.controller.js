
class SessionsController {
  constructor() {}
  createLogin = async (req, res, next) => {
    try {
      return res
        .cookie("token", req.token, {
          maxAge: 7 * 24 * 60 * 60,
          httpOnly: true,
        })
        .json({ statusCode: 200, message: "Logged in!" });
    } catch (error) {
      return next(error);
    }
  }
  readGoogle = async (req, res, next) => {
    try {
      return res.json({
        message: "Logged in with Google!",
        session: req.session,
      });
    } catch (error) {
      return next(error);
    }
  }
  createRegister = async (req, res, next) => {
    try {
      return res.json({ statusCode: 201, message: "Registered!" });
    } catch (error) {
      return next(error);
    }
  }
  createSignout = async (req, res, next) => {
    try {
      return res.clearCookie("token").json({
        statusCode: 200,
        message: "Signed out!",
      });
    } catch (error) {
      return next(error);
    }
  }
  createMe = async (req, res, next) => {
    try {
      const user = {
        email: req.user.email,
        role: req.user.role,
        photo: req.user.photo,
      };
      return res.json({
        statusCode: 200,
        response: user,
      });
    } catch (error) {
      return next(error);
    }
  }
  readBadAuth = (req, res, next) => {
    try {
      return res.json({ message: "Bad authentication" });
    } catch (error) {
      return next(error);
    }
  }
}

export default SessionsController;
const controller = new SessionsController();
const { createLogin, readGoogle, createRegister, createSignout, createMe, readBadAuth } = controller;
export { createLogin, readGoogle, createRegister, createSignout, createMe, readBadAuth };