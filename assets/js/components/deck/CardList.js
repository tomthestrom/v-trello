import { DropZoneFactory } from '../../factories/DropZone';
import { listDragStateHandler } from '../../services/deck/listDragStateHandler';
import { emptyDragImage } from '../../utils/drag';
import { numberWithPx } from "../../utils/string";

class CardList extends HTMLElement {
  constructor () {
    super();
    this.dragActive = false;
  }

  set dragActive (isActive) {
    this.dataset.dragActive = Boolean(isActive);
  }

  set dropZone (dropZone) {
    this._dropZone = dropZone;
  }

  get dropZone () {
    return this._dropZone;
  }

  static get dragNotActiveSelector () {
      return "[data-drag-active=false]"
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

  get top () {
    return this.getBoundingClientRect().top;
  }

  applyDragStyling () {
    this.style.left = this.left + "px";
    this.style.top = this.top + "px";
    this.style.position = 'absolute';
    this.style.zIndex = "1000";
    this.style.transform = 'rotate(3deg)';
  }

  removeDragStyling () {
    this.style.left = '';
    this.style.top = '';
    this.style.position = '';
    this.style.zIndex = '';
    this.style.transform = '';
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
      console.log(e.clientX)
      console.log(e.pageX)
      listDragStateHandler.init(this, e.pageX, e.pageY, this.dropZone);
      e.dataTransfer.setDragImage(emptyDragImage, 0, 0);
  }

  dragEnd () {
      listDragStateHandler.resetState();
      this.dragActive = false;
      this.removeDragStyling();
      this.parentNode.replaceChild(this, this.dropZone);
      this.dropZone = undefined;
  }

  move (left, top) {
    this.style.left     =  numberWithPx(left);
    this.style.top     =  numberWithPx(top);
  }

  connectedCallback () {
    this.addEventListener('dragstart', this.dragStart);
    this.addEventListener('dragend', this.dragEnd);
  }
}

export { CardList as CardListElement }