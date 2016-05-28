const express = require('express');
const config = require('config');
const router = new express.Router();

/* GET home page. */
router.get('/', (req, res) =>
  res.render('index', { title: config.app.title })
);

module.exports = router;
