/**
 * takes care of the state of direction when dragging
 */
class ListDragDirection {
  constructor (list) {
    this.list = list;
    this.DIRECTION_RIGHT = 'right';
    this.DIRECTION_LEFT = 'left';
  }

  setDragStartCoordinate (coordinate) {
    if (this.dragStartCoordinate !== undefined) {
      throw new Error(illegalSetterUseMessage('setDragStartCoordinate'));
    }

    this.dragStartCoordinate = coordinate;
  }

  setCurrentDirection (coordinate) {
    if (this.dragStartCoordinate === undefined) {
      throw new Error(
        'Drag start coordinate is undefined. Set it before using setCurrentDirection.'
      );
    }

    this.currentDirection =
      this.dragStartCoordinate > coordinate ? this.DIRECTION_LEFT : this.DIRECTION_RIGHT;
  }

  getDragStartCoordinate () {
    return this.dragStartCoordinate;
  }

  getCurrentDirection () {
    return this.currentDirection;
  }

  isDragDirectionRight () {
    return this.getCurrentDirection() === this.DIRECTION_RIGHT;
  }
}

export { ListDragDirection };
