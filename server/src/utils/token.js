import jwt from "jsonwebtoken";

function createToken(data) {
  const token = jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: 60 * 60 * 24 * 7,
  });
  return token;
}

// MIO (OK???)
function verifyToken(headers) {
  const token = headers.token;
  if (!token) {
    const error = new Error("Bad authentication token");
    error.statusCode = 401;
    throw error;
  }
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    return data;
  } catch (error) {
    error.statusCode = 401;
    throw error;
  }
}

// EN CLASE
// function verifyToken(headers) {
//   const token = headers.token;
//   if (token) {
//     const data = jwt.verify(token);
//     return data;
//   }
//   const error = new Error("Token not found");
//   error.statusCode = 401;
//   throw error;
// }

export { createToken, verifyToken };