"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var capitalize = exports.capitalize = function capitalize(str) {
  var firstCharUpperCase = str.charAt(0).toUpperCase();
  return "" + firstCharUpperCase + str.substr(1, str.length - 1).toLowerCase();
};
//# sourceMappingURL=utils.js.map