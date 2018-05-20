/**
 * Create by zx1984
 * 2018/1/23 0023.
 * https://github.com/zx1984
 */
import '../css/zx-editor.styl'
import util from './util'
import dom from './dom-core'
import scroll from './scroll'
import {toBlobData} from './extend-methods'
import { log, error } from './debug'

// COLOR
const COLORS = {
  black: '#333',
  gray: '#d0d0d0',
  red: '#ff583d',
  yellow: '#fdaa25',
  green: '#44c67b',
  blue: '#14b2e0',
  purple: '#b065e2'
}

// 工具栏高度
const TOOL_BAR_HEIGHT = 48 + 10
// 字体样式选择层高度
const TEXT_STYLE_HEIGHT = 260 + 10

// ZxEditor
class ZxEditor {
  // constructor
  constructor (selecotor = 'body') {
    this.editor = null
    this.toolbar = null
    this.editbox = null
    this.textstyle = null
    this.textstyleIsShow = false
    this.linkinput = null
    // 编辑的内容
    // this.content = null
    // 光标对象
    this.selection = null
    this.range = null
    this.rangeOffset = 0
    this.rangeTimer = null
    // 当前光标所在的元素节点NodeType === 1
    this.rangeElm = null
    this._initDoms(selecotor)
  }

  /**
   * 初始化DOM节点
   * @param selecotor Editor外层容器id或className
   * @private
   */
  _initDoms (selecotor) {
    // 外部容器
    const $outerWrapper = dom.query(selecotor)

    this.editor = dom.create('div', {class: 'zxeditor-container'})
    this.editbox = dom.create('div', {class: 'zxeditor-content-wrapper', contenteditable: true, style: `bottom: ${TOOL_BAR_HEIGHT}px`})
    this.toolbar = dom.create('div', {class: 'zxeditor-toolbar-wrapper'})
    this.textstyle = dom.create('div', {class: 'zxeditor-textstyle-wrapper', style: 'display: none'})

    this.linkinput = dom.create('div', {class: 'zxeditor-linkinput-wrapper', style: 'display: none'})

    this.toolbar.innerHTML = `
      <div class="toolbar-item pic-hook">图片</div>
      <div class="toolbar-item text-hook">文字</div>
      <div class="toolbar-item link-hook">链接</div>
      <div class="toolbar-item split-hook">分割</div>
      <!--<div class="toolbar-item reward-hook">打赏</div>-->
    `

    this.textstyle.innerHTML = `
      <div class="abs-bar-wrapper border-bottom">
        <div class="abs-bar-title">样式</div>
        <div class="abs-bar-btn">完成</div>
      </div>
      <div class="text-style-wrapper border-bottom">
        <div class="style-item text-bold" data-style="fontWeight:800">B</div>
        <div class="style-item text-italic" data-style="fontStyle:italic">I</div>
        <div class="style-item through-line" data-style="textDecoration:line-through">abc</div>
      </div>
      <div class="text-color-wrapper border-bottom">
        <div class="color-item color-black" data-color=""></div>
        <div class="color-item color-gray" data-color="${COLORS.gray}"></div>
        <div class="color-item color-red" data-color="${COLORS.red}"></div>
        <div class="color-item color-yellow" data-color="${COLORS.yellow}"></div>
        <div class="color-item color-green" data-color="${COLORS.green}"></div>
        <div class="color-item color-blue" data-color="${COLORS.blue}"></div>
        <div class="color-item color-purple" data-color="${COLORS.purple}"></div>
      </div>
      <div class="text-tag-wrapper">
        <div class="tag-item big-hook" data-tag="h2">大标题</div>
        <div class="tag-item small-hook" data-tag="h4">小标题</div>
        <div class="tag-item normal-hook" data-tag="p">正文</div>
        <div class="tag-item quote-hook" data-tag="blockquote"><b></b>引用</div>
        <div class="tag-item unordered-hook" data-tag="ul"><b></b>无序列表</div>
      </div>
    `

    this.linkinput.innerHTML = `
      <div class="linkinput-wrapper">
        <div class="linkinput-title">添加链接</div>
        <div class="linkinput-group">
          <input type="text" class="link-input" name="zxeditorLinkurl" placeholder="http(s)://">
          <input type="text" class="link-input" name="zxeditorLinkname" placeholder="链接名称(选填)">
        </div>
        <div class="linkinput-footer">
          <button class="cancel-hook">取消</button>
          <button class="submit-hook disabled">确定</button>
        </div>
      </div>
    `

    this.editor.appendChild(this.editbox)
    this.editor.appendChild(this.toolbar)
    this.editor.appendChild(this.textstyle)
    this.editor.appendChild(this.linkinput)
    $outerWrapper.appendChild(this.editor)

    this._eventHandle()
  }

