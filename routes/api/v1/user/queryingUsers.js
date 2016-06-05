const express = require('express');
const router = new express.Router();
const User = require('./../../../../models/user');

// Read
router.get('/', (req, res) =>
  User.find((err, users) => {
    if (err) res.send(err);
    res.json(users);
    return this;
  })
);

module.exports = router;
