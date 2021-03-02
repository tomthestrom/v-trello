class ListMover {
    constructor (list) {
        this._list = list;
    }

    move (newLeftEdge) {
        this._list.style.position = "absolute";
        this._list.style.left     =  newLeftEdge + "px";
    }
}
export { ListMover }