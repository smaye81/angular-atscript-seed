angular-atscript-seed
================

Seed project using Angular and AtScript

Uses:

* Angular
* Angular UI Router
* Traceur
* AtScript
* Bootstrap
* Gulp
* Karma
* Jasmine


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


To Do:

* Tests
* System.get is manually added in index.html.  Should be appended to file as traceur cli does
* Copy correct assert.js file based on module type
* References to modules are by name and not using relative path.  Seems to be how gulp-traceur is naming them
* Add example of type safety calling sum
* No controllers!
* Currently using fork of gulp-traceur for new Traceur API fixes.  Update to canon gulp-traceur when fork is merged
