function propsUsers(req, res, next) {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password) {
    return res.json({
      statusCode: 400,
      response: `${req.method} ${req.url} - All fields are required`,
    });
  } else {
    return next();
  }
}
