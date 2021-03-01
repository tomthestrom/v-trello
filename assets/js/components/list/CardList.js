import { listDragManager } from '../../services/deck/listDragManager';
export default class CardList extends HTMLElement {
  constructor () {
    super();
    this.dragActive = false;
    this.topLeft = this.getBoundingClientRect().x;
    console.log('cardlist');
  }

  set dragActive (isActive) {
    this.setAttribute('data-drag-active', Boolean(isActive));
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
      listDragManager.getListDragDirectionService().setStartCoord(e.clientX);

      this.style.transform = 'rotate(3deg)';

      const crt = this.cloneNode(true);
      crt.style.display = 'none'; /* or visibility: hidden, or any of the above */
      // document.body.appendChild(crt);
      e.dataTransfer.setDragImage(crt, 0, 0);

      this.dragActive = true;
    });

    this.addEventListener('dragend', function () {
      listDragManager.resetState();
      this.style.transform = 'none';
      this.dragActive = false;
    });
  }
}
