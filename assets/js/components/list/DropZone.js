export default class DropZone extends HTMLDivElement {
   set height (height) {
       this.style.height = this.valueInPixels(height); 
   } 

   set minWidth (width) {
       this.style.minWidth = this.valueInPixels(width);
   }
   //maybe could rather be in some helper class
   valueInPixels (value) {
       return value + 'px';
   }
}


customElements.define('list-drop-zone', DropZone, { extends: 'div' });

