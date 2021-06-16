import { listDrag } from "../../services/deck/listDrag";
import { cardDrag } from "../../services/deck/cardDrag";
/**
 * Contains the lists and the add list button
 */
class ListDeck extends HTMLDivElement {
  constructor() {
    super();
  }

  dragOver(e) {
    console.log('dragover')
    console.log(cardDrag.getCard())
    e.preventDefault();
    if (listDrag.getList()) {
      listDrag.dragOverDeck(this, e.pageX, e.pageY);
    } else if(cardDrag.getCard()) {
      cardDrag.dragOverDeck(this, e.pageX, e.pageY);
    }
  }

  connectedCallback() {
    this.addEventListener("dragover", this.dragOver);
  }
}

export { ListDeck as ListDeckElement };
