import socketConnection from "../../services/websocket";
export default class AddList extends HTMLElement {
  constructor() {
    super();
    this.input = this.querySelector("#add-list-input");
    this.addButton = this.querySelector("#add-list-btn-add");
    this.closeButton = this.querySelector("#add-list-btn-close");
  }

  connectedCallback() {
    const eventHandlers = this.eventHandlers.call(this);

    this.addButton.addEventListener("click", eventHandlers.addButtonClick);
  }

  eventHandlers() {
    const addButtonClick = function () {
      const updateObject = {
        id: "6022b00811c58d5b8d2c6943",
        type: "newList",
        value: this.input.value,
      };

      socketConnection.send(JSON.stringify(updateObject));
    }.bind(this);

    return {
      addButtonClick,
    };
  }
}
