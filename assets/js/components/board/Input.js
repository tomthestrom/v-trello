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
      const eventHandlers = this.eventHandlers(this);

      this.addEventListener('focus', eventHandlers.focus);

      this.addEventListener('input', eventHandlers.input);
    }

    eventHandlers(self) {
      let mimickedElementCloneInDOM  = undefined;
      const mimickedElementSelector  = this.getAttribute('mimicks-element');


      const focus = function () {
        const mimickedElement = document.getElementById(mimickedElementSelector);
        const mimickedElementClone = self.prepareMimickedElementClone(mimickedElement);

        self.insertAdjacentElement('afterend', mimickedElementClone);
        mimickedElementCloneInDOM = self.nextElementSibling;
        self.value = mimickedElement.innerText()
        updateWidth();
      }
      //grow element on input
      const input = function (event) {
        mimickedElementCloneInDOM.innerHTML = stringHelper.replaceSpaceWithNBSP(event.target.value);
        updateWidth();
      }

      const updateWidth = function () {
        self.style.width = mimickedElementCloneInDOM.getBoundingClientRect().width + 'px';
      }

      return {
        focus, input
      }
    }

    prepareMimickedElementClone (mimickedElement) {
      const mimickedElementClone = mimickedElement.cloneNode(true);
      mimickedElementClone.id   += '-clone';
      mimickedElementClone.setAttribute("style", "position: absolute; color: transparent; z-index: -5;");

      return mimickedElementClone;
    }

}
customElements.define('board-title-input', TitleInput, {extends: "input"});