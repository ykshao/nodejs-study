/**
 * Created by Administrator on 2016/11/3.
 */

var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // 接收到文件后输出的保存路径（若不存在则需要创建）
        cb(null, process.cwd() + '/uploads');
    },
    //TODO:文件区分目录存放
    //给上传文件重命名
    filename: function (req, file, cb) {
        // 将保存文件名设置为 时间戳 + 文件原始名，比如 151342376785-123.jpg
        cb(null, Date.now() + "-" + file.originalname);
    }
});

//添加配置文件到muler对象。
var upload = multer({
    storage: storage
    //其他设置请参考multer的limits
    //limits:{}
});

module.exports = upload;