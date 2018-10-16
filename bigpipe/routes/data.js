var express = require('express');
var router = express.Router();
var Mock = require('mockjs');

// 使用 Mock
var data1 = Mock.mock({
  // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
  'list|1-10': [{
    // 属性 id 是一个自增数，起始值为 1，每次增 1
    'id|+1': 1
  }]
});

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send(JSON.stringify(data1));
});

module.exports = router;
