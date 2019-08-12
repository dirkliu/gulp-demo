var gulp = require('gulp')
var uglify = require('gulp-uglify')
var concat = require('gulp-concat')
var sass = require('gulp-sass')
var sourcemaps = require('gulp-sourcemaps')
var del = require('del')
var versionjson = require("./plugins/gulp-versionjson/index")
sass.compiler = require('node-sass')

gulp.task('js', function() {
  return gulp.src('src/js/**.js')
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(concat('vendor.min.js'))
    .pipe(sourcemaps.write())
    .pipe(versionjson())
    .pipe(gulp.dest('dist/js'))
})

gulp.task('html', function() {
  return gulp.src('src/pages/**.html')
    .pipe(gulp.dest('dist'))
})

gulp.task('sass', function() {
return gulp.src(['src/styles/*.scss'])
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest("dist/styles")) 
})

gulp.task('clean', function (cb) {
  return del(['dist'], cb)
})

gulp.task("default", gulp.series('clean', gulp.parallel('js', 'html', 'sass')))
