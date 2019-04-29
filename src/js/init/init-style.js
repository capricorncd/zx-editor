/**
 * Created by Capricorncd.
 * User: https://github.com/capricorncd
 * Date: 2019/04/15 21:46
 */
import $ from '../dom-class'

export function initStyle (options) {
  let style = ''
  /**
   * *****************************************
   * append style
   * *****************************************
   */
  // line-height, caret-color
  if (options.lineHeight || options.cursorColor) {
    let lineHeight = options.lineHeight ? `line-height:${options.lineHeight};` : ''
    let caretColor = options.cursorColor ? `caret-color:${options.cursorColor}` : ''
    style += `.zx-editor .zx-editor-content-wrapper{${lineHeight + caretColor}}`
  }
  if (options.paragraphTailSpacing) {
    style += `.zx-editor .zx-editor-content-wrapper > *{margin-bottom:${options.paragraphTailSpacing};}`
  }
  // placeholder
  if (options.placeholder || options.placeholderColor) {
    let content = options.placeholder ? `content:'${options.placeholder}';` : ''
    let color = options.placeholderColor ? `color:${options.placeholderColor};` : ''
    style += `.zx-editor .zx-editor-content-wrapper.is-empty:before{${content + color}}`
  }
  if (options.borderColor) {
    style += `.zx-editor .border-top:before, .zx-editor .border-bottom:after {border-color: ${options.borderColor}`
  }
  /**
   * *****************************************
   * editor $content
   * *****************************************
   */
  if (style) $('head').append(`<style type="text/css">${style}</style>`)
  /**
   * *****************************************
   * set css
   * *****************************************
   */
  let heightDiff = this.$wrapper.outerHeight(true) - this.$wrapper.height()
  this.setHeight(options.height ? options.height : window.innerHeight - heightDiff)
}
