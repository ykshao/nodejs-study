var Memcached = require('memcached');
var events = require('events');
var fs = require('fs');
/**
 * Created by Administrator on 2016/11/1.
 * 异步场景多任务回调
 */

var toString = Object.prototype.toString;

var isType = function (type) {
    return function (obj) {
        return toString.call(obj) == '[object ' + type + ']';
    }
};

var isString = isType('String');
var isFunction = isType('Function');

/**
 * 多个异步场景回调控制
 */
var after = function (times, callback) {
    var count = 0, results = {};
    return function (key, value) {
        results[key] = value;
        count++;
        if (count === times) {
            callback(results)
        }
    }
};

//测试使用
var done = after(1, function (results) {
    console.log('results------------------->%s', JSON.stringify(results));
});

// var emitter = new events.EventEmitter();
// emitter.on('done', done);
//
// fs.readFile('./topics.txt', 'utf8', function (err, template) {
//     emitter.emit('done', 'template', template);
// });

//====================
var memcached = new Memcached("127.0.0.1:11211");

memcached.set("hello", 'ss1667382', 10000, function (err) {
    if (err) console.error(err);
});

memcached.get("hello", function (err, result) {
    if (err) console.error(err);
    console.log('get---------------->%s', result);
});