/**
 * Created by Administrator on 2016/10/31.
 */
var util = require('util');
// var EventEmitter = require('events').EventEmitter;
// var event = new EventEmitter();
//
// event.on('some_event', function () {
//     console.log('some_event 被触发');
// });
//
// setTimeout(function () {
//     event.emit('some_event');
// }, 1000);

function somethingComplicated() {
    setTimeout(function () {
        console.log('doing');
    }, 1000);
}

function doSomething(callback) {
    somethingComplicated();
    process.nextTick(callback);
}

console.log('before doing');

doSomething(function () {
    console.log('done');
});
