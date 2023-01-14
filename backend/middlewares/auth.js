const { JWT_SECRET = 'very-secret-key' } = process.env;
const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(
      new UnauthorizedError({
        message: 'Нужно авторизоваться.',
      }),
    );
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(
      new UnauthorizedError({
        message: 'Нужно авторизоваться.',
      }),
    );
  }
  req.user = payload;
  next();
  return payload;
};
