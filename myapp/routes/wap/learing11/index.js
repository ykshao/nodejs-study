var express = require('express');
var router = express.Router();

router.all('*', function(req, res, next) {
  res.locals = {
      cssLink: "/css/wap/learning11/learning11.css",
      imageSrc: "/images/wap/learning11/",
      jsSrc: "/js/wap/project/learning11/vendor.js",
      imgComponentsPath: '/components/wap/learning11/images/',
      jsPath: "/js/wap/project/learning11/",
      cssPath: "/css/wap/project/learning11/"
  };
  next();
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('wap/learning11/index', {
    layout: "wap/layout",
    title: '51Talk-无忧英语111'
  });
});

module.exports = router;
