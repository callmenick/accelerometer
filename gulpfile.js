//////////////////////////////////////////////////
// load gulp
//////////////////////////////////////////////////

var gulp = require('gulp');

//////////////////////////////////////////////////
// load other gulp stuffs
//////////////////////////////////////////////////

var autoprefixer = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var rename = require('gulp-rename');

//////////////////////////////////////////////////
// tasks
//////////////////////////////////////////////////

gulp.task('default', ['watch']);

gulp.task('styles', function() {
  gulp.src('client/css/src/**/*.css')
    .pipe(autoprefixer())
    .pipe(gulp.dest('client/css/dist/'))
    .pipe(minifyCSS())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('client/css/dist/'));
});

gulp.task('watch', function() {
  gulp.watch('client/css/src/**/*.css', ['styles']);
});