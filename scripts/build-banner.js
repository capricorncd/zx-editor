/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/05/08 16:37:46 (GMT+0900)
 */
const pkg = require('../package.json')

module.exports = `/*!
 * ${pkg.name} v${pkg.version}
 * ${pkg.homepage}
 * Released under the ${pkg.license} License
 * Released on: ${new Date().toString()}
 * Copyright © 2018-present, ${pkg.author}
 */`
