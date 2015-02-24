/*!
 * code-points | MIT (c) Shinnosuke Watanabe
 * https://github.com/shinnn/code-points.js
*/
'use strict';

var argv = require('minimist')(process.argv.slice(2), {
  alias: {
    u: 'unique',
    uniq: 'unique',
    f: 'file',
    h: 'help',
    v: 'version'
  },
  string: ['_', 'file'],
  boolean: ['unique', 'help', 'version']
});

function help() {
  var sumUp = require('sum-up');
  var yellow = require('chalk').yellow;

  var pkg = require('./package.json');

  console.log([
    sumUp(pkg),
    '',
    'Usage1: ' + pkg.name + ' <string>',
    'Usage2: ' + pkg.name + ' --file <file path>',
    'Usage3: cat <file path> | ' + pkg.name,
    '',
    'Options:',
    yellow('--unique, --uniq, -u') + '  Remove duplicates from result',
    yellow('--file,           -f') + '  Use a file as an input',
    yellow('--help,           -h') + '  Print usage information',
    yellow('--version,        -v') + '  Print version',
    ''
  ].join('\n'));
}

function run(str) {
  var points = require('./')(str, {unique: argv.unique});
  console.log(points.join(','));
}

function stderrWriteLn(msg) {
  process.stderr.write(msg + '\n', function() {
    process.exit(1);
  });
}

if (argv.version) {
  console.log(require('./package.json').version);
} else if (argv.help) {
  help();
} else if (process.stdin.isTTY) {
  if (argv.file) {
    var fs = require('fs');

    if (!fs.existsSync(argv.file)) {
      stderrWriteLn('Cannot read the file ' + argv.file + '.');
    } else if (!fs.statSync(argv.file).isFile()) {
      stderrWriteLn(argv.file + ' is not a file.');
    } else {
      run(fs.readFileSync(argv.file).toString());
    }
  } else if (argv._.length === 0) {
    help();
  } else {
    run(argv._[0]);
  }
} else {
  require('get-stdin')(run);
}
