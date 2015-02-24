'use strict';

var spawn = require('child_process').spawn;

var codePoints = require('./');
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

test('"code-points" command inside a TTY context', function(t) {
  t.plan(14);

  var cmd = function(args) {
    var cp = spawn('node', [pkg.bin].concat(args), {
      stdio: [process.stdin, null, null]
    });
    cp.stdout.setEncoding('utf8');
    cp.stderr.setEncoding('utf8');
    return cp;
  };

  cmd(['0']).stdout.on('data', function(output) {
    t.strictEqual(output, '48\n', 'should print code points of string.');
  });

  cmd(['00', '--unique']).stdout.on('data', function(output) {
    t.strictEqual(
      output, '48\n',
      'should print code points of string without duplication, using --unique option.'
    );
  });

  cmd(['\\0\\0', '--uniq']).stdout.on('data', function(output) {
    t.strictEqual(output, '92,48\n', 'should accept --uniq alias.');
  });

  cmd(['aåa', '-u']).stdout.on('data', function(output) {
    t.strictEqual(output, '97,229\n', 'should accept -u alias.');
  });

  var fileCodePoints = '42,32,116,101,120,116,61,97,117,116,111,10\n';

  cmd(['--file', '.gitattributes']).stdout.on('data', function(output) {
    t.strictEqual(
      output,
      fileCodePoints,
      'should print code points of the file content, using --file flag.'
    );
  });

  cmd(['-f', '.gitattributes']).stdout.on('data', function(output) {
    t.strictEqual(output, fileCodePoints, 'should accept -f alias.');
  });

  cmd(['--version']).stdout.on('data', function(output) {
    t.strictEqual(output, pkg.version + '\n', 'should print version using --verion flag.');
  });

  cmd(['-v']).stdout.on('data', function(output) {
    t.strictEqual(output, pkg.version + '\n', 'should use -v as an alias of --version.');
  });

  cmd(['--help']).stdout.on('data', function(output) {
    t.ok(/Usage/.test(output), 'should print usage information using --help flag.');
  });

  cmd(['-h']).stdout.on('data', function(output) {
    t.ok(/Usage/.test(output), 'should use -h as an alias of --help.');
  });

  cmd([]).stdout.on('data', function(output) {
    t.ok(/Usage/.test(output), 'should print usage information when it takes no arguments.');
  });

  cmd(['--file']).stdout.on('data', function(output) {
    t.ok(
      /Usage/.test(output),
      'should print usage information when --file flag is enabled but no files are specified.'
    );
  });

  cmd(['--file', 'foo']).stderr.on('data', function(output) {
    t.ok(/Cannot/.test(output), 'should print an error when the file doesn\'t exist.');
  });

  cmd(['--file', 'dist']).stderr.on('data', function(output) {
    t.ok(/not a file/.test(output), 'should print an error when the path is not a file.');
  });
});

test('"code-points" command outside a TTY context', function(t) {
  t.plan(2);

  var cmd = function(args) {
    var cp = spawn('node', [pkg.bin].concat(args), {
      stdio: ['pipe', null, null]
    });
    cp.stdout.setEncoding('utf8');
    cp.stderr.setEncoding('utf8');
    return cp;
  };

  var cp = cmd([]);
  cp.stdout.on('data', function(output) {
    t.equal(output, '97,32,98\n', 'should print code points of STDIN.');
  });
  cp.stdin.end('a b');

  var cpNoInput = cmd([]);
  cpNoInput.stdout.on('data', function(output) {
    t.equal(output, '\n', 'should print only a newline when it takes no input.');
  });
  cpNoInput.stdin.end('');
});
