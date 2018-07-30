import dom from '../util/dom-core'
import util from '../util/index'
import './dialog.styl'

const DEFUALT_OPTS = {
  maskOpacity: 0.3
}

export default class ZxDialog {
  constructor (opts ={}) {
    this.visible = false
    this.opts = Object.assign({}, DEFUALT_OPTS, opts)
    // 已创建的dialog id
    this.ids = []
    // loading元素
    this.$loadings = []
    // 初始化
    this._init()
  }

  _init () {
    this.events = {}
  }

  on (notifyName, callback) {
    if(typeof notifyName === 'string' && typeof callback === 'function') {
      this.events[notifyName] = {
        fun: callback
      }
    }
    return this
  }

  off (notifyName) {
    let _event = this.events[notifyName]
    if (_event) {
      this.events[notifyName] = null
      delete this.events[notifyName]
    }
    return this
  }

  emit (notifyName) {
    if (zxDebug) zxDebug.add('[dialog]emit: ' + notifyName)
    const args = util.slice(arguments, 1)
    try {
      this.events[notifyName].fun.apply(null, args)
    } catch (e) {
      if (zxDebug) {
        zxDebug.add('[dialog]emit Error', notifyName)
        zxDebug.add(e)
      }
    }
    return this
  }

  /**
   * 创建dialog
   * @param $innerChild
   * @private
   */
  _createDialog (type, dialogId, $innerChild) {
    this.ids.push(dialogId)
    const opts = this.opts
    // 获取最大z-index
    const zIndex = dom.maxZIndex() + 1
    // 创建dom结构
    const vnode = {
      attrs: {
        type: type,
        id: dialogId,
        class: 'zx-dialog-wrapper',
        style: `background:rgba(0,0,0,${opts.maskOpacity});z-index:${zIndex};`
      },
      child: [
        {
          attrs: {
            class: 'zx-dialog-inner'
          },
          child: $innerChild
        }
      ]
    }
    const $dialog = dom.createVdom(vnode)
    const $body = dom.query('body')
    if ($body) {
      // 阻止文档滚动
      dom.lock($body)
      $body.appendChild($dialog)
      // 按钮
      let $confirmBtn, $cancelBtn
      // 绑定事件
      const $btns = dom.queryAll('.__item', $dialog)
      // console.log($btns)
      const length = $btns.length
      if (length === 1) {
        $confirmBtn = $btns[0]
      }
      if (length === 2) {
        $cancelBtn = $btns[0]
        $confirmBtn = $btns[1]
      }

      // 回调参数
      let params
      // 确定
      dom.addEvent($confirmBtn, 'click', e => {
        if (type === 'confirm') {
          params = true
        }
        this.emit(dialogId, params)
        this.destroy(e.currentTarget, dialogId)
      })

      // 取消
      dom.addEvent($cancelBtn, 'click', e => {
        if (type === 'confirm') {
          params = false
        }
        this.emit(dialogId, params)
        this.destroy(e.currentTarget, dialogId)
      })
    }
    return $dialog
  }

  alert (s, callback) {
    // 生产随机id
    const dialogId = util.randStr('zxDialog_')
    const $innerVnode = []
    $innerVnode.push({
      attrs: {
        class: 'zx-dialog-message',
      },
      child: s || '无提示内容'
    })
    $innerVnode.push({
      attrs: {
        class: 'zx-dialog-footer'
      },
      child: [
        {
          attrs: {
            class: '__item'
          },
          child: '确定'
        }
      ]
    })
    this._createDialog('alert', dialogId, $innerVnode)
    // 注册事件
    if (typeof callback === 'function') {
      this.on(dialogId, callback)
    }
  }

  confirm (s, callback) {
    // 生产随机id
    const dialogId = util.randStr('zxDialog_')
    const $innerVnode = []
    $innerVnode.push({
      attrs: {
        class: 'zx-dialog-message',
      },
      child: s || '无提示内容'
    })
    $innerVnode.push({
      attrs: {
        class: 'zx-dialog-footer'
      },
      child: [
        {
          attrs: {
            class: '__item'
          },
          child: '取消'
        },
        {
          attrs: {
            class: '__item'
          },
          child: '确定'
        }
      ]
    })
    this._createDialog('confirm', dialogId, $innerVnode)
    // 注册事件
    if (typeof callback === 'function') {
      this.on(dialogId, callback)
    }
  }

  /**
   * loading
   * @param s 提示文字内容
   * @returns {*} 返回当前$dialog
   */
  loading (s) {
    // 生产随机id
    const dialogId = util.randStr('zxDialog_')
    const $innerVnode = [
      {
        attrs: {
          class: 'zx-dialog-message',
        },
        child: s || 'loading ...'
      }
    ]
    const $el = this._createDialog('loading', dialogId, $innerVnode)
    this.$loadings.push($el)
  }

  /**
   * 移除loading
   * @param $el
   */
  removeLoading () {
    let $el
    while (this.$loadings.length) {
      $el = this.$loadings.pop()
      if ($el.parentNode) {
        $el.parentNode.removeChild($el)
      }
    }
    // 解除文档滚动
    dom.unlock()
  }

  /**
   * 销毁$dialog
   * @param $current
   * @param dialogId
   */
  destroy ($current, dialogId) {
    if (zxDebug) zxDebug.add('[dialog]destroy: ' + dialogId)
    const $el = dom.closest('.zx-dialog-wrapper', $current)
    if ($el && $el.parentNode) {
      $el.parentNode.removeChild($el)
    }
    // 删除事件
    this.off(dialogId)
    // 删除ids数组
    let index = this.ids.indexOf(dialogId)
    this.ids.splice(index, 1)
    // 解除文档滚动
    dom.unlock()
  }
}
