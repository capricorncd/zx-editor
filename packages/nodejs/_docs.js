/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/07/10 16:01:17 (GMT+0900)
 */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const { getCommentsData, outputFile } = require('./index')

function main() {
  const data = getCommentsData(path.resolve(__dirname, './'), 'packages', true)
  outputFile(data, path.resolve(__dirname, './README.md'))

  const docsDir = path.resolve(__dirname, '../../docs')
  outputFile(data, path.join(docsDir, 'nodejs-helpers.md'))
}

main()
