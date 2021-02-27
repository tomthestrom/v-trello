import { listDragManager } from '../../services/deck/listDragManager';
export default class CardList extends HTMLElement {
  constructor () {
    super();
    this.dragActive = false;
    this.topLeft = this.getBoundingClientRect().x;
  }

  set dragActive (isActive) {
      this.setAttribute('drag-active', Boolean(isActive))
  }

  set topLeft (x) {
    this._topLeft = x;
  }

  get topLeft () {
    return this._topLeft;
  }

  resetTopLeft () {
    this._topLeft = this.getBoundingClientRect().x;
  }

  connectedCallback () {
    this.addEventListener('dragstart', function (e) {
      listDragManager.init(this);
      listDragManager.getListDragDirectionService().setDragStartCoordinate(e.clientX);
        
      this.dragActive = true;
    });


    this.addEventListener('dragend', function () {
      listDragManager.resetState();
      this.dragActive = false;
    });
  }
}

customElements.define('card-list', CardList);
