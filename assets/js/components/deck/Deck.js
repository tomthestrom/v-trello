import { listDragStateHandler } from "../../services/deck/listDragStateHandler";

export default class Deck extends HTMLDivElement {
  constructor() {
    super();
  }

  dragOver (e) {
    e.preventDefault();
    listDragStateHandler.drag(e.pageX, e.pageY);
  }
 
  connectedCallback() {
    this.addEventListener("dragover", this.dragOver);
  }
}
