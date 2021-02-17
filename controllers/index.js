var express = require('express');
var router = express.Router();
var debug = require('debug')('v-trello');
const BoardModel = require('../models/board.model');
const wsServer = require('../services/ws-server');
//gonna get swapped if the project grows to having more than one board :D
const getBoardRecord = () => BoardModel.findOne();

const updateBoardTitleRecord = (boardId, newTitle) => BoardModel.findOneAndUpdate( {_id: boardId}, {title: newTitle}, {new: true});
/* GET home page. */
router.get('/', function(req, res, next) {
  const Board = getBoardRecord();

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
      if (parsedMessage.type === "boardTitle") {
        //after change emit through ws to component
        updateBoardTitleRecord(parsedMessage.id, parsedMessage.value).
        then(
          queryResult => {
            const updateObject = {
              id: "6022b00811c58d5b8d2c6943",
              type: "boardTitle",
              value: queryResult.title
            };

            const updateObjectStringified = JSON.stringify(updateObject);

            wsServer.clients.forEach((client) => {
              client.send(updateObjectStringified);
            })
            // socket.send(updateObjectStringified);
          })
      }
    }
  );
});




module.exports = router;
