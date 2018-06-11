/**
 * Created by Administrator on 2016/11/3.
 */

var multer = require('multer');

var storage = multer.diskStorage({
    //设置上传文件路径,以后可以扩展成上传至七牛,文件服务器等等
    //Note:如果你传递的是一个函数，你负责创建文件夹，如果你传递的是一个字符串，multer会自动创建
    destination: process.cwd() + '/uploads',
    //TODO:文件区分目录存放
    //给上传文件重命名
    filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split(".");
        //cb(null, file.fieldname + "." + fileFormat[fileFormat.length - 1]);
        cb(null, file.originalname);
    }
});

//添加配置文件到muler对象。
var upload = multer({
    storage: storage
    //其他设置请参考multer的limits
    //limits:{}
});

module.exports = upload;