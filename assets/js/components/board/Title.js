export default class Title extends HTMLHeadingElement {
    constructor () {
      super();
      // this.boardService = boardService;
    }
    
    updateBoardTitle (newTitle) {
      console.log(newTitle)
    }
  

    connectedCallback() {
      console.log('Title connected.');
    }

    hide () {
      this.setAttribute("style", "position: absolute; color: transparent; z-index: -5;");
      this.hidden = true;
  
      return this;
    }
  }

customElements.define('board-title', Title, {extends: "h1"});