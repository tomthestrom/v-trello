import Title from '../components/board/Title';
import TitleClone from '../components/board/TitleClone';
import TitleInput from '../components/board/Input';

const boardService = {
    init () {
        customElements.define('board-title-input', TitleInput, {extends: "input"});
        customElements.define('board-title', Title, {extends: "h1"});
        customElements.define('board-title-clone', TitleClone, {extends: "h1"});
    }
}

export { boardService }