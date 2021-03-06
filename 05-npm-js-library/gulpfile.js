/**
 * NPM JS Library Template
 * 
 * This is a gulp recipe for creating & maintaining a JS library on NPM. Code
 * that is in lib/ will be processed via browserify and output into dist/ in 
 * both minified and unminified versions.
 *
 * Assumes the following file heirarchy:
 * 
 *     .
 *     +-- dist/        (Folder for the distributable version of the code)
 *     +-- examples/    (Folder for examples)
 *     +-- lib/         (Folder for the library's source code)
 *     +-- gulpfile.js
 *     +-- package.json
 * 
 * The recipe provides:
 * 
 *     - CommonJS modules via browserify. This uses a universal module 
 *       definition, so the code can run in an environment that has CommonJS
 *       modules, AMD modules, or an enviroment without modules (e.g. browser).
 *     - JS linting
 *     - Building both a minified and unminified distribution
 *     - A server that will server examples/ and dist/ to local host, e.g. open
 *       up localhost:8080/examples/01-simple-example/
 *     - A deploy task for uploading examples/ and dist/ to GitHub Pages
 *
 * TODO:
 *     - Local server that automatically opens examples/
 *     - JsDocs
 *     - Tasks for publishing & maintaining npm module
 *     - LiveReload
 *
 * Run "gulp" to start the default task, which builds the site and serves it.
 * Run with the command line flag "gulp -p" or "gulp --production" to enable
 * uglification of JS code. It is helpful while developing to NOT uglify code. 
 */


// -- PATHS --------------------------------------------------------------------

// The name that browserify should make the library accesible under if the code
// is being run outside of an environemnt with CommonJS/Require modules 
// available
var globalName = "Vector2D";
// Entry point for the library
var mainFilename = "vector-2d.js";
var paths = {
    examples: "examples/",
    jsLib: ["lib/**/*.js"],
    jsEntry: ["lib/" + mainFilename],
    dest: "dist"
};


// -- SETUP --------------------------------------------------------------------

var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
var liveReload = require("gulp-livereload");
var uglify = require("gulp-uglify");
var newer = require("gulp-newer");
var ghPages = require("gulp-gh-pages");
var open = require("gulp-open");
var gutil = require("gulp-util");
var jshint = require("gulp-jshint"); // Requires npm jshint
var stylish = require("jshint-stylish");
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var buffer = require("vinyl-buffer");
var del = require("del");
var express = require("express");
var path = require("path");
var fs = require("fs");
var runSequence = require("run-sequence");
var gulpif = require("gulp-if");
var rename = require("gulp-rename");

// Check the command line to see if this is a production build
var isProduction = (gutil.env.p || gutil.env.production);
console.log("Build environment: " + (isProduction ? "production" : "debug"));


// -- BUILD TASKS --------------------------------------------------------------
// These gulp tasks take everything that is in src/, process them and output
// them into lib/.

// Combine, sourcemap and uglify JS libraries into main.js. This uses browserify
// (CommonJS-style modules).
gulp.task("js-browserify", function() {
    var b = browserify({
        entries: paths.jsEntry,
        debug: true,
        // Build module in a universal way, so that it can be loaded with
        // CommonJS or can be loaded to a global variable
        standalone: globalName 
    })
    return b.bundle()
        .on("error", function (err) {
            gutil.log(err);
            this.emit("end");
        })
        .pipe(source(mainFilename))
        .pipe(buffer())
        .pipe(gulp.dest(paths.dest))
        .pipe(sourcemaps.init({ loadMaps: true }))
            .pipe(uglify())
            .on("error", gutil.log)
        .pipe(sourcemaps.write())
        .pipe(rename({ extname: ".min.js" }))
        .pipe(gulp.dest(paths.dest))
        .pipe(liveReload());
});

// Lint only our custom JS.
gulp.task("jslint", function() {
    return gulp.src(paths.jsLib)
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});

// The build task will run all the individual build-related tasks above.
gulp.task("build", [
    "jslint",
    "js-browserify"
]);


// -- RUNNING TASKS ------------------------------------------------------------
// These gulp tasks handle everything related to running the lib.  Starting a
// local server, watching for changes to files, opening a browser, etc.

// Watch for changes and then trigger the appropraite build task.  This also
// starts a LiveReload server that can tell the browser to refresh the page.
gulp.task("watch", function () {
    liveReload.listen(); // Start the LiveReload server
    gulp.watch(paths.jsLib, ["jslint", "js-browserify"]);
});

// Start an express server that serves everything in examples/ & dist/ to
// localhost:8080/.
gulp.task("express-server", function () {
    var app = express();
    app.use("/" + paths.examples, express.static(path.join(__dirname, 
                                                           paths.examples)));
    // Serve up dist/ on the server, mounted at "dist/". This way the examples
    // appear to be looking in the right place for the script.
    app.use("/" + paths.dest, express.static(path.join(__dirname, paths.dest)));
    app.listen(8080);
});

// Automatically open localhost:8080/ in the browser using whatever the default
// browser.
gulp.task("open", function() {
    return gulp.src(__filename)
        .pipe(open({ uri: "http://127.0.0.1:8080" }));
});

// The build task will run all the individual run-related tasks above.
gulp.task("run", [
    "watch",
    "express-server",
    "open"
]);


// -- DEPLOYING TASKS ----------------------------------------------------------
// These gulp tasks handle everything related to deploying the site to live
// server(s).

// Push files in build/ to a gh-pages branch
gulp.task("push:gh-pages", function () {
    return gulp.src(["./examples/**/*.*", "./dist/**/*.*"], { base: "." })
        .pipe(ghPages({
            remoteUrl: "https://github.com/mikewesthad/gulp-recipes"
        }));
});

// Build & deploy build/ folder to gh-pages and then clean up
gulp.task("deploy:gh-pages", function () {
    return runSequence("build", "push:gh-pages", "clean:publish");
});


// -- CLEANING TASKS ----------------------------------------------------------
// These gulp tasks handle deleting files.

// Delete all of the build folder contents.
gulp.task("clean:lib", function () {
    return del(["./lib/**/*"]);
});

// Clean up after the gh-pages deploy
gulp.task("clean:publish", function () {
    return del(["./.publish"]);
});


// -- DEFAULT TASK -------------------------------------------------------------
// This gulp task runs automatically when you don't specify task.

// Build and then run it.
gulp.task("default", function(callback) {
    runSequence("build", "run", callback);
});