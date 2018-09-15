/**
 * Created by capricorncd 8/1/2018
 * https://github.com/capricorncd
 */
import dom from './util/dom-core'
import util from './util/index'


// 编辑器默认图标
const TOOL_BAR_ICONS = ['pic', 'emoji', 'text', 'link']
// toolbar配置
const TOOL_BAR_OPTIONS = Object.create(null)

TOOL_BAR_OPTIONS.pic = {
  name: 'pic',
  class: '__pic',
  icon: '',
  on: 'select-picture'
}

TOOL_BAR_OPTIONS.emoji = {
  name: 'emoji',
  class: '__emoji',
  icon: '',
  on: 'show-emoji'
}

TOOL_BAR_OPTIONS.text = {
  name: 'text',
  class: '__text',
  icon: '',
  on: 'show-textstyle'
}

TOOL_BAR_OPTIONS.link = {
  name: 'link',
  class: '__link',
  icon: '',
  on: 'add-link'
}

// TOOL_BAR_OPTIONS.split = {
//   name: 'split',
//   class: '__split',
//   icon: '',
//   on: 'add-split-line'
// }

/**
 * 初始化toolbar
 * @param _this
 */
export function initToolbar (_this) {
  // 获取参数
  const showToolbar = _this.options.showToolbar
  // 获取图标
  const toolbarArray = Array.isArray(showToolbar)
    ? showToolbar
    : showToolbar ? TOOL_BAR_ICONS : []
  /**
   * ***************************************************
   * 创建dom结构
   * ***************************************************
   */
  const toolbarVnoe = {
    tag: 'div',
    attrs: {
      class: 'zxeditor-toolbar-wrapper',
      style: toolbarArray.length ? '' : `display:none;`
    },
    child: [
      {
        tag: 'dl',
        child: handlerToolbarOptions(toolbarArray)
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
  if ($toolbarBtns.length) {
    dom.addEvent($toolbarBtns, 'click', toolbarChildClickHandler)
  }

  // 阻止冒泡
  dom.addEvent(_this.$toolbar, 'click', e => {
    e.stopPropagation()
  })

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
    // 按钮名称
    let name = dom.data($current, 'name')
    _this.emit('debug', 'toolbarClick:', customEvent)

    switch (name) {
      // 图片
      case 'pic':
        if (_this.broadcast[customEvent]) {
          _this.emit(customEvent)
        } else if ($fileInput) {
          $fileInput.click()
        }
        break
      // 表情
      case 'emoji':
        _this.emojiModal.show()
        break
      // 文字样式
      case 'text':
        _this.textstyleModal.show()
        break
      // 链接
      case 'link':
        if (_this.broadcast[customEvent]) {
          _this.emit(customEvent, (url, title) => {
            _this.addLink(url, title)
          })
        } else {
          _this.$link.style.display = 'flex'
        }
        break
      // 分割线
      case 'split':
        dom.insertHr(_this.$cursorElm)
        break
    }
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
    // 清除value，防止选中同一文件不触发change事件
    dom.addEvent($input, 'click', e => {
      e.target.value = ''
    })
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
        err.forEach(errItem => {
          _this.emit('error', errItem)
        })
      }
      if (res) {
        // console.log(res)
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
function handlerToolbarOptions (toolbarArray) {
  const arr = []
  // const _DEFAULT = {
  //   title: '',
  //   // 按钮外容器样式
  //   class: '',
  //   // 按钮内i元素样式名
  //   icon: '',
  //   // 需要注册的监听事件名
  //   on: ''
  // }

  let item
  toolbarArray.forEach(keyName => {
    item = TOOL_BAR_OPTIONS[keyName]
    if (item) {
      arr.push({
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
      })
    }
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
  if (!$dd[0]) return
  // 获取一个$dd元素的宽度
  let itemWidth = $dd[0].offsetWidth * $dd.length
  $dl.style.width = itemWidth + 'px'
}
