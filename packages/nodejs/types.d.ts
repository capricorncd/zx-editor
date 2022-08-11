/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/05/08 16:37:46 (GMT+0900)
 */
/**
 * @type StringObject
 */
type StringObject = Record<string, string | StringObject>

/**
 * see after-build.js
 * @param distDir
 * @param pkg
 * @param needMoveToDist
 */
export function afterBuild(distDir: string, pkg: StringObject, needMoveToDist: boolean = false): void
