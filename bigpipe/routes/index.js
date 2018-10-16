var express = require('express');
var router = express.Router();

router.all('*', function (req, res, next) {
  res.locals = {
    // csslink: "/css/wap/learning11/learning11.css",
    // imagessrc: "/images/wap/learning11/",
    // jssrc: "/js/wap/project/learning11/vendor.js",
    // jsPath: "/js/wap/project/learning11/",
    // cssPath: "/css/wap/project/learning11/"
  };
  next();
});

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('user_add', {
    layout: "layout",
    title: 'nodeJS express 测试'
  });
});

module.exports = router;
