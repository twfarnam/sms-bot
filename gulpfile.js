var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var rename = require("gulp-rename");

// for javascript
var babel = require('gulp-babel');
var browserify = require('browserify-incremental');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

// for css
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');

var production = process.env.NODE_ENV === 'production';

gulp.task('server-js', () => {
  return gulp.src('src/**/*.js')
  .pipe(babel({presets: ['es2015']}))
  .on('error', onError)
  .pipe(gulp.dest('build'));
});

var b;
gulp.task('js', () => {
  b = b || browserify({
    debug: !production,
    extensions: ['.jsx'],
    entries: ['./frontend/js/index.js'],
  })
  .transform(babelify, {presets: ['react','es2015']})

  return b.bundle()
  .on('error', onError)
  .pipe(source('main.js'))
  .pipe(gulp.dest('./public'));
});

gulp.task('less', () => {
  return gulp.src('./frontend/less/index.less')
  .pipe(less({paths: [ './frontend/less' ]}))
  .on('error', onError)
  .pipe(autoprefixer({browsers: ['last 2 versions'], cascade: false}))
  .pipe(rename('main.css'))
  .pipe(gulp.dest('./public'));
});

gulp.task('build', ['server-js','js', 'less'], () => {
  console.log('done');
});

function onError(err) {
  console.error(err.message);
  this.emit('end');
}

gulp.task('watch', ['server-js','js', 'less'], () => {
  gulp.watch('./src/**/*.js', ['server-js']);
  gulp.watch('./frontend/**/*.less', ['less']);
  gulp.watch('./frontend/**/*.{js,jsx}', ['js']);
});

var script = 'build/app.js';
gulp.task('dev', ['watch'], () => {
  nodemon({script, watch:  ['build'], env:{NODE_ENV: 'development'}});
});

