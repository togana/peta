const config = require('config');
const jwt = require('jsonwebtoken');

function required() {
  return (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (!token) {
      res.status(403).send({
        message: config.api.auth.invalid_token,
      });
      return;
    }

    jwt.verify(token, config.session.config.secret, (err) => {
      if (err) {
        res.status(403).send({
          message: config.api.auth.invalid_token,
        });
        return;
      }
      next();
    });
  };
}

module.exports = { required };
