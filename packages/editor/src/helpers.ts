/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/05/05 10:55:25 (GMT+0900)
 */
import { slice } from 'zx-sml'

export function replaceHtmlTag(input: string, oldNodeName: string, newNodeName: string): string {
  return input.replace(RegExp('(^<' + oldNodeName + ')|(' + oldNodeName + '>$)', 'gi'), (match) =>
    match.toUpperCase().replace(oldNodeName, newNodeName.toLowerCase()),
  )
}
/**
 * remove li tag
 * @param input
 * @returns
 */
export function removeLiTags(input: string): string {
  return input.replace(/<li[^>]*>(.+)<\/li>/gi, '$1')
}

export function isUlElement(el: Element | string): boolean {
  const nodeName = typeof el === 'string' ? el : el.nodeName
  return /^UL|OL$/i.test(nodeName)
}

/**
 * only one BR Node in the el's children
 * <anyTag><br></anyTag>
 * @param el
 */
export function isOnlyBrInChildren(el: HTMLElement | Element | null): boolean {
  if (!el) return false
  const nodes = slice<Node, NodeList>(el.childNodes)
  return nodes.length === 1 && nodes[0].nodeName === 'BR'
}

/**
 * isPairedTags(el)
 * Determine if `el` is a paired tags.
 * @param el `Element | string` Element or HTML string.
 * @returns `boolean`
 */
export function isPairedTags<T extends Element>(el: T | string): boolean {
  if (el instanceof Element) {
    el = el.outerHTML
  }
  return /^<(\w+)[^>]*>.*<\/\1>$/.test(el)
}

/**
 * isSpecialPairedTags(el)
 * Determine whether `el` is PICTURE, VIDEO, AUDIO and other HTML tags.
 * @param el `Element`
 * @returns `boolean`
 */
export function isSpecialPairedTags<T extends Element>(el: T): boolean {
  return ['PICTURE', 'VIDEO', 'AUDIO', 'CANVAS'].includes(el.nodeName)
}

/**
 * hasSpecialPairedTag(el)
 * @param el `Element`
 * @returns
 */
export function hasSpecialPairedTag<T extends Element>(el: T): boolean {
  if (isSpecialPairedTags(el)) return true
  for (let i = 0; i < el.children.length; i++) {
    if (hasSpecialPairedTag(el.children[i])) return true
  }
  return false
}
