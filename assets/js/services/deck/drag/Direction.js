/**
 * Determine drag direction
 */
class Direction {
  constructor (startCoord, direction) {
    this.direction = Direction.DIRECTION_SETTINGS[direction];

    this.startCoord = startCoord;
    this.lastCoord  = startCoord;
    this.DIR_POSITIVE = this.direction.dirPositive;
    this.DIR_NEGATIVE = this.direction.dirNegative;
  }

  static get DIRECTION_SETTINGS () {
    return {
      "vertical": {
        "dirPositive": "down",
        "dirNegative": "up",
      },

      "horizontal": {
        "dirPositive": "right",
        "dirNegative": "left",
      }
    }
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
        coordinate > this.lastCoord ?  this.DIR_POSITIVE : this.DIR_NEGATIVE;
        this.lastCoord = coordinate;
    }

    return this;
  }



  isDirPositive () {
    return this.curDir === this.DIR_POSITIVE;
  }

  isDirPositiveFromStart () {
    return this.lastCoord > this.startCoord; 
  }

  distTravelled (currentXPosition) {
    return Math.abs(this.startCoord - currentXPosition);
  }
}

export { Direction as DragDirection };
