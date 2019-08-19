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
var express = require('express')

sass.compiler = require('node-sass')

gulp.task('html', function () {
  return gulp.src('src/**/*.html')
    .pipe(gulp.dest("dist"))
})

gulp.task('img', function () {
  return gulp.src('src/**/img/**/*')
    .pipe(gulp.dest('dist'))
})

gulp.task('style', function () {
  return gulp.src('src/**/styles/**/*')
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist'))
})

gulp.task('home', function () {
  return gulp.src('src/home/js/**/*')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat('home.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/home/js'))
})

gulp.task('version', function () {
  return gulp.src(['dist/**/*', '!dist/version.json', '!dist/*.html'])
    .pipe(versionjson('version.json'))
    .pipe(gulp.dest('dist'))
    .pipe(gulp.src(['dist/**/*.html', 'dist/**/*.js', 'dist/**/*.css']))
    .pipe(staticResolve('dist/version.json'))
    .pipe(gulp.dest('dist'))
})

gulp.task('clean', function (cb) {
  return del(['dist'], cb)
})

gulp.task('watch', function (cb) {
  gulp.watch('src/**/*.html', gulp.series('html'))
  gulp.watch('src/**/styles/**/*', gulp.series('style'))
  gulp.watch('src/home/js/**/*', gulp.series('home'))
  console.log('gulp is watching')
  cb()
})

gulp.task('server', function (cb) {
  var app = express()
  app.use(express.static('dist'))
  app.listen(9999)
  console.log('Develop server is running!')
  cb()
})

gulp.task("default", gulp.series([
  'clean',
  gulp.parallel('html', 'style', 'img', 'home')
  ]))

gulp.task("build", gulp.series([
  'clean',
  gulp.parallel('html', 'style', 'img', 'home'),
  'version'
  ]))

gulp.task("develop", gulp.series([
  'clean',
  gulp.parallel('html', 'style', 'img', 'home'),
  'server',
  'watch'
  ]))
