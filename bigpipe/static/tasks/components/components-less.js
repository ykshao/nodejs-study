var gulp = require('gulp-param')(require('gulp'), process.argv);
var header = require('gulp-header');
var less = require("gulp-less");
var autoprefix = require('gulp-autoprefixer');
var makeUrlVer = require('gulp-make-css-url-version');

var pkg = require('../../package.json');
var banner = ['/*!',
  ' * <%= pkg.homepage %>',
  ' * copyright (c) 2016 <%= pkg.name %>',
  ' * author: <%= pkg.author %>',
  ' */',
  ''].join('\n');

gulp.task('components-less', function (project, type) {
  gulp.src('components/' + type + '/' + project + '/less/' + '*.less')
    .pipe(header(banner, {pkg: pkg}))
    .pipe(less({compress: false})).on('error', function (event) {
    console.log(event);
  })
    .pipe(autoprefix())
    .pipe(makeUrlVer())
    .pipe(gulp.dest('components/' + type + '/' + project + '/css/'))
});

