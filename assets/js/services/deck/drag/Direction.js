/**
 * Determine drag direction
 */
class Direction {
  constructor (startCoord) {
    this._startCoord = startCoord;
    this.DIR_RIGHT = 'right';
    this.DIR_LEFT = 'left';
  }

  get startCoord () {
    return this._startCoord;
  }

  get curDir () {
    return this._curDir;
  }

  setCurDir (coordinate) {
    this._curDir =
      this.startCoord > coordinate ? this.DIR_LEFT : this.DIR_RIGHT;
    return this;
  }



  isDirRight () {
    return this.curDir === this.DIR_RIGHT;
  }

  distTravelled (currentXPosition) {
    return Math.abs(this.startCoord - currentXPosition);
  }
}

export { Direction as DragDirection };
