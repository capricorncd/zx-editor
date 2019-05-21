/**
 * Created by Capricorncd.
 * Date: 2019/04/15 13:16
 * Copyright © 2017-present, https://github.com/capricorncd
 */
import { document, window } from 'ssr-window'
import {
  changeNodeName,
  unique
} from '../dom-class/helper'

const arr = []

// Support: Android <=4.0 only
// Make sure we trim BOM and NBSP
const regTrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g

// navigator
const USER_AGENT = window.navigator.userAgent
const PLATFORM = window.navigator.platform

/**
 * 转换为整数
 * @param n
 * @returns {*}
 */
function int (n) {
  let num = parseInt(n)
  return isNaN(num) ? 0 : num
}

/**
 * 去除字符串首尾空格
 * @param str
 * @returns {string}
 */
function trim (str) {
  return str ? str.toString().replace(regTrim, '') : ''
}

/**
 * 将伪数组，转化为数组
 * @param ArrayLike
 * @param index
 * @return {T[]}
 */
function slice (ArrayLike, index) {
  return arr.slice.call(ArrayLike, int(index))
}

/**
 * 去除字符串多余空格
 * 除首尾外，中间连续空格被替换为一个空格
 * @param str
 * @return {string}
 */
function strip (str) {
  return trim(str).replace(/\s+/g, ' ')
}

/**
 * 是否为Element对象
 * @param el
 * @return {*|boolean}
 */
function isElement (el) {
  return isObject(el) && el.nodeType
}

/**
 * 是否为对象
 * @param obj
 * @param isAbsolute 必须满足父级原型为Object的对象
 * @return {*|boolean}
 */
function isObject (obj, isAbsolute) {
  let isObj = obj && typeof obj === 'object'
  return isAbsolute ? isObj && obj.toString() === '[object Object]' : isObj
}

function isIPhone () {
  return /iphone/i.test(USER_AGENT) && /iphone/.test(PLATFORM)
}

function isIPhoneX () {
  return window.screen.height === 812 && window.screen.width === 375
}

function isWindow (obj) {
  return obj !== null && obj === obj.window
}

/**
 * 移除html标签
 * @param str
 * @return {string}
 */
function removeHtmlTags (str) {
  str = (str + '').replace(/<\/?.+?>/g, '')
  return strip(str)
}

function toHex (num) {
  let n = typeof num === 'number' ? num : int(num)
  let hex = n.toString(16)
  return hex[1] ? hex : '0' + hex
}

function rgbToHex (rgb) {
  let hex = ''
  if (/rgb.*?\((\d+)\D+?(\d+)\D+?(\d+)/.test(rgb)) {
    hex += toHex(RegExp.$1)
    hex += toHex(RegExp.$2)
    hex += toHex(RegExp.$3)
  }
  return hex ? '#' + hex : rgb
}

/**
 * string to hump format
 * @param str line-height: lineHeight
 * @return {string}
 */
function toHump (str) {
  return strip(str).replace(/([-_\s]+\w)/g, (match, $1) => {
    // console.log(match, $1)
    return $1[1].toUpperCase()
  })
}

function supportBoxModel () {
  const body = document.getElementsByTagName('body')[0]
  let div = document.createElement('div')
  body.appendChild(div)
  // Figure out if the W3C box model works as expected
  div.innerHTML = ''
  div.style.width = div.style.paddingLeft = '1px'
  // 通过检测div块的offsetWidth值是否是2px来判断浏览器是否支持盒模型
  let result = div.offsetWidth === 2
  body.removeChild(div)
  return result
}

export default {
  isIPhone: isIPhone(),
  isIPhoneX: isIPhoneX(),
  supportBoxModel: supportBoxModel(),
  changeNodeName,
  int,
  isElement,
  isObject,
  isWindow,
  removeHtmlTags,
  rgbToHex,
  slice,
  strip,
  trim,
  toHump,
  unique
}
