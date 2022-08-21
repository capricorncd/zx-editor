/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/07/10 16:01:17 (GMT+0900)
 *
 * @document nodejs-helpers
 * Some tool functions used in the Nodejs environment.
 *
 * ```js
 * const path = require('path')
 * const { afterBuild } = require('sp-editor/nodejs-helpers')
 * const pkg = require('../package.json')
 *
 * afterBuild(path.resolve(__dirname, '../dist'), pkg, true)
 * ```
 */
/* eslint-disable @typescript-eslint/no-var-requires */
const { toTableLines } = require('zx-sml/nodejs')
const { afterBuild } = require('./after-build')

const otherDocsTable = {
  // align: 'center',
  align: {
    // Docs: 'left',
    Description: 'right',
    Url: 'center',
  },
  thead: ['Docs', 'Description', 'Url'],
  tbody: [
    ['Editor', 'class Editor documentation, main module of SpEditor.', '[/docs/Editor.md](./Editor.md)'],
    ['EventEmitter', 'class EventEmitter documentation.', '[/docs/EventEmitter.md](./EventEmitter.md)'],
    ['SpEditor', 'class SpEditor documentation.', '[/docs/SpEditor.md](./SpEditor.md)'],
    ['nodejs-helpers', 'nodejs-helpers documentation.', '[/docs/nodejs-helpers.md](./nodejs-helpers.md)'],
    ['Others', 'Other documentations.', '[/docs](./)'],
  ],
}

const otherDocsLines = [
  // Other docs table
  '## Other Docs',
  '',
  ...toTableLines(otherDocsTable),
  '',
]

/**
 *
 * @param needOtherDocs `boolean`
 * @returns
 */
function getOutputFileOptions(needOtherDocs = false) {
  const endLines = [
    // License
    '## License',
    '',
    'MIT License © 2018-Present [Capricorncd](https://github.com/capricorncd).',
  ]

  if (needOtherDocs) {
    endLines.unshift(...otherDocsLines)
  }

  const options = {
    lines: {
      end: endLines,
    },
    typeWithAuto: true,
  }

  return options
}

module.exports = {
  afterBuild,
  getOutputFileOptions,
}
