/**
 * takes care of the state of direction when dragging
 */
const deckDrag = (function () {
    const DIRECTION_RIGHT = 'right';
    const DIRECTION_LEFT = 'left';
    
    let dragStartCoordinate;
    let currentDirection;

    return {
        setDragStartCoordinate(coordinate) {
            console.log(coordinate)
            dragStartCoordinate = coordinate;
        },
        //sets current direction by comparing the given coordinate with the dragStartCoordinate
       setCurrentDirection (coordinate) {
           if (dragStartCoordinate === undefined) {
               throw new Error('Drag start coordinate is undefined. Set it before using setCurrentDirection.');
           }

        currentDirection = dragStartCoordinate > coordinate ? DIRECTION_LEFT : DIRECTION_RIGHT; 
       },

       getCurrentDirection () {
        return currentDirection;
       },

       resetState () {
           [ dragStartCoordinate, currentDirection ] = [ undefined ];
       },

       isDragDirectionRight () {
           return this.getCurrentDirection === DIRECTION_RIGHT;
       }
    };
  })();

  export { deckDrag as deckDragService };