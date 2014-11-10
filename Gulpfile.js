var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var traceur = require('gulp-traceur');
var concat = require('gulp-concat');
var connect = require("gulp-connect");

// Traceur options
var TRACEUR_OPTIONS = require('./config').traceur;

// Base path to RTTS library
var ASSERT_BASE = './node_modules/rtts-assert/dist/';

// Path for source files to run through Traceur
var SRC_PATH = ['!./app/traceur-runtime.js', './app/*.ats', './app/modules/**/*.ats', './app/*.js'];

/**
 * Returns the path to the RTTS Assert library based on the moduleType used in Traceur config
 *
 * @param moduleType
 * @returns {string}
 */
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

// Watch files and run through traceur when they change
gulp.task('watch', function () {
    gulp.watch([SRC_PATH], ['traceur']);
});

// Not working with current version of gulp-traceur
gulp.task('traceur', function () {
    return gulp.src(SRC_PATH, {base: './app'})
        //.pipe(sourcemaps.init())
        .pipe(traceur(TRACEUR_OPTIONS))
        .pipe(concat('bundle.js'))
        //.pipe(sourcemaps.write())
        .pipe(gulp.dest('app/dist'));
});

// Main task to copy the basic runtime (Traceur and RTTS)
gulp.task('copy-runtime', ['copy-assert', 'copy-traceur']);

// Copies the RTTS Assert library to main app directory to run through Traceur with source code
gulp.task('copy-assert', function () {
    gulp.src(getAssertPath(TRACEUR_OPTIONS.modules))
        .pipe(gulp.dest('./app'));
});

// Copies the Traceur runtime to the main app directory
gulp.task('copy-traceur', function () {
    gulp.src([traceur.RUNTIME_PATH])
        .pipe(gulp.dest('./app'));
});

// Start a local dev server
gulp.task('connect', function () {

    // Uses gulp-connect plugin to start up a server
    connect.server({
        root: ['app'],
        port: 9000
    });
});

gulp.task('default', ['traceur', 'watch', 'connect']);