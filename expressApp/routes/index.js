var express = require('express');
var router = express.Router();
// var utility = require('utility');
const { promisify } = require('util');
const { readFile } = require('fs');
const readFileAsync = promisify(readFile);

// var http = require('http');

var file = require('../util/file');

/*var options = {
    hostname: 'vcs.51talk.com',
    path: '/api/v4/projects/343/repository/branches',
    method: 'GET',
    headers: {
        'PRIVATE-TOKEN': 'xNxRnb_oFxaLZzzCPe9R'
    }
};*/

/* GET home page. */
router.get('/', function (req, res) {
    var q = req.query.q;
    var md5Value = "";
    if (q != undefined) {
        // 调用 utility.md5 方法，得到 md5 之后的值
        // 之所以使用 utility 这个库来生成 md5 值，其实只是习惯问题。每个人都有自己习惯的技术堆栈，
        // 我刚入职阿里的时候跟着苏千和朴灵混，所以也混到了不少他们的技术堆栈，仅此而已。
        // utility 的 github 地址：https://github.com/node-modules/utility
        // 里面定义了很多常用且比较杂的辅助方法，可以去看看
        md5Value = utility.md5(q);
    }
    res.render('index', {title: '首页', md5Value: md5Value});

    /*if(req.protocol === 'https') {
        res.status(200).send('Welcome to Safety Land!');
    }
    else {
        res.status(200).send('Welcome!');
    }*/


    //get 请求外网
    /*var dataResp = '';
    var reqResp = http.request(options, function (resData) {
        resData.on('data', function (chunk) {
            dataResp+=chunk
        });
        resData.on('end', function () {
            res.render('index', {
                title: '首页',
                list: JSON.parse(dataResp),
                username: req.session.userName
            });
        });
    });

    reqResp.end();*/


});

router.post('/Landing/getUserLottery', function (req, res) {
    res.json({
        name: 'hello',
        age: 30
    });
});

//文件上传服务
/**
 * file.single('avatar') 单文件上传
 * file.array('avatar', 5) 多文件上传
 * file.fields()  混合文件上传
 */

router.post('/profile', file.single('avatar'), function (req, res) {
    // req.file 是 `avatar` 文件
    // req.body 对象中是表单中提交的文本字段(如果有)
    var file = req.file;

    if (file) {
        res.send('文件上传成功');
        console.log('文件类型：%s', file.mimetype);
        console.log('原始文件名：%s', file.originalname);
        console.log('文件大小：%s', file.size);
        console.log('文件保存路径：%s', file.path);
        console.log(file);
    }
});

router.post('/photos/upload', file.array('photos', 12), function (req, res) {
    // req.files 是 `photos` 文件数组
    // req.body 对象中是表单中提交的文本字段(如果有)
    for (var i = 0; i < req.files.length; i++) {
        var file = req.files[0];
        console.log('文件类型：%s', file.mimetype);
        console.log('原始文件名：%s', file.originalname);
        console.log('文件大小：%s', file.size);
        console.log('文件保存路径：%s', file.path);
    }
    res.json({ret_code: 1, ret_msg: '文件上传成功'});
});

router.get('/logout', function (req, res) {
    req.session.userName = null; // 删除session
    res.redirect('/');
});

router.post('/in', function (req, res) {
    if (req.body.username == 'admin' && req.body.pwd == '123') {
        req.session.userName = req.body.username; // 登录成功，设置 session
        res.redirect('/');
    }
    else {
        res.json({ret_code: 1, ret_msg: '账号或密码错误'});// 若登录失败，重定向到登录页面
    }
});

router.get('/file', async function (req, res, next){
    const data = await readFileAsync('./package.json');
    res.send(data.toString());
});

module.exports = router;
