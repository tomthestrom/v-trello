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

  get dropZoneBgColor() {
    return getComputedStyle(document.documentElement).getPropertyValue(
      "--color-card-dropzone"
    );
  }
}

export { SingleCard as SingleCardElement };
