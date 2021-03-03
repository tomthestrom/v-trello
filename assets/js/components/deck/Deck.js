import { listDragStateHandler } from "../../services/deck/listDragStateHandler";

export default class Deck extends HTMLDivElement {
  constructor() {
    super();
  }

  dragOver (e) {
    e.preventDefault();
    listDragStateHandler.drag(e.clientX, e.clientY);
  }
 
  connectedCallback() {
    this.addEventListener("dragover", this.dragOver);
  }
}
