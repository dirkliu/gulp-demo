var gulp = require('gulp')
var uglify = require('gulp-uglify')
var concat = require('gulp-concat')

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

gulp.task("default", gulp.parallel('js', 'html'))
