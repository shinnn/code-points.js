/*jshint unused:true */
'use strict';

var spawn = require('child_process').spawn;

var $ = require('gulp-load-plugins')();
var gulp = require('gulp');
var mergeStream = require('merge-stream');
var rimraf = require('rimraf');
var stylish = require('jshint-stylish');
var toCamelCase = require('to-camel-case');

var pkg = require('./package.json');
var bower = require('./bower.json');

var funName = toCamelCase(pkg.name);

var banner = [
  '/*!',
  ' * code-points | MIT (c) Shinnosuke Watanabe',
  ' * https://github.com/shinnn/code-points.js',
  '*/\n'
].join('\n');

var moduleExports = '\nvar codePoint = require(\'code-point\');\n' +
                    'module.exports = <%= funName %>;\n';

gulp.task('lint', function() {
  gulp.src(['{,src/}*.js'])
    .pipe($.jshint())
    .pipe($.jshint.reporter(stylish))
    .pipe($.jscs('.jscs.json'));
  gulp.src('*.json')
    .pipe($.jsonlint())
    .pipe($.jsonlint.reporter());
});

gulp.task('clean', rimraf.bind(null, 'dist'));

gulp.task('build', ['lint', 'clean'], function() {
  return mergeStream(
    gulp.src(['src/*.js'])
      .pipe($.header(banner + '!function() {\n', {pkg: pkg}))
      .pipe($.footer('\nwindow.<%= funName %> = <%= funName %>;\n}();\n', {
        funName: funName
      }))
      .pipe($.rename(bower.main))
      .pipe(gulp.dest('')),
    gulp.src(['src/*.js'])
      .pipe($.header(banner, {pkg: pkg}))
      .pipe($.footer(moduleExports, {funName: funName}))
      .pipe($.rename(pkg.main))
      .pipe(gulp.dest(''))
  );
});

gulp.task('test', ['build'], function(cb) {
  var cp = spawn('node', ['test.js'], {stdio: 'inherit'});
  cp.on('close', function(code) {
    cb(code ? new Error('Test failed.') : null);
  });
});

gulp.task('watch', function() {
  gulp.watch(['{,src/}*.js'], ['test']);
  gulp.watch(['*.json', '.jshintrc'], ['lint']);
});

gulp.task('default', ['test', 'watch']);
