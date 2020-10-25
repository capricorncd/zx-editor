/**
 * Created by Capricorncd.
 * User: https://github.com/capricorncd
 * Date: 2019/03/31 20:15
 */
const fs = require('fs-extra')
const path = require('path')

console.log('docs move start =========')
try {
  const src = path.resolve(__dirname, '../_book')
  const dest = path.resolve(__dirname, '../../docs')
  // remove old files
  if (fs.existsSync(dest)) {
    fs.removeSync(dest)
  }
  // move build file to docs
  fs.moveSync(src, dest)
} catch (e) {
  console.log(e)
}
console.log('docs move end =========')
