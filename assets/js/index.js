//     import logger from './export.js'

// document.addEventListener('DOMContentLoaded', () => {
//     const BINDABLE_ATTR = 'data-bind';
//     const BINDABLES     = document.querySelectorAll(`[${BINDABLE_ATTR}]`);

//     /**
//      * create our pairs, stored under the key of the BIND_TO
//      * value in format:
//      * * BIND_TO * => {'currentValue': *value*
//      * 'inputFrom': '<input> element'
//      * 'outputTo': '!'<input>' smth like h1/h2/smth else'}
//      */
//     const BINDABLE_PAIRS = (function (bindables, BINDABLE_ATTR) {
//         this.bindablePairs = {};

//         bindables.forEach(bindable => {
//             const NEW_PAIR = {};
//             const BIND_TO = bindable.getAttribute(`${BINDABLE_ATTR}`);
            
//             if (!this.bindablePairs.hasOwnProperty(BIND_TO)) {
//                 this.bindablePairs[BIND_TO] = NEW_PAIR;
//             }
//             //check if it's input type text || its eg an h1/h2/smth else that is getting the value
//             if (bindable.type === "text") {
//                 this.bindablePairs[BIND_TO]['currentValue'] = bindable.value;
//                 this.bindablePairs[BIND_TO]['inputFrom'] = bindable;
//             } else {
//                 this.bindablePairs[BIND_TO]['outputTo'] = bindable;
//             }
//         });

//         return this.bindablePairs;
//     })(BINDABLES, BINDABLE_ATTR);


//     function isValidValue (newValue) {
//         return newValue.length > 0 && (/\S/.test(newValue));
//     };

//     for (let bindable of Object.keys(BINDABLE_PAIRS)) {
//         BINDABLE_PAIRS[bindable].inputFrom.addEventListener('focusout', e => {
//             if (isValidValue(e.target.value)) {
//                 BINDABLE_PAIRS[bindable].outputTo.innerText = e.target.value;
//             } else {
//                 e.target.value = BINDABLE_PAIRS[bindable].currentValue; 
//             }
//         });
//     }


//     const FOCUS_CLICK_ATTR = 'data-click-focus-target';
//     const FOCUS_DESTINATION_ATTR = 'data-click-focus-destination';
//     const FOCUS_CLICK_GROUP = document.querySelectorAll(`[${FOCUS_CLICK_ATTR}]`);
    
//     FOCUS_CLICK_GROUP.forEach(focusTriggeringElement => {
//         focusTriggeringElement.addEventListener('click', e => {
//             const FOCUS_DESTINATION_ATTR_VALUE = e.target.dataset.clickFocusTarget;
//             const FOCUS_TARGET_ELEMENT         = document.querySelector(`[${FOCUS_DESTINATION_ATTR}=${FOCUS_DESTINATION_ATTR_VALUE}]`);
//                 FOCUS_TARGET_ELEMENT.focus();
//                 FOCUS_TARGET_ELEMENT.select();
//             ;
//             }
//         )
//     });

//     //grow input

//     //we need to resize input as the user is typing, to keep it aesthetical, we need to think about the size of each char :/

//     function BoardHeading (heading, input) {
//             this.heading = heading;
//             this.input = input;
//             this.headingClone;

//             this.cloneHeading = function () {
//                 console.log(this)
//                 return this.headingClone = this.heading.cloneNode(true);
//             };

//             this.hideHeading = function () {
//                 this.headingClone.setAttribute("style", "position: absolute; color: transparent; z-index: -5;");
//             }

//             this.adjustElementSize = function () {
//                 this.input.style.width = (this.headingClone.getBoundingClientRect()).width + 'px';
//                 return this;
//             }

//             this.insertClonedHeading = function () {
//                 this.input.insertAdjacentElement('afterend', this.headingClone);
//                 return this;
//             }

//             this.replaceSpaceWithNBSP = function () {
//                 this.headingClone.innerHTML = this.input.value.replace(/\s/g, '&nbsp;');
//             }


//             // return {
//             //     cloneInput: cloneInput,
//             //     adjustElementSize: adjustElementSize,
//             //     insertClonedInput: insertClonedInput,
//             //     replaceSpaceWithNBSP: replaceSpaceWithNBSP
//             // }


//     }

//     const GROW_INPUT_ELEMENT    =  document.querySelector('[data-grow-input]');
//     const INPUT_REFERENCE       = document.querySelector('[data-grow-input-reference]');
//     const boardHeading = new BoardHeading(INPUT_REFERENCE, GROW_INPUT_ELEMENT);
// console.log(boardHeading)
//     // const INPUT_REFERENCE_CLONE = INPUT_REFERENCE.cloneNode(true);
//     boardHeading.cloneHeading();
//     boardHeading.hideHeading();
//     boardHeading.insertClonedHeading();
//     boardHeading.adjustElementSize();

//     // INPUT_REFERENCE_CLONE.setAttribute("style", "position: absolute; color: transparent; z-index: -5;")
//     // INPUT_REFERENCE.insertAdjacentElement('afterend', INPUT_REFERENCE_CLONE);
    
//     // GROW_INPUT_ELEMENT.style.width = (INPUT_REFERENCE_CLONE.getBoundingClientRect()).width + 'px';

//     GROW_INPUT_ELEMENT.addEventListener('input', e => {
//         boardHeading.replaceSpaceWithNBSP();
//         boardHeading.adjustElementSize();
//     });

    
// });


document.addEventListener("DOMContentLoaded", function (e) {
  const BINDABLE_ATTR = "data-bind";
  const BINDABLES = document.querySelectorAll(`[${BINDABLE_ATTR}]`);

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





  class BoardTitle extends HTMLHeadingElement {
    constructor () {
      super();
    }
  
    updateBoardTitle (title) {
      this.innerText = title;
    }
  }
  
  class BoardTitleClone extends HTMLHeadingElement {
    constructor () {
      super();
      this.hide();
    }
  
  
    hide () {
      this.setAttribute("style", "position: absolute; color: transparent; z-index: -5;");
      this.hidden = true;
  
      return this;
    }
  }
  
  
  customElements.define('board-title', BoardTitle, {extends: "h1"})
  customElements.define('board-title-clone', BoardTitleClone, {extends: "h1"})

  // new BoardTitleInput()
});

