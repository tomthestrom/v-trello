import { deckDragService } from "../../services/deckDrag";

export default class CardList extends HTMLElement {
    constructor () {
        super();
        this.setAttribute('drag-active', false);
    }
    connectedCallback() {
        this.addEventListener('dragstart', function (e) {
            deckDragService.setDraggedList(this);
            deckDragService.setDragStartCoordinate(e.clientX);

            this.setAttribute('drag-active', true);
        });

        this.addEventListener('dragend', function () {
            deckDragService.resetState();
            this.setAttribute('drag-active', false);
        })

    }
}


customElements.define('card-list', CardList );