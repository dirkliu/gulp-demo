var gulp = require('gulp')
var uglify = require('gulp-uglify')
var concat = require('gulp-concat')
var sass = require('gulp-sass')

sass.compiler = require('node-sass')

gulp.task('js', function() {
  return gulp.src('src/js/**.js')
    .pipe(uglify())
    .pipe(concat('vendor.min.js'))
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

gulp.task("default", gulp.parallel('js', 'html', 'sass'))
