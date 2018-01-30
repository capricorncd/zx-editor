/**
 * Create by zx1984
 * 2018/1/24 0024.
 * https://github.com/zx1984
 */

'use strict'

const util = {
  // 转换为整数
  int (n) {
    let num = parseInt(n)
    return isNaN(num) ? 0 : num
  },
  trim (str) {
    return str ? str.toString().replace(/^\s+|\s+$/g, '') : ''
  },
  // 添加样式
  addClass (clsName, el) {
    let className = this.trim(el.className).replace(/\s{2,}/g, ' ')
    let reg = new RegExp(`\\b${clsName}\\b`)
    if (!reg.test(className)) {
      el.className = className + ' ' + clsName
    }
  },
  // 删除样式
  removeClass (clsName, el) {
    let className = this.trim(el.className).replace(/\s{2,}/g, ' ')
    let reg = new RegExp(`\\b(${clsName})\\b`)
    if (reg.test(className)) {
      el.className = className.replace(RegExp.$1, '')
    }
  },
  // 替换className
  changeClass (source, target = '', el) {
    let className = this.trim(el.className).replace(/\s{2,}/g, ' ')
    let reg = new RegExp(`\\b(${source})\\b`)
    if (source && reg.test(className)) {
      el.className = className.replace(RegExp.$1, target)
    } else if (target) {
      this.addClass(target, el)
    }
  },
  hasClass (clsname, el) {
    let reg = new RegExp(`\\b(${clsname})\\b`)
    return clsname && reg.test(el.className)
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

export default util
