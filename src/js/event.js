/**
 * Created by zx1984 7/22/2018
 * https://github.com/zx1984
 */
import dom from './util/dom-core'
import util from './util/index'
import imgHandler from './image'
import { createErrmsg } from './errors'

export function initEvent (_this) {
  const cursor = _this.cursor
  const potions = _this.options
  const _events = _this._events
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
      _this.$cursorElm = _this.cursor.getRange()
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
      _this.confirm(`您确定要删除该链接吗？`, result => {
        if (result) {
          const $parent = dom.closest('p', $target)
          if ($parent) {
            $parent.parentNode.removeChild($parent)
          }
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
    // 隐藏显示的文字样式设置容器
    if (_this.state.textstyleShow) {
      _this._textstyleHide()
    }
  })

  // 阻止内容被删空
  dom.addEvent($content, 'keydown', e => {
    // 判断容器内容是否被删空
    if (e.keyCode === 8 && checkContentInnerNull($content)) {
      e.preventDefault()
    }
  })

  // 移除$content placeholder
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

  const $toolbarBtns = dom.queryAll('dd', _this.$toolbar)
  dom.addEvent($toolbarBtns, 'click', toolbarChildClickHandler)

  // 创建fileInput
  const $fileInput = initToolbarPicClik()

  /**
   * 点击工具栏按钮处理函数
   * @param e
   */
  function toolbarChildClickHandler (e) {
    const $current = e.currentTarget
    let index = dom.findIndex($current, $toolbarBtns)
    let params = potions.toolbar[index]
    let customEvent = params.on
    // 图片
    if (dom.hasClass('pic-hook', $current)) {
      if (_events[customEvent]) {
        _this.emit(customEvent)
      } else if ($fileInput) {
        $fileInput.click()
      } else {
        _this.emit('error', `[click-pic-btn]'s handler is not defined`)
      }
    }

    // 表情
    if (dom.hasClass('emoji-hook', $current)) {
      _this.emojiModal.show()
      _this.resetContentPostion(_this.bottomModalHeight)
      _this.checkCursorPosition()
    }

    // 文字
    if (dom.hasClass('text-hook', $current)) {
      _this.textstyleModal.show()
      _this.resetContentPostion(_this.bottomModalHeight)
      _this.checkCursorPosition()
    }

    // 链接
    if (dom.hasClass('link-hook', $current)) {
      if (_events[customEvent]) {
        _this.emit(customEvent, (url, title) => {
          _this.addLink(url, title)
        })
      } else {
        if (_this.$cursorElm.nodeName === 'P') {
          _this.$link.style.display = 'flex'
        } else {
          _this.emit('error', createErrmsg(1))
        }
      }
    }

    // 分割线
    if (dom.hasClass('split-hook', $current)) {
      dom.insertHr(_this.$cursorElm)
    }

    // 摘要
    if (dom.hasClass('summary-hook', $current)) {
      _this.emit(customEvent)
    }
  }

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
    // let linkStr = dom.createLinkStr($linkInputs[0].value, $linkInputs[1].value)
    // // 获取焦点在段落中的位置
    // const position = _this.cursor ? _this.cursor.startOffset : 0
    // if (_this.$cursorElm.nodeName === 'P') {
    //   _this.$cursorElm.innerHTML = dom.insertStr(_this.$cursorElm.innerText, linkStr, position)
    //   _this.$link.style.display = 'none'
    // }
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

  /**
   * 初始化toolbar点击pic图标
   * @returns {*}
   */
  function initToolbarPicClik() {
    // 有自定义监听点击选择图片按钮
    if (_events['click-pic-btn']) return null
    // 未设置监听事件，则模拟input[file]获取图片数据
    const $input = dom.createVdom({
      tag: 'input',
      attrs: {
        style: 'display: none',
        type: 'file',
        accept: 'image/*'
        // multiple: 'multiple'
      }
    })
    // 添加至文档流中
    _this.$wrapper.appendChild($input)
    // 绑定change事件
    dom.addEvent($input, 'change', fileInputChangeHandler)
    // 返回$input，模拟click时使用
    return $input
  }

  /**
   * input[file]选中文件后处理函数
   * @param e
   */
  function fileInputChangeHandler (e) {
    _this.$loading = _this.loading('图片处理中...')
    const files = this.files
    // 转数组
    const arr = util.slice(files)
    _this.debug.add('filesArray', arr)
    // 处理图片数据
    imgHandler.filesToBase64(arr, {width: 640}, (err, res) => {
      if (err) {
        _this.debug.add('Error[filesToBase64]:', err)
        // 移除_this.$loading
        _this.removeLoading(_this.$loading)
      }
      if (res) {
        console.log('filesToBase64', res)
        // _this.debug.add(res)
        res.forEach(item => {
          _this.addImage(item.base64)
          _this.pics.push(item)
        })
        // 移除_this.$loading
        _this.removeLoading(_this.$loading)
      }
    }, _this.debug)
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
