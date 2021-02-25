import { listDragDirection } from "./listDragDirection";
import { listDragPlaceHolder } from "./listDragPlaceHolder";
/**
 * takes care of the state of direction when dragging
 */
const listDragManager = (function () {
    const DIRECTION_RIGHT = "right";
    const DIRECTION_LEFT = "left";
    const illegalSetterUseMessage = (method) =>
    `Illegal use of ${method}, state needs to be reset before reassignment.`;
    let draggedList;
    let draggedListPlaceHolder;

  return {
    setDraggedList(element) {
      if (draggedList !== undefined) {
        throw new Error(illegalSetterUseMessage("setDraggedList"));
      }

      draggedList = element;
    },

    setDraggedListPlaceHolder () {
      if (draggedListPlaceHolder !== undefined) {
        throw new Error(illegalSetterUseMessage("setDraggedListPlaceHolder"));
      }
        const placeHolder = document.createElement("div");
        placeHolder.style.height = this.getDraggedListHeight() + 'px'; 
        placeHolder.style.minWidth = this.getDraggedListWidth() + 'px'; 

       draggedListPlaceHolder = placeHolder; 
    },

    setPlaceHolderInsertedBefore (element) {
        placeHolderInsertedBefore = element.id;
    },

    setPlaceHolderInsertedAfter (element) {
        placeHolderInsertedAfter = element.id;
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

    getDraggedListPlaceHolder () {
        return draggedListPlaceHolder;
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

    getDraggedListHeight() {
      return this.getDraggedListBox().height;
    },
    getDraggedListWidth() {
      return this.getDraggedListBox().width;
    },
    getCurrentDirection() {
      return currentDirection;
    },

    
    isDragDirectionRight() {
        return this.getCurrentDirection() === DIRECTION_RIGHT;
    },

    placeHolderNotInsertedBefore (element) {
        return element.id !== placeHolderInsertedBefore;
    },
    
    placeHolderNotInsertedAfter (element) {
        return element.id !== placeHolderInsertedAfter;
    },

    resetState() {
      [draggedList, draggedListPlaceHolder, dragStartCoordinate, currentDirection] = [undefined];
    }

  };
})();

export { listDragManager  };
