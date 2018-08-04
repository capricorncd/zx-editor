/**
 * Created by zx1984 8/1/2018
 * https://github.com/zx1984
 */
import dom from './util/dom-core'
import util from './util/index'

// toolbar配置
const TOOL_BAR_OPTIONS = [
  {
    title: '图片',
    class: '__pic',
    icon: '',
    on: 'select-picture',
    show: true
  },
  {
    title: '表情',
    class: '__emoji',
    icon: '',
    on: 'show-emoji'
  },
  {
    title: 'T',
    class: '__text',
    icon: '',
    on: 'show-textstyle'
  },
  {
    title: '链接',
    class: '__link',
    icon: '',
    on: 'add-link'
  }
  // {
  //   title: '分割',
  //   class: '__split',
  //   // icon: '',
  //   on: 'click-split-btn'
  // },
  // {
  //   title: '导语',
  //   class: '__summary',
  //   icon: '',
  //   on: 'click-summary-btn'
  // }
]

/**
 * 初始化toolbar
 * @param _this
 */
export function initToolbar (_this) {
  /**
   * ***************************************************
   * 创建dom结构
   * ***************************************************
   */
  const toolbarVnoe = {
    tag: 'div',
    attrs: {
      class: 'zxeditor-toolbar-wrapper',
      style: _this.options.showToolbar ? '' : `display:none;`
    },
    child: [
      {
        tag: 'dl',
        child: handlerToolbarOptions(TOOL_BAR_OPTIONS)
      }
    ]
  }

  _this.$toolbar = dom.createVdom(toolbarVnoe)
  _this.$editor.appendChild(_this.$toolbar)
  calculationToolbarWidth(_this.$toolbar)

  /**
   * ***************************************************
   * 事件处理
   * ***************************************************
   */
  const $toolbarBtns = dom.queryAll('dd', _this.$toolbar)
  // 点击toolbar
  dom.addEvent($toolbarBtns, 'click', toolbarChildClickHandler)

  // 创建fileInput
  const $fileInput = initFileInput()

  /**
   * 点击工具栏按钮处理函数
   * @param e
   */
  function toolbarChildClickHandler (e) {
    const $current = e.currentTarget
    // 通知名称
    let customEvent = dom.data($current, 'on')
    _this.emit('debug', 'toolbarClick:', customEvent)
    // 图片
    if (dom.hasClass('__pic', $current)) {
      if (_this.broadcast[customEvent]) {
        _this.emit(customEvent)
      } else if ($fileInput) {
        $fileInput.click()
      }
    }

    // 表情
    if (dom.hasClass('__emoji', $current)) {
      _this.emojiModal.show()
    }

    // 文字
    if (dom.hasClass('__text', $current)) {
      _this.textstyleModal.show()
    }

    // 链接
    if (dom.hasClass('__link', $current)) {
      if (_this.broadcast[customEvent]) {
        _this.emit(customEvent, (url, title) => {
          _this.addLink(url, title)
        })
      } else {
        if (_this.$cursorElm.nodeName === 'P') {
          _this.$link.style.display = 'flex'
        } else {
          _this.emit('error', '只支持在正文中插入链接，获取光标位置异常！')
        }
      }
    }

    // 分割线
    if (dom.hasClass('__split', $current)) {
      dom.insertHr(_this.$cursorElm)
    }

    // 其他自定义
    // _this.emit(customEvent)
  }


  /**
   * ***************************************************
   * 模拟选中图片文件
   * ***************************************************
   */
  /**
   * 初始化图片选择input[type=file]
   * @returns {*}
   */
  function initFileInput () {
    // 有自定义监听点击选择图片按钮
    if (_this.broadcast['select-picture']) return null

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
    // 返回$input，模拟click[type=file]时使用
    return $input
  }

  /**
   * input[file]选中文件后处理函数
   * @param e
   */
  function fileInputChangeHandler (e) {
    _this.emit('loading', '图片处理中...')
    const files = this.files
    // 转数组
    const arr = util.slice(files)
    _this.emit('debug', '选中的文件', arr)
    // 处理图片数据
    // 等比缩放图片，最大宽度640
    _this.filesToBase64(arr, {width: 640}, (err, res) => {
      _this.emit('removeLoading')
      if (err) {
        _this.emit('error', 'from filesToBase64()', err)
      }
      if (res) {
        console.log('filesToBase64', res)
        res.forEach(item => {
          _this.addImage(item.base64)
        })
      }
    })
  }
}

/**
 * 处理toolbar配置参数，
 * 生成vnode数据
 * @param options 配置参数
 * @returns {[null]}
 */
export function handlerToolbarOptions (options) {
  const arr = []
  const _DEFAULT = {
    title: '',
    // 按钮外容器样式
    class: '',
    // 按钮内i元素样式名
    icon: '',
    // 需要注册的监听事件名
    on: ''
  }
  options.forEach((item, index) => {
    item = Object.assign({}, _DEFAULT, item)
    arr.push({
      tag: 'dd',
      attrs: {
        class: `${item.class}`,
        'data-index': index,
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
    })
  })
  return arr
}

/**
 * 计算toolbar宽度
 * @param $el
 */
function calculationToolbarWidth ($el) {
  const $dl = dom.query('dl', $el)
  const $dd = $dl.children
  // 获取一个$dd元素的宽度
  let itemWidth = $dd[0].offsetWidth * $dd.length
  $dl.style.width = itemWidth + 'px'
}
