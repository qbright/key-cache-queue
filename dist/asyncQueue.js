(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.asyncQueue = factory());
}(this, (function () { 'use strict';

  var input = {
    aaa: function aaa() {
      console.log(12312);
    }
  };

  return input;

})));
//# sourceMappingURL=asyncQueue.js.map
