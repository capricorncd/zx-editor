/**
 * Create by zx1984
 * 2018/1/24 0024.
 * https://github.com/zx1984
 */
// 十六进制
export default {
  // 转换为整数
  int (n) {
    let num = parseInt(n)
    return isNaN(num) ? 0 : num
  },
  trim (str) {
    return str ? str.toString().replace(/^\s+|\s+$/g, '') : ''
  },
  // 十进制转十六进制
  toHex (num) {
    let hex = num.toString(16)
    return hex[1] ? hex : '0' + hex
  },
  // rgb(68, 198, 123)
  rgbToHex (rgb) {
    let hex = ''
    if (/rgb\((\d+)\D+?(\d+)\D+?(\d+)/.test(rgb)) {
      hex += this.toHex(RegExp.$1)
      hex += this.toHex(RegExp.$2)
      hex += this.toHex(RegExp.$3)
    }
    return hex ? '#' + hex : rgb
  },
  // 是否为http(s)链接
  isHttpUrl (url) {
    return url && /^(http|https):\/\//i.test(url.toString())
  }
}
