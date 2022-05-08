/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/05/05 10:55:25 (GMT+0900)
 */
import { slice, toSnakeCase } from './format'
import { NODE_NAME_SECTION } from '../const'

const REPLACE_NODE_LIST = [
  'DIV',
  'P',
  'ARTICLE',
  'ASIDE',
  'DETAILS',
  'SUMMARY',
  'FOOTER',
  'HEADER',
  'MAIN',
  'NAV',
  'SECTION',
  'H1',
  'H2',
  'H3',
  'H4',
  'H5',
  'H6',
  'BLOCKQUOTE',
]

export const $ = <T extends HTMLElement>(selector: string | T, doc: Document | HTMLElement = document): T | null => {
  if (selector instanceof HTMLElement) return selector
  return doc.querySelector(selector)
}

// export const $$ = <T extends HTMLElement>(selector: string, doc: Document | HTMLElement = document): T[] => {
//   return Array.prototype.slice.call(doc.querySelectorAll(selector), 0)
// }

export const createElement = <T extends HTMLElement>(tag: string, attrs: Record<string, string> = {}, innerHTML?: string): T => {
  const el = document.createElement(tag) as T
  for (const [key, val] of Object.entries(attrs)) {
    el.setAttribute(key, val)
  }
  if (innerHTML) el.innerHTML = innerHTML
  return el
}

export const createStyles = (data: Record<string, any>): string => {
  const arr: string[] = []
  for (const [key, value] of Object.entries(data)) {
    arr.push(`${toSnakeCase(key)}:${value}`)
  }
  return arr.join(';')
}



const replace = (input: string, oldNodeName: string, newNodeName: string): string => {
  return input.replace(RegExp("(^<" + oldNodeName + ")|(" + oldNodeName + ">$)", "gi"), (match) => match.toUpperCase().replace(oldNodeName, newNodeName.toLowerCase()))
}

const isUlElement = (el: Element): boolean => {
  return /UL|OL/.test(el.nodeName)
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
    el.innerHTML = replace(input.outerHTML, oldNodeName, newNodeName)
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
        el.innerHTML = replace(input.outerHTML, oldNodeName, 'li')
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
        el.innerHTML = replace(input.outerHTML, oldNodeName, 'li')
        newEl = el.firstChild as HTMLElement
        next.insertBefore(newEl, next.firstElementChild)
        parent?.removeChild(input)
        // parent的上一个元素也为UL/OL元素，将其合并
        // 不可能发生never
      } else {
        // 替换当前元素为UL/OL
        newEl = el
        el.innerHTML = replace(input.outerHTML, oldNodeName, 'li')
        parent?.replaceChild(newEl, input)
      }
    } else {
      el.innerHTML = replace(input.outerHTML, oldNodeName, newNodeName)
      newEl = el.firstChild as HTMLElement
      parent?.replaceChild(newEl, input)
    }
    return newEl
  }

  el.append(input.cloneNode(true))
  parent?.replaceChild(el, input)
  return el
}

/**
 * is <br> section
 * <section><br></section>
 * @param el
 */
export const isBrSection = (el: HTMLElement | Element | null): boolean => {
  if (!el) return false
  const nodes = slice<Node, NodeList>(el.childNodes)
  return nodes.length === 1 && nodes[0].nodeName === 'BR'
}
