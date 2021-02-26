class ListDimensions {
  constructor (list) {
    this.list = list;
    this.listBox = list.getBoundingClientRect();
  }

  get height () {
    return this.listBox.height;
  }

  get width () {
    return this.listBox.width;
  }

  get rightEdge () {
    return this.listBox.right;
  }

  get leftEdge () {
    return this.listBox.left;
  }
}

export { ListDimensions };
