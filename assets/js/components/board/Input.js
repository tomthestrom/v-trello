export default class TitleInput extends HTMLInputElement {
    constructor() {
      super();
      this.addEventListener('input', e => {
        console.log(e);
      })
    }
  }