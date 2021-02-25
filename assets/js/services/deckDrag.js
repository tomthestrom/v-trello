/**
 * takes care of the state of direction when dragging
 */
const deckDrag = (function () {
  const DIRECTION_RIGHT = "right";
  const DIRECTION_LEFT = "left";
  const illegalSetterUseMessage = (method) =>
    `Illegal use of ${method}, state needs to be reset before reassignment.`;
  let draggedList;
  let dragStartCoordinate;
  let currentDirection;

  return {
    setDraggedList(element) {
      if (draggedList !== undefined) {
        throw new Error(illegalSetterUseMessage("setDraggedList"));
      }

      draggedList = element;
    },

    setDragStartCoordinate(coordinate) {
      if (dragStartCoordinate !== undefined) {
        throw new Error(illegalSetterUseMessage("setDragStartCoordinate"));
      }

      dragStartCoordinate = coordinate;
    },
    //sets current direction by comparing the given coordinate with the dragStartCoordinate
    setCurrentDirection(coordinate) {
      if (dragStartCoordinate === undefined) {
        throw new Error(
          "Drag start coordinate is undefined. Set it before using setCurrentDirection."
        );
      }

      currentDirection =
        dragStartCoordinate > coordinate ? DIRECTION_LEFT : DIRECTION_RIGHT;
    },

    getDraggedList() {
      return draggedList;
    },

    getDragStartCoordinate () {
        return dragStartCoordinate;
    },

    getDraggedListBox() {
      return draggedList.getBoundingClientRect();
    },

    getDraggedListRightEdge() {
      return this.getDraggedListBox().right;
    },

    getDraggedListLeftEdge() {
      return this.getDraggedListBox().left;
    },

    getCurrentDirection() {
      return currentDirection;
    },

    resetState() {
      [draggedList, dragStartCoordinate, currentDirection] = [undefined];
    },

    isDragDirectionRight() {
      return this.getCurrentDirection() === DIRECTION_RIGHT;
    },
  };
})();

export { deckDrag as deckDragService };
