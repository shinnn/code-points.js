/*!
 * code-points | MIT (c) Shinnosuke Watanabe
 * https://github.com/shinnn/code-points.js
*/
'use strict';

function codePoints(str) {
  if (typeof str !== 'string') {
    throw new TypeError(str + ' is not a string.');
  }

  var result = [];

  var index = 0;
  while (index < str.length) {
    var point = codePoint(str.charAt(index) + str.charAt(index + 1));
    result.push(point);

    if (point > 0xffff) {
      index += 2;
    } else {
      index += 1;
    }
  }

  return result;
}

var codePoint = require('code-point');
module.exports = codePoints;
