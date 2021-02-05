import "../scss/main.scss";
import { boardService } from "./services/board";
import Title from "./components/board/Title"
import Input from "./components/board/Input"
import TextArea from "./components/list/TextArea"
//@TODO: create a custom element register obj

document.addEventListener("DOMContentLoaded", function (e) {
  // const BINDABLE_ATTR = "data-bind";
  // const BINDABLES = document.querySelectorAll(`[${BINDABLE_ATTR}]`);

  // // boardService.init()

  // /**
  //  * create our pairs, stored under the key of the BIND_TO
  //  * value in format:
  //  * * BIND_TO * => {'currentValue': *value*
  //  * 'inputFrom': '<input> element'
  //  * 'outputTo': '!'<input>' smth like h1/h2/smth else'}
  //  */
  // const BINDABLE_PAIRS = (function (bindables, BINDABLE_ATTR) {
  //   const bindablePairs = {};

  //   bindables.forEach((bindable) => {
  //     const NEW_PAIR = {};
  //     const BIND_TO = bindable.getAttribute(`${BINDABLE_ATTR}`);

  //     if (!bindablePairs.hasOwnProperty(BIND_TO)) {
  //       bindablePairs[BIND_TO] = NEW_PAIR;
  //     }
  //     //check if it's input type text || its eg an h1/h2/smth else that is getting the value
  //     if (bindable.type === "text") {
  //       bindablePairs[BIND_TO]["currentValue"] = bindable.value;
  //       bindablePairs[BIND_TO]["inputFrom"] = bindable;
  //     } else {
  //       bindablePairs[BIND_TO]["outputTo"] = bindable;
  //     }
  //   });

  //   return bindablePairs;
  // })(BINDABLES, BINDABLE_ATTR);

  // function isValidValue(newValue) {
  //   return newValue.length > 0 && /\S/.test(newValue);
  // }

  // for (let bindable of Object.keys(BINDABLE_PAIRS)) {
  //   BINDABLE_PAIRS[bindable].inputFrom.addEventListener("focusout", (e) => {
  //     if (isValidValue(e.target.value)) {
  //       BINDABLE_PAIRS[bindable].outputTo.innerText = e.target.value;
  //     } else {
  //       e.target.value = BINDABLE_PAIRS[bindable].currentValue;
  //     }
  //   });
  // }

  // console.log(BINDABLE_PAIRS)






  

  
  

  // // new BoardTitleInput()
});
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
                // this.input.style.width = (this.headingClone.getBoundingClientRect()).width + 'px';
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
