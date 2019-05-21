/**
 * Created by Capricorncd.
 * User: https://github.com/capricorncd
 * Date: 2019/04/29 21:08
 */
import { document } from 'ssr-window'
import $ from '../../dom-class/index'

export function changeTag (tag) {

  // same tag
  if (this.$cursorNode.nodeName() === tag) return

  let cursorNode = this.$cursorNode[0]

  let childNodes = cursorNode.childNodes

  let len = childNodes.length

  // to ul
  if (tag === 'ul') {
    let ul = document.createElement('ul')
    cloneAttrs(ul, cursorNode)
    for (let i = 0; i < len; i++) {
      ul.appendChild(createLi(childNodes[i].cloneNode(true)))
    }
    cursorNode.parentNode.replaceChild(ul, cursorNode)
    // save current node
    this.$cursorNode = $(ul)
    return
  }

  // change ul
  if (cursorNode.nodeName === 'UL') {
    let li, el
    for (let i = 0; i < len; i++) {
      li = childNodes[i].cloneNode(true)
      cloneAttrs(li, cursorNode)
      el = this.changeNodeName(li, tag)
      $(el).insertBefore(this.$cursorNode)
    }
    // remove old ul
    this.$cursorNode.remove()
    this.$cursorNode = $(el)
    return
  }

  this.$cursorNode.changeNodeName(tag)
  this.cursor.setRange(this.$cursorNode)
}

function createLi (child) {
  let li = document.createElement('li')
  li.appendChild(child)
  return li
}

function cloneAttrs (target, source) {
  let style, id, className
  style = source.getAttribute('style')
  id = source.id
  className = source.className
  if (style) target.setAttribute('style', style)
  if (id) target.id = id
  if (className) target.className = className
}
