import dom from './util/dom-core'
import util from './util/index'

class DomRange {
  constructor ($content) {
    this.$content = $content
    this.selection = null
    this.$el = null
    this.offset = 0
    this.timer = null
    this.setPosition($content, 0)
  }

  init (offset) {
    this.selection = window.getSelection()
    try {
      this.$el = this.selection.getRangeAt(0)
    } catch (e) {
      this.$el = new Range()
    }
    this.offset = util.int(offset)
  }

  /**
   * 设置或创建光标位置
   * @param $el
   */
  setPosition ($el, offset) {
    // check offset
    if (typeof offset === 'number') {
      this.offset = offset
    }
    // check arguments
    if (typeof $el === 'number' && typeof offset === 'undefined') {
      this.offset = $el
      $el = null
    }
    if (this.selection === null) {
      this.init(offset)
    } else {
      // 清除选定对象的所有光标对象
      this.selection.removeAllRanges()
    }
    // 光标移动到到原来的位置加上新内容的长度
    if ($el) {
      this.$el.setStart(dom.getTextNode($el), this.offset)
    }
    // 光标开始和光标结束重叠
    this.$el.collapse(true)

    if (this.timer) clearTimeout(this.timer)
    // 延时执行，键盘自动收起后再触发focus
    this.timer = setTimeout(() => {
      // 插入新的光标对象
      this.selection.addRange(this.$el)
    }, 100)
  }

  /**
   * 获取光标及当前光标所在的DOM元素节点
   * @returns {*} $rangeElm
   */
  getRange () {
    // 获取选定对象
    this.selection = window.getSelection()
    // 设置最后光标对象
    this.$el = this.selection.getRangeAt(0)
    // console.log('selection.getRangeAt(0)', selection.getRangeAt(0))
    this.offset = this.$el.startOffset
    // 当前Node
    let currentNode = this.$el.endContainer
    // 获取光标所在元素的父级为this.$content.children
    return dom.closest(currentNode, this.$content)
  }
}

export default DomRange
