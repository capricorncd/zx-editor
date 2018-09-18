/**
 * Create by capricorncd
 * 2018/1/23 0023.
 * https://github.com/capricorncd
 */
import '../css/index.styl'
import './util/polyfill'
import dom from './util/dom-core'
import util from './util/index'
import broadcast from './broadcast/index'
import { initMixin } from './init'
import {handleContent, checkContentInnerNull, removeContentClass} from './content'
import { initEmoji } from './emoji/index'
import { initTextStyle } from './text-style/index'
import { initLink } from './link'
import { initToolbar } from './toolbar'
import { toBlobData, filesToBase64, MEDIA_TYPES, createMedia } from './image'
import { initKeyboard } from './keyboard'

/**
 * Note:
 * 1. 非特殊说明，带$符号的属性为Element对象
 */

const d = document

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
    // 处理content容器相关的
    handleContent(this)
    // 移动端键盘
    initKeyboard(this)
    // 检查光标位置
    this.checkCursorPosition()
  }

  /**
   * 插入dom元素
   * @param $el
   * @param type
   * @param addRemoveIcon 添加remove icon
   */
  insertElm ($el, type, addRemoveIcon = false) {
    if (!$el) {
      this.emit('error', {
        msg: `insertElm($el), $el is ${$el}`
      })
      return
    }
    // 元素类型
    type = type || $el.nodeName.toLowerCase()
    // console.log($el, type)
    // 将图片插入至合适位置
    this.$cursorElm = dom.insertToRangeElm($el, this.$cursorElm, 'child-node-is-' + type, addRemoveIcon)
    this.emit('debug', 'insertElm ended')
    // 重置光标位置
    this.cursor.setRange(this.$cursorElm, 0)
    // 延时执行光标所在元素位置计算
    let tmr = setTimeout(_ => {
      this.checkCursorPosition()
      clearTimeout(tmr)
      tmr = null
    }, 350)
  }

  /**
   * 添加媒体元素
   * @param url
   * @param tag 媒体类型，img、audio、video
   */
  addMedia (url, tag) {
    this.emit('debug', 'addMedia start', url)
    // check media type
    if (!tag) {
      this.emit('error', {
        msg: `Unknown media type`
      })
      return
    }
    if (MEDIA_TYPES.indexOf(tag) === -1) {
      this.emit('error', {
        msg: `Media type "${tag}" is not valid!`
      })
      return
    }
    const $media = createMedia(tag, url)
    this.insertElm($media, tag, true)
  }

  /**
   * 向文档中添加图片
   * @param src
   */
  addImage (src) {
    this.addMedia(src, 'img')
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
    this.insertElm($a)
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
      this.emit('error', {
        msg: 'addFooterButton failure',
        data: arr
      })
      return
    }
    this._addToolbarChild(arr)
  }

  _addToolbarChild (arr) {
    const $dl = dom.query('dl', this.$toolbar)
    const _this = this
    let $item, onEvent, vnode
    arr.forEach(item => {
      vnode = {
        tag: 'dd',
        attrs: {
          class: `${item.class}`,
          'data-name': item.name,
          'data-on': item.on
        },
        child: [
          {
            tag: 'i',
            attrs: {
              class: item.icon
            }
          }
        ]
      }
      $item = dom.createVdom(vnode)
      _addEvent($item, item)
    })

    // 添加事件
    function _addEvent ($item, item) {
      // 添加事件
      dom.addEvent($item, 'click', _ => {
        _this.emit(item.on, item)
      })
      $dl.appendChild($item)
    }
    this.emit('debug', 'addFooterButton ended')
  }

  /**
   * 设置$content底部距离
   * @param pos
   * @param offset 偏移量，使文章内容更容易查看
   */
  resetContentPostion (pos, offset = 0) {
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
      endY: winH - bottom - top - util.int(this.keyboard.height)
    }
    this.emit('message', visiblePosition)
    return visiblePosition
  }

  /**
   * 检查光标元素位置
   */
  checkCursorPosition () {
    const vpos = this._visiblePostion()
    // 编辑器绝对定位时，光标位置交给系统处理
    if (vpos.fixed) return
    // 编辑器失去焦点时的焦点元素
    const $el = this.$cursorElm
    if (!$el) return
    // 垂直偏移量，使内容滚动位置不要太贴边
    const offsetY = 10
    const pos = $el.getBoundingClientRect()
    this.emit('message', '编辑器光标元素位置参数', pos)
    // documentElement scrollTop
    // let docScrollTop = d.documentElement.scrollTop
    // body scrollTop
    // let bodyScrollTop = d.body.scrollTop
    // 取最大值
    // let scrollTop = Math.max(docScrollTop, bodyScrollTop)
    let scrollTop = dom.getScroll('top')
    // 获取滚动容器
    // let $body = docScrollTop >= bodyScrollTop ? d.documentElement : d.body
    let top = 0
    // 焦点元素顶部在可视开始区域以上位置
    if (pos.top < vpos.startY) {
      top = scrollTop - (vpos.startY - pos.top) - offsetY
      // dom.scrollTop($body, top)
      dom.scrollTop(window, top)
    }
    // 焦点元素底部在可视结束区域以下位置
    if (pos.bottom > vpos.endY) {
      top = scrollTop + vpos.endY + offsetY
      // dom.scrollTop($body, top)
      dom.scrollTop(window, top)
    }
    // this.emit('message', {
    //   wrapper: $body.toString(),
    //   scrollTop: [
    //     'doc: ' + docScrollTop,
    //     'body: ' + bodyScrollTop
    //   ],
    //   top
    // })
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
    if (this.cursor) {
      // 初始化完成后
      this.$cursorElm = this.cursor.getRange()
    }
  }

  /**
   * 获取正文内容
   * @param isText 只需要文本内容，即不含html标签
   * 默认为false，获取html代码
   */
  getContent (isText = false) {
    // 获取文本内容
    if (isText) {
      return this.$content.innerText
    }
    // 获取html内容
    // 处理文本节点
    let childNodes = this.$content.childNodes
    let i, node
    for (i = 0; i < childNodes.length; i++) {
      node = childNodes[i]
      // 将非空文本节点，转换为p元素节点
      if (node.nodeType === 3) {
        let text = util.trim(node.nodeValue)
        if (text) {
          let $p = dom.createElm('p')
          $p.innerText = text
          this.$content.replaceChild($p, node)
        }
      }
    }
    return this.$content.innerHTML
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
