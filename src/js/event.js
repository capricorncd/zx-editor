/**
 * Created by zx1984 7/22/2018
 * https://github.com/zx1984
 */
import dom from './util/dom-core'
import util from './util/index'
import { createErrmsg } from './errors'

export function initEvent (_this) {
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
    // 删除链接
    if (nodeName === 'I' && $target.className === '__remove') {
      // 阻止触发a标签默认事件
      e.preventDefault()
      _this.emit('debug', 'delete A tag:')
      _this.dialog.confirm(`您确定要删除该链接吗？`, result => {
        if (result) {
          const $parent = dom.closest('p', $target)
          if ($parent) {
            // 获取相邻元素
            let $sibling = $parent.nextElementSibling || $parent.previousElementSibling
            $parent.parentNode.removeChild($parent)
            // 移动光标
            cursor.setRange($sibling, 0)
          }
          _this.emit('debug', 'delete A tag is confirm')
        } else {
          _this.emit('debug', 'delete A tag is cancel')
        }
      })
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
    // 判断容器内容是否被删空
    if (e.keyCode === 8 && checkContentInnerNull($content)) {
      e.preventDefault()
    }
  })

  // focus移除$content placeholder
  dom.addEvent($content, 'focus', _ => {
    removeContentClass($content)
  })

  // 离开编辑输入框时，内容是否为空
  // 为空则添加<br>
  dom.addEvent($content, 'blur', e => {
    checkContentIsEmpty($content)
    if (_this.$cursorElm && !_this.$cursorElm.innerHTML) {
      _this.$cursorElm.innerHTML = '<br>'
    }
  })

  // 文本编辑框内容输入
  dom.addEvent($content, 'keyup', e => {
    _this.$cursorElm = cursor.getRange()
    // _this.scrollToRange()
    _this.checkCursorPosition()
  }, false)


  // 链接：输入容器按钮
  const $submitBtn = dom.query('.submit-hook', _this.$link)
  const $cancelBtn = dom.query('.cancel-hook', _this.$link)
  const $linkInputs = dom.queryAll('input', _this.$link)
  // 确定
  dom.addEvent($submitBtn, 'click', e => {
    const el = e.target
    // const className = el.className
    if (dom.hasClass('disabled', el)) return
    // 创建url，并添加至焦点出
    let url = $linkInputs[0].value
    let title = $linkInputs[1].value
    if (url) {
      _this.addLink(url, title)
      _this.$link.style.display = 'none'
    }
  }, false)

  // 取消
  dom.addEvent($cancelBtn, 'click', e => {
    _this.$link.style.display = 'none'
  }, false)

  // 链接输入框
  dom.addEvent($linkInputs[0], 'keyup', e => {
    let val = e.target.value
    if (util.isHttpUrl(val)) {
      if (dom.hasClass('disabled', $submitBtn)) {
        dom.removeClass('disabled', $submitBtn)
      }
    }
  }, false)
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
