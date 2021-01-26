export default class BoardTitleInput extends HTMLInputElement {
    constructor() {
      super();
      this.addEventListener('input', e => {
        console.log(e);
      })
    }
  }