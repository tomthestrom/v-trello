export default class TitleTextArea extends HTMLTextAreaElement {
    constructor () {
        super();
    }

    //base height of the element
    get BASE_HEIGHT () {
        return 33;
    }
    
    connectedCallback () {
        const eventHandlers = this.eventHandlers.call(this);

        this.addEventListener('input', eventHandlers.input);
        this.addEventListener('focusout', function() {
            
        const updateObject = {
          id: "6022b00811c58d5b8d2c6943",
          type: "boardTitle",
          value: this.value
        };

        socketConnection.send(JSON.stringify(updateObject));
        })
    }

    eventHandlers () {
        const input = () => {
            //only grow it if it has not already been grown and there is anything to scroll (scrollheight>baseHeight) e
            if (this.getBoundingClientRect().height !== this.scrollHeight) {
                this.style.height = this.scrollHeight > this.BASE_HEIGHT ? (this.scrollHeight) + 'px' : this.BASE_HEIGHT;
            }
        }

        return {
            input, 
        }
    }


}

customElements.define('deck-title-textarea', TitleTextArea, {extends: "textarea"});