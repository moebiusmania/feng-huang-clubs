// Load plugins
var gulp = require('gulp'),
    connect = require('gulp-connect')
    ghPages = require('gulp-gh-pages');


// Static webserver
gulp.task('connect', function () {
  connect.server({
    root: 'app'
  });
});

// Deploy to GitHub pages branch
gulp.task('deploy', function() {
  return gulp.src('./app/**/*')
    .pipe(ghPages());
});
