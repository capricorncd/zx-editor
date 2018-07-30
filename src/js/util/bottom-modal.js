import dom from './dom-core'
import util from './index'

const DEFAULT_OPTS = {
  // class-hook，供选择器用
  classHook: '',
  // 初始显示状态
  visible: false,
  // head配置
  headHeight: 44,
  headTitle: 'Modal',
  headSwitch: null,
  height: 260,
  // 父容器
  $parent: null,
  // body内容
  bodyChildVnode: null,
  debug: {
    add () {}
  }
}

class BottomModal {
  constructor (opts = {}) {
    this.opts = Object.assign({}, DEFAULT_OPTS, opts)
    this.visible = opts.visible
    this.init(this.opts)
  }

  init (opts) {
    const $parent = opts.$parent
    const headHeight = opts.headHeight
    if (!$parent || !dom.isHTMLElement($parent)) {
      util.err(`class[BottomModal]: opts.$parent is not HTMLElement, is ${$parent}`)
    }

    const bodyChildVnode = opts.bodyChildVnode

    const vnode = {
      tag: 'div',
      attrs: {
        class: 'zxeditor-modal-wrapper ' + opts.classHook,
        style: 'display: ' + (opts.visible ? '' : 'none') + `;height:${opts.height}px`
      },
      child: [
        {
          attrs: {
            class: 'zxeditor-modal-head',
            style: `height: ${headHeight}px;`
          },
          child: [
            {
              tag: 'span',
              attrs: {
                class: '__title'
              },
              child: opts.headTitle
            },
            {
              attrs: {
                class: '__switch',
                style: `height: ${headHeight}px;`
              },
              child: opts.headSwitch
            }
          ]
        },
        {
          attrs: {
            class: 'zxeditor-modal-body',
            style: `height:${opts.height - headHeight}px;`
          },
          child: Array.isArray(bodyChildVnode) ? bodyChildVnode : [bodyChildVnode]
        }
      ]
    }

    this.$modal = dom.createVdom(vnode)
    $parent.appendChild(this.$modal)

    this.$switch = dom.query('.__switch', this.$modal)
    this.$body = dom.query('.zxeditor-modal-body', this.$modal)
    this._initEvent()
  }

  _initEvent () {
    // 获取document body元素
    const $docBody = dom.query('body')
    // modal body
    const $modalBody = this.$body
    // debug
    const debug = this.opts.debug
    // 是否以touch
    let isTouched = false

    // 阻止document跟随上下滚动
    dom.addEvent($modalBody, 'touchstart', e => {
      isTouched = true
      dom.lock($docBody)
      debug.add('touchstart')
    })

    dom.addEvent($modalBody, 'touchmove', e => {
      if (!isTouched) return
      debug.add('touchmove')
    })

    dom.addEvent($modalBody, 'touchend', e => {
      isTouched = false
      // 延迟执行解锁
      let timer = setTimeout(_ => {
        dom.unlock($docBody)
        clearTimeout(timer)
        timer = null
      }, 300)
      debug.add('touchend')
    })
  }

  show () {
    if (this.visible) return
    this.$modal.style.display = ''
    this.visible = true
  }

  hide () {
    if (this.visible) {
      this.$modal.style.display = 'none'
      this.visible = false
    }
  }
}

export default BottomModal
