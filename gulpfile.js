const gulp = require('gulp');
const eslint = require('gulp-eslint');

gulp.task('eslint', () =>
  gulp.src([
    './*.js',
    './models/*.js',
    './routes/*.js',
    './routes/api/**/*.js',
    './routes/api/**/**/*.js',
    './bin/www',
    './public/javascripts/*.js',
    './test/**/*.js',
  ])
    .pipe(eslint({ useEslintrc: true }))
    .pipe(eslint.format())
    .pipe(eslint.failOnError())
);
