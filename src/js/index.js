/**
 * Created by Capricorncd.
 * Date: 2019/04/12 11:12
 * Copyright © 2017-present, https://github.com/capricorncd
 */
/**
 * ***********************************************
 * Notes:
 * 1. The property or variables prefixed $ are ZxQuery instance, or related to them
 * ***********************************************
 */
import $ from './dom-class/index'
import CursorClass from './cursor-class/index'
import ExpansionPanel from './expansion-panel/index'
import util from './util/index'
import { initDom } from './init/init-dom'
import { initStyle } from './init/init-style'
import { handleEvents } from './events/index'
import { extendPrototypes } from './init/extend-prototype'
import { base64ToBlobData } from './image-handler/index'

const DEF_OPTIONS = {
  // 内容是否可以被编辑
  editable: true,
  // 编辑器输入内容绝对定位
  fixed: false,
  // editor min height
  // minHeight: window.innerHeight,
  // style
  placeholder: 'Enter...',
  placeholderColor: '',
  lineHeight: 1.5,
  // paragraph tail spacing, default 10px
  paragraphTailSpacing: '',
  cursorColor: '',
  textColor: '',
  // iphone会自动移动，难控制
  cursorOffsetTop: 30,
  // 自定义粘贴处理
  customPasteHandler: false,
  /**
   * ******************************
   * toolbar options
   * ******************************
   */
  // Has the toolbar been fixed?
  toolbarBeenFixed: true,
  toolbarHeight: 50,
  // buttons name, and order
  toolbarBtns: ['select-picture', 'text-style'],
  /**
   * ******************************
   * image options
   * ******************************
   */
  // customize Picture Handler
  customPictureHandler: false,
  // image max width
  imageMaxWidth: 720,
  // image max size, unit Kib, default 20M
  imageMaxSize: 20480,
  // template
  imageSectionTemp: `<section class="child-is-picture"><img src="{url}"></section>`,
  // GIF pictures are not processed
  ignoreGif: true,
  // Force the width/height of the picture, even if the width/height of the picture
  // is smaller than the target width/height
  forceImageResize: false,
  /**
   * ******************************
   * text style options
   * ******************************
   */
  // text style, value ['#333', '#f00', ...]
  textStyleColors: null,
  textStyleTitle: 'Set Style',
  textStyleHeadLeftBtnText: 'Clear style',
  textStyleHeadAlign: 'center',
  /**
   * ******************************
   * color options
   * ******************************
   */
  mainColor: '',
  // border color
  borderColor: ''
}

function ZxEditor (selector, _options) {
  if (!this instanceof ZxEditor) {
    throw new Error('ZxEditor is a constructor and should be called with the `new` keyword')
  }
  /**
   * ***************************************************
   * check selector
   * ***************************************************
   */
  this.$wrapper = $(selector)

  if (!this.$wrapper[0]) {
    throw new Error(`Can't found '${selector}' Node in document!`)
  }

  // version
  this.version = '__VERSION__'

  // ZxQuery instance
  this.$ = $

  this.ExpansionPanel = ExpansionPanel

  // options
  this.options = Object.assign(DEF_OPTIONS, _options)
  this.init(this.options)
}

