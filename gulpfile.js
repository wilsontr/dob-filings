const gulp = require('gulp');
const concat = require('gulp-concat');
 
gulp.task('build', () => {
  return gulp.src('./client/*.js')
	.pipe(concat('build.js'))
	.pipe(gulp.dest('./public/js'));
});