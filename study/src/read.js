var readline = require('readline');
var fs = require('fs');
var os = require('os');

var fReadName = '../assets/01.txt';
var fWriteName = '../assets/read_line.js';
var fRead = fs.createReadStream(fReadName);
var fWrite = fs.createWriteStream(fWriteName);


var objReadline = readline.createInterface({
    input: fRead
    // 这是另一种复制方式，这样on('line')里就不必再调用fWrite.write(line)，当只是纯粹复制文件时推荐使用
    // 但文件末尾会多算一次index计数   sodino.com
    //  output: fWrite,
    //  terminal: true
});

var ccc = '';
objReadline.on('line', (line) => {
    var aa = line.split(' ').join(',');
    ccc += aa + '#';
});

objReadline.on('close', () => {
    console.log('read_line close...');
    var bbb = ccc.substr(0, ccc.length - 1);
    var cc = '';
    bbb.split('#').forEach(function (item) {
        cc += '[' + item + '],'
    });
    var eee = cc.substr(0, cc.length - 1);
    fWrite.write("var dataTest = [" + eee + "];\nwindow.dataTest = dataTest;");
}); 