(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.output = factory());
}(this, (function () { 'use strict';

  var input = {
    aaa: function aaa() {
      console.log(12312);
    }
  };

  return input;

})));
//# sourceMappingURL=output.js.map
