/**
 * Created by Administrator on 2016/11/1.
 */

var net = require('net');

var server = net.createServer(function (socket) {
    console.log(socket.address());
    socket.write("Echo server\r\n");
    socket.pipe(socket);
    console.log("disconnect=========");
    setTimeout(function () {
        socket.end('bye\r\n');
        console.log('bye');
    }, 5000);
});

server.listen(1337, '127.0.0.1');
console.log("Tcp server is listening port 1337...");