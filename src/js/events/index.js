/**
 * Created by Capricorncd.
 * User: https://github.com/capricorncd
 * Date: 2019/04/15 21:53
 */
import $ from '../dom-class'
import { window } from 'ssr-window'
import util from '../util'
import { getPasteText } from './paste'

/**
 * handle events
 */
export function handleEvents () {

  const $content = this.$content

  const $window = $(window)

  // const options = this.options

  /**
   * ****************************************************
   * window on resize
   * ****************************************************
   */
  function windowResize () {
    // toolbar
    this.toolbar.init()
    // expansion panels
    this.expansionPanels.forEach(item => {
      item.init()
    })
    this.emit('windowResize', this)
  }

  this.$eventHandlers.windowResize = {
    $target: $window,
    type: 'resize',
    handler: windowResize.bind(this)
  }

  /**
   * ****************************************************
   * content on paste
   * ****************************************************
   */
  function contentPaste (e) {
    e.preventDefault()
    getPasteText(e).then(str => {
      // 添加至焦点处
      this.insertElm(util.removeHtmlTags(str))
    })
  }

  this.$eventHandlers.contentPaste = {
    $target: $content,
    type: 'paste',
    handler: contentPaste.bind(this)
  }

  /**
   * ****************************************************
   * content on input
   * ****************************************************
   */
  function contentInput () {
    // check empty in content
    this._checkEmpty()

    // check cursor node position
    this.checkPosition()

    // emit content on change
    this.emit('change', this)
  }

  this.$eventHandlers.contentInput = {
    $target: $content,
    type: 'input',
    handler: contentInput.bind(this)
  }

  /**
   * ****************************************************
   * content on focus
   * ****************************************************
   */
  function contentFocus () {
    // console.error('contentFocus')
    // hide all expansionPanels
    // this.expansionPanels.forEach(ep => {
    //   ep.hide()
    // })
    // toolbar
    if (!this.options.toolbarBeenFixed) {
      this.toolbar.show()
    }
  }

  this.$eventHandlers.contentFocus = {
    $target: $content,
    type: 'focus',
    handler: contentFocus.bind(this)
  }

  /**
   * ****************************************************
   * content on blur
   * ****************************************************
   */
  function contentBlur () {
    // save $cursorNode
    this.$cursorNode = this.cursor.getCurrentNode()

    this._checkChildSection()
    // console.warn(this.$cursorNode[0])
    // toolbar
    if (!this.options.toolbarBeenFixed) {
      this.toolbar.hide()
    }
  }

  this.$eventHandlers.contentBlur = {
    $target: $content,
    type: 'blur',
    handler: contentBlur.bind(this)
  }

  /**
   * ****************************************************
   * content on click
   * ****************************************************
   */
  function contentClick () {
    // save $cursorNode
    this.$cursorNode = this.cursor.getCurrentNode()
    // check position
    this.checkPosition()
    // textStylePanel is undefined, or is hide
    if (!this.textStylePanel || !this.textStylePanel.visible) return
    this.textStylePanel.resetActiveState()
  }

  this.$eventHandlers.contentClick = {
    $target: $content,
    type: 'click',
    handler: contentClick.bind(this)
  }


  /**
   * ****************************************************
   * content on keydown
   * ****************************************************
   */
  function contentKeydown (e) {
    this.emit('keydown', e)
  }

  this.$eventHandlers.contentKeyup = {
    $target: $content,
    type: 'keydown',
    handler: contentKeydown.bind(this)
  }

  /**
   * ****************************************************
   * content on keyup
   * ****************************************************
   */
  function contentKeyup (e) {
    this.emit('keyup', e)
    // handle enter keyup
    if (e.key === 'Enter' || e.keyCode === 13) {
      // check section node
      this._checkChildSection()
      // content on click
      contentClick.call(this)
    }
    // check position
    // this.checkPosition()
  }

  this.$eventHandlers.contentKeyup = {
    $target: $content,
    type: 'keyup',
    handler: contentKeyup.bind(this)
  }

  /**
   * ****************************************************
   * register events
   * ****************************************************
   */
  let evt
  for (let key in this.$eventHandlers) {
    evt = this.$eventHandlers[key]
    evt.$target.on(evt.type, evt.handler, evt.capture)
  }
}
