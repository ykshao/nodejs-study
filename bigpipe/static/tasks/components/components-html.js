var gulp = require('gulp-param')(require('gulp'), process.argv);
var ejs = require("gulp-ejs");

gulp.task('components-html', function (project, type) {
  var dev = {componentsImages: {}};
  dev.componentsImages[project] = '/components/' + type + '/' + project + '/images/';
  return gulp.src([
    'components/' + type + '/' + project + '/ejs/*.ejs',
  ])
    .pipe(ejs(dev))
    .on('error', function (event) {
      console.log(event);
    })
    .pipe(gulp.dest('components/' + type + '/' + project + '/templates/'))
});

