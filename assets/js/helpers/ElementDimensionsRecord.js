/**
 * Stores elements' properties at the moment of creation
 */
class ElementDimensionsRecord {
  constructor (element) {
    this.element = element;
    this.box = element.getBoundingClientRect();
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

export { ElementDimensionsRecord };
