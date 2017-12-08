const gulp = require('gulp');
const uglify = require('gulp-uglify');
const pump = require('pump');
const concat = require("gulp-concat");
const babel = require('gulp-babel');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const gutil = require('gulp-util');
const streamify = require('gulp-streamify');
const rename = require('gulp-rename');
const uglifycss = require('gulp-uglifycss');

gulp.task('styles', () => {
  gulp.src('./static/bolt/css/*.css')
    .pipe(uglifycss({
      "maxLineLen": 80,
      "uglyComments": true
    }))
    .pipe(gulp.dest('./static/bolt/css/dist/'));
});


gulp.task('javascript', () => {
  return browserify('./static/bolt/js/Main.js')
    .transform(babelify, {presets: ["es2015"]})
    .bundle()
    .pipe(source('all.js'))
    .pipe(gulp.dest('./static/bolt/js/dist/'))
    .pipe(rename('all.min.js'))
    .pipe(streamify(concat('all.min.js')))
    .pipe(streamify(uglify()))
    .pipe(gulp.dest('./static/bolt/js/dist/'))
});


gulp.task('watch', () => {
  gulp.watch('./static/bolt/js/*.js', ['javascript']);
  gulp.watch('./static/bolt/css/*.css', ['styles']);
});

gulp.task('default', ["watch"]);

