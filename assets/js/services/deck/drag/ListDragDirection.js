/**
 * takes care of the state of direction when dragging
 */
class ListDragDirection {
  constructor (list) {
    this.list = list;
    this.DIR_RIGHT = 'right';
    this.DIR_LEFT = 'left';
  }

  setStartCoord (coordinate) {
    if (this.startCoord !== undefined) {
      throw new Error(illegalSetterUseMessage('setStartCoord'));
    }

    this.startCoord = coordinate;
  }

  setCurDir (coordinate) {
    if (this.startCoord === undefined) {
      throw new Error(
        'Drag start coordinate is undefined. Set it before using setCurDir.'
      );
    }

    this.currentDirection =
      this.startCoord > coordinate ? this.DIR_LEFT : this.DIR_RIGHT;
  }

  getStartCoord () {
    return this.startCoord;
  }

  getCurDir () {
    return this.currentDirection;
  }

  isDirRight () {
    return this.getCurDir() === this.DIR_RIGHT;
  }

  distTravelled (currentXPosition) {
    return Math.abs(this.getStartCoord() - currentXPosition);
  }
}

export { ListDragDirection };
