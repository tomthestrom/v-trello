import { DropZoneElement }  from '../components/list/DropZone';
/**
 * creates a dropzone element, ElementDimensions is provided as a blueprint
 */
class DropZone {
  constructor (element) {
    this.bluePrint = element;
  }

  createDropZone () {
    return new DropZoneElement(this.bluePrint.height, this.bluePrint.width);
  }
}

export { DropZone as DropZoneFactory };
