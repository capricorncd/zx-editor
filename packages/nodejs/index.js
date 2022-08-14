/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/07/10 16:01:17 (GMT+0900)
 *
 * @document nodejs-helpers
 * Some tool functions used in the Nodejs environment.
 *
 * ```js
 * const path = require('path')
 * const { afterBuild } = require('zx-editor/nodejs-helpers')
 * const pkg = require('../package.json')
 *
 * afterBuild(path.resolve(__dirname, '../dist'), pkg, true)
 * ```
 */
/* eslint-disable @typescript-eslint/no-var-requires */
const { afterBuild } = require('./after-build')

const outputFileOptions = {
  endLines: ['', '## License', '', 'MIT License © 2018-Present [Capricorncd](https://github.com/capricorncd).'],
  typeWithAuto: true,
}

module.exports = {
  afterBuild,
  outputFileOptions,
}
