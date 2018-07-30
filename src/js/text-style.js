import dom from './util/dom-core'
export default class TextStyle {
  constructor ($el) {
    this.$el = $el
    this.init($el)
  }

  init ($el) {
    // 文字样式选项控制
    dom.addEvent($el, 'click', e => {
      const el = e.target
      // 字体标签
      if (dom.hasClass('tag-item', el)) {
        this._tagnameHandle(el)
      }
      // 字体样式
      if (dom.hasClass('style-item', el)) {
        this._textStyleHandle(el)
      }
      // 字体颜色
      if (dom.hasClass('color-item', el)) {
        this._textColorHandle(el)
      }
      // 关闭字体样式设置层
      if (dom.hasClass('abs-bar-btn', el)) {
        this.hide(el)
      }
    })

    // 滑动文字样式设置层时，禁用document滑动
    dom.addEvent($el, 'touchmove', e => {
      dom.queryAll('body')[0].style.overflow = 'hidden'
    })
    dom.addEvent($el, 'touchend', e => {
      dom.queryAll('body')[0].style.overflow = ''
    })
  }

  /**
   * 显示文字样式设置
   * @private
   */
  show () {
    this.$el.style.display = 'block'
    // this.$content.style.bottom = TEXT_STYLE_HEIGHT + 'px'
    this.textstyleShow = true
    this._initTextStyleCheck()
    // this.scrollToRange()
  }

  /**
   * 隐藏文字样式设置
   * @private
   */
  hide () {
    this.$el.style.display = 'none'
    // this.$content.style.bottom = TOOL_BAR_HEIGHT + 'px'
    this.textstyleShow = false
    // this.scrollToRange()
    // this.cursor.setPosition()
  }

  /**
   * 初始化文字样式选项
   * @private
   */
  _initTextStyleCheck () {
    if (!this.$el) return
    // 初始化节点类型 ****************************************
    // 检查当前焦点DOM节点类型
    let tagName = this.$cursorElm.tagName.toLowerCase()
    // this.log('this.$cursorElm.tagName: ' + tagName)
    let tagList = this.$el.querySelectorAll('.tag-item') || []
    tagList.forEach((item) => {
      let tag = item.getAttribute('data-tag')
      if (tag === tagName) {
        this._appendCheckedIcon(item)
      } else {
        this._removeCheckedIcon(item)
      }
    })

    // 初始化文字颜色选 ****************************************
    let color = this.$cursorElm.style.color
    if (/rgb\(/.test(color)) {
      // 十进制转十六进制
      color = util.rgbToHex(color)
    }
    // 获取颜色选项节点列表
    let colorList = this.$el.querySelectorAll('.color-item') || []
    colorList.forEach(item => {
      let tag = item.getAttribute('data-color')
      if (tag === color) {
        dom.addClass('active', item)
      } else {
        dom.removeClass('active', item)
      }
    })
    // 标记焦点位置
    this.cursor.setPosition()
  }

  /**
   * 添加一个checked图标
   * @param el
   * @private
   */
  _appendCheckedIcon (el) {
    if (el.querySelector('.checked')) return
    // 字体样式选中符号
    const ICON_CHECKED = dom.createElm('i', {class: 'checked'})
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
}
