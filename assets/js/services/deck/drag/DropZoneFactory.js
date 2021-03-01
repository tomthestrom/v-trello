import DropZone from '../../../components/list/DropZone';
/**
 * creates a dropzone element, ElementDimensions is provided as a blueprint
 */
class DropZoneFactory {
  constructor (ElementDimensions) {
    this.elDimensions = ElementDimensions;
  }

  // make sure this method does not get called a second time
  createDropZone () {
    const dropZone = new DropZone();
    dropZone.height = this.elDimensions.height;
    dropZone.minWidth = this.elDimensions.width;

    return dropZone;
  }
}

export { DropZoneFactory };
