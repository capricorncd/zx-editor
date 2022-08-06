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
const { mkdirSync, log } = require('zx-sml/nodejs')

/**
 * create information about the package, and append it to the build file's header
 * @param pkg `object` package.json
 * @returns `Array<string>`
 */
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

/**
 * add header info and replace `__VERSION__`
 * @param file `string` will be append header info to this file.
 * @param pkg `object` package.json
 * @returns `void`
 */
function addHeaderAndReplaceVersion(file, pkg) {
  console.log('Add a header is start ...')
  log(file)
  const liens = fs
    .readFileSync(file, 'utf8')
    .toString()
    .replace(/__VERSION__/gm, pkg.version)
    .split(EOL)
  fs.writeFileSync(file, [...header(pkg), ...liens].join(EOL))
  console.log('Add header is ended.')
}

/**
 * @method afterBuild(distDir, pkg, needMoveToDist?)
 * Handler function after build
 * @param distDir `string` The directory where the processed files are located.
 * @param pkg `object` package.json
 * @param needMoveToDist `boolean` optional parameter. It's true, will be move build files to the root dist directory.
 */
function main(distDir, pkg, needMoveToDist = false) {
  // rename style.css to packageName.css
  const styleCss = path.join(distDir, 'style.css')
  if (fs.existsSync(styleCss)) {
    console.log('Rename is start ...')
    log(styleCss)
    // @zx-editor/packageName or packageName
    const fileName = pkg.name.includes('/') ? pkg.name.split('/').pop() : pkg.name
    execSync(`mv ${styleCss} ${styleCss.replace('style.css', fileName + '.min.css')}`)
    console.log('Rename is ended.')
  }

  // root dist directory
  let rootDistDir = null
  if (needMoveToDist) {
    rootDistDir = path.resolve(__dirname, '../../dist')
    mkdirSync(rootDistDir)
  }

  fs.readdirSync(distDir).forEach((file) => {
    if (/\.(js|css)$/.test(file)) {
      const filePath = path.join(distDir, file)
      // add info in header
      addHeaderAndReplaceVersion(filePath, pkg)
      // move files to root dist directory
      if (rootDistDir) {
        const destPath = path.join(rootDistDir, file)
        console.log('Move file is start ...')
        log(filePath)
        execSync(`mv ${filePath} ${destPath}`)
        log(destPath)
        console.log('Move file is ended.')
      }
    }
  })
}

exports.afterBuild = main
