const form = document.querySelector("form");
const input = document.querySelector("input");
const messageList = document.querySelector("ul");

const socket = io('http://localhost:3001');

function sendMessage(e){
    e.preventDefault();
    socket.emit('message', input.value);

    input.value= "";
}

form.addEventListener('submit', sendMessage);

function addMessage(message) {
    const li = document.createElement('li');
    li.innerText= message;
    messageList.append(li);
}

socket.on("message", addMessage);

function alertUser(){
    addMessage("user Connected");
} 
socket.on("user Connected", alertUser);