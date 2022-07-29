/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/07/10 16:01:17 (GMT+0900)
 *
 * @document nodejs-helpers
 * Some tool functions used in the Nodejs environment
 *
 * ```js
 * const { mkdirSync } = require('zx-editor/packages/nodejs')
 *
 * mkdirSync('./a/b/c')
 * ```
 */
/* eslint-disable @typescript-eslint/no-var-requires */
const { afterBuild } = require('./after-build')
const { getCommentsData, outputFile } = require('./create-docs')
const { mkdirSync } = require('./helpers')
const { log, warn, error } = require('./log')

module.exports = {
  getCommentsData,
  outputFile,
  mkdirSync,
  afterBuild,
  log,
  warn,
  error,
}
