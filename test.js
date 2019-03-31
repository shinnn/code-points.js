'use strict';

var spawn = require('child_process').spawn;

var codePoints = require('.');
var test = require('tape');
var pkg = require('./package.json');

test('codePoints()', function(t) {
  t.plan(7);

  t.equal(codePoints.name, 'codePoints', 'should have a function name.');

  t.deepEqual(
    codePoints('10'),
    [49, 48],
    'should return code points of the string.'
  );

  t.deepEqual(
    codePoints('0𧌠嶲0𧏨'),
    [48, 160544, 195060, 48, 160744],
    'should return code points of the string considering surrogate pairs.'
  );

  t.deepEqual(
    codePoints('0𧌠嶲0嶲', {unique: true}),
    [48, 160544, 195060],
    'should return code points of the string without duplication, using `unique` option.'
  );

  t.deepEqual(
    codePoints(''),
    [],
    'should return an empty array when it takes an empty string.'
  );

  t.throws(
    codePoints.bind(null),
    /TypeError.*not a string.*must be a string/,
    'should throw an error when it takes no arguments.'
  );

  t.throws(
    codePoints.bind(null, ['a', 'b']),
    /TypeError.*not a string.*must be a string/,
    'should throw an error when it takes a non-string argument.'
  );
});
