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
  let dragDirService;
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
  const setDragDirService = (startCoordinate) => new DragDirection(startCoordinate);
  const setDropZoneMan = (DropZoneFactory, ElementDimensions, DragDirection, surroundingElements) => new DropZoneManager(DropZoneFactory, ElementDimensions, DragDirection, surroundingElements);
  const setMoveListService = (list) => new ListMover(list);

  return {

    init (element, startCoordinate, dropZone) {
      list = setList(element);
      dragDirService = setDragDirService(startCoordinate);
      surroundingElements = setSurroundingElements(this.getList());
      dimensionsHelper = setDimensionsHelper(list);
      dropZoneManager = setDropZoneMan(dropZone, dragDirService, surroundingElements)
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

    drag (curXPos) {
      const isDirectionRight  =  dragDirService.setCurDir(curXPos).isDirRight();
      const isDirRightFromStart  = dragDirService.isDirRightFromStart();
      const distanceTravelled = dragDirService.distTravelled(curXPos);
      const leftEdge = this.calculateLeftEdge(isDirRightFromStart, distanceTravelled);

      const xPosDropZone = isDirectionRight ? this.calculateRightEdge(isDirRightFromStart ,distanceTravelled) : leftEdge;

      const throttledInsertDropZone = throttle(() => {
        dropZoneManager.insertDropZone(xPosDropZone, isDirectionRight)
      },
      100,
       { 
         trailing : false
        }
      )

      throttledInsertDropZone();
      requestAnimationFrame(() => {moveListService.move(leftEdge)});
    },



    resetState () {
      [list, dragDirService, surroundingElements, dimensionsHelper, dropZoneManager, moveListService] = [undefined];
    }

  };
})();

export { listDragStateHandler };
