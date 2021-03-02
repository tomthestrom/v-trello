import throttle from "lodash/throttle";
import { illegalSetterUseMessage } from '../../errors/messageFactory';
import { ElementDimensions } from '../../helpers/ElementDimensions';
import { DragDirection } from './drag/Direction';
import { DropZoneFactory } from '../../factories/DropZone';
import { DropZoneManager } from './DropZoneManager';
import { ListMover } from './drag/ListMover';

/**
 * takes care of the state of direction when dragging
 */
const listDragStateHandler = (function () {
  let list;
  let surroundingElements;
  let dimensionsHelper;
  let dropZoneManager;
  let horizontalDragDirService;
  let verticalDragDirService;
  let moveListService;

  const setList = (element) => {
    if (list !== undefined) {
      throw new Error(illegalSetterUseMessage('setList'));
    }

    return element;
  };

  const setSurroundingElements = (list) => {
    return list.parentNode.querySelectorAll("[data-drag-active=false]");
  };

  const setDimensionsHelper = (list) => new ElementDimensions(list);
  const setDragDirService = (startCoordinate, direction) => new DragDirection(startCoordinate, direction);
  const setDropZoneMan = (DropZoneFactory, surroundingElements) => new DropZoneManager(DropZoneFactory, surroundingElements);
  const setMoveListService = (list) => new ListMover(list);

  return {

    init (element, horizontalStartCoordinate, verticalStartCoordinate, dropZone) {
      list = setList(element);
      surroundingElements = setSurroundingElements(this.getList());

      horizontalDragDirService = setDragDirService(horizontalStartCoordinate, DragDirection.DIR_HORIZONTAL);
      verticalDragDirService = setDragDirService(verticalStartCoordinate, DragDirection.DIR_VERTICAL); 

      dimensionsHelper = setDimensionsHelper(list);
      dropZoneManager = setDropZoneMan(dropZone, surroundingElements);
      moveListService = setMoveListService(list);
    },

    getList () {
      return list;
    },

    calculateRightEdge (isDirRightFromStart,distanceTravelled) {
      return dimensionsHelper.right + (isDirRightFromStart ? distanceTravelled : distanceTravelled * (-1));
    },

    calculateLeftEdge (isDirRightFromStart, distanceTravelled) {
      return dimensionsHelper.left + (isDirRightFromStart ? distanceTravelled : distanceTravelled * (-1));
    },

    calculateTop (isDirDownFromStart, distanceTravelled) {
      return dimensionsHelper.top + (isDirDownFromStart ? distanceTravelled : distanceTravelled * (-1));
    },

    drag (curXPos, curYPos) {
      const isDirectionRight  =  horizontalDragDirService.setCurDir(curXPos).isDirPositive();
      const isDirRightFromStart  = horizontalDragDirService.isDirPositiveFromStart();
      const horizontalDistanceTravelled = horizontalDragDirService.distTravelled(curXPos);
      const leftEdge = this.calculateLeftEdge(isDirRightFromStart, horizontalDistanceTravelled);

      
      verticalDragDirService.setCurDir(curYPos);
      const isDirDownFromStart  = verticalDragDirService.isDirPositiveFromStart();
      const verticalDistanceTravelled = verticalDragDirService.distTravelled(curYPos);
      const top = this.calculateTop(isDirDownFromStart, verticalDistanceTravelled);
      
      const xPosDropZone = isDirectionRight ? this.calculateRightEdge(isDirRightFromStart, horizontalDistanceTravelled) : leftEdge;
      requestAnimationFrame(() => {moveListService?.move(leftEdge, top)});

      const throttledInsertDropZone = throttle(() => {
        dropZoneManager.insertDropZone(xPosDropZone, isDirectionRight)
      },
      100,
       { 
         trailing : false
        }
      )

      throttledInsertDropZone();
    },



    resetState () {
      [list, horizontalDragDirService, surroundingElements, dimensionsHelper, dropZoneManager, moveListService] = [undefined];
    }

  };
})();

export { listDragStateHandler };
