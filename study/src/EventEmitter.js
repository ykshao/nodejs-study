var events = require('events');
var util = require('util');

var Person = function (name) {
    this.name = name;
};

util.inherits(Person, events.EventEmitter);

var a1 = new Person('a1');
var a2 = new Person('a2');
var a3 = new Person('a3');

var person = [a1, a2, a3];
person.forEach(function (p) {
    p.on('speak', function (msg) {
        console.log(p.name + ' said ' + msg)
    });
});

// a1.emit('speak', 'hello world 1111');
// a2.emit('speak', 'hello world 2222');
// a3.emit('speak', 'hello world 333');

//read files
