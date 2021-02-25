import throttle from 'lodash/throttle';
import { listDragDirection } from "../../services/deck/listDragDirection";
import { listDragPlaceHolder } from "../../services/deck/listDragPlaceHolder";
/**
 * Encapsulates logic to drag&drop the cards on the deck
 */
export default class Deck extends HTMLElement {
    
    constructor () {
        super();
        this.setLists();
    }
    
    get DRAGGABLE_LIST_SELECTOR () {
        return '[data-draggable-list]'
    }
    setLists () {
        this.lists = this.querySelectorAll(this.DRAGGABLE_LIST_SELECTOR);
    }

    connectedCallback () {

        const getClosestToInsertBefore = function (container, x) {
            const draggableElements = [...container];
            
            return draggableElements.reduce((closest, child) => {
                const box = child.getBoundingClientRect();
                //as soon as x enters the box
                const offset = x - (box.left + box.width / 2);
;
                //offset closer to 0 than any other el
                if (offset < 0 && offset > -260 && offset > closest.offset ) {
                    return { offset: offset, element: child }
                } else {
                    return closest;
                }
                
            }, { offset: Number.NEGATIVE_INFINITY})
        }

        const getClosestToInsertAfter = function (container, x) {
            const draggableElements = [...container];
            
            return draggableElements.reduce((closest, child) => {
                const box = child.getBoundingClientRect();
                //as soon as x enters the box
                const offset = x - (box.right + box.width / 2);
                //offset closer to 0 than any other el
                if (offset < 0 && offset > -260 && offset > closest.offset ) {
                    return { offset: offset, element: child }
                } else {
                    return closest;
                }
                
            }, { offset: Number.NEGATIVE_INFINITY})
        }
        const throttled = throttle(function (e) {
            e.preventDefault();
            const currentXPosition = e.clientX;
            
            const container = this.querySelectorAll('[drag-active=false]');
            const draggable = listDragDirection.getDraggedList();
            //gets inserted on possible drop position
            const placeHolder = listDragPlaceHolder.getDraggedListPlaceHolder();
            //helps when calculating the edges of the dragged list, we wanna move the lists once the right/left edge crosses over the half of the neighboring list (as in orig trello) 
            const draggableDistanceTravelled = Math.abs(listDragDirection.getDragStartCoordinate() - currentXPosition);

            listDragDirection.setCurrentDirection(currentXPosition);
            if (listDragDirection.isDragDirectionRight()) {
                const draggableRightEdge = listDragDirection.getDraggedListRightEdge() + draggableDistanceTravelled;
                const afterElement = getClosestToInsertAfter(container, draggableRightEdge).element; 

                if (afterElement !== undefined && listDragPlaceHolder.placeHolderNotInsertedAfter(afterElement)) {
                    afterElement.after(placeHolder);
                    listDragPlaceHolder.setPlaceHolderInsertedAfter(afterElement)
                }
                
            } else {
                const draggableLeftEdge = listDragDirection.getDraggedListLeftEdge() - draggableDistanceTravelled;
                const beforeElement = getClosestToInsertBefore(container, draggableLeftEdge).element;

                if (beforeElement !== undefined && listDragPlaceHolder.placeHolderNotInsertedBefore(beforeElement)) {
                    beforeElement.before(placeHolder);
                    listDragPlaceHolder.setPlaceHolderInsertedBefore(beforeElement)
                } 
            }

        }, 100, { 'trailing': false });

        this.addEventListener('dragover', throttled)

    }
}

customElements.define('list-deck', Deck)