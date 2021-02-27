import throttle from 'lodash/throttle';
import { listDragManager } from '../../services/deck/listDragManager';
/**
 * Encapsulates logic to drag&drop the cards on the deck
 */
export default class Deck extends HTMLElement {
  constructor () {
    super();
    this.setLists();
  }

  get DRAGGABLE_LIST_SELECTOR () {
    return '[data-draggable-list]';
  }

  setLists () {
    this.lists = this.querySelectorAll(this.DRAGGABLE_LIST_SELECTOR);
  }

  connectedCallback () {
    const getClosestToInsertBefore = function (container, x) {
      const draggableElements = [...container];

      return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        // as soon as x enters the box
        const offset = x - (box.left + box.width / 2);
        ;
        // offset closer to 0 than any other el
        if (offset < 0 && offset > -260 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      }, { offset: Number.NEGATIVE_INFINITY }).element;
    };

    const getClosestToInsertAfter = function (container, x) {
      const draggableElements = [...container];

      return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        // as soon as x enters the box
        const offset = x - (box.right + box.width / 2);
        // offset closer to 0 than any other el
        if (offset < 0 && offset > -260 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      }, { offset: Number.NEGATIVE_INFINITY }).element;
    };
    const throttled = throttle(function (e) {
      e.preventDefault();
      const currentXPosition = e.clientX;

      const container = this.querySelectorAll('[drag-active=false]');

      /**
        * Dragging related state handler services
      */
      const draggedListDimensionsService = listDragManager.getListDimensionsService();
      const dragDirectionService = listDragManager.getListDragDirectionService();
      const placeHolderService = listDragManager.getListPlaceHolderService();

      dragDirectionService.setCurrentDirection(currentXPosition);

      if (dragDirectionService.isDragDirectionRight()) {
        const draggedListCurrentRightEdge = draggedListDimensionsService.rightEdge + dragDirectionService.draggedListDistanceTravelled(currentXPosition);
        const afterElement = getClosestToInsertAfter(container, draggedListCurrentRightEdge);

        if (afterElement !== undefined && placeHolderService.insertedBeforeElement?.id !== afterElement.id) {
          afterElement.before(placeHolderService.placeHolder);
          placeHolderService.insertedAfterElement = afterElement;
        }
      } else {
        const draggedListCurrentLeftEdge = draggedListDimensionsService.leftEdge - dragDirectionService.draggedListDistanceTravelled(currentXPosition);
        const beforeElement = getClosestToInsertBefore(container, draggedListCurrentLeftEdge);

        listDragManager.getList().style.position = "fixed";

        listDragManager.getList().style.left = draggedListCurrentLeftEdge + "px";
        if (beforeElement !== undefined && placeHolderService.insertedBeforeElement?.id !== beforeElement.id) {
          beforeElement.before(placeHolderService.placeHolder);
          placeHolderService.insertedBeforeElement = beforeElement;
          
        }
      }
    }, 100, { trailing: false });

    this.addEventListener('dragover', throttled);
  }
}

customElements.define('list-deck', Deck);
