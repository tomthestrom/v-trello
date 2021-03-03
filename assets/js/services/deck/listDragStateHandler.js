import throttle from "lodash/throttle";
import  { CardListElement } from "../../components/deck/CardList";
import { illegalSetterUseMessage } from '../../errors/messageFactory';
import { ElementDimensionsRecord } from '../../helpers/ElementDimensionsRecord';
import { DragDirection } from './drag/Direction';
import { DropZoneManager } from '../DropZoneManager';

/**
 * takes care of the state of direction when dragging
 */
const listDragStateHandler = (function () {
  let list;
  let surroundingElements;
  let horizontalDragDirService;
  let verticalDragDirService;
  let startDimensions;
  let dropZoneManager;

  const setList = (element) => {
    if (list !== undefined) {
      throw new Error(illegalSetterUseMessage('setList'));
    }

    return element;
  };

  return {

    init (element, horizontalStartCoordinate, verticalStartCoordinate, dropZone) {
      list = setList(element);
      surroundingElements = list.parentNode.querySelectorAll(CardListElement.dragNotActiveSelector);

      horizontalDragDirService = new DragDirection(horizontalStartCoordinate, DragDirection.DIR_HORIZONTAL);
      verticalDragDirService = new DragDirection(verticalStartCoordinate, DragDirection.DIR_VERTICAL); 

      startDimensions = new ElementDimensionsRecord(list);
      dropZoneManager = new DropZoneManager(dropZone, surroundingElements, horizontalDragDirService);
    },

    getList () {
      return list;
    },

    calculateRightEdge () {
      const distanceTravelled = horizontalDragDirService.distTravelled();
      return startDimensions.right + (horizontalDragDirService.isDirPositiveFromStart() ? distanceTravelled : distanceTravelled * (-1));
    },

    calculateLeftEdge () {
      const distanceTravelled = horizontalDragDirService.distTravelled();
      return startDimensions.left + (horizontalDragDirService.isDirPositiveFromStart() ? distanceTravelled : distanceTravelled * (-1));
    },

    calculateTop () {
      const distanceTravelled = verticalDragDirService.distTravelled();
      return startDimensions.top + (verticalDragDirService.isDirPositiveFromStart() ? distanceTravelled : distanceTravelled * (-1));
    },

    drag (curXPos, curYPos) {
      horizontalDragDirService.setCurDir(curXPos);
      verticalDragDirService.setCurDir(curYPos);

      const leftEdge = this.calculateLeftEdge();
      const top = this.calculateTop();
      
      const xPosDropZone = horizontalDragDirService.isDirPositive() ? this.calculateRightEdge() : leftEdge;

      requestAnimationFrame(() => {this.getList()?.move(leftEdge, top)});

      const throttledInsertDropZone = throttle(() => {
        dropZoneManager.insertDropZone(xPosDropZone)
      },
      100,
       { 
         trailing : false
        }
      )

      throttledInsertDropZone();
    },

    resetState () {
      [list, surroundingElements, horizontalDragDirService, verticalDragDirService, startDimensions, dropZoneManager] = [undefined];
    }
  };
})();

export { listDragStateHandler };
