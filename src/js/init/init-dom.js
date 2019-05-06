/**
 * Created by Capricorncd.
 * User: https://github.com/capricorncd
 * Date: 2019/04/15 21:49
 */
import $ from '../dom-class'
import util from '../util/index'
import { textStyle } from '../plugins/text-style/index'
import { selectPictureBtn } from '../plugins/select-picture-btn/index'
import Toolbar from '../toolbar'

export function initDom (options) {
  // content
  this.$content = $(`<div class="zx-editor-content-wrapper is-empty" contenteditable="${options.editable}"><section><br></section></div>`)

  this.setContentHeight(options)

  // editor
  this.$editor = $(`<div class="zx-editor"></div>`)

  // append to $eidtor
  this.$editor.append(this.$content)

  // toolbar
  this.toolbar = new Toolbar(options, this)

  // append to $wrapper
  this.$wrapper.append(this.$editor)

  // get lineHeight
  this.lineHeight = util.int(this.$content.styles().lineHeight)

  // plugin
  // sort btn
  options.toolbarBtns.forEach(name => {
    if (name === 'select-picture') {
      this.plugin(selectPictureBtn)
    } else if (name === 'text-style') {
      this.plugin(textStyle)
    }
  })
}
