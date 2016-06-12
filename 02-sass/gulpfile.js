/**
 * SASS
 *
 * The recipe simply provides conversion of SASS or SCSS files to CSS. This
 * could be useful to include if distributing a library that can be easily
 * customized with SASS.
 *
 * The CSS is autoprefixed and has a sourcemap applied. The automatic vendor
 * prefixes make your SASS less verbose, and the sourcemaps make it easier to
 * inspect styles in your browser's inspector. 
 */


// -- PATHS --------------------------------------------------------------------
 
// Where to look for source files
var sassSrc = "scss/**/*.{scss,sass}";

// Where to output processed files
var cssDest = "css";

// Any other paths to check when a SASS import is encountered. Here you can put
// any SASS that you refer to that isn't in src e.g. if you "@import
// fontawesome" and you installed fontawesome through NPM, you would do
// something like: var sassInclude = ["node_modules/font-awesome/scss"];
var sassInclude = [];


// -- SETUP --------------------------------------------------------------------

var gulp = require("gulp");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var sourcemaps = require("gulp-sourcemaps");


// -- TASKS --------------------------------------------------------------------

// Convert SCSS/SASS to CSS and apply vendor prefixes & a sourcemap
gulp.task("sass", function () {
    return gulp.src(sassSrc)
        .pipe(sourcemaps.init())
            .pipe(sass({ 
                outputStyle: "compressed",
                includePaths: sassInclude
            }).on("error", sass.logError))
            .pipe(autoprefixer({
                browsers: [
                    // Matches bootstrap: 
                    // https://github.com/twbs/bootstrap-sass#sass-autoprefixer
                    "Android 2.3",
                    "Android >= 4",
                    "Chrome >= 20",
                    "Firefox >= 24",
                    "Explorer >= 8",
                    "iOS >= 6",
                    "Opera >= 12",
                    "Safari >= 6"
                    // You could also do something like:
                    // "last 2 versions"
                    // https://github.com/postcss/autoprefixer#options
                ],
                cascade: true
            }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(cssDest));
});

// Watch for changes to the SCSS/SASS files and rerun the SASS command
gulp.task("watch", function () {
    gulp.watch(sassSrc, ["sass"]);
});

// Default task that runs if you don't specify a task
gulp.task("default", ["sass", "watch"]);
