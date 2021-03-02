import DragDirection from "./drag/Direction";
/**
 * Dynamically handles Dropzone creation/deletions based on DragDirection
 */
class DropZoneManager {
    constructor (dropZone, dragDirection, surroundingEls) {
        this._dropZone = dropZone;
        this._dragDirection = dragDirection;
        this._surrEls = [...surroundingEls];
    }

    get dropZone () {
      return this._dropZone;
    }
    
    get surrEls () {
      return this._surrEls;
    }
    insertDropZone (x, dirRight) {
      const closestEl = this.getClosestElementInDirection(this.surrEls, x, dirRight);
      const shouldInsert = this.shouldInsert(closestEl, dirRight);

      if (shouldInsert) {
            this.insertInDirection(closestEl, dirRight);
      }

    }

    shouldInsert (closestEl, dirRight) {
      const elementInDirection = dirRight ? this.dropZone.next : this.dropZone.prev;

      return closestEl !== undefined && elementInDirection !== closestEl.id;
    }

    insertInDirection (closestEl, dirRight) {
      if (dirRight) {
        closestEl.after(this.dropZone);
        this.after = closestEl;
      } else {
        closestEl.before(this.dropZone);
        this.beforeEl = closestEl;
      }
    }

    deleteDropZone () {

    }
    
    getClosestElementInDirection (surroundingElements, x, dirRight = false) {

          return surroundingElements.reduce(
            (closest, element) => {
              const box = element.getBoundingClientRect();
              // depending on whether we are dragging left or right
              const boxEdge = dirRight ? box.right : box.left;
              // check that x is behind half of the dragged list
              const offset = x - (boxEdge + box.width / 2);

                /**
                offset of the current list element:
                 IS less than 0
                 IS bigger then negative box.width, so we are in the range between the halves of the next two list elements in the given direction
                in this case we are still inserting  to the closest element's place even though we might already be dragging through the first half
                of the next list element (just like the real trello)
                 IS closer to 0 than any other list element (previously assigned acc.offset)
                */

              if (
                offset < 0 &&
                offset > -box.width &&
                offset > closest.offset
              ) {
                return { offset: offset, element: element };
              } else {
                return closest;
              }
            },
            { dirRight: dirRight, offset: Number.NEGATIVE_INFINITY  }
          ).element;
    };
}

export { DropZoneManager };