var express = require('express');
var router = express.Router();
var utility = require('utility');

var file = require('../util/file');

/* GET home page. */
router.get('/', function (req, res, next) {
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
    res.render('index', {title: 'Express', md5Value: md5Value});

    /*if(req.protocol === 'https') {
        res.status(200).send('Welcome to Safety Land!');
    }
    else {
        res.status(200).send('Welcome!');
    }*/
});

router.post('/Landing/getUserLottery', function (req, res, next) {
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
router.post('/upload', file.single('avatar'), function (req, res, next) {
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


module.exports = router;
