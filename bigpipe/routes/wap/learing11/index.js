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
router.get('/', async function (req, res, next) {
  res.render('wap/learning11/index', {
    layout: "wap/common/layout",
    title: '51Talk-无忧英语111'
  }, function (err, str) {
    res.write(str)
  });

  var result = await httpApi.getUserByAsync('user');
  console.log('result------------->', result.data);

  var pageLets_list = {
    pageLet1: false,
    pageLet2: false
  }

  function is_end(pageLets) {
    pageLets_list[pageLets] = true;
    for (let x in pageLets_list) {
      if (!pageLets_list[x]) {
        return;
      }
    }
    res.end();
    return;
  }

  function pageLets(pageLets) {
    res.write('<script>bigPipe.set("' + pageLets + '",' + JSON.stringify(result.data) + ');</script>');
    is_end(pageLets)
  }

  setTimeout(function () {
    pageLets("pageLet1");
  }, 1000);
  setTimeout(function () {
    pageLets("pageLet2");
  }, 3000);

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
