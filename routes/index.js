var express = require('express');
var router = express.Router();
var debug = require('debug')('v-trello');
let Board = require('../models/board.model');

/* GET home page. */
router.get('/', function(req, res, next) {
  Board.findOne({}, function (err, obj) {
    debug(obj)
  });
  res.render('index', { title: 'Express' });
});



module.exports = router;
