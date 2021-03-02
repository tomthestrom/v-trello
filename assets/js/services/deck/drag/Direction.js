/**
 * Determine drag direction
 */
class Direction {
  constructor (startCoord) {
    this.startCoord = startCoord;
    this.lastCoord  = startCoord;
    this.DIR_RIGHT = 'right';
    this.DIR_LEFT = 'left';
  }

  set startCoord (coordinate) {
    this._startCoord = coordinate;
  }

  set curDir (currentDirection) {
    this._curDir = currentDirection;
  }

  set lastCoord (coordinate) {
    this._lastCoord = coordinate;
  }

  get startCoord () {
    return this._startCoord;
  }

  get curDir () {
    return this._curDir;
  }

  get lastCoord () {
    return this._lastCoord;
  }

  setCurDir (coordinate) {
    if (coordinate !== this.lastCoord) {
      this.curDir =
        coordinate > this.lastCoord ?  this.DIR_RIGHT : this.DIR_LEFT;
        this.lastCoord = coordinate;
    }

    return this;
  }



  isDirRight () {
    return this.curDir === this.DIR_RIGHT;
  }

  isDirRightFromStart () {
    return this.lastCoord > this.startCoord; 
  }

  distTravelled (currentXPosition) {
    return Math.abs(this.startCoord - currentXPosition);
  }
}

export { Direction as DragDirection };
