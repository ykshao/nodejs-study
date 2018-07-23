var express = require('express');
var fs = require('fs');
// var http = require('http');
var https = require('https');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var bodyParser = require('body-parser');

// var mysql = require("mysql");

//db配置
// var con = mysql.createConnection({
//     host: "localhost", //主机 默认为localhost
//     user: "root",
//     password: "123456",
//     database: "node" //数据库名
// });

//连接（成功与否在控制台输出信息）
// con.connect(function(err) {
//     if (err) {
//         console.log('mysql数据库连接失败');
//         return;
//     }
//     console.log('mysql数据库连接成功');
// });

var Config = require('./config/config');

//根据项目的路径导入生成的证书文件
var privateKey = fs.readFileSync(path.join(__dirname, './certificate/private.pem'), 'utf8');
var certificate = fs.readFileSync(path.join(__dirname, './certificate/file.crt'), 'utf8');

var credentials = {key: privateKey, cert: certificate};

// 模板继承
var hbs = require('hbs');
var blocks = {};

hbs.registerHelper('extend', function (name, context) {
    var block = blocks[name];
    if (!block) {
        block = blocks[name] = [];
    }
    block.push(context.fn(this)); // for older versions of handlebars, use block.push(context(this));
});

// 改动主要在这个方法
hbs.registerHelper('block', function (name, context) {
    var len = (blocks[name] || []).length;
    var val = (blocks[name] || []).join('\n');
    // clear the block
    blocks[name] = [];
    return len ? val : context.fn(this);
});

var app = express();

/*var httpServer = http.createServer(app);*/
var httpsServer = https.createServer(credentials, app);

//设置跨域访问
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    // res.header("Content-Type", "application/json;charset=utf-8");
    // next();
    if (req.method == 'OPTIONS') {
        res.send(200);
    } else {
        next();
    }
});

//db并不在request里面，之所以能取到是我在app.js中使用中间件挂载到了request上
// app.use(function(req, res, next) {
//     req.con = con;
//     next();
// });

/**
 * 路由模块
 */
var index = require('./routes/index');
var users = require('./routes/users');
var topics = require('./routes/topics');
var upload = require('./routes/upload');
var login = require('./routes/login');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(cookieParser('sessiontest'));

app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'sessiontest', // 对session id 相关的cookie 进行签名
    resave: true,
    saveUninitialized: false, // 是否保存未初始化的会话
    // store: new MongoStore({
    //     db: 'sessiondb'
    // }),
    cookie: {
        maxAge: 1000 * 60 * 3, // 设置 session 的有效时间，单位毫秒
    },
}));

app.use('/', index);
app.use('/users', users);
app.use('/topics', topics);
app.use('/fileUpload', upload);
app.use('/login', login);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'dev' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

//监听
/*
app.listen(Config.port, function () {
    console.log('NODE服务监听的端口=====', Config.port);
    console.log('启动成功');
});
*/

/*
httpServer.listen(Config.port, function() {
    console.log('HTTP Server is running on: http://localhost:%s', Config.port);
});
*/
httpsServer.listen(Config.ss_port, function () {
    console.log('NODE服务监听的端口=====', Config.ss_port);
    console.log('启动成功 HTTPS Server is running on: https://localhost:%s', Config.ss_port);
});