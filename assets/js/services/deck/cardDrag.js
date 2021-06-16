import { SingleCardElement } from "../../components/deck/SingleCard";
import { ElementDimensionsRecord } from "../../helpers/ElementDimensionsRecord";
import { DragDirection } from "./drag/Direction";
import { DropZoneManager } from "../../helpers/DropZoneManager";

/**
 * an interface that handles actions related to drag events on CardList and ListDeck
 * set from the CardList on dragstart, reset occurs on draggend
 */
const cardDrag = (function () {
  let card;
  let notDraggedCards;
  let horizontalDragDir;
  let verticalDragDir;
  let startDimensions;
  let dropZoneManager;

  const setCard = (element) => {
    if (card !== undefined) {
      throw new Error("Illegal use of setCard - card already set.");
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
      card = setCard(element);
      notDraggedCards = card.parentNode.querySelectorAll(
        SingleCardElement.dragNotActiveSelector
      );

      horizontalDragDir = new DragDirection(
        horizontalStartCoordinate,
        DragDirection.DIR_HORIZONTAL
      );
      verticalDragDir = new DragDirection(
        verticalStartCoordinate,
        DragDirection.DIR_VERTICAL
      );

      startDimensions = new ElementDimensionsRecord(card);
      dropZoneManager = new DropZoneManager(
        dropZone,
        horizontalDragDir,
        notDraggedCards
      );
    },

    getCard() {
      return card;
    },

    dragOverDeck(deck, curXPos, curYPos) {
      horizontalDragDir.setCurDir(curXPos);
      verticalDragDir.setCurDir(curYPos);

      console.log(horizontalDragDir)
      const card = this.getCard();
      const leftEdge = calculateEdge();
      const rightEdge = calculateEdge("right");
      const top = calculateTop();
      const scrollDeckBy = rightEdge - this.getCard().width;

      const xPosDropZone = horizontalDragDir.isDirPositive()
        ? rightEdge
        : leftEdge;
      dropZoneManager.insertDropZone(xPosDropZone);

      requestAnimationFrame(card?.move(leftEdge, top));
      deck.scroll({ left: scrollDeckBy });
    },

    resetState() {
      [
        card,
        notDraggedCards,
        horizontalDragDir,
        verticalDragDir,
        startDimensions,
        dropZoneManager,
      ] = [undefined];
    },
  };
})();

export { cardDrag };
