var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var traceur = require('gulp-traceur');
var concat = require('gulp-concat');
var connect = require("gulp-connect");

var TRACEUR_OPTIONS = require('./config').traceur;
var ASSERT_BASE = './node_modules/rtts-assert/dist/';

var PATH = {
    SRC: ['!./app/traceur-runtime.js', './app/*.ats', './app/modules/**/*.ats', './app/*.js']
};

var getAssertPath = function (moduleType) {
    var dir;
    if (moduleType === "register") {
        dir = 'es6';

    } else if (moduleType === "amd") {
        dir = 'amd';

    } else if (moduleType === "commonjs") {
        dir = 'cjs';

    } else {
        dir = 'cjs';
    }

    return ASSERT_BASE + dir + '/assert.js';
};

gulp.task('watch', function () {
    gulp.watch([PATH.SRC], ['traceur']);
});

/* Not working with current version of gulp-traceur */
gulp.task('traceur', function () {
    return gulp.src(PATH.SRC, {base: './app'})
        .pipe(sourcemaps.init())
        .pipe(traceur(TRACEUR_OPTIONS))
        .pipe(concat('bundle.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app/dist'));
});

gulp.task('copy-runtime', ['copy-assert', 'copy-traceur']);

gulp.task('copy-assert', function () {
    gulp.src(getAssertPath(TRACEUR_OPTIONS.modules))
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