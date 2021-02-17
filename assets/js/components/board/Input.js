import { replaceSpaceWithNBSP } from "../../utils/stringHelper";
import socketConnection from "../../services/websocket"

// import boardService from '../../services/board';
/**
 * in unfocused state lies under board heading
 * when focused - appears and dynamically grows mimicking the <h1> behavior
 */
export default class TitleInput extends HTMLInputElement {
    constructor() {
      super();
    }

    connectedCallback() {
      const eventHandlers = this.eventHandlers.call(this);

      this.addEventListener('focus', eventHandlers.focus);
      this.addEventListener('input', eventHandlers.input);
      this.addEventListener('focusout', eventHandlers.focusout);
    }
  //@TODO: DRY stuff called in each event handler
    eventHandlers() {
      // updates once it's been inserted/removed into/from DOM
      let mimickedElementCloneInDOM  = undefined;
      const mimickedElementSelector  = this.getAttribute('mimicks-element');

      const focus = function () {
        const mimickedElement = document.querySelector(mimickedElementSelector);
        const mimickedElementClone = prepareMimickedElementClone(mimickedElement);

        this.insertAdjacentElement('afterend', mimickedElementClone);

        setMimickedElementCloneInDOM();
        updateInnerTextFromMimickedElement(mimickedElement);
        updateWidth();
        this.select();
      }

      const input = function (event) {
        updateMimickedElementInnerHTMLFromThis(event.target.value);
        updateWidth();
      }

      const focusout = function () {
        mimickedElementCloneInDOM.remove();
        mimickedElementCloneInDOM = undefined;

        const updateObject = {
          id: "6022b00811c58d5b8d2c6943",
          type: "boardTitle",
          value: this.value
        };

        socketConnection.send(JSON.stringify(updateObject));
      }

      const prepareMimickedElementClone = function (mimickedElement) {
        const mimickedElementClone = mimickedElement.cloneNode(true);
        mimickedElementClone.id   += '-clone';
        mimickedElementClone.setAttribute("style", "position: absolute; color: transparent; z-index: -5;");
        
        return mimickedElementClone;
    }

      const updateWidth = () => this.style.width = mimickedElementCloneInDOM.getBoundingClientRect().width + 'px';

      const updateInnerTextFromMimickedElement = (mimickedElement) => this.value = mimickedElement.innerText;
     
      const setMimickedElementCloneInDOM = () => mimickedElementCloneInDOM = this.nextElementSibling;

      const updateMimickedElementInnerHTMLFromThis = text => mimickedElementCloneInDOM.innerHTML = replaceSpaceWithNBSP(text);

      return {
        focus, focusout, input
      }
    }


}
customElements.define('board-title-input', TitleInput, {extends: "input"});