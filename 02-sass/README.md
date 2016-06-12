# SASS Compiler


Include these files with the distribution version of your library.  These files will allow a user to compile sass from the 'src' folder to the 'dist' folder.  By providing a _custom-variables.sass, you can make it easy for users to specify parameters of your library and creating a custom build.


## Custom Builds

This library is powered by gulp.js, so it's pretty easy to create a custom build. First you will need a copy of the project.  Next, you will need Gulp and all other dependencies:

```
$ cd path/to/yourProject/
$ npm install // you will need sudo if you are on a mac!
```

Run `gulp` to compile your custom builds.  You can customize the look of your project using `src/scss/_custom-variables.scss`.

