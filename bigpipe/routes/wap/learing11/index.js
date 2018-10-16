var express = require('express');
var router = express.Router();

var httpApi = require('../../../common/http');

router.all('*', function (req, res, next) {
  res.locals = {
    imageSrc: "/images/wap/learning11",
    jsPath: "/js/wap/learning11",
    cssPath: "/css/wap/learning11"
  };
  next();
});

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('wap/learning11/index', {
    layout: "wap/common/layout",
    title: '51Talk-无忧英语111'
  });
});

router.get('/dataApi/user', async function (req, res, next) {
  var result = await httpApi.getUserByAsync('user');
  console.log('result------------->', result.data);
  res.json({
    code: '1',
    result: result.data
  })
});

module.exports = router;
