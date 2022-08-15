/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/07/10 16:00:31 (GMT+0900)
 */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const { outputFileOptions } = require('@sp-editor/nodejs')
const { getCommentsData, outputFile } = require('zx-sml/nodejs')

function main() {
  const docsDir = path.resolve(__dirname, '../../../docs')
  const data = getCommentsData(path.resolve(__dirname, '../src'), true)
  outputFile(data, docsDir, outputFileOptions)
  outputFile(data, path.resolve(__dirname, '../README.md'), outputFileOptions)
}

main()
