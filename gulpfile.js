/**
 * Created by lauxinyi on 2017/8/31.
 */
var gulp = require('gulp');
var conct = require('gulp-concat');
var cssmin = require('gulp-minify-css');
var uglify = require('gulp-uglify');

gulp.task('minCss',function () {
    gulp.src('src/css/*.css')
        .pipe(cssmin())
        .pipe(conct("boxui.css"))
        //.pipe(uglify())
        .pipe(gulp.dest('dist/css'));
});

gulp.task("minJs",function () {
   gulp.src("src/js/*.js")
       //.pipe(uglify())
       .pipe(gulp.dest('dist/js'));
});

gulp.task("minHtml",function () {
    gulp.src('src/*.html')
        .pipe(gulp.dest('dist/'));
});

gulp.task('default', function() {
    gulp.start('minCss','minJs','minHtml');
});