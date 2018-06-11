// mongoose 链接
var mongoose = require('mongoose');
var db = mongoose.createConnection('mongodb://127.0.0.1:27017/nodetest1');

// 链接错误
db.on('error', function (error) {
    console.log(error);
});

module.exports = {
    mongoose: mongoose,
    db: db
};