  /**
   * 初始化文本框内容及当前光标元素
   * @private
   */
  _initContentRang () {
    if (!this.editbox.innerHTML) {
      const p = dom.create('p')
      p.innerHTML = '<br>'
      this.rangeElm = p
      this.editbox.appendChild(p)
      this._setRangePosition()
    }
  }

  /**
   * 显示文字样式设置
   * @private
   */
  _textstyleShow () {
    this.textstyle.style.display = 'block'
    this.editbox.style.bottom = TEXT_STYLE_HEIGHT + 'px'
    this.textstyleIsShow = true
    this._initTextStyleCheck()
    this.scrollToRange()
  }

  /**
   * 隐藏文字样式设置
   * @private
   */
  _textstyleHide () {
    this.textstyle.style.display = 'none'
    this.editbox.style.bottom = TOOL_BAR_HEIGHT + 'px'
    this.textstyleIsShow = false
    // this.scrollToRange()
    this._setRangePosition()
  }

  /**
   * 操作事件绑定
   */
  _eventHandle () {
    // 激活文本编辑框
    this.editbox.addEventListener('click', (e) => {
      this._initContentRang()
      this._getRange(() => {
        // this._initTextStyleCheck()
      })
      // 隐藏显示的文字样式设置容器
      if (this.textstyleIsShow) {
        this._textstyleHide()
      }
    }, false)

    // 离开编辑输入框时，内容是否为空
    // 为空则添加<br>
    this.editbox.addEventListener('blur', (e) => {
      if (this.rangeElm && !this.rangeElm.innerHTML) {
        this.rangeElm.innerHTML = '<br>'
      }
    }, false)

    // 文本编辑框内容输入
    this.editbox.addEventListener('keyup', () => {
      this._getRange()
      // this.scrollToRange()
    }, false)

    // 操作工具栏，上传图片、文字样式设置等
    this.toolbar.addEventListener('click', (e) => {
      const el = e.target
      // 判断内容是否为空，
      // 即用户是否有激活过文本输入框
      this._initContentRang()

      // 文字
      if (el.hasClass('text-hook')) {
        this._textstyleShow()
      }

      // 链接
      if (el.hasClass('link-hook')) {
        if (this.rangeElm.nodeName === 'P') {
          this.linkinput.style.display = 'flex'
        } else {
          alert('只支持在正文中插入链接！')
        }
      }

      // 分割线
      if (el.hasClass('split-hook')) {
        dom.insertHr(this.rangeElm)
      }

      // 打赏
      if (el.hasClass('reward-hook')) {
        alert('开发中')
      }
    }, false)

    // 文字样式选项控制
    this.textstyle.addEventListener('click', (e) => {
      const el = e.target
      // 字体标签
      if (el.hasClass('tag-item')) {
        this._tagnameHandle(el)
      }
      // 字体样式
      if (el.hasClass('style-item')) {
        this._textStyleHandle(el)
      }
      // 字体颜色
      if (el.hasClass('color-item')) {
        this._textColorHandle(el)
      }
      // 关闭字体样式设置层
      if (el.hasClass('abs-bar-btn')) {
        this._textstyleHide(el)
      }
    })

    // 滑动文字样式设置层时，禁用document滑动
    this.textstyle.addEventListener('touchmove', (e) => {
      dom.queryAll('body')[0].style.overflow = 'hidden'
    })
    this.textstyle.addEventListener('touchend', (e) => {
      dom.queryAll('body')[0].style.overflow = ''
    })

    // 链接：输入容器按钮
    const submitBtn = this.linkinput.querySelector('.submit-hook')
    const cancelBtn = this.linkinput.querySelector('.cancel-hook')
    const linkInputs = this.linkinput.querySelectorAll('input')
    // 确定
    submitBtn.addEventListener('click', (e) => {
      const el = e.target
      // const className = el.className
      if (el.hasClass('disabled')) return
      // 创建url，并添加至焦点出
      let linkStr = dom.createLinkStr(linkInputs[0].value, linkInputs[1].value)
      // 获取焦点在段落中的位置
      const position = this.range ? this.range.startOffset : 0
      if (this.rangeElm.nodeName === 'P') {
        this.rangeElm.innerHTML = dom.insertStr(this.rangeElm.innerText, linkStr, position)
        this.linkinput.style.display = 'none'
      }
    }, false)
    // 取消
    cancelBtn.addEventListener('click', () => {
      this.linkinput.style.display = 'none'
    }, false)

    // 链接输入框
    linkInputs[0].addEventListener('keyup', (e) => {
      let val = e.target.value
      if (util.isHttpUrl(val)) {
        if (submitBtn.hasClass('disabled')) {
          submitBtn.removeClass('disabled')
        }
      }
    }, false)
  }

