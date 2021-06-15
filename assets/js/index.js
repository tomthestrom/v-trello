import '../scss/main.scss';
import Title from './components/board/Title';
import TitleInput from './components/board/Input';
import TitleTextArea from './components/deck/TextArea';
import AddList from './components/deck/AddList';
import { CardListElement } from './components/deck/CardList';
import { ListDeckElement } from './components/deck/ListDeck';
import { DropZoneElement } from './components/deck/DropZone';
import socketConnection from './services/websocket';
import { SingleCardElement } from './components/deck/SingleCard';
import { CardDeckElement } from './components/deck/CardDeck';

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
customElements.define('card-list', CardListElement);
customElements.define('list-deck', ListDeckElement, { extends: 'div'});
customElements.define('drop-zone', DropZoneElement, { extends: 'div' });
customElements.define('single-card', SingleCardElement, {extends: 'li'});
customElements.define('card-deck', CardDeckElement, { extends: 'ul'});