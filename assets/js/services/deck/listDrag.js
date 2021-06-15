import { CardListElement } from "../../components/deck/CardList";
import { ElementDimensionsRecord } from "../../helpers/ElementDimensionsRecord";
import { DragDirection } from "./drag/Direction";
import { DropZoneManager } from "../../helpers/DropZoneManager";

/**
 * an interface that handles actions related to drag events on CardList and ListDeck
 * set from the CardList on dragstart, reset occurs on draggend
 */
const listDrag = (function () {
  let list;
  let notDraggedLists;
  let horizontalDragDir;
  let verticalDragDir;
  let startDimensions;
  let dropZoneManager;

  const setList = (element) => {
    if (list !== undefined) {
      throw new Error("Illegal use of setList - list already set.");
    }

    return element;
  };

  const calculateEdge = (side = "left") => {
    const edge = side === "left" ? startDimensions.left : startDimensions.right;
    const distanceTravelled = horizontalDragDir.isDirPositiveFromStart()
      ? horizontalDragDir.distTravelled()
      : horizontalDragDir.distTravelled() * -1;

    return edge + distanceTravelled;
  };

  const calculateTop = () => {
    const distanceTravelled = verticalDragDir.isDirPositiveFromStart()
      ? verticalDragDir.distTravelled()
      : verticalDragDir.distTravelled() * -1;

    return startDimensions.top + distanceTravelled;
  };

  return {
    init(
      element,
      horizontalStartCoordinate,
      verticalStartCoordinate,
      dropZone
    ) {
      list = setList(element);
      notDraggedLists = list.parentNode.querySelectorAll(
        CardListElement.dragNotActiveSelector
      );

      horizontalDragDir = new DragDirection(
        horizontalStartCoordinate,
        DragDirection.DIR_HORIZONTAL
      );
      verticalDragDir = new DragDirection(
        verticalStartCoordinate,
        DragDirection.DIR_VERTICAL
      );

      startDimensions = new ElementDimensionsRecord(list);
      dropZoneManager = new DropZoneManager(
        dropZone,
        horizontalDragDir,
        notDraggedLists
      );
    },

    getList() {
      return list;
    },

    dragOverDeck(deck, curXPos, curYPos) {
      horizontalDragDir.setCurDir(curXPos);
      verticalDragDir.setCurDir(curYPos);

      const list = this.getList();
      const leftEdge = calculateEdge();
      const rightEdge = calculateEdge("right");
      const top = calculateTop();
      const scrollDeckBy = rightEdge - this.getList().width;

      const xPosDropZone = horizontalDragDir.isDirPositive()
        ? rightEdge
        : leftEdge;
      dropZoneManager.insertDropZone(xPosDropZone);

      requestAnimationFrame(list?.move(leftEdge, top));
      deck.scroll({ left: scrollDeckBy });
    },

    resetState() {
      [
        list,
        notDraggedLists,
        horizontalDragDir,
        verticalDragDir,
        startDimensions,
        dropZoneManager,
      ] = [undefined];
    },
  };
})();

export { listDrag };
