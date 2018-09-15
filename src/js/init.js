/**
 * Created by capricorncd 7/21/2018
 * https://github.com/capricorncd
 */
import dom from './util/dom-core'
import util from './util/index'
import ZxStorage from './util/storage'
import Cursor from './cursor'
import { ZxDialog } from 'zx-dialog'

// 工具栏高度
const TOOL_BAR_HEIGHT = 48

// 默认参数
const DEFAULT_OPTIONS = {
  // 自动保存，单位秒。等于0则不保存
  autoSave: 0,
  // 是否绝对定位
  fixed: false,
  // 顶部距离
  top: 0,
  // 底部距离
  bottom: 0,
  // 内边距
  padding: 15,
  // 显示工具栏
  showToolbar: true,
  // 图片文件大小最大值，单位MB
  imageMaxSize: 20,
  // 禁用键盘删除图片、链接等附件
  disableBackspaceDelete: true
}

/**
 * 初始化
 * @param _this
 * @param selector
 * @param params
 */
export function initMixin (_this, selector, params) {
  /**
   * ***************************************************
   * check h5 Object
   * ***************************************************
   */
  if (typeof FileReader === 'undefined') {
    _this.emit('error', {msg: 'FileReader is undefined!'})
  }

  if (typeof localStorage === 'undefined') {
    _this.emit('error', {msg: 'localStorage is undefined!'})
  }

  /**
   * ***************************************************
   * dialcheck selectorog
   * ***************************************************
   */
  if (!selector || typeof selector !== 'string') {
    util.err(`selector is '${selector}', is not valid`)
  }
  // 保存容器
  _this.$wrapper = dom.query(selector)
  if (_this.$wrapper === null) {
    util.err(`Cann't found '${selector}' Node in document!`)
  }
  /**
   * ***************************************************
   * options
   * ***************************************************
   */

  // 初始化参数
  const options = Object.assign({}, DEFAULT_OPTIONS, params)
  // id
  _this.id = util.randStr()
  /**
   * ***************************************************
   * dialog
   * ***************************************************
   */
  _this.dialog = new ZxDialog()

  _this.on('loading', msg => {
    _this.dialog.loading(msg)
  })

  _this.on('removeLoading', _ => {
    _this.dialog.removeLoading()
  })

  /**
   * ***************************************************
   * 参数处理
   * ***************************************************
   */
  _this.options = options
  // toolbarHeight
  _this.toolbarHeight = TOOL_BAR_HEIGHT
  // 自动保存
  _this.saveTimer = null
  if (params.autoSave > 0) {
    _this.autoSave(util.int(params.autoSave))
  }

  /**
   * ***************************************************
   * storage
   * ***************************************************
   */
  _this.storage = new ZxStorage()

  /**
   * ***************************************************
   * Vnode
   * ***************************************************
   */
  let contentStyle = ''
  let padding = util.int(options.padding)
  let paddingStyle = `padding-left:${padding}px;padding-right:${padding}px`
  if (options.fixed) {
    contentStyle = `top:${util.int(options.top)}px;bottom:${util.int(options.bottom)}px;${paddingStyle}`
  } else {
    contentStyle = paddingStyle
  }

  // dom结构
  const editorVnode = {
    tag: 'div',
    attrs: {
      class: 'zxeditor-container' + (options.fixed ? ' fixed' : '')
    },
    child: [
      // 内容容器
      {
        tag: 'div',
        attrs: {
          class: 'zxeditor-content-wrapper is-empty',
          contenteditable: true,
          style: contentStyle
        },
        // 添加一行元素，防止编辑器内容为空
        child: [
          {
            tag: 'p',
            child: [
              {
                tag: 'br'
              }
            ]
          }
        ]
      }
    ]
  }

  // 创建dom
  _this.$editor = dom.createVdom(editorVnode)
  _this.$content = dom.query('.zxeditor-content-wrapper', _this.$editor)

  // 设置content底部距离
  if (options.showToolbar) {
    _this.resetContentPostion(options.bottom + TOOL_BAR_HEIGHT)
  }

  // 添加$editor至文档流中
  _this.$wrapper.appendChild(_this.$editor)

  // 本地存储内容初始化
  _getStorageAndInitContent(_this)

  // 编辑器已添加至document
  // 初始化关闭及元素
  _this.cursor = new Cursor(_this.$content)
  // $content 内光标元素
  _this.$cursorElm = _this.cursor.getRange()
}

/**
 * 获取存储内容，并添加至$content中
 * @private
 */
function _getStorageAndInitContent (_this) {
  const storageContent = _this.storage.get('content')
  if (storageContent) {
    _this.setContent(storageContent)
  }
}
