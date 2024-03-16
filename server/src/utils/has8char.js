function has8char(password) {
  if (password.length < 8) {
    const error = new Error("Password must contain AT LEAST 8 characters");
    error.statusCode = 400;
    throw error;
  }
}

export default has8char;