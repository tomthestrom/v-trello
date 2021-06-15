import { listDrag } from "../../services/deck/listDrag";
/**
 * Contains the lists and the add list button
 */
class ListDeck extends HTMLDivElement {
  constructor() {
    super();
  }

  dragOver(e) {
    e.preventDefault();
    if (listDrag.getList()) {
      listDrag.dragOverDeck(this, e.pageX, e.pageY);
    }
  }

  connectedCallback() {
    this.addEventListener("dragover", this.dragOver);
  }
}

export { ListDeck as ListDeckElement };
