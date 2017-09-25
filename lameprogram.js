var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var numClients = 0;
var messages = '';

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  numClients++;
  console.log('a user connected');
  io.emit('numClients', numClients);
  io.emit('messages', messages);

  socket.on('disconnect', function(){
    numClients--;
    console.log('user disconnected');
    socket.broadcast.emit('numClients', numClients);
  });

  socket.on('send_synth', function(data)
  {
    data = data + '\n';
    messages += data;
    
    io.emit('synth', data);
  });
});

server.listen(process.env.PORT || 3000, function(){
  console.log('listening on *:' + (process.env.PORT || 3000));
});
