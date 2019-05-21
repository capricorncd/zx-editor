/**
 * Created by Capricorncd.
 * Date: 2019/04/12 17:47
 * Copyright © 2017-present, https://github.com/capricorncd
 */
const { src, dest } = require('gulp')
// https://www.npmjs.com/package/gulp-less
const less = require('gulp-less')
// https://www.npmjs.com/package/gulp-css-base64
const cssBase64 = require('gulp-css-base64')
// https://www.npmjs.com/package/gulp-postcss
const postcss = require('gulp-postcss')
// https://www.npmjs.com/package/autoprefixer
const autoprefixer = require('autoprefixer')
// https://www.npmjs.com/package/cssnano
const cssnano = require('cssnano')
// https://www.npmjs.com/package/gulp-rename
const rename = require('gulp-rename')
// https://www.npmjs.com/package/gulp-header
const header = require('gulp-header')
const banner = require('./banner')

const isDev = process.env.NODE_ENV === 'development'

/**
 * 处理less文件
 * @return {*}
 */
module.exports = function () {
  let plugins = [
    autoprefixer({
      // browsers: ['last 1 version']
    })
  ]
  if (isDev) {
    return src('./src/css/zx-editor.less')
      .pipe(less())
      .pipe(cssBase64())
      .pipe(postcss(plugins))
      .pipe(header(banner))
      .pipe(dest('./dist/css'))
  } else {
    plugins.push(cssnano())
    return src('./dist/css/zx-editor.css')
      .pipe(postcss(plugins))
      // .pipe(header(banner))
      .pipe(rename('zx-editor.min.css'))
      .pipe(dest('./dist/css'))
  }
}
