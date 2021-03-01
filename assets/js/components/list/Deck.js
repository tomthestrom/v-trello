import { bind } from "lodash";
import throttle from "lodash/throttle";
import { listDragManager } from "../../services/deck/listDragManager";
/**
 * Encapsulates logic to drag&drop the cards on the deck
 */
export default class Deck extends HTMLDivElement {
  constructor() {
    super();
    this.setLists();
  }

  get DRAGGABLE_LIST_SELECTOR() {
    return "[data-draggable-list]";
  }

  setLists() {
    this.lists = this.querySelectorAll(this.DRAGGABLE_LIST_SELECTOR);
  }

  connectedCallback() {


      const dragOver = function (e) {
        const curXPos   = e.clientX;
        const container = this.querySelectorAll("[data-drag-active=false]");

        /**
         * Dragging related state handler services
         */
        const listDimensionsServ = listDragManager.getListDimensionsService();
        const dragDirServ = listDragManager.getListDragDirectionService();
        const placeHoldServ = listDragManager.getListPlaceHolderService();
        const moveLServ = listDragManager.getMoveListService();
        dragDirServ.setCurDir(curXPos);

        const calculateLeftEdge = function (isDirRight, curXPos) {

        }

        if (dragDirServ.isDirRight()) {
          const insertAfter = true;
          const listCurREdge = listDimensionsServ.rightEdge + dragDirServ.distTravelled(curXPos);
          const listCurLEdge = listDimensionsServ.leftEdge + dragDirServ.distTravelled(curXPos);
          const insertAfterEl = placeHoldServ.getClosestToInsert(
            container,
            listCurREdge,
            insertAfter
          );
        
          requestAnimationFrame(function () {
            moveLServ.moveList(listCurLEdge);
          })

          if (insertAfterEl !== undefined && placeHoldServ.insertedAfterEl?.id !== insertAfterEl.id) {
            insertAfterEl.before(placeHoldServ.placeHolder);
            placeHoldServ.insertedAfterEl = insertAfterEl;
          }
        } else {
          const insertAfter = false;
          const listCurLEdge = listDimensionsServ.leftEdge - dragDirServ.distTravelled(curXPos);
          const insertBeforeEl = placeHoldServ.getClosestToInsert(
            container,
            listCurLEdge,
            insertAfter
          );
            
          requestAnimationFrame(function () {
            moveLServ.moveList(listCurLEdge);
          })

          if (insertBeforeEl !== undefined && placeHoldServ.insertedBeforeEl?.id !== insertBeforeEl.id) {
            insertBeforeEl.before(placeHoldServ.placeHolder);
            placeHoldServ.insertedBeforeEl = insertBeforeEl;
          }
        }
    }

    const throttled = throttle(dragOver, 100, { trailing : false})
    this.addEventListener("dragover", (function (e) {
      e.preventDefault();
      throttled.call(this, e);
    }).bind(this));
    this.addEventListener("drop", function () {
      console.log("boha");
      listDragManager.getList()
    });
  }

  eventHandlers() {

    return { dragOver }
  }
}
