var gulp = require('gulp'),
    browserify = require('browserify'),
    BuildConfig = require('./buildConfig'),
    source = require('vinyl-source-stream'),
    browserSync = require('browser-sync');

gulp.task('build',function(){
    var b = browserify();
    b.add('./src/main.js');
    return b.bundle()
    .pipe(source(BuildConfig.testFile))
    .pipe(gulp.dest(BuildConfig.distPath));
});
gulp.task('watch', ['build'], function () {
    gulp.watch('./src/**/*.js', {interval: 500}, ['build']);
});

gulp.task('serve', ['build'], function () {
    browserSync.init({
        server: '.',
        port: 3000
    });
    gulp.watch('./src/**/*.js', ['build'])
        .on('change', browserSync.reload);
});