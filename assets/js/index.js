document.addEventListener('DOMContentLoaded', () => {
    const BINDABLE_ATTR = 'data-bind';
    const BINDED = document.querySelectorAll(`[${BINDABLE_ATTR}]`);

    const modifiablePairs = {};

    /*  
    create key value pairs for binding => {}
    
    */
    BINDED.forEach(element => {
        const PAIR = {};
        const BIND_TO = element.getAttribute(`${BINDABLE_ATTR}`);
        
        if (!modifiablePairs.hasOwnProperty(BIND_TO)) {
            modifiablePairs[BIND_TO] = PAIR;
        }

        if (element.type === "text") {
            modifiablePairs[BIND_TO]['currentValue'] = element.value;
            modifiablePairs[BIND_TO]['inputFrom'] = element;
        } else {
            modifiablePairs[BIND_TO]['outputTo'] = element;
        }

         
        
    })
    console.log(modifiablePairs);

    
});