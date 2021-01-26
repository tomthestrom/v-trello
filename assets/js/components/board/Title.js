export default class Title extends HTMLHeadingElement {
    constructor () {
      super();
    }
  
    updateBoardTitle (title) {
      this.innerText = title;
    }
    connectedCallback() {
      console.log('Title connected.');
    }
  }