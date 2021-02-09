var express = require('express');
var router = express.Router();
let Board = require('../models/board.model');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



module.exports = router;
