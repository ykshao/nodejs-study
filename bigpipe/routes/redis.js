var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.json({
        name: '1111'
    });
});

module.exports = router;
