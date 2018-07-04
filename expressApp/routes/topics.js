var express = require('express');
var router = express.Router();
var axios = require('axios');
var eventproxy = require('eventproxy'); //多并发处理

/* GET users listing. */
router.get('/', function (req, res) {

    var ep = eventproxy.create("ajax1", "ajax2", "ajax3", function (rs1, rs2, rs3) {
        res.render('topics', {
            title: '强大的异步控制',
            data1: rs1.data,
            data2: rs2.data,
            data3: rs3.data
        })
        ;
    });

    axios.get('https://cnodejs.org/api/v1/topics?page=1&limit=5').then((res) => {
        ep.emit("ajax1", res.data);
    });

    axios.get('https://cnodejs.org/api/v1/topics?page=2&limit=5').then((res) => {
        ep.emit("ajax2", res.data);
    });

    axios.get('https://cnodejs.org/api/v1/topics?page=3&limit=5').then((res) => {
        ep.emit("ajax3", res.data);
    });


});

module.exports = router;
