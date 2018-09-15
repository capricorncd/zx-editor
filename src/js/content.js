/**
 * Created by capricorncd 7/22/2018
 * https://github.com/capricorncd
 */
import dom from './util/dom-core'
import util from './util/index'
import broadcast from './broadcast/index'
import { findRootNode } from './cursor'

// 可使用标签范围数组
const NODENAME_ARRAY = [
  'p',
  'h2',
  'h4',
  'ul',
  'blockquote'
]

// 内容附件
const CONTENT_ATTACH = {
  img: '图片',
  a: '链接',
  video: '视频',
  audio: '音频'
}

export function handleContent (_this) {
  const cursor = _this.cursor
  const $content = _this.$content

  /**
   * 初始化文本框内容及当前光标元素
   * @private
   */
  function initRangElm () {
    // 编辑器内容为空
    if (dom.isEmptyInner($content)) {
      const p = dom.createElm('p')
      p.innerHTML = '<br>'
      $content.appendChild(p)
      p.focus()
      _this.$cursorElm = p
    } else {
      _this.$cursorElm = cursor.getRange()
    }
  }

  // 激活文本编辑框
  // 删除附件等操作
  dom.addEvent($content, 'click', e => {
    e.stopPropagation()
    broadcast.emit('click', $content, e)
    // 隐藏emojiModal
    _this.emojiModal.hide()
    _this.textstyleModal.hide()
    // 删除附件a、或img
    const $target = e.target
    const nodeName = $target.nodeName
    // 阻止a标签默认行为
    if (nodeName === 'A') {
      e.preventDefault()
    }
    // 删除链接、图片
    if (nodeName === 'I' && $target.className.indexOf('__remove') >= 0) {
      // 阻止冒泡，触发a标签默认事件
      // e.stopPropagation()
      // 阻止触发a标签默认事件
      e.preventDefault()
      // 处理附件删除
      handleDeleteAttach($target)
      return
    }
    // 当前$content元素
    const $el = e.currentTarget
    // 防止toolbar被击穿
    if ($el !== $content) return
    initRangElm()
    removeContentClass($content)
  })

  // 阻止$content内容被删空
  dom.addEvent($content, 'keydown', e => {
    if (e.keyCode === 8) {
      if (_this.options.disableBackspaceDelete) {
        disableBackspaceDelete(e)
      }
      // 判断容器内容是否被删空
      if (checkContentInnerNull($content)) {
        e.preventDefault()
      }
    }
  })

  // focus移除$content placeholder
  dom.addEvent($content, 'focus', _ => {
    broadcast.emit('focus', $content)
    removeContentClass($content)
  })

  // 离开编辑输入框时，内容是否为空
  // 为空则添加<br>
  dom.addEvent($content, 'blur', e => {
    broadcast.emit('blur', $content)
    // 存储$curor element
    _this.$cursorElm = cursor.getRange()
    // 检查$content是否为空
    checkContentIsEmpty($content)
    // $cursorElm内容检查
    if (_this.$cursorElm && !_this.$cursorElm.innerHTML) {
      _this.$cursorElm.innerHTML = '<br>'
    }

    // 检查光标元素是否为指定(p, h2, h4, ul, blockquote)元素
    // className
    checkChildName()

    // 校验光标所在元素位置
    // _this.checkCursorPosition()
  })

  // 文本编辑框内容输入
  dom.addEvent($content, 'keyup', _ => {
    broadcast.emit('keyup', $content)
    // 存储$curor element
    _this.$cursorElm = cursor.getRange()
    _this.checkCursorPosition()
  }, false)

  // 粘贴
  dom.addEvent($content, 'paste', e => {
    e.preventDefault()
    let clipboardData = e.clipboardData
    if (!clipboardData) return
    let items = clipboardData.items
    // console.log(e)
    // console.log(clipboardData)
    // console.log(items)
    if (items) {
      let len = items.length
      let count = 0
      let pasteStr = ''
      let i, item
      for (i = 0; i < len; i++) {
        item = items[i]
        // 获取文本内容
        item.getAsString(str => {
          count++
          pasteStr += util.trim(str)
          if (count === len) {
            _insertToContent(pasteStr)
          }
        })
      }
    }
  })

  /**
   * 将粘贴内容插入至content中
   * @param pasteStr 粘贴内容文本
   * @private
   */
  function _insertToContent (pasteStr) {
    if (!pasteStr) {
      _this.dialog.alert('剪贴板无有效的文本内容')
    } else {
      // 去除html标签
      pasteStr = dom.removeHtmlTags(pasteStr)
      // 创建文本节点
      let $paste = document.createTextNode(pasteStr)
      _this.insertElm($paste, 'text')
      let tmr = setTimeout(_ => {
        _this.checkCursorPosition()
        clearTimeout(tmr)
        tmr = null
      }, 350)
    }
    broadcast.emit('paste', $content, {
      content: pasteStr
    })
  }

  /**
   * 检查$content子元素的合法性
   */
  function checkChildName () {
    const $rootNode = findRootNode(_this.$cursorElm, $content)
    if ($rootNode) {
      // 标签内容检查
      let className = $rootNode.className
      if (className) {
        let type = className.replace(/child-node-is-(\w+)/ig, '$1')
        if (type && !dom.query(type, $rootNode)) {
          $rootNode.removeAttribute('class')
          $rootNode.removeAttribute('contenteditable')
          // dom.removeClass('child-node-is-a', $rootNode)
        }
      }

      // 检查光标元素是否为指定(p, h2, h4, ul, blockquote)元素
      const nodeName = $rootNode.nodeName.toLowerCase()
      if (NODENAME_ARRAY.indexOf(nodeName) === -1) {
        // 修改器标签为p
        const $newNode = dom.changeTagName($rootNode, 'p')
        $content.replaceChild($newNode, $rootNode)
      }
    }
  }

  /**
   * disableBackspaceDelete
   * 禁用Backspace键删除a/img/video/audio
   * @param e
   */
  function disableBackspaceDelete (e) {
    let $rootParent, $prevNode
    try {
      // $content子节点
      $rootParent = findRootNode(_this.$cursorElm, $content)
      // 上一个节点
      $prevNode = $rootParent.previousElementSibling
    } catch (e) {}
    if (!$prevNode) return
    // 上一个兄弟节点含义附件（非文本、emoji类型）
    // 并且光标在当前节点首位
    if ((dom.query('a', $prevNode)
        || dom.query('img', $prevNode)
        || dom.query('video', $prevNode)
        || dom.query('audio', $prevNode))
      && _this.cursor.offset === 0) {
      e.preventDefault()
    }
  }

  /**
   * 处理正文附件删除
   * @param $el
   */
  function handleDeleteAttach ($el) {
    let $parent = findRootNode($el, $content)
    let className = $parent ? $parent.className : ''
    let type = className.replace(/child-node-is-(\w+)/, '$1')
    let attachName = CONTENT_ATTACH[type]
    _this.emit('debug', `Delete ${attachName}`)
    _this.dialog.confirm(`您确定要删除${attachName}吗？`, result => {
      if (result) {
        if ($parent) {
          // 获取相邻元素
          let $sibling = $parent.nextElementSibling || $parent.previousElementSibling
          $parent.parentNode.removeChild($parent)
          // 移动光标
          cursor.setRange($sibling, 0)
        }
      }
      $parent = null
    })
  }
}

/**
 * 检查$content字符串内容是否为空
 * @param $content
 */
function checkContentIsEmpty ($content) {
  if (util.isEmpty($content.innerText) && !dom.query('img', $content)) {
    dom.addClass('is-empty', $content)
  } else {
    removeContentClass($content)
  }
}

/**
 * 移除$content is-empty样式名
 * @param $content
 */
export function removeContentClass ($content) {
  if (dom.hasClass('is-empty', $content)) {
    dom.removeClass('is-empty', $content)
  }
}

/**
 * 阻止$content内容被删空
 * @param $content
 * @returns {boolean|*}
 */
export function checkContentInnerNull ($content) {
  const $childs = $content.children
  return $childs.length <= 1 && util.isEmpty($content.innerText)
}
