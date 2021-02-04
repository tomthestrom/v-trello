import { observable as observableMixin } from "../../mixins/observable";
import stringHelper from "../../utils/stringHelper";

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
      console.log('connected callback', this)
      const eventHandlers = this.eventHandlers.call(this);

      this.addEventListener('focus', eventHandlers.focus);

      this.addEventListener('input', eventHandlers.input);
    }

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
      }
      const input = function (event) {
        updateMimickedElementInnerHTMLFromThis(event.target.value);
        updateWidth();
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

      const updateMimickedElementInnerHTMLFromThis = text => mimickedElementCloneInDOM.innerHTML = stringHelper.replaceSpaceWithNBSP(text);
      return {
        focus, input
      }
    }


}
customElements.define('board-title-input', TitleInput, {extends: "input"});