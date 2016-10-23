'use strict';

// Gulp
var gulp = require("gulp");
var source = require('vinyl-source-stream');
var watchify = require("watchify");
var gutil = require("gulp-util");
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');

// Scripts
var browserify = require("browserify");
var tsify = require("tsify");
var uglify = require('gulp-uglify');

// Style
var sass = require('gulp-sass');

var paths = {
  pages: ['src/*.html'],
  html: {
    src: 'src/*.html'
  },
  typescript: {
    src: 'src/typescript/main.ts',
    dist: 'dist/js/'
  },
  sass: {
    src: 'src/sass/**/*.scss',
    dist: 'dist/css/'
  }
};

// Scripts
var watchedBrowserify = watchify(browserify({
  basedir: '.',
  debug: true,
  entries: [paths.typescript.src],
  cache: {},
  packageCache: {}
}).plugin(tsify));

function bundle() {
  return watchedBrowserify
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.typescript.dist));
}

// SASS
gulp.task('sass', function () {
  return gulp
  // Find all `.scss` files from the `stylesheets/` folder
    .src(paths.sass.src)
    // Run Sass on those files
    .pipe(sass())
    // Write the resulting CSS in the output folder
    .pipe(gulp.dest(paths.sass.dist));
});

gulp.task('watch-sass', function() {
  return gulp
    .watch(paths.sass.src, ['sass']);
});

// HTML
gulp.task("copy-html", function () {
  return gulp.src(paths.pages)
    .pipe(gulp.dest("dist"));
});

gulp.task('watch-html', function() {
  return gulp
    .watch(paths.html.src, ['copy-html']);
});

gulp.task("default", ["watch-html", "watch-sass"], bundle);
watchedBrowserify.on("update", bundle);
watchedBrowserify.on("log", gutil.log);