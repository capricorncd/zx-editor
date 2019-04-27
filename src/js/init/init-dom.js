/**
 * Created by Capricorncd.
 * User: https://github.com/capricorncd
 * Date: 2019/04/15 21:49
 */
import $ from '../dom-class'

export function initDom (options) {
  // content
  this.$content = $(`<div class="zx-editor-content-wrapper is-empty" contenteditable="${options.editable}"><section><br></section></div>`)

  // editor
  this.$editor = $(`<div class="zx-editor"></div>`)

  // append to $eidtor
  this.$editor.append(this.$content)
  // expansion-panel

  // append to $wrapper
  this.$wrapper.append(this.$editor)
}
