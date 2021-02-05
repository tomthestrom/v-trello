export default class TitleTextArea extends HTMLTextAreaElement {
    constructor () {
        super();
    }

    connectedCallback () {
        const eventHandlers = this.eventHandlers.call(this);
        this.addEventListener('input', () => console.log('input textarea'))
    }

    eventHandlers () {

    }


}

customElements.define('deck-title-textarea', TitleTextArea, {extends: "textarea"});