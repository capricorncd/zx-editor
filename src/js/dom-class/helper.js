/**
 * Created by Capricorncd.
 * User: https://github.com/capricorncd
 * Date: 2019/04/18 22:57
 */
import util from '../util/index'
import { document } from 'ssr-window'

/**
 * unique
 * Remove duplicate elements in an array
 * @param arr
 * @return {Array}
 */
export function unique (arr) {
  const uniqueArray = []
  for (let i = 0; i < arr.length; i += 1) {
    if (uniqueArray.indexOf(arr[i]) === -1) uniqueArray.push(arr[i])
  }
  return uniqueArray
}

/**
 * 改变元素的nodeName
 * @param oldNode
 * @param tagName target nodeName
 * @return {*}
 */
export function changeNodeName (oldNode, tagName) {
  let oldNodeName = oldNode.nodeName.toLowerCase()
  // check tagName
  if (typeof tagName !== 'string' || util.strip(tagName).length === 0) {
    throw new TypeError(`changeNodeName(oldNode, tagName) 'tagName' is ${tagName}, should be a 'string'`)
  }
  if (oldNodeName === tagName.toLowerCase()) return oldNode
  let el = document.createElement(tagName)
  // 非Element节点，当字符串节点处理
  if (oldNode.nodeType !== 1) {
    el.appendChild(oldNode)
  } else {
   // 获取属性class, style, id
    if (oldNode.className) el.className = oldNode.className
    if (oldNode.id) el.id = oldNode.id
    let style = oldNode.getAttribute('style')
    if (style) el.setAttribute('style', style)
    el.innerHTML = oldNode.innerHTML
  }
  // replace Node on document
  if (oldNode.parentNode) {
    oldNode.parentNode.replaceChild(el, oldNode)
  }
  return el
}

/**
 * addEventListener
 * @param el
 * @param eventType
 * @param fn
 * @param useCapture
 */
export function addEventListener (el, eventType, fn, useCapture) {
  if (el.addEventListener) {
    el.addEventListener(eventType, fn, useCapture)
  } else if (el.attachEvent) {
    el.attachEvent(eventType, fn)
  } else {
    el[`on${eventType}`] = fn
  }
}

/**
 * removeEventListener
 * @param el
 * @param eventType
 * @param fn
 * @param useCapture
 */
export function removeEventListener (el, eventType, fn, useCapture) {
  if (el.removeEventListener) {
    el.removeEventListener(eventType, fn, useCapture)
  } else if (el.detachEvent) {
    el.detachEvent(eventType, fn)
  } else {
    el[`on${eventType}`] = null
  }
}

/**
 * crate text node
 * @param str
 * @return {Text | ActiveX.IXMLDOMText}
 */
function createTextNode (str) {
  return document.createTextNode(str)
}

/**
 * create element
 * @param tag HTML tag name
 * @param attrs attributes
 * @return {*|{children, childNodes, style, setAttribute, getElementsByTagName}|ActiveX.IXMLDOMElement|HTMLElement}
 */
export function createElement (tag, attrs) {
  if (!tag && typeof tag !== 'string') {
    throw new TypeError('Parameter error')
  }
  let el = document.createElement(tag)
  if (attrs && typeof attrs === 'object') {
    for (let key in attrs) {
      if (attrs.hasOwnProperty(key)) {
        el.setAttribute(key, attrs[key])
      }
    }
  }
  return el
}

/**
 * create dom
 * @param vnode {tag: 'div', attrs: {class: 'class-name', 'data-id': 1000}, child: ['any text', vnode]}
 * @return {*}
 */
export function createVdom (vnode) {
  if (!vnode) return null
  if (typeof vnode === 'string') {
    return createTextNode(vnode)
  }
  let tag = vnode.tag
  let attrs = vnode.attrs
  let child = vnode.child
  if (!tag && !attrs && !child) return null
  // 创建dom
  let el = createElement(tag || 'div', attrs)
  if (Array.isArray(child) && child.length) {
    let itemNode
    child.forEach(item => {
      itemNode = createVdom(item)
      if (itemNode) el.appendChild(itemNode)
    })
  } else if (child && typeof child === 'string') {
    el.appendChild(createTextNode(child))
  }
  return el
}

