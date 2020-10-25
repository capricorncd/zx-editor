/**
 * Created by Capricorncd.
 * User: https://github.com/capricorncd
 * Date: 2019/04/01 20:43
 */
// gulp
const gulp = require('gulp')
const htmlmin = require('gulp-htmlmin')
// const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const cleanCss = require('gulp-clean-css')
const replace = require('gulp-replace')
/**
 * *********************************************************
 * html
 * *********************************************************
 */
// html代码压缩配置
const htmlMinOptions = {
    removeComments: true, // 清除HTML注释
    collapseWhitespace: true, // 压缩HTML
    collapseBooleanAttributes: true, // 省略布尔属性的值 <input checked="true"/> ==> <input />
    removeEmptyAttributes: true, // 删除所有空属性 <input id="" /> ==> <input />
    removeScriptTypeAttributes: true, // 删除<script>的type="text/javascript"
    removeStyleLinkTypeAttributes: true, // 删除<style>和<link>的type="text/css"
    minifyJS: true, // 压缩页面JS
    minifyCSS: true // 压缩页面CSS
}

function html1 () {
    return gulp.src('./_book/*.html')
        .pipe(htmlmin(htmlMinOptions))
        // 去除powered by Gitbook
        .pipe(replace(/ all right reserved&#xFF0C;powered by Gitbook/ig, '.'))
        .pipe(replace(
            '<a href="https://www.gitbook.com" target="blank" class="gitbook-link">Published with GitBook</a><', 
            '<a href="https://github.com/capricorncd/zx-editor" target="blank" class="gitbook-link">Github</a><'))
        .pipe(gulp.dest('./_book'))
}

/**
 * *********************************************************
 * css
 * *********************************************************
 */
function css () {
    return gulp.src([
        './_book/**/**/*.css'
    ])
        .pipe(cleanCss())
        .pipe(gulp.dest('./_book'))
}

/**
 * *********************************************************
 * js
 * *********************************************************
 */
function js () {
    return gulp.src([
        './_book/**/**/*.js'
    ])
        // .pipe(babel({
        //     presets: ['@babel/env']
        // }))
        .pipe(uglify())
        .pipe(gulp.dest('./_book'))
}

gulp.task('default', gulp.series(html1, css, js))
