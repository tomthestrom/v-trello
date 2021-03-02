class ElementDimensions {
  constructor (list) {
    this.list = list;
    this.box = list.getBoundingClientRect();
  }

  get height () {
    return this.box.height;
  }

  get width () {
    return this.box.width;
  }

  get right () {
    return this.box.right;
  }

  get left () {
    return this.box.left;
  }

  get top () {
    return this.box.top;
  }
}

export { ElementDimensions };
