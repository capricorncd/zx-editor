/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/06/11 13:13:33 (GMT+0900)
 */
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const { warn } = require('./log')

/**
 * @method mkdirSync(dir)
 * make a directory synchronously
 * @param dir `string` directory path
 * @returns `void`
 */
function mkdirSync(dir) {
  if (!dir || fs.existsSync(dir)) {
    warn(`The directory already exists, or is null, ${dir}`)
    return
  }
  const index = dir.lastIndexOf('/')
  if (index === -1) {
    warn(`The 'dir' maybe a valid directory name, ${dir}`)
    return
  }
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
