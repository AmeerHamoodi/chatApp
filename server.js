var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

//start Server
server.listen(process.env.PORT || 2000);

app.on('/', function(req, res){
  res.sendFile(__dirname + "../client/index.html");
});

app.use(express.static(__dirname + '/client'));
var users = [];

io.on('connection', socket => {
  console.log('new connection');
  socket.on('join', name => {
    socket.broadcast.emit('newUser', name);
    users.push(name);
  });
  socket.on('message', data =>{
    if(data !== "" || data !== " "){
      socket.broadcast.emit('new-message', data);
    }else{
      socket.emit('error', "You can't send empty messages :(");
    }
  });
});
