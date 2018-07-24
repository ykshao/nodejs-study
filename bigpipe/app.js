var express = require('express');
// var cluster = require('cluster');
// var numCPUs = require('os').cpus().length;
var path = require('path');
// var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('hbs');

/************
 *
 * 连接数据库
 */
var app = express();

/**************
 * 跨域处理
 */
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    next();
});


// view engine setup
app.engine('html', hbs.__express);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

//hbs 配置
hbs.registerPartials(__dirname + '/views');
var blocks = {};
hbs.registerHelper('extend', function(name, context) {
  var block = blocks[name];
  if (!block) {
    block = blocks[name] = [];
  }

  block.push(context.fn(this)); // for older versions of handlebars, use block.push(context(this));
});
hbs.registerHelper('block', function(name) {
  var val = (blocks[name] || []).join('\n');

  // clear the block
  blocks[name] = [];
  return val;
});
// 模板方法
var helper = require('./helper');

// uncomment after placing your favicon in /public
//app.use(favicon(certificate.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//环境部署修改
app.use(express.static(path.join(__dirname, 'public')));

/**************
 * 配置路由
 */
var dataList = require('./routes/data');
var routes = require('./routes/index');
var users = require('./routes/users');
var learning11 = require('./routes/wap/learing11/index');

app.use('/', routes);
app.use('/users', users);
app.use('/data', dataList);
app.use('/wap/learning11', learning11);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


/**
 * Get port from environment and store in Express.
 */
// if (cluster.isMaster) {
//   //判断进程是否工作
//   console.log('[master] ' + "start master...");
//   for (var i = 0; i < numCPUs; i++) {
//     //根据CPU通道 开启进程
//     cluster.fork();
//   }
//   cluster.on('listening', function (worker, address) {
//     //为cluster绑定listening事件
//     console.log('[master] ' + 'listening: worker' + worker.id + ',pid:' + worker.process.pid + ', Address:' + address.address + ":" + address.port);
//   });
//   cluster.on('exit', function (worker, code, signal) {
//     console.log('worker ', worker.process.pid, " is died");
//     process.exit();
//   });
// } else {
  //进程已启动 开启http服务
  //console.log('[worker] ' + "start worker ..." + cluster.worker.id);
  var port = process.env.PORT || '3000';
  app.set('port', port);
  app.listen(port,function() {
    console.log('Express server listening on port ' + port);
  });
// }
