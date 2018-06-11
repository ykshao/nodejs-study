/**
 * Created by Administrator on 2016/11/4.
 */

var path = require('path');

// 通过NODE_ENV来设置环境变量，如果没有指定则默认为开发环境
// production dev
var env = process.env.NODE_ENV || 'dev';
env = env.toLowerCase();
// 载入配置文件
var file = path.resolve(__dirname, env);
try {
    module.exports = require(file);
    console.log('加载环境配置文件: [%s] %s', env, file);
} catch (err) {
    console.error('不能加载环境配置文件: [%s] %s', env, file);
    throw err;
}