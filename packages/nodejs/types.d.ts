/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/05/08 16:37:46 (GMT+0900)
 */
type StringObject = Record<string, string | StringObject>

/**
 * @method getCommentsData(input, rootDirName, needArray?, data?)
 * Get comments from the `input` file or directory.
 * @param input `string` The target file or directory.
 * @param rootDirName `string` The name of the root directory.
 * @param needArray `boolean` It's true will be returned an array. default `false`
 * @param data `object` It's the returned data. default `{}`
 * @returns `object | array` It's an array if `needArray` is true.
 */
export function getCommentsData(
  input: string,
  rootDirName: string,
  needArray?: boolean = false,
  data?: Record<string, any> = {},
): Record<string, any>[] | Record<string, any>

/**
 * @method outputFile(data, outputDirOrFile)
 * Output the obtained annotation content as a document.
 * @param data `object | array` Annotation content obtained from the source.
 * @param outputDirOrFile `string` The file or directory where the output will be written.
 * @returns `string | null` output file path
 */
export function outputFile(data: Record<string, any> | Record<string, any>[], outputDirOrFile?: string): string | null

/**
 * @method mkdirSync(dir)
 * make a directory synchronously
 * @param dir `string` directory path
 * @returns `void`
 */
export function mkdirSync(dir: string): void

/**
 * @method afterBuild(distDir, pkg, needMoveToDist?)
 * Handler function after build
 * @param distDir `string` The directory where the processed files are located.
 * @param pkg `object` package.json
 * @param needMoveToDist `boolean` optional parameter. It's true, will be move build files to the root dist directory.
 */
export function afterBuild(distDir: string, pkg: StringObject, needMoveToDist: boolean = false): void

/**
 * @method log(...args)
 * Output 😎 green color log in console
 * @param args `Array<string>`
 */
export function log(...args: Array<any>): void

/**
 * @method warn(...args)
 * Output 😕 yellow color log in console
 * @param args `Array<string>`
 */
export function warn(...args: Array<any>): void

/**
 * @method error(...args)
 * Output 😡 red color log in console
 * @param args `Array<string>`
 */
export function error(...args: Array<any>): void
