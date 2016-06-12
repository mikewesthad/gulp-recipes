/**
 * Angular2-Typescript-Gulp Pipeline
 *
 * This recipe provides:
 *
 * - Typescript transpiling, linting, and beautification
 * - Serve project locally, and open in your default browser
 * - LiveReload to trigger browser refresh when files change
 *
 * @author Rex Twedt
 */



// -- SETUP --------------------------------------------------------------------

// Gulp & gulp plugins
var gulp = require('gulp'),
    changed = require('gulp-changed'),
    del = require('del'),
    express = require('express'),
    gutil = require('gulp-util'),
    liveReload = require('gulp-livereload'),
    open = require('gulp-open'),
    runSequence = require('run-sequence'),
    sourcemaps = require('gulp-sourcemaps'),
    ts = require('gulp-typescript'),
    tslint = require('gulp-tslint'),
    tsfmt = require('gulp-tsfmt');

// Setup global object containing project paths
var basePaths = {
    src: 'src/',
    dest: 'build/',
    lib: 'node_modules/'
};
var paths = {
    appConfig: {
        src: basePaths.src + 'systemjs.config.js',
        dest: basePaths.dest
    },
    css: {
        src: basePaths.src + '**/*.css',
        dest: basePaths.dest
    },
    html: {
        src: basePaths.src + '**/*.html',
        dest: basePaths.dest
    },
    img: {
        src: basePaths.src + '**/*.{jpeg, jpg, png}',
        dest: basePaths.dest + 'img/'
    },
    json: {
        src: basePaths.src + '**/*.json',
        dest: basePaths.dest
    },
    scripts: {
        src: basePaths.src + '**/*.ts',
        dest: basePaths.dest
    },
    lib: {
        src: ['es6-shim/es6-shim.min.js',
              'systemjs/dist/system-polyfills.js',
              'systemjs/dist/system.src.js',
              'reflect-metadata/Reflect.js',
              'rxjs/**',
              'zone.js/dist/**',
              '@angular/**',
              'angular2-in-memory-web-api/**'
            ],
        dest: basePaths.dest + 'lib/'
    }
};
var staticAssets = [
    paths.appConfig.src,
    paths.css.src,
    paths.html.src,
    paths.img.src,
    paths.json.src
];

// Check the command line to see if this is a production build
var isProduction = (gutil.env.p || gutil.env.production);
console.log("Build environment: " +
    (isProduction ? "production" : "development"));



// -- BUILD TASKS --------------------------------------------------------------

// Remove the dist directory
gulp.task('clean', function() {
    return del(paths.build);
});

// Pipe vendor library files to 'dist' folder
gulp.task('vendor-libs', function () {
    return gulp.src(paths.lib.src, {cwd: 'node_modules/**'}) /* use glob here */
        .pipe(gulp.dest(paths.lib.dest));
});

// Pipe static assets to 'dist' folder
gulp.task('static-assets', function() {
    return gulp.src(staticAssets)
        .pipe(changed(basePaths.dest))
        .pipe(gulp.dest(basePaths.dest))
        .pipe(liveReload());
});

// Typescript Linter
gulp.task('tslint', function() {
    return gulp.src(paths.scripts.src)
        .pipe(tslint())
        .pipe(tslint.report('prose', {
            emitError: false // set to true to stop the compiler on any error
        }));
});

// Typescript transpiler
gulp.task('transpile', ['tslint'], function() {
    // load tsconfig file
    var tsProject = ts.createProject('tsconfig.json');
    return gulp.src(paths.scripts.src)
        .pipe(sourcemaps.init())
        .pipe(ts(tsProject))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.scripts.dest))
        .pipe(liveReload());
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

// Start a livereload server and watch source files for changes
gulp.task('watch', function() {
    liveReload.listen();
    gulp.watch([paths.scripts.src], ['transpile']);
    gulp.watch(staticAssets, ['static-assets']);
});

// Start an express server on port 8080
gulp.task('express-server', function() {
    var app = express();
    app.use(express.static(__dirname + '/' + basePaths.dest));
    app.listen(8080, function () {
        console.log('server opened on port 8080!');
    });
});

// Serve the most recent build of the project to port 8080
gulp.task('open', function() {
    // setup server options
    var serverConfig = {
        uri: 'http://127.0.0.1:8080'
    };
    return gulp.src(basePaths.dest)
        .pipe(open(serverConfig));
});

gulp.task('run', ['watch', 'express-server', 'open']);



// -- DEPLOY TASKS -------------------------------------------------------------

// Task for formatting .ts files
gulp.task('format', function() {
    // ts format options
    var tsfmtConfig = {
        options: {
            IndentSize: 4,
            TabSize: 4,
            NewLineCharacter: "\n",
            ConvertTabsToSpaces: true,
            InsertSpaceAfterCommaDelimiter: true,
            InsertSpaceAfterSemicolonInForStatements: true,
            InsertSpaceBeforeAndAfterBinaryOperators: true,
            InsertSpaceAfterKeywordsInControlFlowStatements: true,
            InsertSpaceAfterFunctionKeywordForAnonymousFunctions: false,
            InsertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis: false,
            PlaceOpenBraceOnNewLineForFunctions: false,
            PlaceOpenBraceOnNewLineForControlBlocks: false
        }
    };
    return gulp.src(paths.scripts.src)
        .pipe(tsfmt(tsfmtConfig))
        .pipe(gulp.dest(basePaths.src));
});



// -- DEFAULT TASK -------------------------------------------------------------

// Build and then run project
gulp.task('default', function(cb) {
    runSequence('build', 'run', cb);
});