/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/05/05 10:55:25 (GMT+0900)
 */
import { CSSProperties, VirtualNode } from '@sp-editor/types'
import { toCamelCase, createElement } from 'zx-sml'

/**
 * 获取元素styles对象
 * @param el
 */
export const getStyles = (el: HTMLElement | null, attr = 'style'): CSSProperties => {
  if (!el) return {}
  const style = el.getAttribute(attr) || ''
  return style.split(/\s?;\s?/).reduce<CSSProperties>((prev, s) => {
    const [key, val] = s.split(/\s?:\s?/)
    if (key) prev[toCamelCase(key)] = val
    return prev
  }, {})
}

export const createTextNode = (str: string): Text => {
  return document.createTextNode(str)
}

/**
 * 创建HTML节点
 * @param vNode
 */
export const createNode = (vNode: VirtualNode | string): HTMLElement | Text | null => {
  if (!vNode) return null
  if (typeof vNode === 'string') {
    return createTextNode(vNode)
  }
  const { tag, attrs, child } = vNode
  if (!tag && !attrs && !child) return null
  // 创建dom
  const el = createElement(tag || 'div', attrs)
  if (Array.isArray(child) && child.length) {
    let itemNode
    child.forEach((item) => {
      itemNode = createNode(item)
      if (itemNode) el.appendChild(itemNode)
    })
  } else if (child && typeof child === 'string') {
    el.appendChild(createTextNode(child))
  }
  return el
}

export const hasClass = <T extends HTMLElement>(el: T, className: string): boolean => {
  return el.classList.contains(className)
}

export const addClass = <T extends HTMLElement>(el: T, className: string): void => {
  el.classList.add(className)
}

export const removeClass = <T extends HTMLElement>(el: T, className: string): void => {
  el.classList.remove(className)
}
