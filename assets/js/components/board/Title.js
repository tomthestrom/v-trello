import socketConnection from '../../services/websocket';

export default class Title extends HTMLHeadingElement {
  constructor () {
    super();
    // this.boardService = boardService;
  }

  updateText (newTitle) {
    this.innerText = newTitle;
  }

  connectedCallback () {
    const eventHandlers = this.eventHandlers.call(this);

    this.addEventListener('click', eventHandlers.click);
    socketConnection.addEventListener('message', eventHandlers.message.bind(this));
  }

  hide () {
    this.setAttribute('style', 'position: absolute; color: transparent; z-index: -5;');
    this.hidden = true;

    return this;
  }

  eventHandlers () {
    const inputForTitle = document.getElementById('board-title-input');

    const click = () => inputForTitle.focus();

    const message = function (message) {
      const parsedMessage = JSON.parse(message.data);

      if (parsedMessage.type === 'boardTitle') {
        this.innerText = (parsedMessage.value);
      }
    };

    return { click, message };
  }
}

customElements.define('board-title', Title, { extends: 'h1' });
