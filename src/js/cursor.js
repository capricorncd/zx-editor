import dom from './util/dom-core'
import util from './util/index'

class Cursor {
  constructor ($content) {
    this.$content = $content
    this.selection = null
    this.range = null
    this.offset = 0
    this.timer = null
    this.init()
  }

  init () {
    this.selection = window.getSelection()
    try {
      this.range = this.selection.getRangeAt(0)
    } catch (e) {
      this.range = new Range()
    }
    this.offset = 0
  }

  /**
   * 设置光标元素及位置
   * @param $el
   * @param offset
   */
  setRange ($el, offset) {
    if (this.selection === null) {
      this.init()
    } else {
      // 清除选定对象的所有光标对象
      this.selection.removeAllRanges()
    }
    this.offset = util.int(offset)
    if ($el) {
      this.range.setStart(dom.getTextNode($el), this.offset)
    }
    // 光标开始和光标结束重叠
    this.range.collapse(true)
    // 清除定时器
    if (this.timer) {
      clearTimeout(this.timer)
      this.timer = null
    }
    // 延时执行，键盘自动收起后再触发focus
    this.timer = setTimeout(() => {
      // 插入新的光标对象
      this.selection.addRange(this.range)
    }, 100)
  }

  /**
   * 获取光标及当前光标所在的DOM元素节点
   * @returns {*} $rangeElm
   */
  getRange () {
    if (!this.selection) {
      this.init()
    } else {
      try {
        this.range = this.selection.getRangeAt(0)
      } catch (e) {}
      this.offset = this.range.startOffset
    }
    // 当前Node
    let $currentNode = this.range.endContainer
    // 获取光标所在元素的父级为this.$content.children
    return findRootNode($currentNode, this.$content)
      // 或获取$content的最后一个元素
      || this.$content.lastElementChild
      // 以上未获取到任何元素，
      // 则向$content中插入一个新p元素
      || dom.insertParagraph(this.$content)
  }
}

/**
 * 查找当前元素节点(textNode、ElemNode等)，在$context内的父根节点
 * @param currentNode 当前DOM节点
 * @param $context
 * @returns {*}
 */
export function findRootNode (currentNode, $context) {
  if (currentNode === $context) return null
  let $node = currentNode
  let $parentNode = $node.parentNode
  while ($parentNode) {
    if ($parentNode === $context) {
      return $node
    } else {
      $node = $parentNode
    }
    $parentNode = $node.parentNode
  }
  return null
}

export default Cursor
