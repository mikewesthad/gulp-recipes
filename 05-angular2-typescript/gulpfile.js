/**
 * Angular2 Gulp Setup
 *
 * This recipe provides:
 *
 * - Typescript transpiling and linting
 * - Start a local server, host the new build, and open in your default browser
 * - LiveReload extension to trigger a browser refresh when files are changed
 */

// from http://chariotsolutions.com/blog/post/typescript-angular2-starter-project-walkthrough-file-watcher-pipeline/


// -- SETUP --------------------------------------------------------------------
// Gulp & gulp plugins
var gulp = require('gulp'),
    express = require('express'),
    livereload = require('gulp-livereload'),
    open = require('gulp-open'),
    ts = require('gulp-typescript'),
    sourcemaps = require('gulp-sourcemaps'),
    merge = require('merge2');


// -- BUILD TASKS --------------------------------------------------------------
// Pipe vendor library files to 'dist' folder
gulp.task('vendor-libs', function() {
    // js files go to 'dist/libs'
    gulp.src(['node_modules/angular2/bundles/angular2-polyfills.js',
              'node_modules/angular2/bundles/angular2.min.js',
              'node_modules/angular2/bundles/http.min.js',
              'node_modules/angular2/bundles/router.min.js',
              'node_modules/es6-shim/es6-shim.js',
              'node_modules/systemjs/dist/system.src.js',
              'node_modules/rxjs/bundles/Rx.js'
            ])
        .pipe(gulp.dest('dist/lib'));
});

// Pipe static assets to 'dist' folder
gulp.task('static-assets', function() {
    gulp.src(['./src/**/*.json',
              './src/**/*.html',
              './src/**/*.css',
              './src/systemjs.config.js'
            ])
        .pipe(gulp.dest('./dist'))
        .pipe(livereload());
});

// Transpile typescript
// load tsconfig file
var tsConfig = require('./tsconfig.json');
gulp.task('transpile-ts', function(done) {
    gulp.src('src/**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(ts(tsConfig.compilerOptions))
        .pipe(sourcemaps.write('./app/maps'))
        .pipe(gulp.dest('dist/'))
        .pipe(livereload());
});

// 'Build' task
gulp.task('build', ['vendor-libs', 'static-assets', 'transpile-ts']);


// -- RUN TASKS ----------------------------------------------------------------

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch(['./src/**/*.json',
                './src/**/*.html',
                './src/**/*.css'],
               ['static-assets']);
    gulp.watch(['./src/**/*.ts', ['transpile-ts']]);
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

    gulp.src('./dist')
        .pipe(open(options));
});

gulp.task('run', ['watch', 'express-server', 'open']);


// -- DEPLOY TASKS -------------------------------------------------------------


// -- DEFAULT TASK -------------------------------------------------------------
gulp.task('default', ['build', 'run']);

