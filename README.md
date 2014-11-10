angular-atscript-seed
================

Seed project using Angular 1.3 and AtScript with pure ES6 modules.  No dependency on Require or Browserify.

Lovingly based on two repos:

https://github.com/smaye81/angular-es6-seed

and the Angular team's AtScript playground:

https://github.com/angular/atscript-playground

Uses:

* Angular
* Angular UI Router
* Traceur
* RTTS/Assert
* AtScript
* Bootstrap
* Gulp


To run app:

DO THE FOLLOWING THE FIRST TIME RUNNING THE APP
* Clone repo
* Install Gulp globally using `npm install gulp -g`
* Run `npm install` from project root
* Run `bower install` from project root
* Run `gulp copy-runtime` from project root

DO THE FOLLOWING THEREAFTER
* Run `gulp` from the project root
* Navigate to localhost:9000
* $$$

**Notes:**
* Currently using fork of gulp-traceur for new Traceur API fixes.  Update to canon gulp-traceur when fork is merged

**Wishes for a perfect world:**
* System.get is manually added in index.html.  Sort of sucks to have to do this

**To Do:**
* Tests
* Get sourcemaps working again
* More examples of AtScript (annotations, etc.)
* More examples of ES6
* Usage of future Angular modules (di.js, prophecy.js)

