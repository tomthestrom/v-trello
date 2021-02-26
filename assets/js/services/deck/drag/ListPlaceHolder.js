import { illegalSetterUseMessage } from '../../../../../shared/error-messages';

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
    const placeHolder = document.createElement('div');
    placeHolder.style.height = this.listDimensions.height + 'px';
    placeHolder.style.minWidth = this.listDimensions.width + 'px';

    return placeHolder;
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
