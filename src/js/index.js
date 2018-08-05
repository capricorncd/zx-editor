/**
 * Create by zx1984
 * 2018/1/23 0023.
 * https://github.com/zx1984
 */
import '../css/index.styl'
import './util/polyfill'
import dom from './util/dom-core'
import util from './util/index'
import broadcast from './broadcast/index'
import { initMixin } from './init'
import {initEvent, checkContentInnerNull, removeContentClass} from './event'
import { initEmoji } from './emoji/index'
import { initTextStyle } from './text-style/index'
import { initLink } from './link'
import { initToolbar, handlerToolbarOptions } from './toolbar'
import { toBlobData, filesToBase64, createImgElm } from './image'

/**
 * Note:
 * 1. 非特殊说明，带$符号的属性为Element对象
 */

class ZxEditor {
  /**
   * constructor
   * @param selector
   * @param options
   * @constructor
   */
  constructor (selector, options) {
    if (this instanceof ZxEditor) {
      this._init(selector, options)
    } else {
      throw new Error('ZxEditor is a constructor and should be called with the `new` keyword')
    }
  }

  /**
   * 初始化
   * @param selector
   * @param options
   * @private
   */
  _init (selector, options) {
    // version
    this.version = '__VERSION__'
    // broadcast
    this.broadcast = broadcast.broadcast
    // 初始化dom、参数
    initMixin(this, selector, options)
    // 初始化 toolbar
    initToolbar(this)
    // 初始化 emojiModal
    initEmoji(this)
    // 初始化 textStyleModal
    initTextStyle(this)
    // 初始化link
    initLink(this)
    // 初始化事件
    initEvent(this)
    this.checkCursorPosition()
  }

  /**
   * 向文档中添加图片
   * @param src
   */
  addImage (src) {
    this.emit('debug', 'addImage is start', src)
    createImgElm(src, (err, $img) => {
      if (err) {
        this.emit('error', 'from addImage', err)
        return
      }
      // console.log('this.$cursorElm++++++++++', this.$cursorElm)
      // 将图片插入至合适位置
      this.$cursorElm = dom.insertToRangeElm($img, this.$cursorElm, 'child-node-is-img')
      this.emit('debug', 'addImage is ended')
      // 重置光标位置
      this.cursor.setRange(this.$cursorElm, 0)
      // 延时执行光标所在元素位置计算
      let timer = setTimeout(_ => {
        this.checkCursorPosition()
        clearTimeout(timer)
        timer = null
      }, 300)
    })
  }

  /**
   * 添加链接
   * @param title
   * @param url
   */
  addLink (url, title) {
    this.emit('debug', 'addLink() is start', {url, title})
    if (!url) return
    if (!title) {
      title = url
    }
    let avnode = {
      tag: 'a',
      attrs: {
        href: url,
        // 'data-url': url,
        target: '_blank',
        contenteditable: false
      },
      child: [
        title,
        {
          tag: 'i',
          attrs: {
            class: '__remove'
          }
        }
      ]
    }
    // 创建$a元素
    const $a = dom.createVdom(avnode)
    this.$cursorElm = dom.insertToRangeElm($a, this.$cursorElm, 'child-node-is-a')
    this.emit('debug', 'addLink() is ended')
    // 重置光标位置
    this.cursor.setRange(this.$cursorElm, 0)
    this.checkCursorPosition()
  }

  /**
   * 添加toolbar button
   * @param opts
   */
  addFooterButton (opts) {
    this.emit('debug', 'addFooterButton start')
    let arr = []
    if (util.isObject(opts)) {
      arr.push(opts)
    } else if (Array.isArray(opts)) {
      arr = opts
    } else {
      this.emit('debug', 'addFooterButton failure', arr)
      return
    }
    this._addToolbarChild(arr)
  }

  _addToolbarChild (arr) {
    const vnodeArray = handlerToolbarOptions(arr)
    const $dl = dom.query('dl', this.$toolbar)
    let $item, onEvent
    vnodeArray.forEach(item => {
      $item = dom.createVdom(item)
      onEvent = dom.data($item, 'on')
      // 添加事件
      dom.addEvent($item, 'click', _ => {
        this.emit('debug', 'toolbarClick:', onEvent)
        this.emit(onEvent)
      })
      $dl.appendChild($item)
    })
    this.emit('debug', 'addFooterButton ended')
  }

  /**
   * 设置$content底部距离
   * @param pos
   * @param offset 偏移量，使文章内容更容易查看
   */
  resetContentPostion (pos, offset = 10) {
    let isFixed = this.options.fixed
    let styleName = isFixed ? 'bottom' : 'marginBottom'
    this.$content.style[styleName] = pos + util.int(offset) + 'px'
  }

