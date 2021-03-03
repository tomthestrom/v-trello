import throttle from "lodash/throttle";
import CardList from "../../components/list/CardList";
import { illegalSetterUseMessage } from '../../errors/messageFactory';
import { ElementDimensions } from '../../helpers/ElementDimensions';
import { DragDirection } from './drag/Direction';
import { DropZoneManager } from './DropZoneManager';

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

  const setList = (element) => {
    if (list !== undefined) {
      throw new Error(illegalSetterUseMessage('setList'));
    }

    return element;
  };

  const setSurroundingElements = (list) => {
    return list.parentNode.querySelectorAll(CardList.dragNotActiveSelector);
  };

  const setDimensionsHelper = (list) => new ElementDimensions(list);
  const setDragDirService = (startCoordinate, direction) => new DragDirection(startCoordinate, direction);
  const setDropZoneMan = (dropzone, surroundingElements, direction) => new DropZoneManager(dropzone, surroundingElements, direction);

  return {

    init (element, horizontalStartCoordinate, verticalStartCoordinate, dropZone) {
      list = setList(element);
      surroundingElements = setSurroundingElements(this.getList());

      horizontalDragDirService = setDragDirService(horizontalStartCoordinate, DragDirection.DIR_HORIZONTAL);
      verticalDragDirService = setDragDirService(verticalStartCoordinate, DragDirection.DIR_VERTICAL); 

      dimensionsHelper = setDimensionsHelper(list);
      dropZoneManager = setDropZoneMan(dropZone, surroundingElements, horizontalDragDirService);
    },

    getList () {
      return list;
    },

    calculateRightEdge () {
      const distanceTravelled = horizontalDragDirService.distTravelled();
      return dimensionsHelper.right + (horizontalDragDirService.isDirPositiveFromStart() ? distanceTravelled : distanceTravelled * (-1));
    },

    calculateLeftEdge () {
      const distanceTravelled = horizontalDragDirService.distTravelled();
      return dimensionsHelper.left + (horizontalDragDirService.isDirPositiveFromStart() ? distanceTravelled : distanceTravelled * (-1));
    },

    calculateTop () {
      const distanceTravelled = verticalDragDirService.distTravelled();
      return dimensionsHelper.top + (verticalDragDirService.isDirPositiveFromStart() ? distanceTravelled : distanceTravelled * (-1));
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
      [list, horizontalDragDirService, surroundingElements, dimensionsHelper, dropZoneManager] = [undefined];
    }

  };
})();

export { listDragStateHandler };
