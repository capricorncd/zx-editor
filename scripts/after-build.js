/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/05/08 16:37:46 (GMT+0900)
 */
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const { EOL } = require('os')
const path = require('path')
const { formatDate } = require('zx-sml')
const pkg = require('../package.json')
const { execSync } = require('child_process')

const header = [
  '/*!',
  ` * ${pkg.name} version ${pkg.version}`,
  ` * Author: ${pkg.author}`,
  ` * Released under the ${pkg.license} License`,
  ` * Repository: ${pkg.homepage}`,
  ` * Released on: ${formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss (g)')}`,
  ` * Copyright © 2018-present, ${pkg.author}`,
  ' */',
]

function addHeaderAndReplaceVersion(file) {
  console.log('Add header:', file)
  const liens = fs
    .readFileSync(file, 'utf8')
    .toString()
    .replace(/__VERSION__/gm, pkg.version)
    .split(EOL)
  fs.writeFileSync(file, [...header, ...liens].join(EOL))
}

function main() {
  const distDir = path.resolve(__dirname, '../dist')
  fs.readdirSync(distDir).forEach((file) => {
    if (/\.(js|css)$/.test(file)) {
      addHeaderAndReplaceVersion(path.join(distDir, file))
    }
  })
  // rename style.css
  const styleCss = path.join(distDir, 'style.css')
  if (fs.existsSync(styleCss)) {
    console.log('Rename:', styleCss)
    execSync(`mv ${styleCss} ${styleCss.replace('style.css', 'zx-editor.min.css')}`)
  }
}

main()
