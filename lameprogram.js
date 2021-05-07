var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

let numClients = 0;
let messages = [];

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  numClients++;
  console.log('a user connected');
  socket.emit('numClients', numClients);
  socket.emit('messages', messages);

  socket.on('disconnect', function(){
    numClients--;
    console.log('user disconnected');
    socket.broadcast.emit('numClients', numClients);
  });

  socket.on('send_synth', function(data)
  {
    messages.push(data);
    
    io.emit('synth', data);
  });
});

server.listen(process.env.PORT || 3000, function(){
  console.log('listening on *:' + (process.env.PORT || 3000));
});
