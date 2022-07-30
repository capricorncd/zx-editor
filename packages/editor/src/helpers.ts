/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/05/05 10:55:25 (GMT+0900)
 */
import { CSSProperties, VirtualNode } from '@zx-editor/types'
import { slice, toCamelCase, createElement } from 'zx-sml'

// navigator
const USER_AGENT = window.navigator.userAgent
const PLATFORM = window.navigator.platform

export function isIPhone() {
  return /iphone/i.test(USER_AGENT) && /iphone/.test(PLATFORM)
}

export function isIPhoneX() {
  return window.screen.height === 812 && window.screen.width === 375
}

export function replaceHtmlTag(input: string, oldNodeName: string, newNodeName: string): string {
  return input.replace(RegExp('(^<' + oldNodeName + ')|(' + oldNodeName + '>$)', 'gi'), (match) =>
    match.toUpperCase().replace(oldNodeName, newNodeName.toLowerCase()),
  )
}

export function isUlElement(el: Element): boolean {
  return /UL|OL/.test(el.nodeName)
}

/**
 * is <br> section
 * <section><br></section>
 * @param el
 */
export function isBrSection(el: HTMLElement | Element | null): boolean {
  if (!el) return false
  const nodes = slice<Node, NodeList>(el.childNodes)
  return nodes.length === 1 && nodes[0].nodeName === 'BR'
}

/**
 * 获取元素styles对象
 * @param el
 */
export function getStyles(el: HTMLElement | null, attr = 'style'): CSSProperties {
  if (!el) return {}
  const style = el.getAttribute(attr) || ''
  return style.split(/\s?;\s?/).reduce<CSSProperties>((prev, s) => {
    const [key, val] = s.split(/\s?:\s?/)
    if (key) prev[toCamelCase(key)] = val
    return prev
  }, {})
}

function createTextNode(str: string): Text {
  return document.createTextNode(str)
}

/**
 * 创建HTML节点
 * @param vNode
 */
export function createNode(vNode: VirtualNode | string): HTMLElement | Text | null {
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

export function hasClass<T extends HTMLElement>(el: T, className: string): boolean {
  return el.classList.contains(className)
}

export function addClass<T extends HTMLElement>(el: T, className: string): void {
  el.classList.add(className)
}

export function removeClass<T extends HTMLElement>(el: T, className: string): void {
  el.classList.remove(className)
}
