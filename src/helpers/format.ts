/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/05/05 14:47:02 (GMT+0900)
 */

/**
 * to snake case
 * helloWorld => hello-world
 * helloWorld => hello_world
 * helloWorld => hello world
 * @param str
 * @param connectSymbol word connect symbol
 */
export const toSnakeCase = (str: string, connectSymbol = '-'): string => {
  return str.replace(/[A-Z]/g, (s) => `${connectSymbol}${s.toLowerCase()}`)
}

/**
 * to camel case
 * hello_world => helloWorld
 * hello-world => helloWorld
 * hello world => helloWorld
 * @param str
 */
export const toCamelCase = (str: string): string => {
  return str.replace(/[-_\s](\w)/g, (_, s) => s.toUpperCase())
}

export const slice = <T, P>(arrLike: P, offset = 0): T[] => {
  return Array.prototype.slice.call(arrLike, offset)
}
