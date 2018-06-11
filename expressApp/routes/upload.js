var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');
var fs = require('fs');

/* GET home page. */
router.get('/basic_upload', function(req, res, next) {
    console.log(".....basic_upload");
    res.render('basic_upload', {
        title: 'Express'
    });
});

router.get('/big_file_upload', function(req, res, next) {
    console.log(".....big_file_upload");
    res.render('big_file_upload', {
        title: 'Express'
    });
});

/**
 * 文件上传multiparty
 * @param  {[type]}     req   [description]
 * @param  {[type]}     res   [description]
 * @param  {multiparty} next) {               var form [description]
 * @return {[type]}           [description]
 */
router.post('/upload', function(req, res, next) {
    var form = new multiparty.Form();
    form.on('error', function(err) {
        console.log('Error parsing form: ' + err.stack);
    });
    form.encoding = 'utf-8';
    form.uploadDir = "public/uploads/";
    form.maxFilesSize = 2 * 1024 * 1024;
    form.parse(req, function(err, fields, files) {
        console.log("文件说明" + fields.fileRemark[0])
        console.log("文件路径：" + files.file[0].path);
        console.log("文件大小：" + files.file[0].size)
        res.json({
            "url": "http://localhost:3001/" + files.file[0].path.replace("public\\", "").replace(/\\/g, "\/"),
            "alt": fields.fileRemark[0]
        })
    });
});

/**
 * 断点续传的方法
 * @param  {[type]}     req   [description]
 * @param  {[type]}     res   [description]
 * @param  {multiparty} next) {               var form [description]
 * @return {[type]}           [description]
 */
router.post("/load", function(req, res, next) {
    console.log("断点续传......");
    var form = new multiparty.Form();
    var count = 0;
    var fileName = "";
    var isLastChunk = false;
    var chunkImgData = null; //分块数据
    var chunks = [];
    var size = 0;
    form.on('error', function(err) {
        console.error('Error parsing form: ' + err.stack);
    });

    //获取表单的文本字段
    form.on("field", function(name, value) {
        console.log(name + "       >>>>>>>>>>>>>>>" + value)
        if (name === "fileName") {
            fileName = value;
        }else if(name==="isLastChunk"){
            isLastChunk=value;
        }
    });

    //拿到分段上传的数据
    form.on('part', function(part) {
        // console.log(part);
        console.log("图片名称:>>>>>>>>>>>>>>>>:" + part.filename + ">>>>>>" + part.name)
        // Object.keys(part).forEach(function(name) {
        //     console.log('>>>>>>>>>>> ' + name);
        // });

        if (!part.filename) {
            console.log('got field named ' + part.name);
            // part.resume();
        }

        if (part.filename) {
            count++;
            console.log('got file named ' + part.name);
            // part.resume();
        }

        chunks = [];
        size = 0;
        //分段数据在part的data事件中获取，一次请求中的数据会放分成多个buffer，所以需要一个imgFile数组累加
        part.on("data", function(chunk) {
            if (chunk.length === 0) {
                return;
            }
            chunks.push(chunk);
            size += chunk.length;
        });

        //分段数据结束
        part.on("end", function() {
            chunkImgData = bufferUtils(chunks, size);
        });

        part.on('error', function(err) {
            console.error(err);
        });
    });

    // Close emitted after form parsed
    form.on('close', function() {
        console.log("================================="+fileName);
        // console.log('__dirname：', __dirname);
        // console.log('process.cwd()：', process.cwd())
        var filename = process.cwd() + '\\public\\uploads\\' + fileName;
        saveFile(filename, chunkImgData,size);
        console.log('Upload completed!');
    });

    form.parse(req);
    res.json({"success":true})

});

/**
 * 写数据到文件
 * @param  {[type]} path [description]
 * @param  {[type]} data [description]
 * @param  {[type]} size [description]
 * @return {[type]}      [description]
 */
function saveFile(path, data,size) {
    fs.open(path, 'a', function(err, fd) {
        if (err) {
            throw err;
        }
        fs.write(fd, data, 0, size, function() {
            fs.close(fd);
        })
    })
}

/**
 * buffer组装的工具类
 * @param  {[type]} chunks [description]
 * @param  {[type]} size   [description]
 * @return {[type]}        [description]
 */
function bufferUtils(chunks, size) {
    var data = new Buffer(size);
    for (var i = 0, pos = 0, l = chunks.length; i < l; i++) {
        var chunk = chunks[i];
        chunk.copy(data, pos);
        pos += chunk.length;
    }
    return data;
}

module.exports = router;
