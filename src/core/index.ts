/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/05/05 11:07:32 (GMT+0900)
 */
import { createElement, createStyles } from '../helpers'
import { CLASS_NAME_EDITOR, CLASS_NAME_CONTENT } from '../const'
import * as Types from '../types'
export * from './CursorClass'
export * from './EventEmitter'

/**
 * init editor dom
 */
export const initEditorDom = (): HTMLDivElement => {
  const el = createElement<HTMLDivElement>('div', {
    class: CLASS_NAME_EDITOR,
  })
  return el
}

/**
 * init content dom
 * @param options
 */
export const initContentDom = (options: Types.Options): HTMLDivElement => {
  const contentStyles: Record<string, any> = {
    lineHeight: options.lineHeight,
    minHeight: options.minHeight,
    position: 'relative',
    overflowY: 'scroll',
    outline: 'none',
    // 用户自定义样式优先
    ...options.styles,
  }
  if (options.caretColor) contentStyles.caretColor = options.caretColor
  if (options.textColor) contentStyles.color = options.textColor

  const contentAttrs: Record<string, string> = {
    class: `${CLASS_NAME_CONTENT} is-empty`,
    style: createStyles(contentStyles),
  }
  if (options.editable) contentAttrs.contenteditable = 'true'

  const el = createElement<HTMLDivElement>('div', contentAttrs)
  el.innerHTML = `<section><br></section>`

  // return
  return el
}