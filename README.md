# Gulp Recipes for Automation

A collection of [gulp](http://gulpjs.com/) recipes that I have been using for automating my front-end development workflow.  

Gulp is a task runner (written in [Node](https://nodejs.org/en/)) for automating common development tasks.  At it's core, gulp is about streams.  You can take a set of "source" files, apply some transformations to them (e.g. minifying, converting SASS to CSS, etc.) and then save them out without needing any temporary files during those transformations.  You can also set up these gulp tasks to run anytime a particular file is changed (e.g. anytime a SASS file is modified, rebuild the SASS into CSS).

## Installation

Setting up gulp (see gulp's [Getting Started](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md)):

1. Install [Node](https://nodejs.org/en/).
2. Install the gulp command line tool (globally) via terminal: `npm install -g gulp-cli`.

Running a particular gulp project in this repository:

1. Clone the repository
2. Open terminal in one of the project folders (e.g. "blank/"), and run `npm intall` to install the packages needed.
3. In terminal, run `gulp` to start up the default gulp task.

## License
>You can check out the full license [here](https://github.com/mikewesthad/emojify/blob/master/license.md)

This project is licensed under the terms of the **MIT** license.
