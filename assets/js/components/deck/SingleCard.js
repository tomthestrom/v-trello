import { DropZoneFactory } from "../../factories/DropZone";
import { cardDrag } from "../../services/deck/cardDrag";
import { emptyDragImage } from "../../utils/drag";
import { numberWithPx } from "../../utils/string";

class SingleCard extends HTMLLIElement {
  constructor() {
    super();
    this.dragActive = false;
  }

  set dragActive(isActive) {
    this.dataset.dragActive = Boolean(isActive);
  }

  set dropZone(dropZone) {
    this._dropZone = dropZone;
  }

  static get dragNotActiveSelector() {
    return "[data-draggable-card][data-drag-active=false]";
  }


  get dropZone() {
    return this._dropZone;
  }

  get dropZoneBgColor() {
    return getComputedStyle(document.documentElement).getPropertyValue(
      "--color-card-dropzone"
    );
  }

  get height() {
    return this.getBoundingClientRect().height;
  }

  get width() {
    return this.getBoundingClientRect().width;
  }

  get right() {
    return this.getBoundingClientRect().right;
  }

  get left() {
    return this.getBoundingClientRect().left;
  }

  get top() {
    return this.getBoundingClientRect().top;
  }

  
  applyDragStyling() {
    this.style.left = numberWithPx(this.left);
    this.style.top = numberWithPx(this.top);
    this.style.position = "fixed";
    this.style.zIndex = "1000";
    this.style.transform = "rotate(3deg)";
  }

  removeDragStyling() {
    this.style.left = "";
    this.style.top = "";
    this.style.position = "";
    this.style.zIndex = "";
    this.style.transform = "";
  }

  createDropZone() {
    return new DropZoneFactory(this).createDropZone();
  }

  insertDropZoneBeforeThis() {
    this.parentNode.insertBefore(this.dropZone, this);
  }

  dragStart(e) {
    this.dragActive = true;
    this.dropZone = this.createDropZone();
    this.applyDragStyling();
    this.insertDropZoneBeforeThis();
    cardDrag.init(this, e.pageX, e.pageY, this.dropZone);
    e.dataTransfer.setData('Text', this);
    e.dataTransfer.setDragImage(emptyDragImage, 0, 0);
  }

  dragEnd() {
    console.log('dragend')
    cardDrag.resetState();
    this.dragActive = false;
    this.removeDragStyling();
    this.parentNode.replaceChild(this, this.dropZone);
    this.dropZone = undefined;
  }

  move(left, top) {
    return function moveList() {
      this.style.left = numberWithPx(left);
      this.style.top = numberWithPx(top);
      requestAnimationFrame(() => moveList);
    }.bind(this);
  }

  connectedCallback() {
    this.addEventListener("dragstart", this.dragStart);
    this.addEventListener("dragend", this.dragEnd);
  }
}

export { SingleCard as SingleCardElement };
