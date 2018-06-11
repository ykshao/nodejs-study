/**
 * Created by Administrator on 2016/11/7.
 */

'use strict';

var gulp = require('gulp-param')(require('gulp'), process.argv),
    header = require('gulp-header'),
    less = require("gulp-less"),
    autoprefix = require('gulp-autoprefixer'),
    makeUrlVer = require('gulp-make-css-url-version'),
    imagemin = require('gulp-imagemin'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    transport = require('gulp-seajs-transport'),
    plumber = require('gulp-plumber'),
    pngquant = require('imagemin-pngquant');

var pkg = require('./package.json');
var banner = ['/*!',
    ' * <%= pkg.homepage %>',
    ' * copyright (c) 2016 <%= pkg.name %>',
    ' * author: <%= pkg.author %>',
    ' * update: <%= new Date() %>',
    ' */',
    ''].join('\n');

gulp.task('js', function (project, type) {
    gulp.src([
        'js/' + type + '/mod/*.js'
    ])
        .pipe(plumber())
        .pipe(transport())
        .pipe(gulp.dest('js/' + type + '/mod/'))
        .on("end", function () {
            gulp.src([
                'js/' + type + '/common/*.js',
                'js/' + type + '/project/' + project + '/config.js',
                'js/' + type + '/mod/*.js'
            ])
                .pipe(concat('vendor.js'))
                .pipe(gulp.dest('js/' + type + '/project/' + project + '/'))
                .on("end", function () {
                    gulp.src([
                        'js/' + type + '/project/' + project + '/*.js',
                        '!js/' + type + '/project/' + project + '/config.js'
                    ])
                        .pipe(plumber())
                        .pipe(uglify({
                            output: {
                                ascii_only: true
                            }
                        }))
                        .pipe(gulp.dest('../public/js/' + type + '/project/' + project + '/'));
                })
        });
});

//less
gulp.task('less', function (project, type) {
    gulp.src('less/' + type + "/" + project + '/*.less')
        .pipe(header(banner, {pkg: pkg}))
        .pipe(less({compress: false})).on('error', function (event) {
        console.log(event);
    })
        .pipe(autoprefix())
        .pipe(makeUrlVer())
        // .pipe(makeUrlVer({useDate:true}))
        .pipe(gulp.dest('css/' + type + "/" + project))
        .on("end", function () {
            gulp.src('less/' + type + "/" + project + '/*.less')
                .pipe(header(banner, {pkg: pkg}))
                .pipe(less({compress: true})).on('error', function (event) {
                console.log(event);
            })
                .pipe(autoprefix())
                .pipe(makeUrlVer())
                // .pipe(makeUrlVer({useDate:true}))
                .pipe(gulp.dest('../public/css/' + type + "/" + project + "/"))
        });
});

// images
gulp.task('images', function (project, type) {
    gulp.src('images/' + type + "/" + project + '/*.{jpg,png,gif,swf}')
        .pipe(imagemin({
            progressive: true,
            use: [pngquant({quality: '80-95', speed: 4})]
        }))
        .pipe(gulp.dest('../public/images/' + type + "/" + project));
});

// Watch
gulp.task('watch', [], function (project, type) {
    gulp.watch(['less/' + type + "/" + project + '/*.less'], ['less']);
    gulp.watch(['images/' + type + "/" + project + '/*.{jpg,png,gif,swf}'], ['images']);
    gulp.watch(['js/' + type + '/project/' + project + '/*.js', '!js/' + type + '/project/' + project + '/vendor.js'], ['js']);
});

//default
gulp.task('default', function () {
    console.log("Wecome to project for Study Report");
    console.log("You can run gulp watch --project PROJECT_NAME --type TYPE to start project");
});