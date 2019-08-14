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

gulp.task("default", gulp.series('html'))
