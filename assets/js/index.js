document.addEventListener('DOMContentLoaded', () => {
    const BINDABLE_ATTR = 'data-bind';
    const BINDABLES     = document.querySelectorAll(`[${BINDABLE_ATTR}]`);

    /**
     * create our pairs, stored under the key of BIND_TO
     * value in format:
     * {'currentValue': *value*
     * 'inputFrom': '<input> element'
     * 'outputTo': '!'<input>' smth like h1/h2/smth else'}
     */
    const BINDABLE_PAIRS = (function (bindables) {
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
    })(BINDABLES);
    


    console.log(BINDABLE_PAIRS);
});