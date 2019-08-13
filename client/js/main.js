var socket = io();
var start = document.getElementById('logged');
var nameForm = document.getElementById('nameForm');
var messageForm = document.getElementById('messageForm');
var messageInput = document.getElementById('message');
var messages = document.getElementById('messages');
var usernameInput = document.getElementById('username');
var sendUser = document.getElementById('sendUid');
var username;

const messenger = {
  message: (message) => {
    let messCont = document.createElement('div');
    messCont.classList.add("message");
    messCont.innerHTML = message;
    messages.appendChild(messCont);
    let br = document.createElement('br');
    messages.appendChild(br);
    let hr = document.createElement('hr');
    messages.appendChild(hr);
  },
  welcomeMessage: (name) => {
    let messCont = document.createElement('div');
    messCont.classList.add("welcomeMessage");
    messCont.innerHTML = "Server: Hey " + name;
    messages.appendChild(messCont);
    let br = document.createElement('br');
    messages.appendChild(br);
    let hr = document.createElement('hr');
    messages.appendChild(hr);
  }
}
socket.on('new-message', message => {
  messenger.message(message.user + " said: " + message.message);
});
socket.on('newUser', username => {
  if(logged.style.display != "none"){
    console.log('User connected');
  }else{
    messenger.welcomeMessage(username);
  }
});

messageForm.addEventListener('submit', e => {
  e.preventDefault();
  let message = messageInput.value;
  if(message != " " || message != " "){
    socket.emit('message', {user: username, message:message});
    messenger.message("You said: " + message);
    messageInput.value = '';
  }else{
    alert("Your message can't send an empty message :(");
  }
}), nameForm.addEventListener('submit', e => {
  e.preventDefault();
  let name = document.getElementById('username').value;
  socket.emit('join', name);
  start.style.display = 'none';
  document.getElementById('main').style.display = "block";
  username = name;
});
