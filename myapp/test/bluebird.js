/**
 * Created by Administrator on 2016/10/31.
 */

var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var onFulfilled = function (data) {
    console.log(data)
};
var onRejected = function (e) {
    console.log('报错啦--', e)
};

fs.readFileAsync('package.json', "utf8").then(onFulfilled).catch(function(err){
    //轻松处理所有出现的异常
    console.log("=========" + err);
});