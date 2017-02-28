const gulp = require('gulp');
const concat = require('gulp-concat');
const watch = require('gulp-watch');
const batch = require('gulp-batch');
const jshint = require('gulp-jshint');
 
gulp.task('build', () => {
  return gulp.src('./client/*.js')
  	.pipe(jshint())
  	.pipe(jshint.reporter('jshint-stylish'))
	.pipe(concat('build.js'))
	.pipe(gulp.dest('./public/js'));
});

gulp.task('watch', () => {
  watch('./client/*.js', batch((events, done) => {
  	gulp.start('build', done);
  }));
});
