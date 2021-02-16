import "../scss/main.scss";
import { boardService } from "./services/board";
import Title from "./components/board/Title"
import Input from "./components/board/Input"
import TextArea from "./components/list/TextArea"
import socketConnection from "./services/websocket"
//@TODO: create a custom element register obj

// Create WebSocket connection.
socketConnection.onopen = function (e) {
}

// // Connection opened
        // socket.addEventListener('open', function (event) {
        //     console.log('open')
        //     socket.send('Hello Server!');
        // });

        // socket.addEventListener('error', function(error) {
        //     console.error(error);
        // });

        // socket.addEventListener('message', function(message) {
        //     console.log(message)
        // })

// // Listen for messages
// socket.addEventListener('message', function (event) {
//     console.log('Message from server ', event.data);
// });