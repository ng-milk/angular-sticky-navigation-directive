'use strict';

var del = require('del'),
    gulp = require('gulp'),
    gulpsync = require('gulp-sync')(gulp),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    eslint = require('gulp-eslint');

var options = {
  src: 'src',
  dist: 'dist'
};

gulp.task('scripts', function () {
  return gulp.src([options.src + '/**/*.js'])
    .pipe(eslint())
    .pipe(uglify())
    .pipe(rename('ng-sticky.js'))
    .pipe(gulp.dest(options.dist));
});

gulp.task('clean', function (cb){
  return del([options.dist], cb);
});

gulp.task('watch', function () {
  return gulp.watch([options.src + '/**/*'], ['build']);
});

gulp.task('default', gulpsync.sync([['build'], ['watch']]));
gulp.task('build', gulpsync.sync([['clean'], ['scripts']]));