  /**
   * 获取正文中的base64图片
   * @returns {Array}
   */
  getBase64Images () {
    const arr = []
    const $imgs = dom.queryAll('img', this.$content)
    let $img, base64
    for (let i = 0; i < $imgs.length; i++) {
      $img = $imgs[i]
      base64 = $img.src
      if (/^data:.+?;base64,/.test(base64)) {
        arr.push({
          id: $img.id,
          base64: base64,
          blob: toBlobData(base64)
        })
      }
    }
    return arr
  }

  /**
   * 设置指定id图片src
   * @param id
   * @param src
   * @returns {boolean}
   */
  setImageSrc (id, src) {
    let $img = dom.query('#' + id, this.$content)
    if ($img) {
      $img.src = src
      $img.removeAttribute('id')
      return true
    }
    return false
  }

  /**
   * 可视区间位置参数
   */
  _visiblePostion () {
    // const winW = window.innerWidth
    const winH = window.innerHeight
    const opts = this.options
    let top = util.int(opts.top)
    // 底部位置
    let bottom = 0
    // 底部modal容器
    // 是否显示
    if (this.emojiModal && this.emojiModal.visible) {
      bottom = this.emojiModal.height
    }
    else if (this.textstyleModal && this.textstyleModal.visible) {
      bottom = this.textstyleModal.height
    }
    // 设置的bottom + 底部工具栏高度
    else {
      bottom = util.int(opts.bottom) + (opts.showToolbar ? this.toolbarHeight : 0)
    }

    let visiblePosition = {
      fixed: opts.fixed,
      // winWidth: winW,
      winHeight: winH,
      // startX: 0,
      // endX: winW,
      startY: top,
      endY: winH - bottom - top
    }
    this.emit('message', visiblePosition)
    return visiblePosition
  }

  /**
   * 检查光标元素位置
   */
  checkCursorPosition () {
    const vpos = this._visiblePostion()
    const $el = this.$cursorElm
    if (!$el) return
    // 垂直偏移量，使内容滚动位置不要太贴边
    const offsetY = 10
    const pos = $el.getBoundingClientRect()
    // 获取滚动容器
    let $body = vpos.fixed ? this.$content : dom.query('html')
    // let bodyScrollHeight = $body.scrollHeight
    let bodyScrollTop = $body.scrollTop
    // console.log(bodyScrollTop, document.body.scrollTop)
    // 不能获取html scrollTop
    // if (bodyScrollHeight === 0) {
    //   $body = dom.query('body')
    //   console.warn($body.scrollHeight, $body.scrollTop, document.body.scrollTop)
    // }
    // console.error(pos.top)

    if (pos.top < vpos.startY) {
      $body.scrollTop = bodyScrollTop - (vpos.startY - pos.top) - offsetY
    }
    if (pos.bottom > vpos.endY) {
      $body.scrollTop = bodyScrollTop + vpos.endY + offsetY
    }
  }

  /**
   * 设置内容
   * @param data
   */
  setContent (data) {
    this.$content.innerHTML = data
    // 检查内容是否为空
    if (!checkContentInnerNull(this.$content)) {
      removeContentClass(this.$content)
    }
    // 重新获取$content 内光标元素
    this.$cursorElm = this.cursor.getRange()
  }

  /**
   * 获取正文内容
   * @param isText 只需要文本内容，即不含html标签
   * 默认为false，获取html代码
   */
  getContent (isText = false) {
    return this.$content[isText ? 'innerText' : 'innerHTML']
  }

  /**
   * 自动保存
   * @param interval 保存间隔时间，单位秒
   */
  autoSave (interval) {
    if (typeof interval !== 'number' || interval <= 0) return
    this.saveTimer = setInterval(_ => {
      this.save()
    }, interval * 1000)
  }

  /**
   * 停止自动保存
   * @private
   */
  stopAutoSave () {
    if (this.saveTimer) {
      clearInterval(this.saveTimer)
      this.saveTimer = null
    }
  }

  /**
   * 本地存储
   */
  save () {
    this.storage.set('content', this.getContent())
  }

  /**
   * 移除本地存储的content内容
   */
  removeSave () {
    this.storage.remove('content')
  }
}

// 扩展属性
ZxEditor.prototype.on = broadcast.on
ZxEditor.prototype.off = broadcast.off
ZxEditor.prototype.emit = broadcast.emit
ZxEditor.prototype.toBlobData = toBlobData
ZxEditor.prototype.filesToBase64 = filesToBase64

for (let key in dom) {
  if (dom.hasOwnProperty(key)) {
    ZxEditor.prototype[key] = dom[key]
  }
}

for (let key in util) {
  if (util.hasOwnProperty(key)) {
    ZxEditor.prototype[key] = util[key]
  }
}

export { ZxEditor }
