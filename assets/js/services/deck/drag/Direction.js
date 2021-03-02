/**
 * Determine drag direction
 */
class Direction {
  constructor (startHorCoord) {
    this.startHorCoord = startHorCoord;
    this.lastHorCoord  = startHorCoord;
    this.DIR_RIGHT = 'right';
    this.DIR_LEFT = 'left';
    this.DIR_UP = 'up';
    this.DIR_DOWN = 'down';
  }

  set startHorCoord (horCoordinate) {
    this._startHorCoord = horCoordinate;
  }

  set curHorDir (currentHorizontalDirection) {
    this._curHorDir = currentHorizontalDirection;
  }

  set lastHorCoord (horCoordinate) {
    this._lastHorCoord = horCoordinate;
  }

  get startHorCoord () {
    return this._startHorCoord;
  }

  get curHorDir () {
    return this._curHorDir;
  }

  get lastHorCoord () {
    return this._lastHorCoord;
  }

  setCurHorDir (horCoordinate) {
    if (horCoordinate !== this.lastHorCoord) {
      this.curHorDir =
        horCoordinate > this.lastHorCoord ?  this.DIR_RIGHT : this.DIR_LEFT;
        this.lastHorCoord = horCoordinate;
    }

    return this;
  }



  isDirRight () {
    return this.curHorDir === this.DIR_RIGHT;
  }

  isDirRightFromStart () {
    return this.lastHorCoord > this.startHorCoord; 
  }

  horDistTravelled (currentXPosition) {
    return Math.abs(this.startHorCoord - currentXPosition);
  }
}

export { Direction as DragDirection };
