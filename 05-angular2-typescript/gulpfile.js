/**
 * Angular2 Gulp Setup
 *
 * This recipe provides:
 *
 * - Typescript transpiling and linting
 * - Start a local server, host the new build, and open in your default browser
 * - LiveReload extension to trigger a browser refresh when files are changed
 */



// -- SETUP --------------------------------------------------------------------
// Gulp & gulp plugins
var gulp = require('gulp');
var changed = require("gulp-changed");
var del = require('del');
var express = require('express');
var liveReload = require('gulp-livereload');
var open = require('gulp-open');
var runSequence = require('run-sequence');
var sourcemaps = require('gulp-sourcemaps');
var ts = require('gulp-typescript');
var tslint = require('gulp-tslint');

// load tsconfig file
var tsProject = ts.createProject('tsconfig.json');



// -- BUILD TASKS --------------------------------------------------------------

// Remove the dist directory
gulp.task('clean', function() {
    return del('dist');
});

// Pipe vendor library files to 'dist' folder
gulp.task('vendor-libs', function () {
    return gulp.src([
            'es6-shim/es6-shim.min.js',
            'systemjs/dist/system-polyfills.js',
            'systemjs/dist/system.src.js',
            'reflect-metadata/Reflect.js',
            'rxjs/**',
            'zone.js/dist/**',
            '@angular/**',
            'angular2-in-memory-web-api/**'
        ], { cwd: "node_modules/**" }) /* use glob here */
        .pipe(changed('dist/lib'))
        .pipe(gulp.dest('dist/lib'));
});

// Pipe static assets to 'dist' folder
gulp.task('static-assets', function() {
    return gulp.src(['src/**/*.json',
            'src/**/*.html',
            'src/**/*.css',
            'src/systemjs.config.js'
        ])
        .pipe(changed('dist'))
        .pipe(gulp.dest('dist'))
        .pipe(liveReload());
});

// Typescript transpiler
gulp.task('transpile', ['tslint'], function() {
    return gulp.src('src/**/*.ts')
//        .pipe(changed('dist', {extension: '.js'}))
        .pipe(sourcemaps.init())
        .pipe(ts(tsProject))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'))
        .pipe(liveReload());
});

// Typescript Linter
gulp.task('tslint', function() {
    return gulp.src('src/**/*.ts')
        .pipe(tslint())
        .pipe(tslint.report('prose', {
            emitError: false // set to true to stop the compiler on any error
        }));
});

// 'Initialization' task
gulp.task('init', function(cb) {
  runSequence('clean', 'vendor-libs', 'static-assets', 'transpile', cb);
});

// 'Build' task
gulp.task('build', function(cb) {
  runSequence('static-assets', 'transpile', cb);
});



// -- RUN TASKS ----------------------------------------------------------------

gulp.task('watch', function() {
    liveReload.listen();
    gulp.watch(['src/**/*.ts'],
               ['transpile']);
    gulp.watch(['src/**/*.json',
                'src/**/*.html',
                'src/**/*.css',
                'src/**/*.ts'],
               ['static-assets']);
});

gulp.task('express-server', function() {
    var app = express();
    app.use(express.static(__dirname + '/dist'));
    app.listen(8080, function () {
        console.log('server opened on port 8080!');
    });
});

gulp.task('open', function() {
    var options = {
        uri: 'http://127.0.0.1:8080'
    };

    return gulp.src('dist')
        .pipe(open(options));
});

gulp.task('run', ['watch', 'express-server', 'open']);



// -- DEPLOY TASKS -------------------------------------------------------------
// *** no deployment yet... ***


// -- DEFAULT TASK -------------------------------------------------------------

// Build and then run it.
gulp.task('default', function(cb) {
    runSequence('build', 'run', cb);
});