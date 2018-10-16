var gulp = require('gulp-param')(require('gulp'), process.argv);

gulp.task('components-images', function (project, type) {
  return gulp.src([
    'components/' + type + '/' + project + '/images/' + '/**/*.{jpg,png,gif,swf}',
  ])
    .pipe(gulp.dest('../components/' + type + '/' + project + '/images/'))
});

