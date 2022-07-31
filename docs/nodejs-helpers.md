# nodejs-helpers

Some tool functions used in the Nodejs environment

 ```js
 const { mkdirSync } = require('zx-editor/nodejs-helpers')

 mkdirSync('./a/b/c')
 ```

## Methods

### afterBuild(distDir, pkg, needMoveToDist?)

Handler function after build

- @param distDir `string` The directory where the processed files are located.
- @param pkg `object` package.json
- @param needMoveToDist `boolean` optional parameter. It's true, will be move build files to the root dist directory.

- @returns `void`

### error(...args)

Output 😡 red color log in console

- @param args `Array<string>`

- @returns `void`

### getCommentsData(input, rootDirName, needArray?, data?)

Get comments from the `input` file or directory.

- @param input `string` The target file or directory.
- @param rootDirName `string` The name of the root directory.
- @param needArray `boolean` It's true will be returned an array. default `false`
- @param data `object` It's the returned data. default `{}`

- @returns `object | array` It's an array if `needArray` is true.

### log(...args)

Output 😎 green color log in console

- @param args `Array<string>`

- @returns `void`

### mkdirSync(dir)

make a directory synchronously

- @param dir `string` directory path

- @returns `void`

### outputFile(data, outputDirOrFile)

Output the obtained annotation content as a document.

- @param data `object | array` Annotation content obtained from the source.
- @param outputDirOrFile `string` The file or directory where the output will be written.

- @returns `string | null` output file path

### warn(...args)

Output 😕 yellow color log in console

- @param args `Array<string>`

- @returns `void`

## License

MIT License © 2018-Present [Capricorncd](https://github.com/capricorncd).