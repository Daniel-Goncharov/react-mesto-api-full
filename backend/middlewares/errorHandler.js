module.exports.errorHandler = (err, req, res, next) => {
  const { status = 500, message } = err;
  res.status(status).send({
    message: status === 500 ? 'Ошибка на сервере.' : message,
  });
  next();
};
