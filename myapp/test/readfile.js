/**
 * Created by Administrator on 2016/10/31.
 */

var fs = require('fs');
// fs.readFile('../package.json', "utf8", function (err, data) {
//     if (err) {
//         console.error(err);
//     } else {
//         console.log(data);
//     }
// });

var data = fs.readFileSync('../package.json', "utf8");
console.log(data);
console.log("end==========");