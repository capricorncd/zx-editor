/**
 * Created by zx1984 2018/3/21
 * https://github.com/zx1984
 */
import dom from '../util/dom-core'
import util from '../util/index'
// 导入样式
import './debug.styl'
// 默认参数
const DEFAULT_OPTS = {
  // 固定位置 top right bottom left
  position: 'top',
  // 偏移量(防止遮挡底部工具栏，或顶部导航栏时)
  offset: 0,
  // debug容器高度，相对屏幕，默认100%
  // 大于1的值，视为像素
  width: 1,
  // debug容器高度，相对屏幕，默认40%
  height: 0.4,
  // debug名称
  title: 'Debug View'
}

export default class Debug {
  /**
   * constructor
   * @param opts 参数
   */
  constructor (opts = {}) {
    this.opts = Object.assign({}, DEFAULT_OPTS, opts)
    // debug容器显示状态
    this.visible = false
    // debug数据
    this.list = []
    this._init(this.opts)
    this._initEvent()
  }

  /**
   * 初始化
   * @param opts
   * @private
   */
  _init (opts) {
    /**
     * 计算debug容器尺寸
     */
    // debug head高度
    let headHeight = 30
    // 窗口高度
    let winHeight = window.innerHeight
    let winWidth = window.innerWidth
    // 配置高度
    let optsHeight = opts.height
    let optsWidth = opts.width
    let wrapperHeight = optsHeight > 1 ? util.int(optsHeight) : winHeight * optsHeight
    let wrapperWidth = optsWidth > 1 ? util.int(optsWidth) : winWidth * optsWidth
    // 滚动外容器高度
    let bodyHeight = wrapperHeight - headHeight

    /**
     * debug 显示位置
     */
    let fixedStyle = opts.position + `:${util.int(opts.offset)}px`

    /**
     * 创建dom
     */
    let vnode = {
      attrs: {
        class: 'zxeditor-debug-wrapper',
        style: `display: none;${fixedStyle};width:${wrapperWidth}px;height:${wrapperHeight}px`
      },
      child: [
        {
          attrs: {
            class: 'zxeditor-debug-head'
          },
          child: [
            {
              tag: 'span',
              child: [
                opts.title,
                {
                  tag: 'i',
                  attrs: {
                    class: '__clear'
                  },
                  child: 'clear'
                }
              ]
            },
            {
              tag: 'i',
              attrs: {
                class: '__close'
              },
              child: '[close]'
            }
          ]
        },
        {
          attrs: {
            class: 'zxeditor-debug-body',
            style: `height: ${bodyHeight}px`
          },
          child: [
            {
              attrs: {
                class: 'zxeditor-debug-list'
              }
            }
          ]
        }
      ]
    }
    // 创建debug dom
    this.$wrapper = dom.createVdom(vnode)
    // debug显示控制开关
    this.$switch = dom.createVdom({
      attrs: {
        class: 'zxeditor-debug-switch'
      }
    })
    // document.body
    const $docbody = dom.query('body')
    if ($docbody === null) {
      util.err(`[zxDebug]:: Cann't found body Element!`)
    }
    $docbody.appendChild(this.$wrapper)
    $docbody.appendChild(this.$switch)
    // 数据列表显示容器
    this.$body = dom.query('.zxeditor-debug-body', this.$wrapper)
    this.$list = dom.query('.zxeditor-debug-list', this.$wrapper)
  }

  /**
   * 初始化事件
   * @param destroy 是否销毁
   * @private
   */
  _initEvent (destroy) {
    const _this = this
    const $switch = this.$switch
    const $close = dom.query('.__close', this.$wrapper)
    const $clear = dom.query('.__clear', this.$wrapper)

    function handleSwitchClick () {
      _this.show()
    }

    function handleCloseClick () {
      _this.hide()
    }

    function handleClearClick () {
      _this.clear()
    }
    if (destroy) {
      // $switch点击事件
      dom.removeEvent($switch, 'click', handleSwitchClick)
      // 隐藏debug窗口
      dom.removeEvent($close, 'click', handleCloseClick)
      // 清空数据
      dom.removeEvent($clear, 'click', handleClearClick)
    } else {
      // $switch点击事件
      dom.addEvent($switch, 'click', handleSwitchClick)
      // 隐藏debug窗口
      dom.addEvent($close, 'click', handleCloseClick)
      // 清空数据
      dom.addEvent($clear, 'click', handleClearClick)
    }
  }

