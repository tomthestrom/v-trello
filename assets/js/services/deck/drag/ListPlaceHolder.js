import { illegalSetterUseMessage } from '../../../../../shared/error-messages';
import DropZone from '../../../components/list/DropZone';
/**
 * takes care of the state of placeholder insertion when dragging over possible drop elements
 */
class ListPlaceHolder {
  constructor (ListDimensions) {
    this.listDimensions = ListDimensions;
    this._placeHolder = this.createPlaceHolder();
    this.insertedAfterEl;
    this.insertedBeforeEl;
  }

  // make sure this method does not get called a second time
  createPlaceHolder () {
    if (this._placeHolder !== undefined) {
      throw new Error(illegalSetterUseMessage('createPlaceHolder'));
    }
    const dropZone = new DropZone();
    dropZone.height = this.listDimensions.height;
    dropZone.minWidth = this.listDimensions.width;

    return dropZone;
  }

  get placeHolder () {
    return this._placeHolder;
  }

  set insertedBeforeEl (element) {
    this._insertedBeforeEl = element;
  }

  set insertedAfterEl (element) {
    this._insertedAfterEl = element;
  }

  get insertedBeforeEl () {
    return this._insertedBeforeEl;
  }

  get insertedAfterEl () {
    return this._insertedAfterEl;

  }
  /**
   * current X position and whether to insert after
   *  */ 
  getClosestToInsert (container, x, after = false) {
          const draggableEls = [...container];

          return draggableEls.reduce(
            (closest, list) => {
              const box = list.getBoundingClientRect();
              // depending on whether we are dragging left or right
              const boxEdge = after ? box.right : box.left;
              // check that x is behind half of the dragged list
              const offset = x - (boxEdge + box.width / 2);

              /**
             offset closer to 0 than any other el and bigger then negative box.width,
              so we are in the range between the halves of the next two list elements in the given direction
              in this case we are still inserting  to the closest element's place
            */

              if (
                offset < 0 &&
                offset > -box.width &&
                offset > closest.offset
              ) {
                return { offset: offset, element: list };
              } else {
                return closest;
              }
            },
            { after: after, offset: Number.NEGATIVE_INFINITY,  }
          ).element;
    };
}

export { ListPlaceHolder };
