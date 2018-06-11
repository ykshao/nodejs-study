var express = require('express');
var router = express.Router();
var mongoserver = require('../mongoserver');
var mongoose = mongoserver.mongoose;
var db = mongoserver.db;

router.all('*', function(req, res, next) {
    res.locals = {
        jsPath: "/js/"
    };
    next();
});

// 模板方法
var helper = require('../helper');

// Schema 结构
var mongooseSchema = new mongoose.Schema({
    username: {type: String, default: '匿名用户'},
    title: {type: String},
    content: {type: String},
    time: {type: Date, default: Date.now},
    age: {type: Number}
});

// 添加 mongoose 静态方法，静态方法在Model层就能使用
mongooseSchema.statics.findbytitle = function (title, callback) {
    return this.model('mongoose').find({title: title}, callback);
};

mongooseSchema.statics.findAll = function (callback) {
    return this.model('mongoose').find({}, callback);
};

// model
var mongooseModel = db.model('mongoose', mongooseSchema);

/* GET users listing. */
router.get('/', function (req, res, next) {
    console.log('发送异步请求到接口');

    res.send('respond with a resource');

});

/* 用户列表 */
router.get('/list', function (req, res, next) {
    // 基于静态方法的查询
    mongooseModel.findAll(function (error, result) {
        console.log(result);
        if (error) {
            console.log(error);
        } else {
            res.render('user_list', {
                data: result
            });
        }
    });
});

router.get('/add', function (req, res, next) {
    res.render('user_add', {
        title: 'Express'
    });
});

router.get('/detail', function (req, res, next) {
    var criteria = {title: 'news'}; // 查询条件
    var fields = {title: 1, content: 1, time: 1}; // 待返回的字段
    var options = {};
    mongooseModel.find(criteria, fields, options, function (error, result) {
        if (error) {
            console.log(error);
        } else {
            //console.log(result);
        }
    });
});

//添加请求
router.post('/add', function (req, res, next) {
    var username = req.body.username;
    var title = req.body.title;
    var doc = {
        username: username,
        title: title,
        content: "士大夫士大夫"
    };
    mongooseModel.create(doc, function (error) {
        if (error) {
            console.log(error);
        } else {
            console.log('save ok');
            res.send({code: "1", msg: "成功===="});
        }
    });
});

//添加请求
router.post('/del', function (req, res, next) {
    var id = req.body.id;
    var conditions = {_id: id};
    mongooseModel.remove(conditions, function (error) {
        if (error) {
            console.log(error);
        } else {
            console.log('delete ok!');
            res.send({code: "1", msg: "成功===="});
        }
    });
});

// 修改记录
// mongooseModel.update(conditions, update, options, callback);
// var conditions = {username : 'model_demo_username'};
// var update     = {$set : {age : 27, title : 'model_demo_title_update'}};
// var options    = {upsert : true};
// mongooseModel.update(conditions, update, options, function(error){
//     if(error) {
//         console.log(error);
//     } else {
//         console.log('update ok!');
//     }
//     //关闭数据库链接
//     db.close();
// });

router.get('/getData', function (req, res, next) {
    res.json({
        title: 'ajax'
    });
});

module.exports = router;
