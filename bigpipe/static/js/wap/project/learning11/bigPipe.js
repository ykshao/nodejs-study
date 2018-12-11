var BigPipe = function () {
  this.callbacks = {};
};

BigPipe.prototype.ready = function (key, callback) {
  if (!this.callbacks[key]) {
    this.callbacks[key] = [];
  }
  this.callbacks[key].push(callback);
};

BigPipe.prototype.set = function (key, data) {
  var callbacks = this.callbacks[key] || [];
  for (var i = 0; i < callbacks.length; i++) {
    callbacks[i].call(this, data);
  }
};
