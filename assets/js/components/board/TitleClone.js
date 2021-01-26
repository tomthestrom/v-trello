export default class TitleClone extends HTMLHeadingElement {
    constructor () {
      super();
      this.hide();
    }
  
  
    hide () {
      this.setAttribute("style", "position: absolute; color: transparent; z-index: -5;");
      this.hidden = true;
  
      return this;
    }
  }