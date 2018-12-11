// mongoose 链接
var mongoose = require('mongoose');
var db = mongoose.createConnection('mongodb://127.0.0.1:27017/nodetest1');

// 链接错误
db.on('error', function (error) {
  console.log(error);
});

/*module.exports = {
  mongoose: mongoose,
  db: db
};*/

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
  return this.model('article').find({title: title}, callback);
};

mongooseSchema.statics.findAll = function (callback) {
  return this.model('article').find({}, callback);
};

// model
var mongooseModel = db.model('article', mongooseSchema);

// 增加记录 基于model操作


for(var i=0; i<100; i++) {
    var doc = {
        username: 'model_demo_username' + i,
        title: 'model_demo_title' + i,
        content: 'model_demo_content' + i
    };
    mongooseModel.create(doc, function (error) {
        if (error) {
            console.log(error);
        } else {
            console.log('save ok');
        }
        // 关闭数据库链接
        db.close();
    });
}


// 基于静态方法的查询
mongooseModel.findAll(function (error, result) {
  if (error) {
    console.log(error);
  } else {
    console.log(result);
  }
  //关闭数据库链接
  db.close();
});
