/**
 * takes care of the state of placeholder insertion when dragging over possible drop elements
 */
const listDragPlaceHolder = (function () {
    const illegalSetterUseMessage = (method) =>
    `Illegal use of ${method}, state needs to be reset before reassignment.`;
    let draggedList;
    let draggedListPlaceHolder;
    let placeHolderInsertedBefore;
    let placeHolderInsertedAfter;

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

    getDraggedList() {
      return draggedList;
    },

    getDraggedListPlaceHolder () {
        return draggedListPlaceHolder;
    },

    getDraggedListBox() {
      return draggedList.getBoundingClientRect();
    },

    getDraggedListHeight() {
      return this.getDraggedListBox().height;
    },

    getDraggedListWidth() {
      return this.getDraggedListBox().width;
    },

    placeHolderNotInsertedBefore (element) {
        return element.id !== placeHolderInsertedBefore;
    },
    
    placeHolderNotInsertedAfter (element) {
        return element.id !== placeHolderInsertedAfter;
    },

    resetState() {
      [draggedList, draggedListPlaceHolder ] = [undefined];
    }

  };
})();

export { listDragPlaceHolder };
