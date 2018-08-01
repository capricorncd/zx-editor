/**
 * Created by zx1984 7/21/2018
 * https://github.com/zx1984
 */
import dom from './util/dom-core'
import util from './util/index'
import Cursor from './cursor'
import ZxDialog from './dialog/index'

// 工具栏高度
export const TOOL_BAR_HEIGHT = 48
// 字体样式选择层高度
export const BOTTOM_MODAL_HEIGHT = 260

// 默认参数
const DEFAULT_OPTIONS = {
  // 是否绝对定位
  fixed: false,
  // 顶部距离,即导航栏高度
  offsetTop: 44,
  // 内边距
  padding: 15,
  // 显示工具栏
  showToolbar: true
}

/**
 * 初始化
 * @param _this
 * @param selector
 * @param options
 */
export function initMixin (_this, selector, options) {
  // check selector
  if (!selector || typeof selector !== 'string') {
    util.err(`selector is '${selector}', is not valid`)
  }
  // 保存容器
  _this.$wrapper = dom.query(selector)
  if (_this.$wrapper === null) {
    util.err(`Cann't found '${selector}' Node in document!`)
  }

  // 初始化参数
  const params = Object.assign({}, DEFAULT_OPTIONS, options)
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
  _this.options = params
  // bottomModalHeight
  _this.bottomModalHeight = BOTTOM_MODAL_HEIGHT
  // toolbarHeight
  _this.toolbarHeight = TOOL_BAR_HEIGHT

  /**
   * ***************************************************
   * 状态
   * ***************************************************
   */
  _this.state = {
    toolbarShow: true
  }

  /**
   * ***************************************************
   * Vnode
   * ***************************************************
   */
  let editorStyle = ''
  let contentStyle = ''
  if (params.fixed) {
    let padding = util.int(params.padding)
    editorStyle = ``
    contentStyle = `top:${util.int(params.top)}px;bottom:${util.int(params.bottom)}px;left:0;padding:${padding}px`
  }

  // dom结构
  const editorVnode = {
    tag: 'div',
    attrs: {
      class: 'zxeditor-container' + (params.fixed ? ' fixed' : ''),
      style: editorStyle
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


  if (_this.state.toolbarShow) {
    _this.resetContentPostion(TOOL_BAR_HEIGHT)
  }

  // 添加$editor至文档流中
  _this.$wrapper.appendChild(_this.$editor)
  // 编辑器已添加至document
  _this.cursor = new Cursor(_this.$content)
  _this.$cursorElm = dom.query('p', _this.$editor)
}
