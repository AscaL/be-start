var gulp = require('gulp')
var jshint = require('gulp-jshint')
var stylish = require('jshint-stylish')
var size = require('gulp-size')
var todo = require('gulp-todo')
var notify = require('gulp-notify')
var del = require('del')

// TODO: define the folders better

gulp.task('default', function () {
  // place code for your default task here
})

gulp.task('clean', function (cb) {
  del([
    'node_modules',
    'coverage'
  ], cb)
})

gulp.task('lint', function () {
  return gulp.src(['./api/**/*.js', './config/**/*.js', './docs/**/*.js', './test/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
})

gulp.task('size', function () {
  var s = size({
    showFiles: true
  })
  return gulp.src(['./api/**/*.js', './config/**/*.js', './docs/**/*.js', './test/**/*.js'])
    .pipe(s)
    .pipe(notify({
      onLast: true,
      message: function () {
        return 'Total size ' + s.prettySize
      }
    }))
})

gulp.task('todo', function () {
  gulp.src(['./api/**/*.js', './config/**/*.js', './docs/**/*.js', './test/**/*.js'])
    .pipe(todo({
      absolute: true
    }))
    .pipe(gulp.dest('./'))
    .pipe(todo.reporter('json', {
      fileName: 'todo.json',
      absolute: true
    }))
    .pipe(gulp.dest('./'))
})
