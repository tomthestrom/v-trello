import throttle from 'lodash/throttle';
/**
 * Encapsulates logic to drag&drop the cards on the deck
 */
export default class Deck extends HTMLElement {
    
    constructor () {
        super();
        this.setLists();
    }
    
    get DRAGGABLE_LIST_SELECTOR () {
        return '[data-draggable-list]'
    }
    setLists () {
        this.lists = this.querySelectorAll(this.DRAGGABLE_LIST_SELECTOR);
    }

    connectedCallback () {
        // this.lists.forEach(list => {
        //     list.addEventListener('dragstart', (function () {
        //          list.setAttribute('drag-active', true);
        //     }));
        
        //     list.addEventListener('dragend', function () {
        //         list.setAttribute('drag-active', false);
        //     })
            
        // });



        const getDragOverElement = function (container, x) {
            const draggableElements = [...container];
            
            return draggableElements.reduce((closest, child) => {
                const box = child.getBoundingClientRect();
                //box center
                // console.log(x)
                // console.log('box', box);
                const offset = x - box.right;
                // console.log(offset)
                //offset closer to 0 than any other el
                if (offset < 0 && offset > closest.offset ) {
                    return { offset: offset, element: child }
                } else {
                    return closest;
                }
                
            }, { offset: Number.NEGATIVE_INFINITY})
        }

        const throttled = throttle(function (e) {
            e.preventDefault();
            const container = this.querySelectorAll('[drag-active=false]');

            const afterElement = (getDragOverElement(container, e.clientX).element);
            const draggable = document.querySelector(['[drag-active=true]']);
            // console.log(afterElement);

            if(afterElement == undefined) {
                console.log('afterElement undefined')
            } else {
                this.insertBefore(draggable, afterElement)
            }
        }, 100, { 'trailing': false });

        this.addEventListener('dragover', throttled)

        

    }
}

customElements.define('list-deck', Deck)