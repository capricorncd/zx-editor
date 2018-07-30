/**
 * Created by zx1984 7/21/2018
 * https://github.com/zx1984
 */
const gulp = require('gulp')
const header = require('gulp-header')
const replace = require('gulp-replace')
const banner = require('./banner')
const pkg = require('../package.json')

// 添加header信息
// 替换版本号
gulp.task('addHeader', () => {
  return gulp.src('./dist/js/zx-editor.min.js')
    .pipe(replace('__VERSION__', pkg.version))
    .pipe(header(banner))
    .pipe(gulp.dest('./dist/js/'))
})

gulp.task('default', ['addHeader'])
