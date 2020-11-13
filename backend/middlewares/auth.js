const jwt = require('jsonwebtoken');
const { AuthError } = require('../errors/auth-err');
const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthError('Token not provided or provided in the wrong format.');
  }

  const token = authorization.replace('Bearer ', '');

  jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', (err, payload) => {
    if (err) {
      throw new AuthError('The provided token is invalid.');
    } else {
      req.user = payload;
    }
  });
  next();
};
