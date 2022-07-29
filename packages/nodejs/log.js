/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/06/11 13:13:33 (GMT+0900)
 */

const colors = {
  // 'bright': '\x1B[1m',
  // 'grey': '\x1B[2m',
  // 'italic': '\x1B[3m',
  // 'underline': '\x1B[4m',
  // 'reverse': '\x1B[7m',
  // 'hidden': '\x1B[8m',
  // 'black': '\x1B[30m',
  red: '\x1B[31m',
  green: '\x1B[32m',
  yellow: '\x1B[33m',
  // 'blue': '\x1B[34m',
  // 'magenta': '\x1B[35m',
  // 'cyan': '\x1B[36m',
  white: '\x1B[37m',
  // 'blackBG': '\x1B[40m',
  // 'redBG': '\x1B[41m',
  // 'greenBG': '\x1B[42m',
  // 'yellowBG': '\x1B[43m',
  // 'blueBG': '\x1B[44m',
  // 'magentaBG': '\x1B[45m',
  // 'cyanBG': '\x1B[46m',
  // 'whiteBG': '\x1B[47m',
}

/**
 * @method log(...args)
 * Output 😎 green color log in console
 * @param args `Array<string>`
 */
function log(...args) {
  console.log('😎', colors.green, ...args, colors.white)
}

/**
 * @method warn(...args)
 * Output 😕 yellow color log in console
 * @param args `Array<string>`
 */
function warn(...args) {
  console.log('😕', colors.yellow, ...args, colors.white)
}

/**
 * @method error(...args)
 * Output 😡 red color log in console
 * @param args `Array<string>`
 */
function error(...args) {
  console.log('😡', colors.red, ...args, colors.white)
}

module.exports = {
  log,
  warn,
  error,
}
