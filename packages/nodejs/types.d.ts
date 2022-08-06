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
 * @method afterBuild(distDir, pkg, needMoveToDist?)
 * Handler function after build
 * @param distDir `string` The directory where the processed files are located.
 * @param pkg `object` package.json
 * @param needMoveToDist `boolean` optional parameter. It's true, will be move build files to the root dist directory.
 */
export function afterBuild(distDir: string, pkg: StringObject, needMoveToDist: boolean = false): void
