/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/06/11 13:13:33 (GMT+0900)
 */
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')

function mkdirSync(dir) {
  if (!dir || fs.existsSync(dir)) return
  const index = dir.lastIndexOf('/')
  if (index === -1) return
  const parent = dir.substring(0, index)
  if (fs.existsSync(parent)) {
    fs.mkdirSync(dir)
  } else {
    mkdirSync(parent)
    mkdirSync(dir)
  }
}

module.exports = {
  mkdirSync,
}
