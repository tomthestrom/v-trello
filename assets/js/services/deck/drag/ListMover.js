class ListMover {
    constructor (list) {
        this._list = list;
    }

    move (newLeftEdge, top) {
        this._list.style.position = "absolute";
        this._list.style.left     =  newLeftEdge + "px";
        this._list.style.top     =  top + "px";
    }
}
export { ListMover }