/**
 * Created by Capricorncd.
 * Date: 2019/04/15 13:16
 * Copyright © 2017-present, https://github.com/capricorncd
 */
import {
  changeNodeName,
  unique
} from '../dom-class/helper'

const arr = []
// Support: Android <=4.0 only
// Make sure we trim BOM and NBSP
let regTrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g
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

/**
 * 移除html标签
 * @param str
 * @return {string}
 */
function removeHtmlTags (str) {
  str = (str + '').replace(/<\/?.+?>/g, '')
  return strip(str)
}

/**
 * string to hump format
 * @param str line-height: lineHeight
 * @return {string}
 */
function toHump (str) {
  return strip(str).replace(/([-_\s]+\w)/g, (match, $1) => {
    console.log(match, $1)
    return $1[1].toUpperCase()
  })
}

export default {
  changeNodeName,
  int,
  isElement,
  isObject,
  removeHtmlTags,
  slice,
  strip,
  trim,
  toHump,
  unique
}
