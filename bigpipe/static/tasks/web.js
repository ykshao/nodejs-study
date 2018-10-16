/*
 * 51Talk 自动化工程管理
 */

/* 基础组件 */
var gulp = require('gulp-param')(require('gulp'), process.argv);
var ejs = require("gulp-ejs");

//css
var header = require('gulp-header');
var less = require("gulp-less");
var autoprefix = require('gulp-autoprefixer');
var makeUrlVer = require('gulp-make-css-url-version');

//images
var imagemin = require('gulp-imagemin');

//js
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var transport = require('gulp-seajs-transport');
var babel = require('gulp-babel');

//base
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync');
// var proxy = require('http-proxy-middleware');
var reload = browserSync.reload;
var minifyCss = require('gulp-minify-css');
var jade = require('gulp-jade');
var changed = require('gulp-changed');
var fs = require('fs');

/* banner info */
var pkg = require('../package.json');
var banner = ['/*!',
  ' * <%= pkg.homepage %>',
  ' * copyright (c) 2015 <%= pkg.name %>',
  ' */',
  ''].join('\n');

/**
 * 代理配置
 */
/*var proxy_e1 = proxy('/mock', {
  target: 'https://easy-mock.com/mock/5a815b907e05481d41b22ab1/syk_api',
  changeOrigin: true,
  pathRewrite: {
    '^/mock': '/'
  },
  logLevel: 'debug'
});*/

var log = console.log;

/*打包vendor.js*/
gulp.task("build_vendor", function (project, type) {
  log("build_vendor.....");
  try {
    var config = fs.readFileSync('js/' + type + '/project/' + project + '/config.json', "utf-8");
  } catch (e) {
    log('没有自定义配置config.json文件，默认打包所有的公用文件。。。');
  }
  var defaultConf = [
    'js/' + type + '/common/*.js',
    'js/' + type + '/project/' + project + '/config.js',
    'js/' + type + '/mod/*.js',
  ];
  defaultConf = config ? JSON.parse(config).define : defaultConf;
  gulp.src(defaultConf)
    .pipe(plumber())
    .pipe(transport())
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('../public/js/' + type + '/' + project + '/'))
    .on("end", function () {

    });
});

/* gulp js 任务 */
gulp.task('js', function (project, type) {
  gulp.src([
    'js/' + type + '/project/' + project + '/**/*.js',
    '!js/' + type + '/project/' + project + '/config.js',
  ])
  .pipe(plumber())
  .pipe(uglify({
    output: {
      ascii_only: true
    }
  }))
  .pipe(gulp.dest('../public/js/' + type + '/' + project + '/'));
});

/* gulp css/less 任务 */
gulp.task('less', function (project, type) {
  gulp.src('less/' + type + "/" + project + '/**/*.less')
    .pipe(header(banner, {pkg: pkg}))
    .pipe(less({compress: false})).on('error', function (event) {
      log(event);
    })
    .pipe(autoprefix({
      browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'],
      remove: true
    }))
    .pipe(makeUrlVer())
    .pipe(gulp.dest('../public/css/' + type + "/" + project)).on("end", function () {

    });
});

/* images 任务 */
gulp.task('images', function (project, type) {
  gulp.src('images/' + type + "/" + project + '/**/*.{jpg,png,gif,swf}')
    .pipe(imagemin({
      progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
      optimizationLevel: 7  //类型：Number  默认：3  取值范围：0-7（优化等级
    }))
    .pipe(gulp.dest('../images/' + type + "/" + project));
});

gulp.task('browser-sync', function () {
  browserSync({
    server: {
      baseDir: '.',
      directory: true
      // middleware: [proxy_e1]
    }
    // open: 'external',
    // startPath: ''
  });
});

/* browser reload */
gulp.task('bs-reload', function () {
  browserSync.reload();
});

/* gulp 监控任务 */
// gulp.task('web', ['default', 'browser-sync'], function (project, type) {
gulp.task('web', ['default'], function (project, type) {
  try {
    fs.readFileSync('js/' + type + '/project/' + project + '/vendor.js', "utf-8");
  } catch (e) {
    log("you have no vendor.js,I will build_vendor");
    gulp.run('build_vendor');
  }
  gulp.watch(['less/' + type + "/" + project + '/**/*.less'], ['less', 'bs-reload']);
  gulp.watch(['images/' + type + "/" + project + '/**/*.{jpg,png,gif,swf}'], ['images', 'bs-reload']);
  gulp.watch([
    '!js/' + type + '/project/' + project + '/vendor.js',
    'js/' + type + '/common/**/*.js',
    'js/' + type + '/mod/**/*.js',
    'js/' + type + '/lib/**/*.js',
    'js/' + type + '/project/' + project + '/config.js',
    'js/' + type + '/project/' + project + '/config.json',
  ], ['build_vendor', 'bs-reload']);
  gulp.watch(['js/' + type + '/project/' + project + '/**/*.js'], ['js', 'bs-reload']);
});
