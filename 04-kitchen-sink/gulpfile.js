/**
 * Kitchen Sink Gulp Template
 * The master recipe that will contain everything from the other recipes.
 */


// -- Setup --------------------------------------------------------------------

var gulp = require("gulp");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var sourcemaps = require("gulp-sourcemaps");
var liveReload = require("gulp-livereload");
var order = require("gulp-order");
var concat = require("gulp-concat");
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

// Check the command line to see if this is a production build
var isProduction = (gutil.env.p || gutil.env.production);
console.log("Build environment: " + (isProduction ? "production" : "debug"));


// -- BUILD TASKS --------------------------------------------------------------
// These gulp tasks take everything that is in src/, process them (e.g. turn
// SASS into css) and output them into build/.

// Copy HTML (src/ -> build/).  Pipe changes to LiveReload to trigger a reload.
gulp.task("copy-html", function () {
    return gulp.src("src/**/*.html")
        .pipe(gulp.dest("build/"))
        .pipe(liveReload());
});

// Turn SASS in src/ into css in build/, autoprefixing CSS vendor prefixes and
// generating sourcemaps.  Pipe changes to LiveReload to trigger a reload.
gulp.task("sass", function () {
    // Configure a sass stream so that it logs errors properly
    var sassStream = sass({outputStyle: "compressed"});
    sassStream.on("error", sass.logError);
    // Convert SASS
    return gulp.src("src/sass/**/*.scss")
        .pipe(sourcemaps.init())
            .pipe(sassStream)
            .pipe(autoprefixer({
                browsers: [
                    // Add vendor prefixes to match bootstrap:
                    // https://github.com/twbs/bootstrap-sass#sass-autoprefixer
                    "Android 2.3",
                    "Android >= 4",
                    "Chrome >= 20",
                    "Firefox >= 24",
                    "Explorer >= 8",
                    "iOS >= 6",
                    "Opera >= 12",
                    "Safari >= 6"
                ],
                cascade: true
            }))
        .pipe(sourcemaps.write("maps"))
        .pipe(gulp.dest("build"))
        .pipe(liveReload());
});

// Combine, sourcemap and uglify vendor libraries (e.g. bootstrap, jquery, etc.)
// into build/js/libs.js.  This supports adding the libs in a particular order.
// Pipe changes to LiveReload to trigger a reload.
gulp.task("js-libs", function() {
    return gulp.src("src/js/libs/**/*.js")
        .pipe(order([
            // Order the files here
            "**/*.js" 
        ]))
        .pipe(sourcemaps.init())
            .pipe(concat("libs.js"))
            // Uglify only if we are in a production build
            .pipe(gulpif(isProduction, uglify()))
        .pipe(sourcemaps.write("libs-maps"))
        .pipe(gulp.dest("build/js"))
        .pipe(liveReload());
});

// Combine, sourcemap and uglify our JS libraries into main.js. This uses 
// browserify (CommonJS-style modules). 
gulp.task("js-custom", function() {
    var b = browserify({
        entries: "src/js/main.js",
        debug: true
    })
    return b.bundle()
        .on("error", function (err) {
            gutil.log(err);
            this.emit("end");
        })
        .pipe(source("main.js"))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
            // Uglify only if we are in a production build
            .pipe(gulpif(isProduction, uglify()))
            .on("error", gutil.log)
        .pipe(sourcemaps.write("main"))
        .pipe(gulp.dest("build/js"))
        .pipe(liveReload());
});

// Lint only our custom JS.
gulp.task("jslint", function() {
    return gulp.src(["src/js/**.js", "!src/js/libs/**/*.js"])
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});

// Take any (new) images from src/images over to build/images.
gulp.task("images", function () {
    return gulp.src("src/images/**/*.*")
        .pipe(newer("build/images"))
        .pipe(gulp.dest("build/images"));
});

// Take any (new) fonts from src/fonts over to build/fonts.
gulp.task("fonts", function () {
    return gulp.src("src/fonts/**/*.*")
        .pipe(newer("build/fonts"))
        .pipe(gulp.dest("build/fonts"));
});

// The build task will run all the individual build-related tasks above.
gulp.task("build", [
    "copy-html",
    "sass",
    "jslint",
    "js-libs",
    "js-custom",
    "images",
    "fonts"
]);


// -- RUNNING TASKS ------------------------------------------------------------
// These gulp tasks handle everything related to running the site.  Starting a
// local server, watching for changes to files, opening a browser, etc.

// Watch for changes and then trigger the appropraite build task.  This also
// starts a LiveReload server that can tell the browser to refresh the page.
gulp.task("watch", function () {
    liveReload.listen(); // Start the LiveReload server
    gulp.watch("src/**/*.html", ["copy-html"]);
    gulp.watch("src/js/libs/**/*.js", ["js-libs"]);
    gulp.watch(["src/js/**/*.js", "!src/js/libs/**/*.js"], ["jslint", "js-custom"]);
    gulp.watch("src/sass/**/*.{scss,sass,css}", ["sass"]);
    gulp.watch("src/images/**/*.*", ["images"]);
    gulp.watch("src/fonts/**/*.*", ["fonts"]);
});

// Start an express server that serves everything in build/ to localhost:8080/.
gulp.task("express-server", function () {
    var app = express();
    app.use(express.static(path.join(__dirname, "build")));
    app.listen(8080);
});

// Automatically open localhost:8080/ in the browser using whatever the default
// browser.
gulp.task("open", function() {
    return gulp.src(__filename)
        .pipe(open({uri: "http://127.0.0.1:8080"}));
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
    return gulp.src("./build/**/*")
        .pipe(ghPages({
            remoteUrl: "https://github.com/blahblah/blahblah.git"
        }));
});

// Build & deploy build/ folder to gh-pages and then clean up
gulp.task("deploy:gh-pages", function () {
    return runSequence("build", "push:gh-pages", "clean:publish");
});


// -- CLEANING TASKS ----------------------------------------------------------
// These gulp tasks handle deleting files.

// Delete all of the build folder contents.
gulp.task("clean:build", function () {
    return del(["./build/**/*"]);
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