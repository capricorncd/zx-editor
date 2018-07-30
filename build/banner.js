/**
 * Created by zx1984 7/21/2018
 * https://github.com/zx1984
 */
const util = require('./util')
const pkg = require('../package.json');

module.exports = `/**
 * ZxEditor v${pkg.version}
 * ${pkg.homepage}
 * Copyright © 2018-present, ${pkg.author}
 * Released under the ${pkg.license} License
 * Released on: ${util.formatDate('yyyy-MM-dd hh:mm:ss')}
 */
 `
