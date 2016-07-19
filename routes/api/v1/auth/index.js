const express = require('express');
const config = require('config');
const router = new express.Router();
const jwt = require('jsonwebtoken');
const passwordHash = require('./../../../../lib/passwordHash');
const User = require('./../../../../models/user');

router.post('/token', (req, res) => {
  User.findOne({
    name: req.body.name,
  }, (err, user) => {
    if (err) throw err;

    if (!user || !passwordHash.verify(req.body.password, user.password)) {
      res.json({
        success: false,
        message: config.api.auth.failed,
      });
      return;
    }

    // create token
    const token = jwt.sign(user, config.session.config.secret, {
      expiresIn: config.api.auth.expires_in,
    });

    res.json({
      success: true,
      message: config.api.auth.success,
      token,
    });
  });
});
module.exports = router;
