import dom from '../util/dom-core'
import util from '../util/index'
import broadcast from '../broadcast/index'

const DEFUALT_OPTS = {
  // mask opacity
  maskOpacity: 0.3,
  // 确定按钮颜色
  confirmBtnColor: '',
  // 取消按钮颜色
  cancelBtnColor: ''
}

class ZxDialog {
  constructor (opts ={}) {
    this.visible = false
    this.opts = Object.assign({}, DEFUALT_OPTS, opts)
    // 已创建的dialog id
    this.ids = []
    // loading元素
    this.$loadings = []
    // 初始化
    this._init()
    this.version = '__VERSION__'
  }

  _init () {
    this.broadcast = broadcast.broadcast
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
      const $confirmBtn = dom.query('.__confirm', $dialog)
      const $cancelBtn = dom.query('.__cancel', $dialog)

      // 绑定事件
      dom.addEvent($confirmBtn, 'click', _ => {
        this.emit(dialogId, true)
        this.destroy($dialog, dialogId)
      })
      // 取消
      dom.addEvent($cancelBtn, 'click', _ => {
        this.emit(dialogId, false)
        this.destroy($dialog, dialogId)
      })
    }
    return $dialog
  }

  alert (s, callback) {
    const opts = this.opts
    // 生产随机id
    const dialogId = util.randStr('zxDialog_')
    const $innerVnode = []
    $innerVnode.push({
      attrs: {
        class: 'zx-dialog-message',
      },
      child: s || 'not message!'
    })
    $innerVnode.push({
      attrs: {
        class: 'zx-dialog-footer'
      },
      child: [
        {
          tag: 'span',
          attrs: {
            class: '__confirm',
            style: opts.confirmBtnColor ? `color:${opts.confirmBtnColor}` : ''
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
    const opts = this.opts
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
          tag: 'span',
          attrs: {
            class: '__cancel',
            style: opts.cancelBtnColor ? `color:${opts.cancelBtnColor}` : ''
          },
          child: '取消'
        },
        {
          tag: 'span',
          attrs: {
            class: '__confirm',
            style: opts.confirmBtnColor ? `color:${opts.confirmBtnColor}` : ''
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
   * 删除所有dialog
   */
  removeAll () {
    const $dialogs = dom.queryAll('.zx-dialog-wrapper')
    if ($dialogs.length > 0) {
      let i, $el
      for (i = 0; i < $dialogs.length; i++) {
        $el = $dialogs[i]
        this.destroy($el, $el.id)
      }
    }
    this.ids = []
    this.$loadings = []
  }

  /**
   * 销毁$dialog
   * @param $dialog
   * @param dialogId
   */
  destroy ($dialog, dialogId) {
    if ($dialog && $dialog.parentNode) {
      $dialog.parentNode.removeChild($dialog)
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

ZxDialog.prototype.on = broadcast.on
ZxDialog.prototype.emit = broadcast.emit
ZxDialog.prototype.off = broadcast.off

export default ZxDialog
