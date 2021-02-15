const ws = require('ws');
const debug = require('debug')('v-trello');


const wsServer = new ws.Server({ 
    noServer: true,
    port: 8080
 });

wsServer.on('connection', socket => {
    debug('connection established')
  socket.on('message', message => debug(message));
  socket.send('kokot')
});

module.exports = wsServer;
