import { numberWithPx } from "../../../utils/string"
class ListMover {
    constructor (list) {
        this._list = list;
    }

    move (newLeftEdge, top) {
        this._list.style.position = "absolute";
        this._list.style.left     =  numberWithPx(newLeftEdge);
        this._list.style.top     =  numberWithPx(top);
    }
}
export { ListMover }