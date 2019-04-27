/**
 * Created by Capricorncd.
 * User: https://github.com/capricorncd
 * Date: 2019/04/15 21:53
 */
import $ from '../dom-class'
import {
  windowResize,
  contentPaste,
  contentInput,
  contentFocus,
  contentBlur
} from '../events/handlers'

export function handleEvents () {
  /**
   * content paste
   */
  this.$eventHandlers.contentPaste = {
    $target: this.$content,
    type: 'paste',
    handler: contentPaste.bind(this)
  }

  /**
   * window resize
   */
  this.$eventHandlers.windowResize = {
    $target: $(window),
    type: 'resize',
    handler: windowResize.bind(this)
  }

  /**
   * content input
   */
  this.$eventHandlers.contentInput = {
    $target: this.$content,
    type: 'input',
    handler: contentInput.bind(this)
  }

  this.$eventHandlers.contentFocus = {
    $target: this.$content,
    type: 'focus',
    handler: contentFocus.bind(this)
  }

  this.$eventHandlers.contentBlur = {
    $target: this.$content,
    type: 'blur',
    handler: contentBlur.bind(this)
  }

  /**
   * register events
   */
  let evt
  for (let key in this.$eventHandlers) {
    evt = this.$eventHandlers[key]
    evt.$target.on(evt.type, evt.handler, evt.capture)
  }
}