  /**
   * 元素文字style样式处理
   * @param el 样式按钮对象
   * @private
   */
  _textStyleHandle (el) {
    const value = el.getAttribute('data-style')
    let style = value.split(':')
    let key = style[0]
    if (this.rangeElm.style[key] === style[1]) {
      this.rangeElm.style[key] = ''
    } else {
      this.rangeElm.style[key] = style[1]
    }
    this._setRangePosition()
  }

  /**
   * 元素文字Color处理
   * @param el 颜色按钮对象
   * @private
   */
  _textColorHandle (el) {
    const value = el.getAttribute('data-color')
    this.rangeElm.style.color = value
    el.addClass('active')
    let siblings = dom.siblings(el, 'active') || []
    siblings.forEach((item) => {
      item.removeClass('active')
    })
    this._setRangePosition()
  }

  /**
   * 标签样式处理
   * @param el 标签按钮对象
   * @private
   */
  _tagnameHandle (el) {
    const TAG_ITEMS = {
      'big': 'h2',
      'small': 'h4',
      'normal': 'p',
      'quote': 'blockquote',
      'unordered': 'ul'
    }

    const className = el.className

    if (el.querySelector('.checked') === null) {
      this._appendCheckedIcon(el)
      // 去掉兄弟节点上的选中符号
      let siblings = dom.siblings(el) || []
      siblings.forEach((item) => {
        this._removeCheckedIcon(item)
      })
      // 给当前焦点元素节点，添加样式
      let tag = 'p'
      let tagMatch = className.match(/\b(\w+?)-hook\b/)
      if (tagMatch && tagMatch[1]) {
        try {
          tag = TAG_ITEMS[tagMatch[1]]
        } catch (e) {}
      }
      // this.log(this.range)
      let newElm = dom.changeTagName(this.rangeElm, tag)
      dom.insertAfter(this.rangeElm, newElm)
      this.editbox.removeChild(this.rangeElm)
      this.rangeElm = newElm
      this._setRangePosition(this.rangeElm)
    }
  }

