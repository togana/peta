const express = require('express');
const config = require('config');
const router = new express.Router();
const User = require('./../../../../models/user');

// Create
router.post('/', (req, res) => {
  const { id, name, age } = req.body;
  const params = {
    id,
    name,
    age,
  };

  const user = new User(params);
  user.save((err) => {
    if (err) res.send(err);
    res.json({ message: config.api.success });
  });
});

// Read
router.get('/', (req, res) =>
  User.find((err, users) => {
    if (err) res.send(err);
    res.json(users);
    return this;
  })
);

module.exports = router;
