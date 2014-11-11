/*!
 * code-points | MIT (c) Shinnosuke Watanabe
 * https://github.com/shinnn/code-points.js
*/
'use strict';

var fs = require('fs');

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
var pkg = require('./package.json');

function help() {
  var chalk = require('chalk');

  console.log([
    chalk.cyan(pkg.name) + chalk.gray(' v' + pkg.version),
    pkg.description,
    '',
    'Usage1: ' + pkg.name + ' <string>',
    'Usage2: ' + pkg.name + ' --file <file path>',
    'Usage3: cat <file path> | ' + pkg.name,
    '',
    'Options:',
    chalk.yellow('--unique, --uniq, -u') + '  Remove duplicates from result',
    chalk.yellow('--file,           -f') + '  Use a file as an input',
    chalk.yellow('--help,           -h') + '  Print usage information',
    chalk.yellow('--version,        -v') + '  Print version',
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
  console.log(pkg.version);
} else if (argv.help) {
  help();
} else if (process.stdin.isTTY) {
  if (argv.file) {
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
