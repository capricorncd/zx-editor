import dom from '../util/dom-core'
import util from '../util/index'
import BottomModal from '../util/bottom-modal'

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

export function initTextStyle (_this) {
  // 文字样式child Vnode
  const textStyleChild = [
    {
      attrs: {
        class: '__style-wrapper border-bottom'
      },
      child: [
        {
          attrs: {
            class: 'text-bold',
            'data-style': 'fontWeight:800'
          },
          child: 'B'
        },
        {
          attrs: {
            class: 'text-italic',
            'data-style': 'fontStyle:italic'
          },
          child: 'I'
        },
        {
          attrs: {
            class: 'through-line',
            'data-style': 'textDecoration:line-through'
          },
          child: 'abc'
        }
      ]
    },
    {
      tag: 'dl',
      attrs: {
        class: '__color-wrapper border-bottom'
      },
      child: [
        {
          tag: 'dd',
          attrs: {
            class: 'active __black',
            'data-color': ''
          }
        },
        {
          tag: 'dd',
          attrs: {
            class: '__gray',
            'data-color': COLORS.gray
          }
        },
        {
          tag: 'dd',
          attrs: {
            class: '__red',
            'data-color': COLORS.red
          }
        },
        {
          tag: 'dd',
          attrs: {
            class: '__yellow',
            'data-color': COLORS.yellow
          }
        },
        {
          tag: 'dd',
          attrs: {
            class: '__green',
            'data-color': COLORS.green
          }
        },
        {
          tag: 'dd',
          attrs: {
            class: '__blue',
            'data-color': COLORS.blue
          }
        },
        {
          tag: 'dd',
          attrs: {
            class: '__purple',
            'data-color': COLORS.purple
          }
        }
      ]
    },
    {
      attrs: {
        class: '__tag-wrapper'
      },
      child: [
        {
          attrs: {
            class: '__h2',
            'data-tag': 'h2'
          },
          child: [
            '大标题',
            {
              tag: 'i'
            }
          ]
        },
        {
          attrs: {
            class: '__h4',
            'data-tag': 'h4'
          },
          child: [
            '小标题',
            {
              tag: 'i'
            }
          ]
        },
        {
          attrs: {
            class: '__p',
            'data-tag': 'p'
          },
          child: [
            '正文',
            {
              tag: 'i',
              attrs: {
                class: 'checked'
              }
            }
          ]
        },
        {
          attrs: {
            class: '__blockquote',
            'data-tag': 'blockquote'
          },
          child: [
            {
              tag: 'b'
            },
            '引用',
            {
              tag: 'i'
            }
          ]
        },
        {
          attrs: {
            class: '__ul',
            'data-tag': 'ul'
          },
          child: [
            {
              tag: 'b'
            },
            '无序列表',
            {
              tag: 'i'
            }
          ]
        }
      ]
    }
  ]

  const textStyleVnode = {
    attrs: {
      class: 'text-style-outer-wrapper'
    },
    child: textStyleChild
  }

  // 实例化 textstyleModal
  const textstyleModal = new BottomModal({
    headTitle: '样式',
    headSwitch: '完成',
    $parent: _this.$editor,
    bodyChildVnode: textStyleVnode,
    onError (err) {
      _this.emit('error', err)
    },
    onShow () {
      _this.emit('bottom-modal', {
        type: 'text-style',
        show: true,
        height: textstyleModal.height
      })
      _initTextStyleCheck()
      _this.resetContentPostion(textstyleModal.height)
      _this.checkCursorPosition()
    },
    onHide () {
      _this.emit('bottom-modal', {
        type: 'text-style',
        show: false,
        height: 0
      })
      _this.resetContentPostion(_this.toolbarHeight)
      _this.checkCursorPosition()
    }
  })

  _this.textstyleModal = textstyleModal

  // textstyleModal.$body
  const $modalBody = textstyleModal.$body
  /**
   * ***************************************************
   * B I throuthLine
   * ***************************************************
   */
  const $styleWrapper = dom.query('.__style-wrapper', $modalBody)
  const $styleChildren = util.slice($styleWrapper.children)
  if ($styleWrapper) {
    handleStyleItemClick()
  }

  function handleStyleItemClick () {
    for (let i = 0; i < $styleChildren.length; i++) {
      dom.addEvent($styleChildren[i], 'click', _textStyleHandler)
    }
  }

  function _textStyleHandler (e) {
    const $el = e.currentTarget
    const value = $el.getAttribute('data-style')
    let style = value.split(':')
    let key = style[0]
    if (_this.$cursorElm.style[key] === style[1]) {
      _this.$cursorElm.style[key] = ''
    } else {
      _this.$cursorElm.style[key] = style[1]
    }
    _this.cursor.setRange()
  }

  /**
   * ***************************************************
   * Color
   * ***************************************************
   */
  const $colorWrapper = dom.query('.__color-wrapper', $modalBody)
  const $colorChildren = util.slice($colorWrapper.children)
  if ($colorWrapper) {
    dom.addEvent($colorChildren, 'click', _colorClickHandler)
  }

  function _colorClickHandler (e) {
    const $el = e.currentTarget
    let color = dom.data($el, 'color')
    _this.$cursorElm.style.color = color
    dom.addClass('active', $el)
    let $siblings = dom.siblings($el, 'active') || []
    $siblings.forEach(($item) => {
      dom.removeClass('active', $item)
    })
    _this.cursor.setRange()
  }

  /**
   * ***************************************************
   * tag change
   * ***************************************************
   */
  const $tagWrapper = dom.query('.__tag-wrapper', $modalBody)
  const $tagChildren = util.slice($tagWrapper.children)
  if ($tagWrapper) {
    dom.addEvent($tagChildren, 'click', _tagClickHandler)
  }

  /**
   * 点击修改段落风格处理器
   * @param e
   * @private
   */
  function _tagClickHandler (e) {
    const $current = e.currentTarget
    // 已被选中
    if (dom.query('.checked', $current)) return
    // 显示选中图标
    _showCheckedIcon($current)
    // 去掉兄弟节点上的选中图标
    const $siblings = dom.siblings($current) || []
    $siblings.forEach(($item) => {
      _hideCheckedIcon($item)
    })
    // 给当前焦点元素，添加样式
    _addCursorElmStyle($current)
  }

  // 给当前焦点元素，添加样式
  function _addCursorElmStyle ($el) {
    let tag = dom.data($el, 'tag')
    // this.log(this.range)
    let $newElm = dom.changeTagName(_this.$cursorElm, tag)
    _this.$content.replaceChild($newElm, _this.$cursorElm)

    _this.$cursorElm = $newElm
    _this.cursor.setRange(_this.$cursorElm)
  }

  /**
   * ***************************************************
   * 初始化文字样式选项
   * ***************************************************
   */
  function _initTextStyleCheck () {
    if (!$modalBody) return
    // 初始化节点类型 ****************************************
    // 检查当前焦点DOM节点类型
    let tagName = _this.$cursorElm.tagName.toLowerCase()
    // console.error('$cursorElm: ' + tagName)

    $tagChildren.forEach(($item) => {
      let tag = dom.data($item, 'tag')
      // console.error('tag: ' + tag)
      if (tag === tagName) {
        _showCheckedIcon($item)
      } else {
        _hideCheckedIcon($item)
      }
    })

    // 初始化文字颜色选 ****************************************
    let color = _this.$cursorElm.style.color
    if (/rgb\(/.test(color)) {
      // 十进制转十六进制
      color = util.rgbToHex(color)
    }

    $colorChildren.forEach($item => {
      let tag = dom.data($item, 'color')
      if (tag === color) {
        dom.addClass('active', $item)
      } else {
        dom.removeClass('active', $item)
      }
    })
    // 标记焦点位置
    _this.cursor.setRange()
  }

  /**
   * 添加一个checked图标
   * @param $el
   * @private
   */
  function _showCheckedIcon ($el) {
    const $i = dom.query('i', $el)
    if (dom.hasClass('checked', $i)) return
    dom.addClass('checked', $i)
  }

  /**
   * 移除checked图标
   * @param $el
   * @private
   */
  function _hideCheckedIcon ($el) {
    const $i = dom.query('i', $el)
    if (dom.hasClass('checked', $i)) {
      dom.removeClass('checked', $i)
    }
  }

  /**
   * ***************************************************
   * 隐藏textstyleModal
   * ***************************************************
   */
  // 隐藏textstyleModal
  dom.addEvent(textstyleModal.$switch, 'click', _ => {
    textstyleModal.hide()
  })
}
