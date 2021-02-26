import { illegalSetterUseMessage } from '../../../../shared/error-messages';
import { ListDimensions } from './drag/ListDimensions';
import { ListDragDirection } from './drag/ListDragDirection';
import { ListPlaceHolder } from './drag/ListPlaceHolder';
/**
 * takes care of the state of direction when dragging
 */
const listDragManager = (function () {
  let list;
  let listDimensionsService;
  let listPlaceHolderService;
  let listDragDirectionService;

  const setList = (element) => {
    if (list !== undefined) {
      throw new Error(illegalSetterUseMessage('setList'));
    }

    return element;
  };
  const setListDimensionsService = (list) => new ListDimensions(list);
  const setListPlaceHolderService = (list, ListDimensions) => new ListPlaceHolder(list, ListDimensions);
  const setListDragDirectionService = (list, ListDimensions) => new ListDragDirection(list, ListDimensions);
  return {

    init (element) {
      list = setList(element);
      listDimensionsService = setListDimensionsService(list);
      listPlaceHolderService = setListPlaceHolderService(listDimensionsService);
      listDragDirectionService = setListDragDirectionService(list, listDimensionsService);
    },

    getList () {
      return list;
    },

    getListDimensionsService () {
      return listDimensionsService;
    },

    getListPlaceHolderService () {
      return listPlaceHolderService;
    },

    getListDragDirectionService () {
      return listDragDirectionService;
    },

    resetState () {
      [list, listDimensionsService, listPlaceHolderService, listDragDirectionService] = [undefined];
    }

  };
})();

export { listDragManager };
