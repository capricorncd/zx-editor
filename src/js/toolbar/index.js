/**
 * Created by Capricorncd.
 * User: https://github.com/capricorncd
 * Date: 2019/04/21 10:25
 */
import $ from '../dom-class'
import util from '../util'
import { window } from 'ssr-window'
import { IPHONEX_BOTTOM_OFFSET_HEIGHT } from '../config'

// default button options
const DEF_BTN_OPTS = {
  name: '',
  // button className
  className: '',
  // ElementHTML or $()
  el: null,
  // innerHTML
  innerHtml: '',
  // style
  style: '',
  // obj{type: 'click', handler: fn, capture: false} or array[obj1, obj2]
  events: null
}

function Toolbar (options, zxEditor) {
  // zxEditor instance
  this.editorInstance = zxEditor

  // options
  this.options = options

  // visible
  this.visible = options.toolbarBeenFixed

  // create element
  this.height = options.toolbarHeight
  this.$el = $(`<div class="zx-editor-toolbar-wrapper border-top ${this.visible ? 'in' : 'out'}" style="height:${this.height + (util.isIPhoneX ? IPHONEX_BOTTOM_OFFSET_HEIGHT : 0)}px;"><dl class="inner-wrapper" style="height:${this.height}px;"></dl></div>`)

  // append to $editor
  zxEditor.$editor.append(this.$el)

  // init
  this.init(options)
}

Toolbar.prototype = {
  /**
   * constructor
   */
  constructor: Toolbar,

  /**
   * Used to window.onresize
   * @param options
   */
  init (options) {
    options = options || this.options
    let winHeight = window.innerHeight
    this.$el.css({
      top: winHeight + 'px'
    })
    if (this.visible) this.editorInstance.emit('toolbarShow', this, this.editorInstance)
  },

  /**
   * show
   */
  show () {
    if (!this.visible) {
      // change className
      this.$el.removeClass('out').addClass('in')
      this.visible = true
      this.editorInstance.emit('toolbarShow', this, this.editorInstance)
    }
  },

  /**
   * hide
   */
  hide () {
    if (this.visible) {
      // change className
      this.$el.removeClass('in').addClass('out')
      this.visible = false
      this.editorInstance.emit('toolbarHide', this, this.editorInstance)
    }
  },

  /**
   * add button
   * @param opts
   * @param index Insert index
   */
  addButton (opts, index) {
    // params
    let params = Object.assign({}, DEF_BTN_OPTS, opts)

    // name
    if (!params.name) params.name = 'toolbar-btn-' + (+new Date())

    // create $node
    let $btn = $(`<dd class="icon-item" data-name="${params.name}" style="${params.style}"></dd>`)
    // handle el
    if (params.el && typeof params.el === 'object') {
      $btn.append($(params.el))
    } else {
      // handle innerHtml
      $btn.html(params.innerHtml)
    }

    // className
    if (params.className) {
      $btn.addClass(params.className)
    }

    // style
    let css = {}
    if (this.options.toolbarHeight) {
      css.width = css.height = this.options.toolbarHeight + 'px'
    }
    $btn.css(css)

    // insert to document
    let $btns = this.$el.find('.inner-wrapper').children()

    if (typeof index === 'number' && index < $btns.length) {
      $btn.insertBefore($btns[index])
    } else {
      this.$el.find('.inner-wrapper').append($btn)
    }

    // events
    if (params.events) {
      let events
      if (util.isObject(params.events)) {
        events = []
        events.push(params.events)
      } else if (Array.isArray(params.events)) {
        events = params.events
      }
      // register events
      let eventHandlerKey
      const $eventHandlers = this.editorInstance.$eventHandlers
      events.forEach(item => {
        if (item && typeof item.type === 'string' && typeof item.handler === 'function') {
          eventHandlerKey = `toolbarBtnEvent_${item.name}`
          $eventHandlers[eventHandlerKey] = {
            $target: $btn,
            type: item.type,
            handler: item.handler.bind(this.editorInstance),
            capture: typeof item.capture === 'boolean' ? item.capture : false
          }
          $btn.on(item.type, $eventHandlers[eventHandlerKey].handler, $eventHandlers[eventHandlerKey].capture)
        } else {
          throw new TypeError(`Function addButton(opts), opts.events's parameter error.`)
        }
      })
    }
  }
}

export default Toolbar
