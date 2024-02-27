import { verifyToken } from "../utils/token.js";

export default (req, res, next) => {
  try {
    const data = verifyToken(req.headers);
    const { role } = data;
    if (role === 1) {
      return next();
    } else {
      const error = new Error("Unauthorized");
      error.statusCode = 403;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
};