import '../scss/main.scss';
import { boardService } from './services/board';
import Title from './components/board/Title';
import TitleInput from './components/board/Input';
import TitleTextArea from './components/list/TextArea';
import AddList from './components/list/AddList';
import CardList from './components/list/CardList';
import Deck from './components/list/Deck';
import DropZone from './components/list/DropZone';
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

customElements.define('board-title', Title, { extends: 'h1' });
customElements.define('board-title-input', TitleInput, { extends: 'input' });
customElements.define('deck-title-textarea', TitleTextArea, { extends: 'textarea' });
customElements.define('add-list', AddList);
customElements.define('card-list', CardList);
customElements.define('list-deck', Deck, { extends: 'div'});
customElements.define('list-drop-zone', DropZone, { extends: 'div' });