  /**
   * 初始化文字样式选项
   * @private
   */
  _initTextStyleCheck () {
    if (!this.textstyleIsShow) return
    // 初始化节点类型 ****************************************
    // 检查当前焦点DOM节点类型
    let tagName = this.rangeElm.tagName.toLowerCase()
    // this.log('this.rangeElm.tagName: ' + tagName)
    let tagList = this.textstyle.querySelectorAll('.tag-item') || []
    tagList.forEach((item) => {
      let tag = item.getAttribute('data-tag')
      if (tag === tagName) {
        this._appendCheckedIcon(item)
      } else {
        this._removeCheckedIcon(item)
      }
    })

    // 初始化文字颜色选 ****************************************
    let color = this.rangeElm.style.color
    if (/rgb\(/.test(color)) {
      // 十进制转十六进制
      color = util.rgbToHex(color)
    }
    // 获取颜色选项节点列表
    let colorList = this.textstyle.querySelectorAll('.color-item') || []
    colorList.forEach(item => {
      let tag = item.getAttribute('data-color')
      if (tag === color) {
        item.addClass('active')
      } else {
        item.removeClass('active')
      }
    })
    // 标记焦点位置
    this._setRangePosition()
  }

  /**
   * 添加一个checked图标
   * @param el
   * @private
   */
  _appendCheckedIcon (el) {
    if (el.querySelector('.checked')) return
    // 字体样式选中符号
    const ICON_CHECKED = dom.create('i', {class: 'checked'})
    el.appendChild(ICON_CHECKED)
  }

  /**
   * 移除checked图标
   * @param el
   * @private
   */
  _removeCheckedIcon (el) {
    let checkedNode = el.querySelector('.checked')
    if (checkedNode)
      el.removeChild(checkedNode)
  }

  /**
   * 创建图片随机id
   * @param prefix id前缀
   * @returns {string}
   * @private
   */
  _randId (prefix = '') {
    return 'zxEditor_' + prefix + (+new Date)
  }

  /**
   * 添加图片到编辑器中
   * @param src 图片URL地址或base64数据
   */
  addImage (src) {
    const id = this._randId('img_')
    const img = dom.create('img', { src: src, width: '100%', height: 'auto', id: id })
    let p = null
    if (dom.isInnerEmpty(this.rangeElm)) {
      p = this.rangeElm
      p.innerHTML = ''
    } else {
      p = dom.create('p')
      dom.insertAfter(this.rangeElm, p)
      this.rangeElm = p
    }
    p.appendChild(img)

    // 结尾插入的话，新增一段
    if (this.editbox.lastElementChild === p) {
      this._insertEmptyParagraph()
    } else {
      this.rangeElm = p.nextElementSibling
      this.rangeOffset = 0
      this._setRangePosition(this.rangeElm)
    }
    // 300毫秒后，文档高度跳转至焦点位置
    let timer = setTimeout(() => {
      this.scrollToRange()
      if (timer) clearTimeout(timer)
    }, 100)
  }

  /**
   * 获取光标及当前光标所在的DOM元素节点
   * @private
   */
  _getRange () {
    // 获取选定对象
    this.selection = getSelection()
    // 设置最后光标对象
    this.range = this.selection.getRangeAt(0)
    this.rangeOffset = this.range.startOffset
    // 当前Node
    let currentNode = this.range.endContainer
    this.rangeElm = dom.closest(currentNode, this.editbox)
  }

  /**
   * 设置或创建光标位置
   * @param el
   * @private
   */
  _setRangePosition (el) {
    if (this.selection === null) {
      this.selection = getSelection()
      this.range = new Range()
      this.rangeOffset = 0
    } else {
      // 清除选定对象的所有光标对象
      this.selection.removeAllRanges()
    }
    // 光标移动到到原来的位置加上新内容的长度
    if (el) {
      this.range.setStart(dom.getTextNode(el), this.rangeOffset)
    }
    // 光标开始和光标结束重叠
    this.range.collapse(true)

    if (this.rangeTimer) clearTimeout(this.rangeTimer)
    // 延时执行，键盘自动收起后再触发focus
    this.rangeTimer = setTimeout(() => {
      // 插入新的光标对象
      this.selection.addRange(this.range)
      if (this.rangeTimer) clearTimeout(this.rangeTimer)
      this.rangeTimer = null
    }, 100)
  }

  /**
   * 插入空行
   * @private
   */
  _insertEmptyParagraph () {
    const p = dom.create('p')
    p.innerHTML = '<br>'
    this.editbox.appendChild(p)
    this.rangeElm = p
    this.rangeOffset = 0
    this._setRangePosition(p)
  }

  /**
   * 滚动至顶部
   */
  // scrollToBottom ($el = document) {
  //   let timer = setTimeout(function () {
  //     // error($el.scrollTop, $el.scrollHeight)
  //     $el.scrollTop = $el.scrollHeight
  //     clearTimeout(timer)
  //     timer = null
  //   }, 100)
  // }

  /**
   * 滚动至指定位置
   * @param $el 对象
   * @param position y轴滚动距离
   */
  scrollTo ($el = document, position) {
    let timer = setTimeout(function () {
      // error(position)
      $el.scrollTop = position ? position : $el.scrollHeight
      clearTimeout(timer)
      timer = null
    }, 0)
  }

  /**
   * 滚动至焦点可视区域
   */
  scrollToRange () {
    let rect = this.rangeElm.getBoundingClientRect()
    // 编辑窗口
    let $editbox = this.editbox
    // 编辑窗口可视范围
    let viewRange = $editbox.offsetHeight
    // 当前焦点elem对象，不在焦点可视区域内
    if (rect.bottom <= 0) {
      this.scrollTo($editbox, $editbox.scrollTop + rect.top)
    } else if (rect.bottom >= viewRange) {
      this.scrollTo($editbox, $editbox.scrollTop + rect.bottom - viewRange)
    }
  }

  /**
   * 将image base64数据，转化为Bolb原始文件数
   * @param base64Data
   * @returns {*}
   */
  toBlobData (base64Data) {
    return toBlobData(base64Data)
  }

  /**
   * 获取正文中的base64图片
   * @returns {Array}
   */
  getBase64Images () {
    let arr = []
    const imgs = this.editbox.querySelectorAll('img')
    for (let i = 0; i < imgs.length; i++) {
      let img = imgs[i]
      if (/^data:.+?;base64,/.test(img.src)) {
        arr.push({
          id: img.id,
          data: img.src
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
    let img = this.editbox.querySelector('#' + id)
    if (img) {
      img.src = src
      return true
    }
    return false
  }

  /**
   * 获取正文内容(html代码)
   */
  getContent () {
    return this.editbox.innerHTML
  }
}

export { ZxEditor }
