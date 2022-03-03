export const errorHandler = (err, req, res, next) => {
  // use the existing status code or 500 if it's missing
  const statusCode = res.statusCode ? res.statusCode : 500;

  res.status(statusCode);

  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
