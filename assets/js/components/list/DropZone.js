import { numberWithPx }from "../../utils/string";

class DropZone extends HTMLDivElement {
  constructor (height, minWidth) {
    super();
    // @TODO find a dynamic way in case a theme change happens or is used as a dropzone for another el. 
    this.style.backgroundColor = '#026aa7';
    this.height = height;
    this.minWidth = minWidth;
  }

  set height (height) {
    this.style.height = numberWithPx(height);
  }

  set minWidth (width) {
    this.style.minWidth = numberWithPx(width);
  }

  set next (next) {
    this.dataset.next = next;
  }

  set prev (prev) {
    this.dataset.prev = prev;
  }

  connectedCallback () {
    this.addEventListener('drop', function (e) {
      console.log('boha');
    });
  }
}

export { DropZone as DropZoneElement };