/*jshint unused:true */
'use strict';

var pkg = require('./package.json');

var spawn = require('child_process').spawn;

var $ = require('gulp-load-plugins')({config: pkg});
var gulp = require('gulp');
var mergeStream = require('merge-stream');
var rimraf = require('rimraf');
var stylish = require('jshint-stylish');
var toCamelCase = require('to-camel-case');

var banner = require('tiny-npm-license')(pkg);
var funName = toCamelCase(pkg.name);

var moduleExports = '\nvar codePoint = require(\'code-point\');\n' +
                    'module.exports = <%= funName %>;\n';

gulp.task('lint', function() {
  return mergeStream(
    gulp.src('{,src/}*.js')
      .pipe($.jscs(pkg.jscsConfig))
      .pipe($.jshint())
      .pipe($.jshint.reporter(stylish))
      .pipe($.jshint.reporter('fail')),
    gulp.src('*.json')
      .pipe($.jsonlint())
      .pipe($.jsonlint.reporter())
  );
});

gulp.task('clean', rimraf.bind(null, 'dist'));

gulp.task('build', ['lint', 'clean'], function() {
  return mergeStream(
    gulp.src(['src/*.js'])
      .pipe($.header(banner, {pkg: pkg}))
      .pipe($.footer(moduleExports, {funName: funName}))
      .pipe($.rename(pkg.main))
  )
    .pipe(gulp.dest(''));
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
