/*
 * 51Talk 自动化工程管理
 */

/* 基础组件 */
var gulp = require('gulp-param')(require('gulp'), process.argv);
var chalk = require("chalk");

var fs = require('fs');

var log = console.log;

/* gulp default */
gulp.task('default', function () {
  var logo = fs.readFileSync('banner.txt', "utf-8");
  log(`${chalk.bold.yellow(logo)}`);
  log(`
    1、${chalk.bold.cyan('欢迎使用TK GULP前端框架')}
    2、${chalk.bold.cyan('你可以运行例如： gulp watch --project x --type x 来启动项目')}
    3、${chalk.bold.cyan('如有问题请参考README文档')}
  `);
});

