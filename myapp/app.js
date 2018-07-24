var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('hbs');

/************
 *
 * 连接数据库
 */
var app = express();

// view engine setup
app.engine('html', hbs.__express);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

//hbs 配置
hbs.registerPartials(__dirname + '/views');
var blocks = {};
hbs.registerHelper('extend', function (name, context) {
    var block = blocks[name];
    if (!block) {
        block = blocks[name] = [];
    }

    block.push(context.fn(this)); // for older versions of handlebars, use block.push(context(this));
});
hbs.registerHelper('block', function (name) {
    var val = (blocks[name] || []).join('\n');

    // clear the block
    blocks[name] = [];
    return val;
});

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname,'public','images','favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

//环境部署修改
app.use(express.static(path.join(__dirname, 'public')));

/**************
 * 跨域处理
 */
//设置跨域访问
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    if (req.method == 'OPTIONS') {
        res.send(200);
    } else {
        next();
    }
});

/**************
 * 配置路由
 */
var routes = require('./routes/index');
var users = require('./routes/users');
var learning11 = require('./routes/wap/learing11/index');

app.use('/', routes);
app.use('/users', users);
app.use('/wap/learning11', learning11);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


/**
 * Get port from environment and store in Express.
 */
var port = process.env.PORT || '3000';
app.set('port', port);
app.listen(port, function () {
    console.log('服务器成功启动，监听的端口为 ' + port);
});
