'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');
var sass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');
// var jshint = require('gulp-jshint');
// var rename = require('gulp-rename');
var concat = require('gulp-concat');
var notify = require('gulp-notify');
var merge = require('merge2');
var del = require('del');


gulp.task('default', ['clean', 'browser-sync'], function () {
    gulp.start('client-styles', 'client-scripts', 'client-watch');
});

gulp.task('browser-sync', ['nodemon'], function() {
    browserSync.init(null, {
        proxy: "http://localhost:3000",
        files: ["public/**/*.*", "app/views/**/*.jade"],
        open: false,
        port: 7000
    });
});

gulp.task('nodemon', function (cb) {

    var started = false;

    return nodemon({
        script: './bin/www',
        ext: 'js',
        ignore: ["app/game/client/**/*.js", "public/"]
    }).on('start', function () {
        // to avoid nodemon being started multiple times
        // thanks @matthisk
        if (!started) {
            cb();
            started = true;
        }
    });
});

gulp.task('client-styles', function () {
    return merge(
        gulp.src(['app/client/**/*.css']),
        sass('app/client/ouvidoria-social.scss', {style: 'expanded'})
      )
      .pipe(concat("ouvidoria.css"))
      .pipe(autoprefixer('last 2 version'))
      .pipe(gulp.dest('public/assets/css'))
      .pipe(notify({message: 'Game styles task complete.'}));
});

gulp.task('client-scripts', function() {
    var filesArray = ['app/client/**/*.js'];
    return gulp.src(filesArray)
        // .pipe(jshint('.jshintrc'))
        // .pipe(jshint.reporter('default'))
        .pipe(concat('ouvidoria.js'))
        .pipe(gulp.dest('public/assets/js'))
        .pipe(notify({message: 'Game scripts task complete.'}));
});

gulp.task('clean', function() {
    return del(['public/assets/js', 'public/assets/css']);
});

gulp.task('client-watch', function () {
    gulp.watch(['app/client/**/*.css'], ['client-styles']);

    gulp.watch(['app/client/**/*.js'], ['client-scripts']);
});
