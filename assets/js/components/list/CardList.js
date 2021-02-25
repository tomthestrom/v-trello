export default class CardList extends HTMLElement {
    constructor () {
        super();
        this.setAttribute('drag-active', false);
    }
    connectedCallback() {
        this.addEventListener('dragstart', function (e) {
            console.log(e.clientX);
             this.setAttribute('drag-active', true);
        });

        this.addEventListener('dragend', function () {
            this.setAttribute('drag-active', false);
        })

    }
}


customElements.define('card-list', CardList );