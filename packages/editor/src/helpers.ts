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

export function isUlElement(el: Element): boolean {
  return /^UL|OL$/.test(el.nodeName)
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
