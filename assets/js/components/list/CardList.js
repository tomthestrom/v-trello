import { DropZoneFactory } from '../../factories/DropZone';
import { listDragStateHandler } from '../../services/deck/listDragStateHandler';
export default class CardList extends HTMLElement {
  constructor () {
    super();
    this.dragActive = false;
    this.topLeft = this.getBoundingClientRect().x;
  }

  set dragActive (isActive) {
    this.setAttribute('data-drag-active', Boolean(isActive));
  }

  set topLeft (x) {
    this._topLeft = x;
  }
  
  set next (next) {
    this.dataset.next = next;
  }

  set prev (prev) {
    this.dataset.prev = prev;
  }

  set dropZone (dropZone) {
    this._dropZone = dropZone;
  }

  get dropZone () {
    return this._dropZone;
  }

  static get dragActiveFalseSelector () {
      return "[data-drag-active=false]"
  }

  get topLeft () {
    return this._topLeft;
  }


  get next () {
    return this.dataset.next;
  }

  get prev () {
    return this.dataset.prev;
  }
  
  get height () {
    return this.getBoundingClientRect().height;
  }

  get width () {
    return this.getBoundingClientRect().width;
  }

  get right () {
    return this.getBoundingClientRect().right;
  }

  get left () {
    return this.getBoundingClientRect().left;
  }

  //this is stupid, wtf is topLeft?
  resetTopLeft () {
    this._topLeft = this.getBoundingClientRect().x;
  }

  connectedCallback () {
    this.addEventListener('dragstart', function (e) {
      this.dragActive = true;
      this.dropZone = (new DropZoneFactory(this)).createDropZone();

      listDragStateHandler.init(this, e.clientX, this.dropZone);
      this.style.left = this.left + "px";
      this.style.position = 'absolute';
      this.style.transform = 'rotate(3deg)';

      this.parentNode.insertBefore(this.dropZone, this)
      const crt = this.cloneNode(true);
      crt.style.display = 'none'; /* or visibility: hidden, or any of the above */
      // document.body.appendChild(crt);
      e.dataTransfer.setDragImage(crt, 0, 0);

    });

    this.addEventListener('dragend', function () {
      listDragStateHandler.resetState();
      this.style.transform = 'none';
      this.dragActive = false;
    });
  }
}
