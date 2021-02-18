export default class AddList extends HTMLElement {
    constructor () {
        super();
        this.input = this.querySelector('#add-list-input')
        this.addButton = this.querySelector('#add-list-btn-add')
        this.closeButton = this.querySelector('#add-list-btn-close')
    }

    connectedCallback() {
        console.log(this)
        console.log(this)
    }

}
customElements.define('add-list', AddList);