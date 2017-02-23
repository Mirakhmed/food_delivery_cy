var gulp = require('gulp');

var concat = require('gulp-concat');

gulp.task('js-concat', function() {
    return gulp.src([
        './bower_components/angular/angular.min.js',
        './bower_components/angular-bootstrap/ui-bootstrap.min.js'
    ])
        .pipe(concat('vendors.js'))
        .pipe(gulp.dest('./build/assets/js/'));
});

var gulpCopy = require('gulp-copy');

gulp.task('copy', function () {
    gulp.src('./src/index.html')
        .pipe(gulp.dest('./build/'));
});

var sass = require('gulp-sass');

gulp.task('sass', function () {
    return gulp.src('./bower_components/bootstrap/scss/bootstrap.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./build/assets/css'));
});

var rename = require('gulp-rename');
var minifyCss = require('gulp-minify-css');

gulp.task('styles', function() {
    gulp.src([
        './bower_components/bootstrap/scss/bootstrap.scss',
        './src/sass/app.scss'
    ])
        .pipe(sass().on('error', sass.logError))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./build/assets/css'))
        .pipe(minifyCss())
        .pipe(gulp.dest('./build/assets/css'));
});

gulp.task('css-concat', function() {
    return gulp.src('./build/assets/css/*')
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('./build/assets/css/'));
});


// Build all our tasks
gulp.task('build', function () {
    gulp.start('js-concat', 'copy', 'styles', 'css-concat');
});
