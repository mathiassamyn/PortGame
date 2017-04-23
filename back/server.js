var express = require('express');
var app = express();

app.use(express.static('../front'));

//socket.io

var server = require('http').Server(app);
var io = require('socket.io')(server);

io.on('connection', function (socket) {
    socket.on('join', function (room) {
        socket.join(room);
    });
    socket.on('pause', function (room) {
        socket.to(room).emit('pause', 'the game has been paused');
    });
    socket.on('resume', function (room) {
        socket.to(room).emit('resume', 'the game has been resumed');
    });
});

server.listen(3000, function () {
    console.log('server up and running at 3000 port');
});