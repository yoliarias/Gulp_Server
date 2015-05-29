var gulp = require('gulp');
var uglify = require('gulp-uglify');// Compress the js
var sass   = require('gulp-sass'); // Creates CSS
var connect = require('gulp-connect');// Converts into server
var htmlmin = require('gulp-htmlmin'); // minify html
var paths = {
	js: 'public/dev/assets/js/**/*.js',
	css:'public/dev/assets/sass/**/*.scss',// scss is sass extension
	html:'public/dev/views/**/*.html'
};

var path_dest = {
	js: 'public/dis/assets/js',
	css:'public/dis/assets/css',// scss is sass extension
	html: 'public/dis/views/'
};

//TASk
gulp.task('js', function() {
  return gulp.src(paths.js)
    .pipe(uglify())
    .pipe(gulp.dest(path_dest.js));
});

gulp.task('sass', function () {
  return gulp.src(paths.css)
    .pipe(sass({outputStyle:'compressed'}))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(path_dest.css));
});

 
gulp.task('html', function () {
  gulp.src('./*.html')
    .pipe(connect.reload());
});

gulp.task('minify', function() {
  return gulp.src(paths.html)
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(path_dest.html))
});

gulp.task('connect', function() {
  connect.server({
    root: './public/dis/views',
    port: 3000,
    livereload: true
  });
});

// WATCH FILES WHEN THEY ARE SAVED
gulp.task('watch', function () {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.js, ['js']);
  gulp.watch(paths.html, ['minify']);
});

//RUN DEFAULT TASKS
gulp.task('default', ['watch', 'js', 'sass','connect','minify']);