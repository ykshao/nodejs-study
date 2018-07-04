var redis = require('redis');

var client = redis.createClient();

//redis验证 （如果redis没有开启验证，此配置可以不写）
// client.auth("51frontend");

client.on('ready', function () {
    console.log('ready');
});

client.on('error', function (err) {
    console.log('error event - ' + err);
});

client.on('connect', function () {
    // client.set('author', 'Wilson', redis.print);
    // client.get('author', redis.print);
    // console.log('connect');

    client.hmset('short', {'js': 'javascript', 'C#': 'C Sharp'}, redis.print);
    client.hmset('short', 'SQL', 'Structured Query Language', 'HTML', 'HyperText Mark-up Language', redis.print);

    client.hgetall("short", function (err, res) {
        if (err) {
            console.log('Error:' + err);
            return;
        }
        console.dir(res);
    });
});

