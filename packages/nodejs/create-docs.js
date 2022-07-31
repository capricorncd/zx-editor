/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/06/11 13:13:33 (GMT+0900)
 */
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const { EOL } = require('os')
const path = require('path')
const { mkdirSync } = require('./helpers')
const { log } = require('./log')

// blank line
const BLANK_LINE = ''

// method|type|class|document
const TYPES = {
  METHOD: 'method',
  TYPE: 'type',
  CLASS: 'class',
  DOCUMENT: 'document',
}

/**
 * handle file
 * @param filePath `string`
 * @param data `object`
 * @param fileName `string`
 */
function handleFile(filePath, data, fileName) {
  let isTargetComment = false
  let isCode = false
  let type = null
  let typeName = null
  let tempStr
  fs.readFileSync(filePath, 'utf8')
    .toString()
    .split(new RegExp(EOL))
    .forEach((line) => {
      const originalLine = line
      line = line.trim()
      // Start with method|type|class|document annotations
      if (/^\*\s*@(method|type|class|document)\s*(.+)/.test(line)) {
        const fullName = RegExp.$2
        isTargetComment = true
        type = RegExp.$1
        typeName = fullName.replace(/^([\w.]+).*/, '$1')

        data[typeName] = {
          type,
          name: typeName,
          fullName,
          desc: [],
          params: [],
          returns: [],
          codes: [],
          private: false,
        }
        if (type === TYPES.DOCUMENT) {
          data[typeName].fileName = fileName
        }
        return
      } else if (line === '*/' && isTargetComment) {
        isTargetComment = false
        // typeName = null;
        return
      }
      if (line === '/**') {
        typeName = null
      }
      if (!isTargetComment || !typeName) {
        // type codes
        if (typeName && type === TYPES.TYPE && line) {
          data[typeName].codes.push(originalLine.replace(/^export( default)?\s*/, ''))
        }
        return
      }

      if (/^\*\s*```\w+/.test(line)) {
        isCode = true
      }

      if (/^\*(.*)/.test(line)) {
        tempStr = RegExp.$1
        const temp = tempStr.trim()
        if (temp.startsWith('@param')) {
          data[typeName].params.push(temp.replace('@param', '').trim())
        } else if (temp.startsWith('@return')) {
          data[typeName].returns.push(temp.replace(/@returns?/, '').trim())
        } else if (temp.startsWith('@private')) {
          data[typeName].private = true
        } else if (isCode) {
          data[typeName].codes.push(tempStr)
        } else {
          data[typeName].desc.push(temp.replace('@description', '').trim())
        }
      }

      if (isCode && /^\*\s*```$/.test(line)) {
        isCode = false
      }
    })
}

function createMethodsDoc(item, lines) {
  if (!item.returns.length) item.returns.push('`void`')
  lines.push(
    BLANK_LINE,
    `### ${item.fullName}`,
    BLANK_LINE,
    ...item.desc,
    BLANK_LINE,
    // '*' will be replaced by 'npx pretty-quick --staged' with '-'
    // item.params.map((param) => `* @param ${param}`),
    ...item.params.map((param) => `- @param ${param}`),
    BLANK_LINE,
    ...item.returns.map((ret) => `- @returns ${ret}`),
    ...item.codes,
  )
}

function createTypesDoc(item, lines) {
  lines.push(
    BLANK_LINE,
    `### ${item.fullName}`,
    BLANK_LINE,
    ...item.desc,
    BLANK_LINE,
    '```ts',
    ...item.codes,
    '```',
    BLANK_LINE,
  )
}