  log () {
    const args = util.slice(arguments)
    this._add.apply(this, ['log'].concat(args))
  }

  error (a, b) {
    const args = util.slice(arguments)
    this._add.apply(this, ['error'].concat(args))
  }

  warn (a, b) {
    const args = util.slice(arguments)
    this._add.apply(this, ['warn'].concat(args))
  }

  _add (type, data) {
    const args = util.slice(arguments, 1)
    // 控制台输出
    console[type].apply(null, args)
    if (args[1]) {
      data = {
        dt: data,
        dd: args[1]
      }
    }
    // 一个参数时
    if (Array.isArray(data)) {
      data.forEach(item => {
        this._createAndInsertList(item, type)
      })
    } else {
      this._createAndInsertList(data, type)
    }
  }

  /**
   * 添加debug数据
   * @param data
   * 参数支持：dt标题， dd内容
   * (dt, dd),
   * ({dt: 't', dd: 'c'}),
   * (dd),
   * ([{dt: 't', dd: 'c'}, {dd}])
   */
  add (data) {
    // 两个参数时：0 title, 1 content
    let args = arguments
    if (args[1]) {
      data = {
        dt: data,
        dd: args[1]
      }
    }
    // 一个参数时
    if (Array.isArray(data)) {
      data.forEach(item => {
        this._createAndInsertList(item)
      })
    } else {
      this._createAndInsertList(data)
    }
  }

  /**
   * 创建debugdom，并添加至list中
   * @param data
   * @private
   */
  _createAndInsertList (data, type = 'log') {
    if (!data) return
    let dt, dd
    let ddType = ''
    let isString = typeof data === 'string'
    // 字符串，或者不包含content的对象
    if (isString) {
      dd = data
    } else if (util.isObject(data)) {
      if (data.dd) {
        dt = data.dt
        dd = data.dd
      } else {
        dd = data
      }
    } else {
      dd = data
      ddType = data.toString() + '::'
    }

    let vnode = {
      tag: 'dl',
      attrs: {
        class: `__${type}`
      },
      child: []
    }
    // check title
    if (dt) {
      vnode.child.push({
        tag: 'dt',
        child: dt
      })
    }
    // handle content
    // console.log(contentType, JSON.stringify(content))
    if (util.isObject(dd)) {
      dd = JSON.stringify(dd, null, '\t')
    } else if (!isString) {
      dd = ddType + dd
    }
    // 去除dd字符串中的base64图片数据
    dd = dd.replace(/(?:(data:.*?;base64).*?)"/g, (g, item) => {
      return `${item}"`
    })
    vnode.child.push({
      tag: 'dd',
      child: dd
    })
    this.list.push(data)

    let $item = dom.createVdom(vnode)
    this.$list.appendChild($item)
    if (this.visible) {
      this.toBottom()
    }
  }

  /**
   * 显示debug
   */
  show () {
    this.visible = true
    this.$switch.style.display = 'none'
    this.$wrapper.style.display = ''
    this.toBottom()
  }

  /**
   * 隐藏debug
   */
  hide () {
    this.visible = false
    this.$switch.style.display = ''
    this.$wrapper.style.display = 'none'
  }

  /**
   * 清除debug列表
   */
  clear () {
    this.list = []
    this.$list.innerHTML = ''
    this.log('cleared')
  }

  /**
   * 销毁debug
   */
  destroy () {
    const $wrapper = this.$wrapper
    const $switch = this.$switch
    // 销毁事件
    this._initEvent(true)
    // 移除dom
    $wrapper.parentNode.removeChild($wrapper)
    $switch.parentNode.removeChild($switch)
  }

  toBottom () {
    const $el = this.$body
    $el.scrollTop = $el.scrollHeight
  }
}

