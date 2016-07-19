const express = require('express');
const config = require('config');
const router = new express.Router();
const passwordHash = require('./../../../../lib/passwordHash');
const User = require('./../../../../models/user');

// Create
router.post('/', (req, res) => {
  const { name, password, admin } = req.body;
  const hashpassword = passwordHash.generate(password);
  const params = {
    name,
    password: hashpassword,
    admin,
  };

  const user = new User(params);
  user.save((err) => {
    if (err) res.send(err);
    res.json({ message: config.api.success });
  });
});

module.exports = router;