function handleOutput(arr, outputDir) {
  console.log('Output file is start ...')
  // method|type|class|document
  const documents = []
  const types = []
  const methods = []

  let outputFileName = null

  arr.forEach((item) => {
    if (item.type === TYPES.DOCUMENT) {
      outputFileName = item.name + '.md'
      documents.push(item)
    } else if (item.type === TYPES.TYPE) {
      types.push(item)
    } else if (item.type === TYPES.METHOD && !item.private) {
      methods.push(item)
    }
  })

  const lines = []
  documents.forEach((item) => {
    lines.push(`# ${item.fullName}`, BLANK_LINE, ...item.desc, BLANK_LINE, ...item.codes)
  })

  if (methods.length) {
    lines.push(BLANK_LINE, '## Methods')
    methods.forEach((item) => {
      createMethodsDoc(item, lines)
    })
  }

  // ## types
  if (types.length) {
    lines.push(BLANK_LINE, '## Types', BLANK_LINE)
    types.forEach((item) => {
      createTypesDoc(item, lines)
    })
  }

  if (outputDir) {
    // ## License
    lines.push(
      BLANK_LINE,
      '## License',
      BLANK_LINE,
      'MIT License © 2018-Present [Capricorncd](https://github.com/capricorncd).',
    )

    // remove consecutive blank lines
    let blankLineCount = 0
    const outputLines = []
    lines.forEach((line) => {
      if (line === BLANK_LINE) {
        blankLineCount++
      } else {
        blankLineCount = 0
      }
      if (blankLineCount > 1) return
      outputLines.push(line)
    })

    // file check
    if (isFileLike(outputDir)) {
      outputFileName = outputDir
    } else if (outputFileName) {
      outputFileName = path.join(outputDir, outputFileName)
    }

    // output file
    if (outputFileName) fs.writeFileSync(outputFileName, outputLines.join(EOL), 'utf8')
  }

  log(outputFileName)
  console.log('Output file is ended.')
  return outputFileName
}

/**
 * @method outputFile(data, outputDirOrFile)
 * Output the obtained annotation content as a document.
 * @param data `object | array` Annotation content obtained from the source.
 * @param outputDirOrFile `string` The file or directory where the output will be written.
 * @returns `string | null` output file path
 */
function outputFile(data, outputDirOrFile) {
  if (outputDirOrFile && !fs.existsSync(outputDirOrFile) && !isFileLike(outputDirOrFile)) {
    mkdirSync(outputDirOrFile)
  }
  if (Array.isArray(data)) {
    return handleOutput(data, outputDirOrFile)
  } else {
    return Object.keys(data).map((key) => {
      return handleOutput(toArray(data[key]), outputDirOrFile)
    })
  }
}

/**
 * @method getCommentsData(input, rootDirName, needArray?, data?)
 * Get comments from the `input` file or directory.
 * @param input `string` The target file or directory.
 * @param rootDirName `string` The name of the root directory.
 * @param needArray `boolean` It's true will be returned an array.
 * @param data `object` It's the returned data.
 * @returns `object | array` It's an array if `needArray` is true.
 */
function getCommentsData(input, rootDirName, needArray = false, data = {}) {
  const stat = fs.statSync(input)
  if (stat.isDirectory()) {
    fs.readdirSync(input).forEach((file) => {
      getCommentsData(path.join(input, file), rootDirName, needArray, data)
    })
  } else if (stat.isFile() && /\.(ts|js)$/.test(input)) {
    const fileName = `${rootDirName}${input.split(rootDirName).pop()}`
    data[fileName] = {}
    handleFile(input, data[fileName], fileName)
  }
  return needArray ? mergeIntoArray(data) : data
}

function mergeIntoArray(data) {
  const mergeData = Object.keys(data).reduce((prev, filePath) => {
    Object.keys(data[filePath]).forEach((key) => {
      prev[key] = data[filePath][key]
    })
    return prev
  }, {})
  return toArray(mergeData)
}

function toArray(data) {
  const arr = []
  // sort and push into arr
  Object.keys(data)
    .sort()
    .forEach((key) => arr.push(data[key]))
  return arr
}

// function main() {
//   // Editor
//   const srcDir = path.resolve(__dirname, '../src')
//   const editorData = handleDir(srcDir)
//   outputFile(editorData, 'src')
// }
//
// main()

function isFileLike(filePath) {
  if (typeof filePath === 'string') {
    return /.+\.\w+$/.test(filePath)
  }
  return false
}

module.exports = {
  getCommentsData,
  outputFile,
}
