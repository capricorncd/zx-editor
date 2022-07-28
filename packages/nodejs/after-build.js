/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/05/08 16:37:46 (GMT+0900)
 */
/* eslint-disable @typescript-eslint/no-var-requires */
const { execSync } = require('child_process')
const fs = require('fs')
const { EOL } = require('os')
const path = require('path')
const { formatDate } = require('zx-sml')
const { mkdirSync } = require('./helpers')

function header(pkg) {
  return [
    '/*!',
    ` * ${pkg.name} version ${pkg.version}`,
    ` * Author: ${pkg.author}`,
    ` * Released under the ${pkg.license} License`,
    ` * Repository: ${pkg.homepage}`,
    ` * Released on: ${formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss (g)')}`,
    ` * Copyright © 2018-present, ${pkg.author}`,
    ' */',
  ]
}

function addHeaderAndReplaceVersion(file, pkg) {
  console.log('Add header:\n', file)
  const liens = fs
    .readFileSync(file, 'utf8')
    .toString()
    .replace(/__VERSION__/gm, pkg.version)
    .split(EOL)
  fs.writeFileSync(file, [...header(pkg), ...liens].join(EOL))
}

function main(distDir, pkg, needMoveToDist = false) {
  // rename style.css to packageName.css
  const styleCss = path.join(distDir, 'style.css')
  if (fs.existsSync(styleCss)) {
    console.log('Rename:\n', styleCss)
    execSync(`mv ${styleCss} ${styleCss.replace('style.css', pkg.name + '.min.css')}`)
  }

  const rootDistDir = path.resolve(__dirname, '../../dist')
  mkdirSync(rootDistDir)

  // add info in header
  fs.readdirSync(distDir).forEach((file) => {
    if (/\.(js|css)$/.test(file)) {
      const filePath = path.join(distDir, file)
      addHeaderAndReplaceVersion(filePath, pkg)
      if (needMoveToDist) {
        const destPath = path.join(rootDistDir, file)
        console.log('Move...:\n', filePath)
        execSync(`mv ${filePath} ${destPath}`)
        console.log('Moved:\n', destPath)
      }
    }
  })
}

exports.afterBuild = main
