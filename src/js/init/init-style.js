/**
 * Created by Capricorncd.
 * User: https://github.com/capricorncd
 * Date: 2019/04/15 21:46
 */
import $ from '../dom-class'

export function initStyle (options) {
  /**
   * *****************************************
   * append style
   * *****************************************
   */
  // main color
  let style = `.zx-editor .m-color{color:${options.mainColor} !important;}.zx-editor .text-style-outer-wrapper .__tag-wrapper dd i {border-color:${options.mainColor} !important;}`

  // line-height, caret-color
  if (options.lineHeight || options.cursorColor || options.textColor) {
    let lineHeight = options.lineHeight ? `line-height:${options.lineHeight};` : ''
    let caretColor = options.cursorColor ? `caret-color:${options.cursorColor};` : ''
    let textColor = options.textColor ? `color:${options.textColor};` : ''
    style += `.zx-editor .zx-editor-content-wrapper{${lineHeight + caretColor + textColor}}`
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
  $('head').append(`<style type="text/css">${style}</style>`)
}
