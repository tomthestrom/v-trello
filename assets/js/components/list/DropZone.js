class DropZone extends HTMLDivElement {
  constructor () {
    super();
    // @TODO find a dynamic way in case a theme change happens
    this.style.backgroundColor = '#026aa7';
  }

  set height (height) {
    this.style.height = this.valueInPixels(height);
  }

  set minWidth (width) {
    this.style.minWidth = this.valueInPixels(width);
  }

  // maybe could rather be in some helper class
  valueInPixels (value) {
    return value + 'px';
  }

  connectedCallback () {
    this.addEventListener('drop', function (e) {
      console.log('boha');
    });
  }
}

export { DropZone as DropZoneElement };