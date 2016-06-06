var gulp = require('gulp')
var concat = require('gulp-concat')

gulp.task('js', function () {
  gulp.src(['public/app/**/*.js'])
    .pipe(concat('dest.js'))
    .pipe(gulp.dest('public/dest'))
})

gulp.task('watch', ['js'], function () {
  gulp.watch('public/app/**/*.js', ['js'])
})
