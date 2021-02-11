export default class Title extends HTMLHeadingElement {
    constructor () {
      super();
      // this.boardService = boardService;
    }
    
    updateBoardTitle (newTitle) {
      console.log(newTitle)
    }
  

    connectedCallback() {
      const eventHandlers = this.eventHandlers.call(this);

      this.addEventListener('click', eventHandlers.click);
    }

    hide () {
      this.setAttribute("style", "position: absolute; color: transparent; z-index: -5;");
      this.hidden = true;
  
      return this;
    }

    eventHandlers () {
      const inputForTitle = document.getElementById('board-title-input');

      const click = function () {
          inputForTitle.focus()
      }  
      return { click }
    }
  }

customElements.define('board-title', Title, {extends: "h1"});