ZxEditor.prototype = {

  constructor: ZxEditor,

  init (options) {
    options = options || this.options

    /**
     * ***************************************************
     * event listeners
     * or expansionPanel instance
     * ***************************************************
     */
    // $().on, $().off, $().trigger
    this.$eventHandlers = {}
    // this.on, this.off, this.emit
    this.customEvents = {}
    // extend prototype
    extendPrototypes(ZxEditor)
    // expansionPanel instances
    this.expansionPanels = []

    /**
     * ***************************************************
     * create dom
     * ***************************************************
     */
    initDom.call(this, options)

    /**
     * ***************************************************
     * style and placeholder
     * ***************************************************
     */
    initStyle.call(this, options)

    /**
     * ***************************************************
     * cursor
     * ***************************************************
     */
    this.cursor = new CursorClass(this.$content)

    this.$cursorNode = this.cursor.getCurrentNode()

    /**
     * ***************************************************
     * event: last
     * ***************************************************
     */
    handleEvents.call(this)
  },
  /**
   * 插入元素或字符串
   * @param el
   */
  insertElm (el) {
    // string
    if (!el) return
    // 光标元素及偏移量
    let $cursorNode = this.$cursorNode

    let newRangeEl, newRangeOffset
    /**
     * string
     */
    if (typeof el === 'string') {
      // 光标所在元素内容为空
      if ($cursorNode.isEmpty()) {
        $cursorNode.text(el)
        newRangeEl = $cursorNode
        newRangeOffset = el.length
      } else if ($cursorNode.children().every($item => $item.isTextNode())) {
        let rangeOffset = this.cursor.offset
        let rangeNodeStr = $cursorNode.text()
        let tmpStr = rangeNodeStr.substr(0, rangeOffset) + el + rangeNodeStr.substr(rangeOffset)
        // $section = $cursorNode.closest('section')
        $cursorNode.text(tmpStr)
        newRangeEl = $cursorNode
        newRangeOffset = el.length + rangeOffset
      } else {
        // 创建一个section
        let $newEl = $(`<section>${el}</section>`)
        // 插入到childIndex后
        $newEl.insertAfter($cursorNode)
        newRangeEl = $newEl
        newRangeOffset = el.length
      }
    }
    /**
     * 插入元素为：非文本
     */
    else {
      let $el = $(el)
      let $elm
      for (let i = 0; i < $el.length; i++) {
        $elm = $($el[i])
        let nodeName = $elm.nodeName()
        // SECTION
        if (nodeName !== 'section') {
          if ($elm.nodeType() === 1 && !/video|img|audio/.test(nodeName)) {
            $elm.changeNodeName('section')
          } else {
            let $tmp = $(`<section></section>`)
            $elm = $tmp.append($elm)
          }
        }
        if ($cursorNode.isEmpty()) {
          // siblings is empty
          if ($cursorNode.next()[0] && $cursorNode.next().isEmpty()) {
            $cursorNode.replace($elm)
          } else {
            $elm.insertBefore($cursorNode)
          }
        } else {
          $elm.insertAfter($cursorNode)
        }
        // 判断$el是否有下一个节点，有：光标指向el结束，无：则插入空行，并移动光标
        let next = $elm.next()[0]
        if (next) {
          newRangeEl = $elm
          newRangeOffset = $elm.isTextNode() ? $elm.text().length : 0
        } else {
          let $section = $(`<section><br></section>`)
          this.$content.append($section)
          newRangeEl = $section
          newRangeOffset = 0
        }
      }
    }
    this._checkChildSection()
    this.$content.trigger('input')
    console.log(newRangeEl, newRangeOffset)
    this.cursor.setRange(newRangeEl, newRangeOffset)
  },

  /**
   * 插入空行
   */
  insertBlankLine () {
    let $el = $(`<section><br></section>`)
    this.insertElm($el)
    this.cursor.setRange($el, 0)
  },

  /**
   * 检查内容是否为空
   * @private
   */
  _checkEmpty () {
    let $el = this.$content
    if ($el.isEmpty()) {
      $el.addClass('is-empty')
    } else if ($el.hasClass('is-empty')) {
      $el.removeClass('is-empty')
    }
  },

  /**
   * 检查一级子元素，nodeName是否为(SECTION|H1|H2|H3|H4|BLOCKQUOTE|UL)
   * 否：则替换为section标签，或者放入section标签内
   * @private
   */
  _checkChildSection () {
    if (!this.$cursorNode) this.$cursorNode = this.cursor.getCurrentNode()
    let cursorNode = this.$cursorNode[0]
    let isCursorNode = false
    const parent = this.$content[0]
    let childNodes = parent.childNodes
    let el
    for (let i = 0; i < childNodes.length; i++) {
      el = childNodes[i]
      if (el.nodeType === 1) {
        if (!/SECTION|H1|H2|H3|H4|BLOCKQUOTE|UL/.test(el.nodeName)) {
          isCursorNode = el === cursorNode
          el = util.changeNodeName(el, 'section')
          if (isCursorNode) {
            this.$cursorNode = $(el)
            this.cursor.setRange(el)
          }
        }
      } else {
        let $tmp = $(`<section></section>`)
        $tmp.append(el.cloneNode())
        parent.replaceChild($tmp[0], el)
        this.$cursorNode = $tmp
        this.cursor.setRange($tmp)
      }
    }
  },

  /**
   * 清空内容
   */
  remove () {
    this.setHtml()
  },

  /**
   * 设置编辑器内容
   * @param html
   */
  setHtml (html) {
    this.$content.html(html || '<section><br></section>')
    this._checkChildSection()
    this.cursor.setRange(this.$content.firstChild(), 0)
    this.$content.trigger('input')
  },

  /**
   * 获取编辑器html内容
   * 返回html内容
   * @return {*}
   */
  getHtml () {
    return this.$content.html()
  },

  /**
   * 获取编辑器文本内容，
   * 以纯文本形式返回数据
   * @return {*|string}
   */
  getText () {
    return this.$content.text()
  },

  /**
   * destroy event and Node
   */
  destroy (){
    let evt
    // remove $events
    for (let key in this.$eventHandlers) {
      evt = this.$eventHandlers[key]
      evt.$target.off(evt.type, evt.handler, evt.capture)
      delete this.$eventHandlers[key]
    }

    // remove customEvents
    for (let key in this.customEvents) {
      evt = this.customEvents[key]
      this.off(key)
    }

    // other object
    this.cursor = null
    this.toolbar = null
    this.textStylePanel = null

    // other ExpansionPanel
    for (let key in this) {
      if (this[key] instanceof ExpansionPanel) {
        this[key] = null
      }
    }

    // Node
    this.$editor.remove()
  },

  /**
   * set content height
   * default minHeight is window innerHeight, marginBottom
   * @param data
   */
  setContentHeight (data) {
    let winHeight = window.innerHeight
    let styles = {
      // 防止正文内容被键盘挡住，无法查看
      marginBottom: winHeight + 'px'
    }
    // check height
    if (data.height) {
      styles.height = typeof data.height === 'number' ? (data.height + 'px') : data.height
    } else {
      styles.minHeight = (util.int(data.minHeight) || winHeight) + 'px'
    }

    this.$content.css(styles)
  },

  /**
   * get base64 images from this.$content
   * @returns {Array}
   */
  getBase64Images () {
    const arr = []
    const $imgs = this.$content.find('img')
    let img, base64
    for (let i = 0; i < $imgs.length; i++) {
      img = $imgs[i]
      base64 = img.src
      if (/^data:.+?;base64,/.test(base64)) {
        arr.push({
          id: img.id,
          base64: base64,
          blob: base64ToBlobData(base64)
        })
      }
    }
    return arr
  },

  /**
   * 设置指定id图片src
   * @param id
   * @param src
   * @returns {boolean}
   */
  setImageSrc (id, src) {
    let img = this.$content.find('#' + id)[0]
    if (img) {
      img.src = src
      img.removeAttribute('id')
      return true
    }
    return false
  },

  /**
   * plugin
   * @param fn
   */
  plugin (fn) {
    if (typeof fn === 'function') {
      fn.call(this)
    }
  },

  /**
   * check cursor position
   */
  checkPosition () {
    const $el = this.$cursorNode = this.cursor.getCurrentNode()
    // 当前光标位置
    let cursorOffset = this.cursor.offset
    // 文本内容长度
    let len = $el.text().length
    // 当前元素高度
    let height = $el.height()
    // 当前元素top
    let top = $el.offset().top
    let scrollTop

    // 当前光标位置，距当前元素顶部距离
    let cursorHeight = 0

    // 每行大概有几个字
    let textNumOfPerLine = len / (height / this.lineHeight)
    // 当前光标所在行
    let line = height > this.lineHeight ? Math.floor(cursorOffset / textNumOfPerLine) : 1
    // 当前光标位置，至当前元素顶部高度 - 1行高，防止移动后，光标位置太贴近顶部
    let cursorHeightInCurrentNode = (line - 1) * this.lineHeight

    // editor postion: fixed;
    if (this.options.fixed) {

    } else {
      // 当前光标位置超过了屏幕的4分之1
      if (cursorHeightInCurrentNode > window.innerHeight / 4) {
        cursorHeight = cursorHeightInCurrentNode
      }
      scrollTop = $(window).scrollTop()
      $(window).scrollTop(scrollTop + top + cursorHeight - this.options.cursorOffsetTop)
    }
  }
}

export default ZxEditor
