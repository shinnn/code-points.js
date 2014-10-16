'use strict';

function codePoints(str, option) {
  option = option || {unique: false};

  if (typeof str !== 'string') {
    throw new TypeError(str + ' is not a string.');
  }

  var result = [];

  var index = 0;
  while (index < str.length) {
    var point = codePoint(str.charAt(index) + str.charAt(index + 1));

    if (!(option.unique && result.indexOf(point) !== -1)) {
      result.push(point);
    }

    if (point > 0xffff) {
      index += 2;
    } else {
      index += 1;
    }
  }

  return result;
}
