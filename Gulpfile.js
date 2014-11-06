var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var traceur = require('gulp-traceur');
var concat = require('gulp-concat');
var connect = require("gulp-connect");
var rename = require("gulp-rename");
var exec = require('child_process').exec;

var TRACEUR_OPTIONS = require('./config').traceur;
var PATH = {
    SRC: ['./app/*.ats', './app/modules/**/*.ats', './app/*.js']
};

gulp.task('watch', function () {

    gulp.watch([PATH.SRC], ['traceur']);
});

// TRANSPILE AT SCRIPT
//gulp.task('build', function() {
//    gulp.src(PATH.SRC)
//        .pipe(traceur(TRACEUR_OPTIONS))
//        .pipe(rename({extname: '.js'}))
//        .pipe(gulp.dest('build/src'));
//});

/* Not working with current version of gulp-traceur */
gulp.task('traceur', function () {
    return gulp.src(PATH.SRC)
        .pipe(sourcemaps.init())
        .pipe(traceur(TRACEUR_OPTIONS))
        .pipe(concat('all.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app/dist'));
});

gulp.task('connect', function () {

    // Uses gulp-connect plugin to start up a server
    connect.server({
        root: ['app'],
        port: 9000
    });
});

gulp.task('default', ['traceur', 'watch', 'connect']);