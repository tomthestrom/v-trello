import { DropZoneFactory } from '../../factories/DropZone';
import { listDragStateHandler } from '../../services/deck/listDragStateHandler';
export default class CardList extends HTMLElement {
  constructor () {
    super();
    console.log('constructed')
    this.dragActive = false;

  }

  set dragActive (isActive) {
    this.dataset.dragActive = Boolean(isActive);
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

  applyDragStyling () {
    this.style.left = this.left + "px";
    this.style.position = 'absolute';
    this.style.transform = 'rotate(3deg)';
  }

  removeDragStyling () {
    this.style.left = 0;
    this.style.position = "relative";
    this.style.transform = 'none';
  }

  createDropZone() {
   return new DropZoneFactory(this).createDropZone();
  }

  insertDropZoneBeforeThis () {
    this.parentNode.insertBefore(this.dropZone, this);
  }

  dragStart (e) {
      this.dragActive = true;
      this.dropZone = this.createDropZone();
      this.applyDragStyling();
      this.insertDropZoneBeforeThis();
  
      listDragStateHandler.init(this, e.clientX, this.dropZone);
  
      // const crt = this.cloneNode(true);
      // crt.style.display = 'none'; /* or visibility: hidden, or any of the above */
      // // document.body.appendChild(crt);
      // e.dataTransfer.setDragImage(crt, 0, 0);
  
  }

  dragEnd () {
      listDragStateHandler.resetState();
      this.dragActive = false;
      this.removeDragStyling();
      this.parentNode.replaceChild(this, this.dropZone);
      this.dropZone = undefined;
  }

  connectedCallback () {
    this.addEventListener('dragstart', this.dragStart);
    this.addEventListener('dragend', this.dragEnd);
  }
}