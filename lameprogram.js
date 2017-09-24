var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var numClients = 0;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  numClients++;
  console.log('a user connected');
  io.emit("data", numClients);

  socket.on('disconnect', function(){
    numClients--;
    console.log('user disconnected');
    socket.broadcast.emit("data", numClients);
  });

  socket.on("send_synth", function(data)
  {
    //console.log(data);
    socket.broadcast.emit("synth", data);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
