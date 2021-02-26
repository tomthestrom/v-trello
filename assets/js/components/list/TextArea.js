import socketConnection from '../../services/websocket';
export default class TitleTextArea extends HTMLTextAreaElement {
  constructor () {
    super();
  }

  // base height of the element
  get BASE_HEIGHT () {
    return 33;
  }

  connectedCallback () {
    const eventHandlers = this.eventHandlers.call(this);

    this.addEventListener('input', eventHandlers.input);
    this.addEventListener('focusout', eventHandlers.focus);
  }

  eventHandlers () {
    const input = () => {
      // only grow it if it has not already been grown and there is anything to scroll (scrollheight>baseHeight) e
      if (this.getBoundingClientRect().height !== this.scrollHeight) {
        this.style.height = this.scrollHeight > this.BASE_HEIGHT ? (this.scrollHeight) + 'px' : this.BASE_HEIGHT;
      }
    };

    const focus = () => {
      const updateObject = {
        id: '6022b00811c58d5b8d2c6943',
        type: 'deckTitle',
        value: this.value
      };

      socketConnection.send(JSON.stringify(updateObject));
    };

    return {
      input, focus
    };
  }
}

customElements.define('deck-title-textarea', TitleTextArea, { extends: 'textarea' });
