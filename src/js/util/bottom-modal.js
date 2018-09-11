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
  onShow () {},
  onHide () {},
  onError () {}
}

class BottomModal {
  constructor (opts = {}) {
    this.opts = Object.assign({}, DEFAULT_OPTS, opts)
    this.height = util.int(this.opts.height)
    this.visible = opts.visible
    this.init(this.opts)
  }

  init (opts) {
    // 父容器
    const $parent = opts.$parent
    // head height
    const headHeight = util.int(opts.headHeight)
    // modal height
    const modalHeight = util.int(opts.height)
    if (!$parent || !dom.isHTMLElement($parent)) {
      opts.onError({msg: `class[BottomModal]: opts.$parent is not HTMLElement, is ${$parent}`})
      return
    }

    const bodyChildVnode = opts.bodyChildVnode

    const vnode = {
      tag: 'div',
      attrs: {
        class: 'zxeditor-modal-wrapper ' + opts.classHook,
        style: `transform:translateY(${opts.visible ? 0 : '100%'});height:${modalHeight}px`
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
            style: `height:${modalHeight - headHeight}px;`
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
    // 是否以touch
    let isTouched = false

    // 阻止冒泡
    dom.addEvent(this.$modal, 'click', e => {
      e.stopPropagation()
    })

    // 阻止document跟随上下滚动
    dom.addEvent($modalBody, 'touchstart', e => {
      isTouched = true
      dom.lock($docBody)
    })

    dom.addEvent($modalBody, 'touchmove', e => {
      if (!isTouched) return
    })

    dom.addEvent($modalBody, 'touchend', e => {
      isTouched = false
      // 延迟执行解锁
      let timer = setTimeout(_ => {
        dom.unlock($docBody)
        clearTimeout(timer)
        timer = null
      }, 300)
    })
  }

  show () {
    if (this.visible) return
    this.$modal.style.transform = 'translateY(0)'
    this.visible = true
    this.opts.onShow()
  }

  hide () {
    if (this.visible) {
      this.$modal.style.transform = 'translateY(100%)'
      this.visible = false
      this.opts.onHide()
    }
  }
}

export default BottomModal
