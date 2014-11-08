var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var traceur = require('gulp-traceur');
var concat = require('gulp-concat');
var connect = require("gulp-connect");
var exec = require('child_process').exec;

var TRACEUR_OPTIONS = require('./config').traceur;
var PATH = {
    SRC: ['!./app/traceur-runtime.js', './app/*.ats', './app/modules/**/*.ats', './app/*.js']
};
var ASSERT_PATH = './node_modules/rtts-assert/dist/es6/assert.js';

gulp.task('watch', function () {

    gulp.watch([PATH.SRC], ['traceur']);
});

/* Not working with current version of gulp-traceur */
gulp.task('traceur', function () {
    return gulp.src(PATH.SRC)
        .pipe(sourcemaps.init())
        .pipe(traceur(TRACEUR_OPTIONS))
        .pipe(concat('bundle.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app/dist'));
});

gulp.task('copy-runtime', ['copy-assert', 'copy-traceur']);

gulp.task('copy-assert', function () {
    gulp.src(ASSERT_PATH)
        .pipe(gulp.dest('./app'));
});

gulp.task('copy-traceur', function () {

    gulp.src([traceur.RUNTIME_PATH])
        .pipe(gulp.dest('./app'));
});

gulp.task('connect', function () {

    // Uses gulp-connect plugin to start up a server
    connect.server({
        root: ['app'],
        port: 9000
    });
});

gulp.task('default', ['traceur', 'watch', 'connect']);