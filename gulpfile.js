var gulp = require('gulp');
var livereload = require('gulp-livereload');

gulp.task('default',()=>{
		livereload.listen();

	gulp.watch('public/**').on('change', livereload.changed);
});