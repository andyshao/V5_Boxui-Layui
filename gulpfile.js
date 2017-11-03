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
       .pipe(uglify())
       .pipe(conct("boxui.js"))
       .pipe(gulp.dest('dist/js'));
});

gulp.task("minHtml",function () {
    gulp.src('src/*.html')
        .pipe(gulp.dest('dist/'));
});

gulp.task("copyImg",function () {
    gulp.src('src/img/*')
        .pipe(gulp.dest('dist/img'))
});

gulp.task("copyboxui",function () {
    gulp.src('src/boxui/**/*.html')
        .pipe(gulp.dest('dist/boxui'))
});

gulp.task("copyboxuiadmin",function () {
    gulp.src('src/boxuiadmin/**/*')
        .pipe(gulp.dest('dist/boxuiadmin'))
});

gulp.task('default', function() {
    gulp.start('minCss','minJs','minHtml','copyImg','copyboxui','copyboxuiadmin');
});