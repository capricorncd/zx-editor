/**
 * Created by Capricorncd.
 * User: https://github.com/capricorncd
 * Date: 2019/04/21 22:42
 */
import $ from '../dom-class'
import util from '../util'
import ZxEditor from '../index'

const fn = function () {}

const DEF_OPTS = {
  head: null,
  // className
  className: '',
  // head setup
  headHeight: 44,
  headLeftBtnClassName: '',
  headLeftBtnText: '',
  headTitle: 'Expansion Panel',
  // height
  height: 260,
  // body内容
  body: null,
  // Used to distinguish ExpansionPanel instance
  name: 'expansion-panel',
  onHeadClick: fn,
  onBodyClick: fn,
  onBeforeShow: fn,
  onShow: fn,
  onBeforeHide: fn,
  onHide: fn
}

/**
 * ExpansionPanel
 * Extension panel fixed at the bottom of the editor
 * @param options
 * @param zxEditor ZxEditor instance
 * @constructor
 */
function ExpansionPanel (options, zxEditor) {
  if (!zxEditor instanceof ZxEditor) {
    throw new TypeError(`new ExpansionPanel() parameter error, arguments[1] is not a ZxEditor instance.`)
  }

  // options
  let opts = this.options = Object.assign({}, DEF_OPTS, options)

  // editor instance
  this.editorInstance = zxEditor

  zxEditor.expansionPanels.push(this)

  // visible
  this.visible = false

  // Used to distinguish ExpansionPanel instance
  this.name = opts.name

  this.$body = $(`<div class="body-wrapper" style="height:${opts.height - opts.headHeight}px;"></div>`)

  // node
  this.$el = $(`<div class="zx-editor-expansion-panel border-top"></div>`)

  // click
  // stop propagation
  zxEditor.$eventHandlers[this.name] = {
    $target: this.$el,
    type: 'click',
    handler: (e) => {
      e.stopPropagation()
    }
  }
  this.$el.on('click', zxEditor.$eventHandlers[this.name].handler)

  if (opts.headHeight > 0) {
    // custom head
    if (opts.head) {
      this.$head = $(opts.head)
    } else {
      // default head
      this.$head = $(`<div class="head-wrapper border-bottom ${opts.headAlign}" style="height:${opts.headHeight}px;line-height:${opts.headHeight}px;"><div class="l cur ${opts.headLeftBtnClassName}">${opts.headLeftBtnText}</div>${opts.headTitle || ''}</div>`)

      // left btn
      const $leftBtn = this.$head.find('.l')
      zxEditor.$eventHandlers[this.name + 'HeadLeftBtn'] = {
        $target: $leftBtn,
        type: 'click',
        handler: (e) => {
          opts.onHeadClick.call(this, e, 'left-button')
        }
      }
      $leftBtn.on('click', zxEditor.$eventHandlers[this.name + 'HeadLeftBtn'].handler)

      const $switch = $(`<i class="switch" style="width:${opts.headHeight}px;height:${opts.headHeight}px;"></i>`)
      this.$head.append($switch)
      // switch event
      zxEditor.$eventHandlers[this.name + 'HeadSwitch'] = {
        $target: $switch,
        type: 'click',
        handler: (e) => {
          opts.onHeadClick.call(this, e, 'switch')
          this.hide()
        }
      }
      $switch.on('click', zxEditor.$eventHandlers[this.name + 'HeadSwitch'].handler)
    }

    this.$el.append(this.$head)

    this.$head.on('click', (e) => {
      opts.onHeadClick.call(this, e)
    })
  }

  // body
  try {
    this.$body.append($(opts.body))
  } catch (e) {
    throw e
  }

  this.$body.on('click', (e) => {
    opts.onBodyClick.call(this, e)
  })

  this.$el.append(this.$body)

  // append to $editor
  zxEditor.$editor.append(this.$el)

  // init
  this.init(this.options)
}

ExpansionPanel.prototype = {
  /**
   * constructor
   */
  constructor: ExpansionPanel,

  /**
   * init position
   * Used to window.onresize
   * @param options
   */
  init (options) {
    options = options || this.options
    let winHeight = window.innerHeight
    this.$el.css({
      height: `${options.height}px`,
      top: winHeight + 'px'
    })
  },

  /**
   * show
   */
  show () {
    if (!this.visible) {
      this.options.onBeforeShow.call(this)
      this.$el.removeClass('out').addClass('in')
      this.visible = true
      this.editorInstance.emit('expansionPanelShow', this, this.editorInstance)
      this.options.onShow.call(this)
    }
  },

  /**
   * hide
   */
  hide () {
    if (this.visible) {
      this.options.onBeforeHide.call(this)
      this.$el.removeClass('in').addClass('out')
      this.visible = false
      this.editorInstance.emit('expansionPanelHide', this, this.editorInstance)
      this.options.onHide.call(this)
    }
  }
}

export default ExpansionPanel
