/**
 * Dynamically handles Dropzone creation/deletions based on DragDirection
 */
class DropZoneManager {
    constructor (dropZone, surroundingEls, direction) {
        this._dropZone = dropZone;
        this._surrEls = [...surroundingEls];
        this._direction = direction;
    }

    get dropZone () {
      return this._dropZone;
    }
    
    get surrEls () {
      return this._surrEls;
    }

    get direction () {
      return this._direction;
    }

    insertDropZone (horizontalCoord) {
      const closestEl     = this.getClosestElementInDirection(this.surrEls, horizontalCoord, this.direction.isDirPositive());
      const shouldInsert  = this.shouldInsert(closestEl, this.direction.isDirPositive());

      if (shouldInsert) {
            this.insertInDirection(closestEl, this.direction.isDirPositive());
      }

    }

    shouldInsert (closestEl, dirPositive) {
      const elementInDirection = dirPositive ? this.dropZone.next : this.dropZone.prev;

      return closestEl !== undefined && elementInDirection !== closestEl.id;
    }

    insertInDirection (closestEl, dirPositive) {
      if (dirPositive) {
        closestEl.after(this.dropZone);
        this.after = closestEl;
      } else {
        closestEl.before(this.dropZone);
        this.beforeEl = closestEl;
      }
    }
    
    getClosestElementInDirection (surroundingElements, x, dirPositive = false) {

          return surroundingElements.reduce(
            (acc, element) => {
              const box = element.getBoundingClientRect();
              // depending on whether we are dragging left or right
              const boxEdge = dirPositive ? box.right : box.left;
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
                offset > acc.offset
              ) {
                return { offset: offset, element: element };
              } else {
                return acc;
              }
            },
            { dirPositive: dirPositive, offset: Number.NEGATIVE_INFINITY  }
          ).element;
    };
}

export { DropZoneManager };