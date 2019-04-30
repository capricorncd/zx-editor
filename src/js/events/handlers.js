/**
 * Created by Capricorncd.
 * User: https://github.com/capricorncd
 * Date: 2019/04/21 14:57
 */
import util from '../util'
import { getPasteText } from './paste'

/**
 * window onResize handler
 */
export function windowResize () {
  this.toolbar.init()
  this.emit('windowResize', this)
}

/**
 * content onPaste
 * @param e
 */
export function contentPaste (e) {
  e.preventDefault()
  getPasteText(e).then(str => {
    // 添加至焦点处
    this.insertElm(util.removeHtmlTags(str))
  })
}

/**
 * content input
 */
export function contentInput () {
  this._checkEmpty()
  this.emit('contentChange', this)
}

/**
 * content on focus
 */
export function contentFocus () {
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

/**
 * content on blur
 */
export function contentBlur () {
  // save $cursorNode
  this.$cursorNode = this.cursor.getCurrentNode()

  this._checkChildSection()
  // console.warn(this.$cursorNode[0])
  // toolbar
  if (!this.options.toolbarBeenFixed) {
    this.toolbar.hide()
  }
}

export function contentKeyup (e) {
  // handle enter keyup
  if (e.key === 'Enter' || e.keyCode === 13) {
    this._checkChildSection()
    contentClick.call(this)
  }
}

export function contentClick () {
  // textStylePanel is undefined, or is hide
  if (!this.textStylePanel || !this.textStylePanel.visible) return
  this.textStylePanel.resetActiveState()
}
