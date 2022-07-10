/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/07/10 16:01:17 (GMT+0900)
 */
/* eslint-disable @typescript-eslint/no-var-requires */
const { afterBuild } = require('./after-build')
const { getCommentsData, outputFile, mkdirSync } = require('./create-docs')

module.exports = {
  getCommentsData,
  outputFile,
  mkdirSync,
  afterBuild,
}
