import '../scss/main.scss';
import { boardService } from './services/board';
import Title from './components/board/Title';
import Input from './components/board/Input';
import TextArea from './components/list/TextArea';
import AddList from './components/list/AddList';
import CardList from './components/list/CardList'
import Deck from './components/list/Deck'
import socketConnection from './services/websocket';
// @TODO: create a custom element register obj

// // Connection opened
socketConnection.addEventListener('open', function (event) {
  console.log('open');
//     socketConnection.send('Hello Server!');
});

socketConnection.addEventListener('error', function (error) {
  console.error(error);
});

socketConnection.addEventListener('message', function (message) {
  console.log(message.data);
});

// // Listen for messages
// socket.addEventListener('message', function (event) {
//     console.log('Message from server ', event.data);
// });
