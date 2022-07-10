/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/07/10 16:27:14 (GMT+0900)
 */
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const path = require('path')
const { afterBuild } = require('../../nodejs-helpers')

function main() {
  const distDir = path.resolve(__dirname, '../dist')
  afterBuild(distDir, require('../package.json'))

  // remove src/index.js
  const tscOutputIndexFile = path.resolve(__dirname, '../src/index.js')
  if (fs.existsSync(tscOutputIndexFile)) {
    console.log('remove ', tscOutputIndexFile)
    fs.unlinkSync(tscOutputIndexFile)
    console.log('remove successful!')
  }
}

main()
