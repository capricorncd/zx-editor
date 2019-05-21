/**
 * Created by Capricorncd.
 * Date: 2019/04/15 13:14
 * Copyright © 2017-present, https://github.com/capricorncd
 */
import $, { ZxQuery } from '../dom-class/index'

/**
 * Cursor Class
 * @param $parent
 * @constructor
 */
function CursorClass ($parent) {
  // Limit focus range
  this.$parent = $parent
  this.selection = null
  this.range = null
  this.currentNode = null
  this.timer = null
  let $el = $parent.lastChild()
  // init offset
  this.offset = $el.text().length || 0
  if ($el[0]) this.setRange($el[0], this.offset)
}

/**
 * prototype
 * @type {{constructor: CursorClass, init(*=): void, setRange(*=, *=): void, getRange(): *}}
 */
CursorClass.prototype = {
  /**
   * constructor
   */
  constructor: CursorClass,

  init () {
    this.selection = window.getSelection()
    try {
      this.range = this.selection.getRangeAt(0)
    } catch (e) {
      this.range = new Range()
    }
  },

  /**
   * 设置或创建光标位置
   * @param el
   * @param offset
   */
  setRange (el, offset) {
    if (el instanceof ZxQuery) {
      el = el[0]
    }

    if (this.selection === null) {
      this.init()
    } else {
      // remove all range object
      this.selection.removeAllRanges()
    }

    // 光标移动到到原来的位置加上新内容的长度
    el = el || this.currentNode

    if (el) {
      // el: '<section>inner text.</section>'
      let targetNode = el.childNodes[el.childNodes.length - 1] || el
      // check img/video/audio
      // console.log(targetNode.nodeName, this.offset)
      if (/IMG|VIDEO|AUDIO/.test(targetNode.nodeName)) {
        this.offset = 1
        // get parentNode, can't set offset = 1 of IMG node.
        targetNode = targetNode.parentNode
      } else if (typeof offset === 'undefined') {
        // get min offset, because offset cannot exceed the length of targetNode.textContent
        this.offset = Math.min($(targetNode).text().length, this.offset)
      } else {
        this.offset = offset
      }
      this.range.setStart(targetNode, this.offset)
      this.currentNode = el
    }
    // cursor start and end position is collapse
    this.range.collapse(true)

    if (this.timer) {
      clearTimeout(this.timer)
      this.timer = null
    }
    // 延时执行，键盘自动收起后再触发focus
    this.timer = setTimeout(() => {
      // 插入新的光标对象
      this.selection.addRange(this.range)
    }, 100)
  },

  /**
   * get cursor node in $parent
   * @param needElement Want to get element node, not ZxQuery object
   * @return {*}
   */
  getCurrentNode (needElement) {
    // 获取选定对象
    // this.selection = window.getSelection()
    // 设置最后光标对象
    try {
      this.range = this.selection.getRangeAt(0)
    } catch (e) {
      this.range = new Range()
    }
    this.currentNode = this.range.endContainer
    this.offset = this.range.startOffset
    // Check whether currentNode is in the this.$parent
    let $currentNode = $(this.currentNode).findParentFrom(this.$parent)
    let $current = $currentNode || this.$parent.lastChild()
    return needElement ? $current[0] : $current
  }
}

export default CursorClass
