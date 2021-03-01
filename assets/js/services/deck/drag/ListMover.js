class ListMover {
    constructor (List) {
        this._list = List;
    }

    get list () {
        return this._list;
    }

    moveList (newLeftEdge) {
        this.list.style.position = "absolute";
        this.list.style.left     =  newLeftEdge + "px";
    }
}
export { ListMover }