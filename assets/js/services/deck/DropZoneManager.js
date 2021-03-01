class DropZoneManager {
    constructor (DropZoneFactory) {
        this._dropZone = new DropZoneFactory();
    }
    
    set beforeEl (element) {
        this._beforeEl = element;
    }
    
    set afterEl (element) {
        this._afterEl = element;
    }
    
    get beforeEl () {
        return this._beforeEl;
    }
    
    get afterEl () {
        return this._afterEl;
    }
    insertDropZone () {

    }

    deleteDropZone () {

    }
    
    getClosestToInsert (container, x, after = false) {
          const draggableEls = [...container];

          return draggableEls.reduce(
            (closest, list) => {
              const box = list.getBoundingClientRect();
              // depending on whether we are dragging left or right
              const boxEdge = after ? box.right : box.left;
              // check that x is behind half of the dragged list
              const offset = x - (boxEdge + box.width / 2);

              /**
                offset of current list element:
                 IS less than 0
                 IS bigger then negative box.width, so we are in the range between the halves of the next two list elements in the given direction
                in this case we are still inserting  to the closest element's place even though we might already be dragging through the first half
                of the next list element (just like the real trello)
                 IS closer to 0 than any other list element (previously assigned closest.offset)
            */

              if (
                offset < 0 &&
                offset > -box.width &&
                offset > closest.offset
              ) {
                return { offset: offset, element: list };
              } else {
                return closest;
              }
            },
            //after is a boolean, if true, we are looking for an element to insert after, if false, to insert before
            { after: after, offset: Number.NEGATIVE_INFINITY,  }
          ).element;
    };
}
