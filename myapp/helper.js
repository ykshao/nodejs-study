/**
 * Created by Administrator on 2016/10/27.
 */

var hbs = require('hbs');

hbs.registerHelper('showName', function (name, context) {
    return name + "1111"
});

hbs.registerHelper('multiply', function (a, b) {
    return a * b;
});

module.exports = hbs;