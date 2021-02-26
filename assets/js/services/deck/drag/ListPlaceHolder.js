import { illegalSetterUseMessage } from '../../../../../shared/error-messages';
import DropZone from "../../../components/list/DropZone"
/**
 * takes care of the state of placeholder insertion when dragging over possible drop elements
 */
class ListPlaceHolder {
  constructor (ListDimensions) {
    this.listDimensions = ListDimensions;
    this._placeHolder = this.createPlaceHolder();
    this.insertedAfterElement;
    this.insertedBeforeElement;
  }

  // make sure this method does not get called a second time
  createPlaceHolder () {
    if (this._placeHolder !== undefined) {
      throw new Error(illegalSetterUseMessage('createPlaceHolder'));
    }
    const dropZone = new DropZone();
    dropZone.height = this.listDimensions.height;
    dropZone.width = this.listDimensions.width;

    return dropZone;
  }

  get placeHolder () {
    return this._placeHolder;
  }

  set insertedBeforeElement (element) {
    this._insertedBeforeElement = element;
  }

  set insertedAfterElement (element) {
    this._insertedAfterElement = element;
  }

  get insertedBeforeElement () {
    return this._insertedBeforeElement;
  }

  get insertedAfterElement () {
    return this._insertedAfterElement;
  }
}

export { ListPlaceHolder };
