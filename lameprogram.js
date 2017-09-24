var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

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

server.listen(process.env.PORT, function(){
  console.log('listening on *:' + process.env.PORT);
});
