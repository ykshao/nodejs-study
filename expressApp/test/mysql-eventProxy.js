var mysql = require('mysql');
var http = require('http');

var option = {
    host: 'localhost',//这是我的服务器，随意使用
    port: 3306,
    database: 'node',
    user: 'root',
    password: '123456'
};

var connection = mysql.createConnection(option);
var events = require('events');
var proxy = new events.EventEmitter();
var status = "nodata";//默认状态没有数据

http.createServer(function (request, response) {
    select(send.bind(response));
}).listen(7777);

console.log('服务器启动成功');

//声明回调函数
function send(data) {
    this.writeHead(200);
    this.end(JSON.stringify(data));//向客户端发送数据
}

var select = function (callback) {
    proxy.once('selected', callback);//把回调压队队列中
    if (status === 'nodata') {//如果没有数据，那么去数据库中获取数据,
        status = 'querying';//修改状态为查询中，其它请求再也进不来这个分支了
        connection.query('select * from test', function (err, results) {
            proxy.emit('selected', results);//查询结束后发射事件,并把数据做为参数递给回调函数
            status = 'nodata';//把状态改回为nodata,以供下次查询
        });
    }
};