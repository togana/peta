const express = require('express');
const config = require('config');
const router = new express.Router();
const User = require('./../../../../models/user');

// Create
// router.get('/create', (req, res) => {
  // const name = 'test_user';
  // const password = 'password';
  // const admin = true;
router.post('/', (req, res) => {
  const { name, password, admin } = req.body;
  const params = {
    name,
    password,
    admin,
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
