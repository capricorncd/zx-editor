/**
 * Created by Capricorncd.
 * Date: 2019/04/12 11:26
 * Copyright © 2017-present, https://github.com/capricorncd
 */
// https://gulpjs.com/docs/en/getting-started/creating-tasks
const { parallel, series, watch, src, task } = require('gulp')
const connect = require('gulp-connect')
const gopen = require('gulp-open')
const modifyFile = require('gulp-modify-file')
const handleJs = require('./build/js-handler')
const handleCss = require('./build/css-handler')

// NODE_ENV
const isDev = process.env.NODE_ENV === 'development'

// Tasks
task('connect', () => {
  connect.server({
    root: ['./'],
    host: '0.0.0.0',
    livereload: true,
    port: 9001
  })
})

task('open', () => {
  src('./index.html').pipe(gopen({ uri: 'http://localhost:9001/' }))
})

task('watch', () => {
  watch(['./src/js/*.js', './src/js/**/*.js'], series(handleJs))
  watch('./src/css/*.less', series(handleCss))
})

task('dev', series(handleJs, handleCss, parallel(['connect', 'open', 'watch'])))

task('default', parallel(handleJs, handleCss))

