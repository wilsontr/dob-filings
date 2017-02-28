const gulp = require('gulp');
const concat = require('gulp-concat');
const amdopt = require('amd-optimize');
 
gulp.task('build', () => {
  return gulp.src('./client/*.js')
	.pipe(amdopt('app'))
	.pipe(concat('build.js'))
	.pipe(gulp.dest('./public/js'));
});