var gulp = require('gulp')
var babel = require("gulp-babel")
var uglify = require('gulp-uglify')
var concat = require('gulp-concat')
var sass = require('gulp-sass')
var sourcemaps = require('gulp-sourcemaps')
var del = require('del')
var versionjson = require("./plugins/gulp-versionjson/index")
var staticResolve = require("./plugins/gulp-static-resolver/index")
var cleanCSS = require('gulp-clean-css')
sass.compiler = require('node-sass')

gulp.task('html', function () {
  return gulp.src('src/**/*.html')
    .pipe(gulp.dest("dist"))
})

gulp.task('homeJs', function () {
  return gulp.src('src/home/js/**/*')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat('home.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/home/js'))
})

gulp.task('homeImg', function () {
  return gulp.src('src/home/img/**/*')
    .pipe(gulp.dest('dist/home/img'))
})

gulp.task('homeStyle', function () {
  return gulp.src('src/home/styles/**/*')
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/home/styles'))
})

gulp.task('versionjson', function () {
  return gulp.src('dist/**/*')
    .pipe(versionjson('version.json'))
    .pipe(gulp.dest('dist'))
})

gulp.task('resolve', function () {
  return gulp.src(['dist/**/*.html', 'dist/**/*.js', 'dist/**/*.css'])
    .pipe(staticResolve())
})

gulp.task('clean', function (cb) {
  return del(['dist'], cb)
})

gulp.task("default", gulp.series([
  'clean',
  gulp.parallel('html', 'homeImg', 'homeStyle', 'homeJs'),
  'versionjson'
  ]))
