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
