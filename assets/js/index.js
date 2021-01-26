import "../scss/main.scss";
import { boardService } from "./services/board";

boardService.init()

document.addEventListener("DOMContentLoaded", function (e) {
  const BINDABLE_ATTR = "data-bind";
  const BINDABLES = document.querySelectorAll(`[${BINDABLE_ATTR}]`);

  // boardService.init()

  /**
   * create our pairs, stored under the key of the BIND_TO
   * value in format:
   * * BIND_TO * => {'currentValue': *value*
   * 'inputFrom': '<input> element'
   * 'outputTo': '!'<input>' smth like h1/h2/smth else'}
   */
  const BINDABLE_PAIRS = (function (bindables, BINDABLE_ATTR) {
    const bindablePairs = {};

    bindables.forEach((bindable) => {
      const NEW_PAIR = {};
      const BIND_TO = bindable.getAttribute(`${BINDABLE_ATTR}`);

      if (!bindablePairs.hasOwnProperty(BIND_TO)) {
        bindablePairs[BIND_TO] = NEW_PAIR;
      }
      //check if it's input type text || its eg an h1/h2/smth else that is getting the value
      if (bindable.type === "text") {
        bindablePairs[BIND_TO]["currentValue"] = bindable.value;
        bindablePairs[BIND_TO]["inputFrom"] = bindable;
      } else {
        bindablePairs[BIND_TO]["outputTo"] = bindable;
      }
    });

    return bindablePairs;
  })(BINDABLES, BINDABLE_ATTR);

  function isValidValue(newValue) {
    return newValue.length > 0 && /\S/.test(newValue);
  }

  for (let bindable of Object.keys(BINDABLE_PAIRS)) {
    BINDABLE_PAIRS[bindable].inputFrom.addEventListener("focusout", (e) => {
      if (isValidValue(e.target.value)) {
        BINDABLE_PAIRS[bindable].outputTo.innerText = e.target.value;
      } else {
        e.target.value = BINDABLE_PAIRS[bindable].currentValue;
      }
    });
  }

  console.log(BINDABLE_PAIRS)






  

  
  

  // new BoardTitleInput()
});

