document.addEventListener('DOMContentLoaded', () => {
    const BINDABLE_ATTR = 'data-bind';
    const BINDABLES     = document.querySelectorAll(`[${BINDABLE_ATTR}]`);

    /**
     * create our pairs, stored under the key of the BIND_TO
     * value in format:
     * * BIND_TO * => {'currentValue': *value*
     * 'inputFrom': '<input> element'
     * 'outputTo': '!'<input>' smth like h1/h2/smth else'}
     */
    const BINDABLE_PAIRS = (function (bindables, BINDABLE_ATTR) {
        this.bindablePairs = {};

        bindables.forEach(bindable => {
            const NEW_PAIR = {};
            const BIND_TO = bindable.getAttribute(`${BINDABLE_ATTR}`);
            
            if (!this.bindablePairs.hasOwnProperty(BIND_TO)) {
                this.bindablePairs[BIND_TO] = NEW_PAIR;
            }
            //check if it's input type text || its eg an h1/h2/smth else that is getting the value
            if (bindable.type === "text") {
                this.bindablePairs[BIND_TO]['currentValue'] = bindable.value;
                this.bindablePairs[BIND_TO]['inputFrom'] = bindable;
            } else {
                this.bindablePairs[BIND_TO]['outputTo'] = bindable;
            }
        });

        return this.bindablePairs;
    })(BINDABLES, BINDABLE_ATTR);


    function isValidValue (newValue) {
        return newValue.length > 0 && (/\S/.test(newValue));
    };

    for (let bindable of Object.keys(BINDABLE_PAIRS)) {
        BINDABLE_PAIRS[bindable].inputFrom.addEventListener('focusout', e => {
            if (isValidValue(e.target.value)) {
                BINDABLE_PAIRS[bindable].outputTo.innerText = e.target.value;
            } else {
                e.target.value = BINDABLE_PAIRS[bindable].currentValue; 
            }
        });
    }


    const FOCUS_CLICK_ATTR = 'data-click-focus-target';
    const FOCUS_DESTINATION_ATTR = 'data-click-focus-destination';
    const FOCUS_CLICK_GROUP = document.querySelectorAll(`[${FOCUS_CLICK_ATTR}]`);
    
    FOCUS_CLICK_GROUP.forEach(focusTriggeringElement => {
        focusTriggeringElement.addEventListener('click', e => {
            const FOCUS_DESTINATION_ATTR_VALUE = e.target.dataset.clickFocusTarget;
            const FOCUS_TARGET_ELEMENT         = document.querySelector(`[${FOCUS_DESTINATION_ATTR}=${FOCUS_DESTINATION_ATTR_VALUE}]`);
                FOCUS_TARGET_ELEMENT.focus();
                FOCUS_TARGET_ELEMENT.select();
            }
        )
    });

    //grow input

    //we need to resize input as the user is typing, to keep it aesthetical, we need to think about the size of each char :/

    const GROW_INPUT_ELEMENT    =  document.querySelector('[data-grow-input]');
    const INPUT_REFERENCE       = document.querySelector('[data-grow-input-reference]');

    const INPUT_REFERENCE_CLONE = INPUT_REFERENCE.cloneNode(true);

    
    INPUT_REFERENCE.insertAdjacentElement('afterend', INPUT_REFERENCE_CLONE);
    GROW_INPUT_ELEMENT.style.width = (INPUT_REFERENCE_CLONE.getBoundingClientRect()).width + 16 + 'px';

    GROW_INPUT_ELEMENT.addEventListener('input', e => {
        INPUT_REFERENCE_CLONE.innerHTML = e.target.value.replace(/\s/g, '&nbsp;');
        e.target.style.width = (INPUT_REFERENCE_CLONE.getBoundingClientRect()).width + 16 + 'px';
    });
    
});
