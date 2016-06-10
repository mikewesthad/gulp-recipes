# An Angular2/Typescript pipeline using Gulp


This pipeline takes advantage of Gulp, an automation tool for web-development.  This project will install the necessary files for angular apps, lint & transpile typescript files, open your project using a local server, and reload the site when a file change is detected.


## How To Use:

- Make sure you have [Node.js](https://nodejs.org/en/) installed!
- Download/clone this project to a local folder
- Navigate to the folder, and install project dependencies
```
cd <project/directory>
npm install
```
- Run `gulp init` or `npm init` to complete the initial setup of the project.  This will create a 'dist' folder, and copy any necessary libraries and static files over.  This will also lint/transpile the typescript files, and move them to the 'dist' folder.
- Run `gulp` or `npm start` to start a local server, open your project, and begin monitoring files for changes.  File changes should trigger the browser to refresh.  This will also lint/transpile typescript files.
- Run `gulp format` or `npm format` to format all of the .ts files in a consistent way.  Use this before uploading code to a a repo!


## Development Tools:

- [Angular2](https://angular.io/)
- [Typescript](http://www.typescriptlang.org/)
- [Typings](https://github.com/typings/typings)
- [TSLint](https://www.npmjs.com/package/tslint)
- [Gulp](http://gulpjs.com/)
- [LiveReload](http://livereload.com//)


## Useful Tutorials
 - [CodeLeak - Quickstart w/ Angular2, Typescript and Gulp](http://blog.codeleak.pl/2016/03/quickstart-angular2-with-typescript-and.html) - [Repo](https://github.com/kolorobot/angular2-typescript-gulp)
 - [Scotts Blog - Creating an Angular2 Build w/ Gulp](http://blog.scottlogic.com/2015/12/24/creating-an-angular-2-build.html) - [Repo](https://github.com/ColinEberhardt/angular2-tour-of-heroes)
 - [Angular Tips - Intro to Angular2](http://angular-tips.com/blog/2015/05/an-introduction-to-angular-2/) - [Repo](https://github.com/angular-tips/GermanWords-frontend-angular-2)
 - [Angular2 - NPM Packages](https://angular.io/docs/ts/latest/guide/npm-packages.html)


## Directory Structure

```
├── src/
    ├── app/
    ├── index.html
    └── systemjs.config.js
├── gulpfile.js
├── package.json
├── tsconfig.json
├── tslint.json
├── typings.json
└── README.md
```


## Notes

One of the challenges of setting up an Angular2 project is the upgrade to 2.00-rc1.  This introduced breaking changes to the framework, and makes a lot of the Angular2 tutorials outdated. [More Info](https://github.com/angular/angular/blob/master/CHANGELOG.md).
