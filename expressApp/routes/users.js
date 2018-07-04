var express = require('express');
var router = express.Router();
// 导入MySQL模块
var mysql = require('mysql');

var filter = require('../util/filter');

var dbConfig = require('../db/DBConfig');
var userSQL = require('../db/Usersql');

// 使用DBConfig.js的配置信息创建一个MySQL连接池
var pool = mysql.createPool(dbConfig.mysql);

// 响应一个JSON数据
var responseJSON = function (res, ret) {
    if (typeof ret === 'undefined') {
        res.json({
            code: '-200', msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
};

/* GET users listing. */
router.get('/', function (req, res) {
    if (req.session.userName) {
        // var user = req.session.user;
        // var name = user.name;
        // res.send('你好' + name + '，欢迎来到我的家园。');
        pool.getConnection(function (err, connection) {
            connection.query(userSQL.queryAll, function (err, result) {
                console.log(result);

                if (result) {
                    var resData = {
                        code: 200,
                        msg: '查询成功',
                        data: result
                    };

                    res.render('user', {
                        title: '账户列表',
                        res: resData.data,
                        username: req.session.userName
                    });
                } else {
                    responseJSON(res, '');
                }

                // 释放连接
                connection.release();

            });
        });
    } else {
        res.redirect('/login');
    }
});

router.get('/getUser/:id', function (req, res) {
    pool.getConnection(function (err, connection) {
        var param = req.params;

        connection.query(userSQL.getUserById, [param.id], function (err, result) {
            console.log(result);

            if (result) {
                var resData = {
                    code: 200,
                    msg: '查询成功',
                    data: result
                };

                res.render('userDetail', {
                    title: '账户信息',
                    res: resData.data[0]
                });
            } else {
                responseJSON(res, '');
            }

            // 释放连接
            connection.release();

        });
    });
});

// 添加用户
router.get('/addUser', function (req, res) {
    // 从连接池获取连接
    pool.getConnection(function (err, connection) {
        // 获取前台页面传过来的参数
        var param = req.query || req.params;
        // 建立连接 增加一个用户信息
        connection.query(userSQL.insert, [param.userId, param.password, param.email], function (err, result) {
            if (result) {
                result = {
                    code: 200,
                    msg: '增加成功'
                };
            }

            // 以json形式，把操作结果返回给前台页面
            responseJSON(res, result);

            // 释放连接
            connection.release();

        });
    });
});

module.exports = router;
