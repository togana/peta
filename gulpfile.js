const gulp = require('gulp');
const eslint = require('gulp-eslint');

gulp.task('eslint', () =>
  gulp.src([
    './*.js',
    './routes/*.js',
    './bin/www',
    './public/javascripts/*.js',
  ])
    .pipe(eslint({ useEslintrc: true }))
    .pipe(eslint.format())
    .pipe(eslint.failOnError())
);
