/**
 * Create by zx1984
 * 2018/1/24 0024.
 * https://github.com/zx1984
 */
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
    const HEX_CODE = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']
    let hex = []
    // 余数
    let surplus = 0
    // 商
    let quotient = num
    do {
      surplus = HEX_CODE[quotient % 16]
      hex.unshift(surplus)
      quotient = Math.floor(quotient / 16)
    } while (quotient)

    return hex.length === 1 ? '0' + hex[0] : hex.join('')
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
