import throttle from "lodash/throttle";
import { listDragStateHandler } from "../../services/deck/listDragStateHandler";

/**
 * Encapsulates logic to drag&drop the cards on the deck
 */
export default class Deck extends HTMLDivElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.addEventListener("dragover", function (e) {
      e.preventDefault();
      listDragStateHandler.drag(e.clientX);
    });
  }
}
