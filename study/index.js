'use strict';
var http = require('http');
var path = require('path');
var express = require('express');
var SocketIo = require('socket.io');

var app = express();
app.use(express.static(path.join(__dirname, './public')));

var server = http.Server(app);
var io = new SocketIo(server, {
    pingTimeout: 1000 * 10,
    pingInterval: 100 * 2,
    transports: ['websocket', 'polling'],
    allowUpgrades: true,
    httpCompression: true
    // path: '/js', //提供客户端js路径
    // serveClient: false //是否禁用客户端js
});

/*app.get('/', function (req, res) {
    res.send('test docker');
});*/

io.set("authorization", (handshakeData, accept) => {
    // console.log(handshakeData.headers);
    if(handshakeData.headers.cookie) {
        handshakeData.headers.userId = Date.now();
        accept(null, true);
    } else {
        accept('authorization error', false);
    }

});

var usersMap = new Map();

io.on('connection', (socket) => {
    console.log(socket.handshake.headers.userId);


    socket.on('serverEvents.online', (nickName) => {
        socket.nickName = nickName;
        io.emit('clientEvents.online', nickName);
    });

    usersMap.set(socket.id, socket);

    for(let client of usersMap.values()) {
        if(client.id != socket.id) {
            client.emit('clientEvents.welcome', 'welcome');
        }
    }

    // socket.on('message', (event) => {
    //     console.log('Received message from client!', event);
    // });

    socket.on('disconnect', () => {
        console.log('Server has disconnected');
        socket.broadcast.emit('clientEvents.offline', socket.nickName);
    });

    /*setInterval(function () {
        socket.emit('clientEvents.message', {hello: '服务器时间' + new Date().toString()});
    }, 2000);*/

});

server.listen('8000', (err) => {
    if (err) {
        return console.error(err);
    }
    console.log('Server started, listening port %s', server.address().port);
});
