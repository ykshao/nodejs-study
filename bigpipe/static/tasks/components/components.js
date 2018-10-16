var gulp = require('gulp-param')(require('gulp'), process.argv);
var browserSync = require('browser-sync');

gulp.task('components-browser', function () {
  browserSync({
    server: {
      baseDir: './',
      directory: true,
    },
    open: 'external',
    startPath: '/components',
  });
});

/* browser reload */
gulp.task('components-reload', function () {
  browserSync.reload();
});

/* components watch */
gulp.task('components', ['components-browser'], function (project, type) {
  gulp.watch(['components/' + type + '/' + project + '/ejs/*.ejs'], ['components-html', 'components-reload']);
  gulp.watch(['components/' + type + '/' + project + '/less/*.less'], ['components-less', 'components-reload']);
  gulp.watch(['components/' + type + '/' + project + '/images/*.{jpg,png,gif,swf}'], ['components-images', 'components-reload']);
  gulp.watch(['components/' + type + '/' + project + '/js/modules/*.js'], ['components-js', 'components-reload']);
});
