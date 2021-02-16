var express = require('express');
var router = express.Router();
let Board = require('../models/board.model');

//add board
router.route('/add').post((req, res) => {
  const title = req.body.title;
  const description = req.body.description;

  const newBoard = new Board({
    title,
    description
  });

  newBoard.save()
  .then(() => res.json('Board created successfully!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;