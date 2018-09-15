/**
 * Create by capricorncd
 * 2018/1/24 0024.
 * https://github.com/capricorncd
 */
// 十六进制
export default {
  /**
   * Exception 通知
   * @param msg
   */
  err (msg) {
    throw new Error(msg)
  },

  /**
   * 获取文件后缀名
   * @param fileName
   * @returns {*}
   */
  getSuffix (fileName) {
    return fileName ? fileName.toString().split('.').pop().toLowerCase() : null
  },

  /**
   * 转换为整数
   * @param n
   * @returns {*}
   */
  int (n) {
    let num = parseInt(n)
    return isNaN(num) ? 0 : num
  },

  /**
   * 去除字符串首尾空格
   * @param str
   * @returns {string}
   */
  trim (str) {
    return str ? str.toString().replace(/^\s+|\s+$/g, '') : ''
  },

  /**
   * 十进制转十六进制
   * @param num
   * @returns {string}
   */
  toHex (num) {
    let n = typeof num === 'number' ? num : this.int(num)
    let hex = n.toString(16)
    return hex[1] ? hex : '0' + hex
  },

  /**
   * 字符串'font-size'转换为驼峰
   * @param str
   * @returns {string}
   */
  strToHump (str) {
    return str ? str.toString().replace(/-(\w)/g, (group, item) => item.toUpperCase()) : ''
  },

  /**
   * rgb(68, 198, 123)转16进制字符串
   * @param rgb
   * @returns {string}
   */
  rgbToHex (rgb) {
    let hex = ''
    if (/rgb.*?\((\d+)\D+?(\d+)\D+?(\d+)/.test(rgb)) {
      hex += this.toHex(RegExp.$1)
      hex += this.toHex(RegExp.$2)
      hex += this.toHex(RegExp.$3)
    }
    return hex ? '#' + hex : rgb
  },

  /**
   * 是否为空
   * @param str
   * @returns {boolean}
   */
  isEmpty (str) {
    return !str || /^\s*$/.test(str.toString())
  },

  /**
   * 是否为http(s)链接
   * @param url
   * @returns {*|boolean}
   */
  isHttpUrl (url) {
    return url && /^(http|https):\/\//i.test(url.toString())
  },

  /**
   * 将伪数组，转换为数组
   * @param pseudoArray 伪数组
   * @returns {*}
   */
  slice (pseudoArray, index = 0) {
    if (pseudoArray.length && pseudoArray[0]) {
      return Array.prototype.slice.call(pseudoArray, index)
    }
    return []
  },

  /**
   * 带时间戳的随机字符串
   * @param prefix 前缀
   * @returns {string}
   * @private
   */
  randStr (prefix = 'zxEditor_') {
    return prefix + (+new Date)
  },

  /**
   * 判断o是否为对象{}
   * @param o
   * @returns {*|boolean}
   */
  isObject (o) {
    return o && typeof o === 'object' && !Array.isArray(o)
  },

  /**
   * 空函数
   */
  fn () {}
}
