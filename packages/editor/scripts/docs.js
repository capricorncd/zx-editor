/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/07/10 16:00:31 (GMT+0900)
 */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const { getCommentsData, outputFile } = require('@zx-editor/helpers-nodejs')

function main() {
  const docsDir = path.resolve(__dirname, '../../../docs')
  const data = getCommentsData(path.resolve(__dirname, '../src'), 'packages', true)
  // outputFile(data, path.resolve(__dirname, '../README.md'))
  outputFile(data, path.join(docsDir, 'Editor.md'))
}

main()
