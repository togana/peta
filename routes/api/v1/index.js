const express = require('express');
const config = require('config');
const router = new express.Router();

router.get('/', (req, res) =>
  res.json({ message: config.api.test_message })
);

module.exports = router;
