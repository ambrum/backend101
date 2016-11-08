var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var runSequence = require('run-sequence');


gulp.task('watch', function() {
    gulp.watch('app/media/src/styles/**/*.scss', ['sass']);
});

gulp.task('sass', function() {
    return gulp.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss
        .pipe(sass())
        .pipe(gulp.dest('*.js'))
        .pipe(browserSync.reload({
            stream: true
        }))
});
gulp.task('default', function (callback) {
    runSequence(['sass', 'watch'],
        callback
    )
})