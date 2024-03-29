/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/07/10 16:00:31 (GMT+0900)
 */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const { getOutputFileOptions } = require('@sp-editor/nodejs')
const { getCommentsData, outputFile, getTypes } = require('zx-sml/docgen')

const outputFileOptions = getOutputFileOptions(true)

const options = {
  ...outputFileOptions,
  lines: {
    ...outputFileOptions.lines,
    afterTitle: {
      ...outputFileOptions.lines?.afterTitle,
      method: 'More methods please see [Editor](./Editor.md#methods) methods documentation.',
    },
  },
}

function main() {
  // get Editor options
  const editorData = getCommentsData(path.resolve(__dirname, '../../editor/src'))
  const editorTypes = getTypes(editorData)

  // get comments and output doc of SpEditor
  const docsDir = path.resolve(__dirname, '../../../docs')
  const dirs = [
    path.resolve(__dirname, '../src'),
    path.resolve(__dirname, '../../style-panel/src'),
    path.resolve(__dirname, '../../toolbar/src'),
  ]
  const data = getCommentsData(dirs, { types: editorTypes })
  // outputFile(data, path.resolve(__dirname, '../README.md'), outputFileOptions)
  outputFile(data, path.join(docsDir, 'SpEditor.md'), options)
}

main()
