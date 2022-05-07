/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/05/05 10:55:25 (GMT+0900)
 */
import { slice, toSnakeCase } from './format'
import { NODE_NAME_SECTION } from '../const'

const REPLACE_NODE_LIST = [
  'DIV', 'P', 'ARTICLE', 'ASIDE', 'DETAILS',
  // 'SUMMARY',
  'FOOTER', 'HEADER', 'MAIN', 'NAV',
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
  const parent = input.parentElement

  if (REPLACE_NODE_LIST.includes(oldNodeName)) {
    el.innerHTML = replace(input.outerHTML, oldNodeName, newNodeName)
    parent?.replaceChild(el.firstChild as HTMLElement, input)
    return el.firstChild as HTMLElement
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