var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    clean = require('gulp-clean'),
    browserSync = require('browser-sync').create(),
    child_process = require('child_process'),
    livereload = require('gulp-livereload');


// Styles
gulp.task('styles', function() {
    return gulp.src('styles/main.scss')
        .pipe(sass({ style: 'expanded' }))
        .pipe(livereload(server))
        .pipe(gulp.dest('dist/styles'))
        .pipe(notify({ message: 'Styles task complete' }));
});
gulp.task('sass:watch', function() {
    return gulp.watch('media/styles/sass/**/*.scss', ['sass'])
        .on('change', function(event) {
            console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        });
});

// Scripts
gulp.task('scripts', function() {
    return gulp.src('src/scripts/**/*.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        .pipe(livereload(server))
        .pipe(gulp.dest('dist/scripts'))
        .pipe(notify({ message: 'Scripts task complete' }));
});

// Images
gulp.task('images', function() {
    return gulp.src('src/images/**/*')
        .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
        .pipe(livereload(server))
        .pipe(gulp.dest('dist/images'))
        .pipe(notify({ message: 'Images task complete' }));
});

// // Clean
gulp.task('clean', function() {
    return gulp.src(['dist/styles', 'dist/scripts', 'dist/images'], {read: false})
        .pipe(clean());
});

gulp.task('server:restart', function () {
    if (process.node) process.node.kill();

    process.node = child_process.spawn('node', ['app.js'], {stdio: 'inherit'});
});

// Default task
// gulp.task('default', ['clean'], function() {
//     gulp.run('styles', 'scripts', 'images');
// });

gulp.task('default', ['server:restart', 'sass:watch'], function () {
    browserSync.init({
        proxy: 'http://localhost:3000',
        port: 3001,
        ui: false,
        open: false
    });

    gulp.watch('media/**/*.css', function (file) {
        gulp.src(file.path).pipe(browserSync.stream());
    });
});

// Watch
// gulp.task('watch', function() {
//
//     // Listen on port 35729
//     server.listen(35729, function (err) {
//         if (err) {
//             return console.log(err)
//         };
//
//         // Watch .scss files
//         gulp.watch('src/styles/**/*.scss', function(event) {
//             console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
//             gulp.run('styles');
//         });
//
//         // Watch .js files
//         gulp.watch('src/scripts/**/*.js', function(event) {
//             console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
//             gulp.run('scripts');
//         });
//
//         // // Watch image files
//         // gulp.watch('src/images/**/*', function(event) {
//         //     console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
//         //     gulp.run('images');
//         // });
//
//     });
//
// });