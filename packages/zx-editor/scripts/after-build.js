/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/07/10 16:27:14 (GMT+0900)
 */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const { afterBuild } = require('@zx-editor/nodejs')

function main() {
  const distDir = path.resolve(__dirname, '../dist')
  afterBuild(distDir, require('../../../package.json'), true)
}

main()
