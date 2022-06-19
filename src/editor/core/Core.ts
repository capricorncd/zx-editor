/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/05/09 21:12:46 (GMT+0900)
 */
import { $, createElement, toStrStyles, isBrSection, isUlElement, replaceHtmlTag, slice } from '../../helpers'
import { CLASS_NAME_EDITOR, NODE_NAME_SECTION, REPLACE_NODE_LIST } from '../const'
import { EditorOptions, CSSProperties } from '../../types'

/**
 * 设置编辑器$content伪元素before的content值，并将css style元素添加至head中
 * Set the content value of pseudo-element :before
 * @param placeholder
 */
const setContentValueOfPseudoElementBefore = (placeholder: string): void => {
  // 为伪类content设值
  const beforeStyle = `.${CLASS_NAME_EDITOR}.is-empty:before{content:'${placeholder}' !important;`
  // 生成style元素
  const style = createElement('style', { type: 'text/css' }, beforeStyle)
  // 将style元素添加值head中
  $('head')?.append(style)
}

/**
 * init content dom
 * @param options
 */
export const initContentDom = (options: EditorOptions): HTMLDivElement => {
  const contentStyles: CSSProperties = {
    lineHeight: options.lineHeight,
    minHeight: options.minHeight,
    position: 'relative',
    overflowY: 'scroll',
    outline: 'none',
    // 用户自定义样式优先
    ...options.styles,
    // placeholder
    '--placeholder-color': options.placeholderColor,
    '--line-height': options.lineHeight,
  }

  setContentValueOfPseudoElementBefore(options.placeholder as string)

  if (options.caretColor) contentStyles.caretColor = options.caretColor
  if (options.textColor) contentStyles.color = options.textColor

  const contentAttrs: Record<string, string> = {
    class: `${CLASS_NAME_EDITOR} is-empty`,
    style: toStrStyles(contentStyles),
  }
  if (options.editable) contentAttrs.contenteditable = 'true'

  const el = createElement<HTMLDivElement>('div', contentAttrs)
  el.innerHTML = '<section><br></section>'

  // return
  return el
}

/**
 *
 * @param input
 * @param tagName
 */
export const changeNodeName = (input: HTMLElement, tagName = NODE_NAME_SECTION): HTMLElement => {
  const oldNodeName = input.nodeName
  const newNodeName = tagName.toUpperCase()
  if (oldNodeName === newNodeName) return input

  const el = createElement(tagName)
  const parent = input.parentElement as HTMLElement

  let newEl: HTMLElement

  // LI元素处理：被修改的元素为UL/OL的内部元素
  if (oldNodeName === 'LI' && isUlElement(parent)) {
    // 替换当前LI元素标签为新元素标签
    el.innerHTML = replaceHtmlTag(input.outerHTML, oldNodeName, newNodeName)
    // 获取新元素
    newEl = el.firstChild as HTMLElement
    // 有多个LI元素
    if (parent.childElementCount > 1) {
      // 当前LI元素为UL的第一个元素
      if (parent.firstElementChild === input) {
        // 将新元素移动至UL/OL前面
        parent.parentElement?.insertBefore(newEl, parent)
      }
      // 当前LI元素为UL的最后一个元素
      else if (parent.lastElementChild === input) {
        const parentNext = parent.parentElement?.nextElementSibling
        // 下一个兄弟元素存在，添加至下一个兄弟元素前面
        if (parentNext) {
          parentNext.parentElement?.insertBefore(newEl, parentNext)
        } else {
          // 下一个兄弟元素不存在，添加至内容尾部
          parent.parentElement?.append(newEl)
        }
      }
      // 当前LI元素为UL中间的一个元素，拆分当前UL/OL
      else {
        const elList = slice<HTMLLIElement, HTMLCollection>(parent.children)
        const prevEl = createElement(parent.nodeName)
        let tempEl: HTMLLIElement | undefined = elList.shift()
        while (tempEl) {
          if (tempEl === input) break
          prevEl.append(tempEl)
          tempEl = elList.shift()
        }
        parent.parentElement?.insertBefore(prevEl, parent)
        // 将新元素插入到当前UL/OL元素前面
        parent.parentElement?.insertBefore(newEl, parent)
        // 删除被替换的对象元素
        parent.removeChild(input)
      }
    }
    // 只有一个LI元素
    else {
      // 将新元素移动至UL/OL前面
      parent.parentElement?.insertBefore(newEl, parent)
      // 移除UL/OL空元素
      parent.parentElement?.removeChild(parent)
    }
    return newEl
  }

  if (REPLACE_NODE_LIST.includes(oldNodeName)) {
    // change to ul, ol
    if (/UL|OL/.test(newNodeName)) {
      const prev = input.previousElementSibling
      const next = input.nextElementSibling
      if (prev && isUlElement(prev)) {
        el.innerHTML = replaceHtmlTag(input.outerHTML, oldNodeName, 'li')
        newEl = el.firstChild as HTMLElement
        prev.append(newEl)
        parent?.removeChild(input)
        // parent的下一个元素也为UL/OL元素，将其合并
        if (next && next.nodeName === prev.nodeName) {
          const nextEls = slice<HTMLElement, HTMLCollection>(next.children)
          prev.append(...nextEls)
          next.parentElement?.removeChild(next)
        }
      } else if (next && isUlElement(next)) {
        el.innerHTML = replaceHtmlTag(input.outerHTML, oldNodeName, 'li')
        newEl = el.firstChild as HTMLElement
        next.insertBefore(newEl, next.firstElementChild)
        parent?.removeChild(input)
        // parent的上一个元素也为UL/OL元素，将其合并
        // 不可能发生never
      } else {
        // 替换当前元素为UL/OL
        newEl = el
        el.innerHTML = replaceHtmlTag(input.outerHTML, oldNodeName, 'li')
        parent?.replaceChild(newEl, input)
      }
    } else {
      el.innerHTML = replaceHtmlTag(input.outerHTML, oldNodeName, newNodeName)
      newEl = el.firstChild as HTMLElement
      parent?.replaceChild(newEl, input)
    }
    return newEl
  }

  el.append(input.cloneNode(true))
  parent?.replaceChild(el, input)
  return el
}

export const checkIsEmpty = (el: HTMLElement): void => {
  if (el.children.length <= 1 && isBrSection(el.children[0])) {
    el.classList.add('is-empty')
  } else {
    el.classList.remove('is-empty')
  }
}
