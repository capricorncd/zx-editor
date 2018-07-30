/**
 * Created by zx1984 7/21/2018
 * https://github.com/zx1984
 */
import dom from './util/dom-core'
import util from './util/index'
import ZxStorage from './util/storage'
import Cursor from './cursor'
import TextStyle from './text-style'
import Debug from './debug/index'
import BottomModal from './util/bottom-modal'
import ZxDialog from './dialog/index'

/**
 * Note:
 * 带$符号的属性为Element对象
 */

// 工具栏高度
export const TOOL_BAR_HEIGHT = 48
// 字体样式选择层高度
export const BOTTOM_MODAL_HEIGHT = 260

const DEFAULT_OPTIONS = {
  // 自动保存
  autoSave: false,
  // Storage存储前缀
  storagePrefix: 'zxEditor',
  // 开启debug模式
  debug: true,
  // 是否绝对定位
  fixed: false,
  // 顶部距离,即导航栏高度
  offsetTop: 44,
  // 自定义消息提示框
  alert () {

  },
  // 工具栏配置
  // <div class="toolbar-item pic-hook">图片</div>
  // <div class="toolbar-item text-hook">文字</div>
  // <div class="toolbar-item link-hook">链接</div>
  // <div class="toolbar-item split-hook">分割</div>
  toolbar: [
    {
      title: '图片',
      class: 'pic-hook',
      icon: '__pic',
      on: 'click-pic-btn'
    },
    {
      title: '表情',
      class: 'emoji-hook',
      icon: '__emoji',
      on: 'click-emoji-btn'
    },
    // {
    //   title: 'T',
    //   class: 'text-hook',
    //   // icon: '__text',
    //   on: 'click-text-btn'
    // },
    {
      title: '链接',
      class: 'link-hook',
      icon: '__link',
      on: 'click-link-btn'
    },
    // {
    //   title: '分割',
    //   class: 'split-hook',
    //   // icon: '__split',
    //   on: 'click-split-btn'
    // },
    {
      title: '导语',
      class: 'summary-hook',
      icon: '__summary',
      on: 'click-summary-btn'
    }
  ]
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
  let params = Object.assign({}, DEFAULT_OPTIONS, options)
  // debug
  if (params.debug) {
    _this.debug = new Debug({
      position: 'top',
      offset: 100
    })
  } else {
    _this.debug = {
      add: util.fn,
      destroy: util.fn
    }
  }
  if (window) window.zxDebug = _this.debug
  // id
  _this.id = util.randStr()

  /**
   * ***************************************************
   * 参数处理
   * ***************************************************
   */
  // storage
  _this.storage = new ZxStorage(params.storagePrefix)
  // bottomModalHeight
  _this.bottomModalHeight = BOTTOM_MODAL_HEIGHT
  // toolbarHeight
  _this.toolbarHeight = TOOL_BAR_HEIGHT
  // 图片数据
  _this.pics = []
  // loading dialog wrapper
  _this.$loading = null
  _this.options = params

  /**
   * ***************************************************
   * dialog
   * ***************************************************
   */
  const dialog = new ZxDialog()
  _this.alert = dialog.alert.bind(dialog)
  _this.confirm = dialog.confirm.bind(dialog)
  _this.loading = dialog.loading.bind(dialog)
  _this.removeLoading = dialog.removeLoading.bind(dialog)

  /**
   * ***************************************************
   * 状态管理器
   * ***************************************************
   */
  _this.state = {
    // 工具栏显示状态
    toolbarShow: true
  }

  /**
   * ***************************************************
   * Vnode
   * ***************************************************
   */

  // 添加链接容器内容
  const linkChildVnode = [
    {
      attrs: {
        class: 'linkinput-wrapper'
      },
      child: [
        {
          attrs: {
            class: 'linkinput-title'
          },
          child: '添加链接'
        },
        {
          attrs: {
            class: 'linkinput-group'
          },
          child: [
            {
              tag: 'input',
              attrs: {
                type: 'text',
                class: 'link-input',
                placeholder: 'http(s)://'
              }
            },
            {
              tag: 'input',
              attrs: {
                type: 'text',
                class: 'link-input',
                placeholder: '链接名称(选填)'
              }
            }
          ]
        },
        {
          attrs: {
            class: 'linkinput-footer'
          },
          child: [
            {
              tag: 'button',
              attrs: {
                class: 'cancel-hook'
              },
              child: '取消'
            },
            {
              tag: 'button',
              attrs: {
                class: 'submit-hook disabled'
              },
              child: '确定'
            }
          ]
        }
      ]
    }
  ]

  // dom结构
  const editorVnode = {
    tag: 'div',
    attrs: {
      class: 'zxeditor-container'
    },
    child: [
      // 内容容器
      {
        tag: 'div',
        attrs: {
          class: 'zxeditor-content-wrapper is-empty',
          contenteditable: true
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
      },
      // 工具栏
      {
        tag: 'div',
        attrs: {
          class: 'zxeditor-toolbar-wrapper'
        },
        child: handlerToolbarOptions(_this.options.toolbar)
      },
      // 连接地址输入容器
      {
        tag: 'div',
        attrs: {
          class: 'zxeditor-linkinput-wrapper',
          style: 'display: none'
        },
        child: linkChildVnode
      }
    ]
  }

  // 创建dom
  _this.$editor = dom.createVdom(editorVnode)
  _this.$content = dom.query('.zxeditor-content-wrapper', _this.$editor)
  _this.$toolbar = dom.query('.zxeditor-toolbar-wrapper', _this.$editor)
  _this.$link = dom.query('.zxeditor-linkinput-wrapper', _this.$editor)

  if (_this.state.toolbarShow) {
    _this.resetContentPostion(TOOL_BAR_HEIGHT)
  }

  // 添加$editor至文档流中
  _this.$wrapper.appendChild(_this.$editor)
  // 编辑器已添加至document
  _this.cursor = new Cursor(_this.$content)
  _this.$cursorElm = dom.query('p', _this.$editor)
  handleToolbar(_this.$toolbar)

  _this.initVisiblePostion()
}

/**
 * 工具栏图标处理
 * @param options
 * @returns {Array}
 */
function handleToolbar ($el) {
  const $dl = dom.query('dl', $el)
  const $dd = $dl.children
  // 获取一个$dd元素的宽度
  let itemWidth = $dd[0].offsetWidth * $dd.length
  $dl.style.width = itemWidth + 'px'
}

/**
 * 处理toolbar配置参数，
 * 生成vnode数据
 * @param options 配置参数
 * @returns {[null]}
 */
function handlerToolbarOptions (options) {
  const arr = []
  options.forEach(item => {
    arr.push({
      tag: 'dd',
      attrs: {
        class: `${item.class}`
      },
      child: [
        item.icon
          ? { tag: 'i', attrs: { class: item.icon } }
          : item.title
      ]
    })
  })
  return [
    {
      tag: 'dl',
      child: arr
    }
  ]
}
