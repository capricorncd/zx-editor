/**
 * Created by Capricorncd.
 * Date: 2019/04/12 13:31
 * Copyright © 2017-present, https://github.com/capricorncd
 */
const pkg = require('../package.json')

function dd (n) {
  let str = n + ''
  return str[1] ? n : '0' + n
}

function formatDate () {
  const date = new Date()
  return `${date.getFullYear()}-${dd(date.getMonth() + 1)}-${dd(date.getDate())} ${dd(date.getHours())}:${dd(date.getMinutes())}:${dd(date.getSeconds())}`
}

module.exports = `/*!
 * ${pkg.name} v${pkg.version}
 * ${pkg.homepage}
 * Copyright © 2018-present, ${pkg.author}
 * Released under the ${pkg.license} License
 * Released on: ${formatDate()}
 */`
