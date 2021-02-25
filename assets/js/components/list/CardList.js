import { listDragDirection } from "../../services/deck/listDragDirection";
import { listPlaceHolder } from "../../services/deck/listDragPlaceHolder";

export default class CardList extends HTMLElement {
    constructor () {
        super();
        this.setAttribute('drag-active', false);
    }
    connectedCallback() {
        this.addEventListener('dragstart', function (e) {
            listDragDirection.setDragStartCoordinate(e.clientX);
            listDragDirection.setDraggedList(this);
            listDragDirection.setDraggedListPlaceHolder();

            this.setAttribute('drag-active', true);
        });

        this.addEventListener('dragend', function () {
            listDragDirection.resetState();
            this.setAttribute('drag-active', false);
        })

    }
}


customElements.define('card-list', CardList );