$(function () {
  console.log('index----------')
});

/***************************/
function Super() {
  this.colors = ['c', 'a', 'b'];

}

Super.prototype.print = function () {
  console.log(this.colors);
};

function Sub() {
  Super.call(this);
}

Sub.prototype = new Super();
Sub.prototype.constructor = Sub;

var instance1 = new Sub();
instance1.colors.push('v');
console.log(instance1.print());

var instance2 = new Sub();
console.log(instance2.print());
