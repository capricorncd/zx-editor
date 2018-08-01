import dom from '../util/dom-core'
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
          child: '大标题'
        },
        {
          attrs: {
            class: '__h4',
            'data-tag': 'h4'
          },
          child: '小标题'
        },
        {
          attrs: {
            class: '__p',
            'data-tag': 'p'
          },
          child: '正文'
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
            '引用'
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
            '无序列表'
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
    onError (errMsg) {
      _this.emit('error', errMsg)
    },
    onShow () {
      _this.emit('debug', 'textstyleModal is showed')
    },
    onHide () {
      _this.checkCursorPosition()
      _this.resetContentPostion(_this.toolbarHeight)
      _this.emit('debug', 'textstyleModal is hidden')
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
  if ($styleWrapper) {
    handleStyleItemClick()
  }

  function handleStyleItemClick () {
    const $textStyleItems = $styleWrapper.children
    for (let i = 0; i < $textStyleItems.length; i++) {
      dom.addEvent($textStyleItems[i], 'click', _textStyleHandler)
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
  if ($colorWrapper) {
    handleColorItemClick()
  }

  function handleColorItemClick () {
    const $colorItems = $colorWrapper.children
    for (let i = 0; i < $colorItems.length; i++) {
      dom.addEvent($colorItems[i], 'click', _colorClickHandler)
    }
  }

  function _colorClickHandler (e) {
    const $el = e.currentTarget
    const color = $el.getAttribute('data-color')
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
   * 初始化文字样式选项
   * ***************************************************
   */
  function _initTextStyleCheck () {
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
   * ***************************************************
   * 隐藏textstyleModal
   * ***************************************************
   */
  // 隐藏textstyleModal
  dom.addEvent(textstyleModal.$switch, 'click', _ => {
    textstyleModal.hide()
  })
}
