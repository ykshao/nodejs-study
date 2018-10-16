var gulp = require('gulp-param')(require('gulp'), process.argv);
var concat = require('gulp-concat');
var transport = require('gulp-seajs-transport');
var plumber = require('gulp-plumber');
var uglify = require('gulp-uglify');

gulp.task('components-js', function (project, type) {
  return gulp.src([
    'components/lib/sea/sea-2.0.0.min.js',
    'components/' + type + '/' + project + '/js/' + '/config.js',
  ])
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('components/' + type + '/' + project + '/js/'))
    .on("end", function () {
      gulp.src([
        'components/lib/sea/sea-2.0.0.min.js',
        'components/' + type + '/' + project + '/js/' + '/config_prod.js',
      ])
        .pipe(concat('vendor_prod.js'))
        .pipe(gulp.dest('components/' + type + '/' + project + '/js/'))
        .on("end", function () {
          gulp.src([
            'components/' + type + '/' + project + '/js/modules/' + '*.js',
          ])
            .pipe(transport())
            .pipe(plumber())
            .pipe(uglify({
              output: {
                ascii_only: true
              }
            }))
            .pipe(gulp.dest('../components/' + type + '/' + project + '/js/'))
        })

    });
});

