/**
 * js对象继承
 * @param Child
 * @param Parent
 */
function extend(Child, Parent) {
  var F = function(){};
  F.prototype = Parent.prototype;
  Child.prototype = new F();
  Child.prototype.constructor = Child;
  Child.uber = Parent.prototype;
}

/**
 * 新方法
 */
