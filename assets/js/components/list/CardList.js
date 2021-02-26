import { listDragManager } from '../../services/deck/listDragManager';
export default class CardList extends HTMLElement {
  constructor () {
    super();
    this.setAttribute('drag-active', false);
  }

  connectedCallback () {
    this.addEventListener('dragstart', function (e) {
      listDragManager.init(this);
      listDragManager.getListDragDirectionService().setDragStartCoordinate(e.clientX);
        
      this.style.display = "none";
      this.setAttribute('drag-active', true);
    });

    this.addEventListener('dragend', function () {
      listDragManager.resetState();
      this.style.display = "block";
      this.setAttribute('drag-active', false);
    });
  }
}

customElements.define('card-list', CardList);
