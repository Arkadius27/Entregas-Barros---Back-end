function notFoundOne(one) {
  if (!one) {
    const error = new Error("Not found");
    error.status = 404;
    throw error;
  }
}

export default notFoundOne;