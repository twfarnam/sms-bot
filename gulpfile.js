var babel = require('gulp-babel');
var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

gulp.task('js', () => {
  return gulp.src('src/**/*.js')
  .pipe(babel({presets: ['es2015']}))
  .on('error', err => {
    console.error(err.message);
    this.emit('end');
  })
  .pipe(gulp.dest('build'));
});

gulp.task('watch', ['js'], () => {
  gulp.watch('./src/**/*.js', ['js']);
});

var script = 'build/app.js';
gulp.task('start', ['watch'], () => {
  nodemon({script, watch:  ['build'], env:{NODE_ENV: 'development'}});
});

