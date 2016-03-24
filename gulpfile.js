var gulp = require('gulp');
var clean = require('gulp-clean');
var sass = require('gulp-sass');
var webserver = require('gulp-webserver');

const SOURCE = 'src'
const DEST = 'public'; // Directory of build
const PORT = 4000;

gulp.task('default', ['build-all', 'serve']);

/**
* Build
**/
gulp.task('build-all', ['html', 'css', 'js', 'fonts', 'images']);

gulp.task('html', function() {
  gulp.src(DEST + '/**/*.html', {read: false})
    .pipe(clean());

  // var htmlmin = require('gulp-htmlmin');
  return gulp.src(SOURCE + '/**/*.html')
    // .pipe(htmlmin(config.get('build.htmlMin')))
    .pipe(gulp.dest(DEST));
});

gulp.task('js', function() {
  gulp.src(DEST + '/js/**/*.*', {read: false})
    .pipe(clean());

  return gulp.src(SOURCE + '/assets/js/**/*.*')
    .pipe(gulp.dest(DEST + '/js'));
});

gulp.task('images', function() {
  gulp.src(DEST + '/images/**/*.*', {read: false})
    .pipe(clean());

  return gulp.src(SOURCE + '/images/**/*.*')
    .pipe(gulp.dest(DEST + '/images'));
});

gulp.task('css', ['scss'], function () {
  return gulp.src(SOURCE + '/assets/css/**/*.*')
    .pipe(gulp.dest(DEST + '/css'));
});

gulp.task('clean-css', function () {
  gulp.src(DEST + '/css/**/*.*', {read: false})
    .pipe(clean());
})

// gulp.task('coffee', function() {
//   var coffee = require('gulp-coffee');
//   var concat = require('gulp-concat');
//   return gulp.src(SOURCE + '/**/*.coffee')
//     .pipe(coffee({ bare: true }))
//     .pipe(concat('rental-center.js'))
//     .pipe(gulp.dest(DEST + '/js'));
// });

gulp.task('scss', function () {
  return gulp.src(SOURCE + '/assets/sass/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest(DEST + '/css')); // Copy to static dir
});

gulp.task('fonts', function() {
  gulp.src(DEST + '/fonts/**/*.*', {read: false})
    .pipe(clean());

  return gulp.src(SOURCE + '/assets/fonts/**/*.*')
    .pipe(gulp.dest(DEST + '/fonts'));
});

/**
* Serve
**/
gulp.task('serve', ['connect', 'watch']);

gulp.task('connect', function () {
  gulp.src(DEST)
    .pipe(webserver({
      port: PORT,
      livereload: {enabled: true}
    }));
})

gulp.task('watch', function () {
  gulp.watch(SOURCE + '/**/*.html', ['html']);
  gulp.watch(SOURCE + '/assets/**/*.js', ['js']);
  gulp.watch(SOURCE + '/assets/**/*.scss', ['scss']);
});
