var express = require('express');
var router = express.Router();
var debug = require('debug')('v-trello');
const BoardModel = require('../models/board.model');
const wsServer = require('../services/ws-server');
//gonna get swapped if the project grows to having more than one board :D
const getBoard = () => BoardModel.findOne();

const updateBoardTitle = (boardId, newTitle) => BoardModel.findOneAndUpdate( {_id: boardId}, {title: newTitle}, {new: true});
/* GET home page. */
router.get('/', function(req, res, next) {
  const Board = getBoard();

  Board.then((board) => {
    debug(board)
    res.render('index', {
      id: board._id,
      title: board.title
    
    });
  }).catch(error => {
    debug(error);
  })
});
//daky autoloader podla typu messagu abo co
wsServer.on('connection', socket => {
  socket.on('message', function (message) {
      const parsedMessage = JSON.parse(message);
      debug(parsedMessage.value)
      if (parsedMessage.type === "boardTitle") {
        //after change emit through ws to component
        updateBoardTitle(parsedMessage.id, parsedMessage.value).then(queryResult => debug(queryResult));
      }
    }
  );
});




module.exports = router;
