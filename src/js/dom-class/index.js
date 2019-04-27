/**
 * Created by Capricorncd.
 * User: https://github.com/capricorncd
 * Date: 2019/04/17 20:36
 */
import util from '../util/index'
import { document, window } from 'ssr-window'
import { unique, changeNodeName, addEventListener, removeEventListener } from './helper'

/**
 * DOM操作
 * @param selector
 * @param context
 * @constructor
 */
export function ZxEditorQuery (selector, context) {

  // HANDLE: $(""), $(null), $(undefined), $(false)
  if ( !selector ) return this

  if (selector instanceof ZxEditorQuery) return selector

  let doms

  // Handle HTML strings
  if ( typeof selector === 'string' ) {
    if ( selector[ 0 ] === '<' &&
      selector[ selector.length - 1 ] === '>' && selector.length >= 3 ) {

      // Assume that strings that start and end with <> are HTML and skip the regex check
      let tempDiv = document.createElement('div')
      tempDiv.innerHTML = selector
      doms = util.slice(tempDiv.childNodes)
    } else if (/^[#\w\d_,\s-]+$/.test(selector)) {
      if (context instanceof ZxEditorQuery) {
        context =  context[0]
      }
      context = util.isElement(context) && context.nodeType === 1 ? context : document
      doms = util.slice(context.querySelectorAll(util.strip(selector)))
    }
    // HANDLE: $(DOMElement)
  } else if ( selector.nodeType || selector === window || selector === document ) {
    doms = [selector]
    // HANDLE: $(DOMElements)
  } else if (Array.isArray(selector) && selector.every(item => util.isElement(item))) {
    doms = selector
  }

  if (doms) {
    doms.forEach((el, i) => {
      this[i] = el
    })
    this.length = doms.length
  }
  return this
}

/**
 * prototype
 */
ZxEditorQuery.prototype = {
  /**
   * constructor
   */
  constructor: ZxEditorQuery,

  /**
   * length
   */
  length: 0,

  /**
   * ********************************************
   * find item
   * ********************************************
   */

  /**
   * get children
   * @param selector
   * @return {*|jQuery|HTMLElement}
   */
  children (selector) {
    const children = []
    for (let i = 0; i < this.length; i++) {
      const childNodes = this[i].childNodes

      for (let j = 0; j < childNodes.length; j++) {
        if (!selector) {
          if (childNodes[j].nodeType === 1) children.push(childNodes[j])
        } else if (childNodes[j].nodeType === 1 && $(childNodes[j]).is(selector)) {
          children.push(childNodes[j])
        }
      }
    }
    return $(unique(children))
  },

  /**
   * Find the nearest matching element in the parent
   * @param selector
   * @return {*}
   */
  closest (selector) {
    let closest = this
    if (typeof selector === 'undefined') {
      return new $()
    }
    if (!closest.is(selector)) {
      closest = closest.parents(selector).eq(0)
    }
    return closest
  },

  /**
   * equal
   * @param i
   * @return {*|jQuery|HTMLElement}
   */
  eq (i) {
    let len = this.length
    let index = util.int(i) + (i < 0 ? len : 0)
    return $(this[index])
  },

  /**
   * find item
   * @param selector
   * @return {*|jQuery|HTMLElement}
   */
  find (selector) {
    let found
    let foundElements = []
    for (let i = 0; i < this.length; i++) {
      if (this[i].nodeType !== 1) continue
      found = this[i].querySelectorAll(selector)
      for (let j = 0; j < found.length; j++) {
        foundElements.push(found[j])
      }
    }
    return $(foundElements)
  },

  /**
   * get first child
   * @return {*|jQuery|HTMLElement}
   */
  firstChild () {
    return this.children().eq(0)
  },

  /**
   * get last child
   * @return {*|jQuery|HTMLElement}
   */
  lastChild () {
    return this.children().eq(-1)
  },

  /**
   * get next siblings
   * @param selector
   * @return {*|jQuery|HTMLElement}
   */
  next (selector) {
    if (this.length > 0) {
      if (selector) {
        if (this[0].nextElementSibling && $(this[0].nextElementSibling).is(selector)) {
          return $([this[0].nextElementSibling])
        }
        return $()
      }

      if (this[0].nextElementSibling) return $([this[0].nextElementSibling])
    }
    return $()
  },

  /**
   * get nearest parents
   * @param selector
   * @return {*|jQuery|HTMLElement}
   */
  parent (selector) {
    const parents = []
    for (let i = 0; i < this.length; i++) {
      if (this[i].parentNode !== null) {
        if (selector) {
          if ($(this[i].parentNode).is(selector)) parents.push(this[i].parentNode)
        } else {
          parents.push(this[i].parentNode)
        }
      }
    }
    return $(unique(parents))
  },

  /**
   * get all parents
   * @param selector
   * @return {*|jQuery|HTMLElement}
   */
  parents (selector) {
    const parents = []
    for (let i = 0; i < this.length; i++) {
      let parent = this[i].parentNode
      while (parent) {
        if (selector) {
          if ($(parent).is(selector)) parents.push(parent)
        } else {
          parents.push(parent)
        }
        parent = parent.parentNode
      }
    }
    return $(unique(parents))
  },

  /**
   * ********************************************
   * class
   * ********************************************
   */

  /**
   * add className
   * @param className
   * @return {ZxEditorQuery}
   */
  addClass (className) {
    if (!className) return this
    let classes = className.split(' ')
    classes.forEach(cls => {
      for (let j = 0; j < this.length; j++) {
        this[j] && this[j].classList && this[j].classList.add(cls)
      }
    })
    return this
  },

  /**
   * remove className
   * @param className
   * @return {ZxEditorQuery}
   */
  removeClass (className) {
    let classes = className.split(' ')
    classes.forEach(cls => {
      for (let j = 0; j < this.length; j++) {
        this[j] && this[j].classList && this[j].classList.remove(cls)
      }
    })
    return this
  },

  /**
   * check className
   * @param className
   * @return {boolean}
   */
  hasClass (className) {
    if (!this[0]) return false
    return this[0].classList.contains(className)
  },

  /**
   * ********************************************
   * attribute, data
   * ********************************************
   */

  /**
   * get/set attribute
   * @param attrs attribute or object
   * @param value
   * @return {*}
   */
  attr (attrs, value) {
    if (arguments.length === 1 && typeof attrs === 'string') {
      // Get attr
      if (this[0]) return this[0].getAttribute(attrs)
      return void 0
    }

    // Set attrs
    for (let i = 0; i < this.length; i++) {
      if (arguments.length === 2) {
        // String
        this[i].setAttribute(attrs, value)
      } else {
        // Object
        for (let attr in attrs) {
          this[i][attr] = attrs[attr]
          this[i].setAttribute(attr, attrs[attr])
        }
      }
    }
    return this
  },

  /**
   * remove attribute
   * @param attr
   * @return {ZxEditorQuery}
   */
  removeAttr (attr) {
    for (let i = 0; i < this.length; i++) {
      this[i].removeAttribute(attr)
    }
    return this
  },

  /**
   * get/set data-
   * @param key
   * @param value
   * @return {*}
   */
  data (key, value) {
    let el
    if (typeof value === 'undefined') {
      el = this[0]
      if (el) {
        if (el.dataStorage) return el.dataStorage[key]
        let val = el.getAttribute(`data-${key}`)
        return /^\d+\.?\d*$/.test(val) ? +val : val
      }
      return undefined
    }

    // Set value
    for (let i = 0; i < this.length; i++) {
      el = this[i]
      if (!el.dataStorage) el.dataStorage = {}
      el.dataStorage[key] = value
    }
    return this
  },

  /**
   * ********************************************
   * insert node
   * ********************************************
   */

  /**
   * appendChild
   * @param args
   * @return {ZxEditorQuery}
   */
  append (...args) {
    let newChild

    for (let k = 0; k < args.length; k++) {
      newChild = args[k];
      for (let i = 0; i < this.length; i++) {
        if (typeof newChild === 'string') {
          const tempDiv = document.createElement('div')
          tempDiv.innerHTML = newChild
          while (tempDiv.firstChild) {
            this[i].appendChild(tempDiv.firstChild)
          }
        } else if (newChild instanceof ZxEditorQuery) {
          for (let j = 0; j < newChild.length; j++) {
            this[i].appendChild(newChild[j])
          }
        } else {
          this[i].appendChild(newChild)
        }
      }
    }
    return this
  },

  /**
   * append child to parent
   * @param parent
   * @return {ZxEditorQuery}
   */
  appendTo (parent) {
    $(parent).append(this)
    return this
  },

  /**
   * insert after selector
   * @param selector
   */
  insertAfter(selector) {
    const after = $(selector)
    for (let i = 0; i < this.length; i++) {
      if (after.length === 1) {
        after[0].parentNode.insertBefore(this[i], after[0].nextSibling)
      } else if (after.length > 1) {
        for (let j = 0; j < after.length; j++) {
          after[j].parentNode.insertBefore(this[i].cloneNode(true), after[j].nextSibling)
        }
      }
    }
  },
  insertBefore (selector) {
    const before = $(selector)
    for (let i = 0; i < this.length; i++) {
      if (before.length === 1) {
        before[0].parentNode.insertBefore(this[i], before[0])
      } else if (before.length > 1) {
        for (let j = 0; j < before.length; j++) {
          before[j].parentNode.insertBefore(this[i].cloneNode(true), before[j])
        }
      }
    }
  },
  prepend (newChild) {
    let i
    let j
    for (i = 0; i < this.length; i++) {
      if (typeof newChild === 'string') {
        const tempDiv = document.createElement('div')
        tempDiv.innerHTML = newChild
        for (j = tempDiv.childNodes.length - 1; j >= 0; j--) {
          this[i].insertBefore(tempDiv.childNodes[j], this[i].childNodes[0])
        }
      } else if (newChild instanceof ZxEditorQuery) {
        for (j = 0; j < newChild.length; j++) {
          this[i].insertBefore(newChild[j], this[i].childNodes[0])
        }
      } else {
        this[i].insertBefore(newChild, this[i].childNodes[0])
      }
    }
    return this
  },
  prependTo (parent) {
    $(parent).prepend(this)
    return this
  },

  /**
   * replace child
   * @param selector
   * @return {ZxEditorQuery}
   */
  replace (selector) {
    let newChild = $(selector)
    let parentNode
    for (let i = 0; i < this.length; i++) {
      parentNode = this[i].parentNode
      if (parentNode) {
        parentNode.replaceChild(newChild[0], this[i])
      }
    }
    return this
  },

  /**
   * remove item
   * @param index
   * @return {ZxEditorQuery}
   */
  remove (index) {
    let el
    if (typeof index !== 'number') {
      for (let i = 0; i < this.length; i++) {
        el = this[i]
        if (el.parentNode) el.parentNode.removeChild(el)
      }
    } else {
      el = this[index]
      if (el && el.parentNode) el.parentNode.removeChild(el)
    }
    return this
  },

  /**
   * ********************************************
   * check
   * ********************************************
   */

  /**
   * is
   * @param selector
   * @return {*}
   */
  is (selector) {
    const el = this[0]
    let compareWith
    let i
    if (!el || typeof selector === 'undefined') return false;
    if (typeof selector === 'string') {
      if (el.matches) return el.matches(selector)
      else if (el.webkitMatchesSelector) return el.webkitMatchesSelector(selector)
      else if (el.msMatchesSelector) return el.msMatchesSelector(selector)

      compareWith = $(selector)
      for (i = 0; i < compareWith.length; i++) {
        if (compareWith[i] === el) return true
      }
      return false
    } else if (selector === document) return el === document
    else if (selector === window) return el === window

    if (selector.nodeType || selector instanceof ZxEditorQuery) {
      compareWith = selector.nodeType ? [selector] : selector
      for (i = 0; i < compareWith.length; i++) {
        if (compareWith[i] === el) return true
      }
      return false
    }
    return false
  },
  isTextNode () {
    let el = this[0]
    if (!el || !el.nodeType) return false
    return el.nodeType === 3
  },
  /**
   * 子元素（不包含br）是否为空
   * @return {boolean}
   */
  isEmpty () {
    return !util.strip(this.text()) && !this.find('img, video, audio')[0]
  },
  /**
   * target是否为this的第一个子元素
   * @param target
   * @return {boolean}
   */
  isFirstChildren (target) {
    return this.children().eq(0).is(target)
  },
  /**
   * target是否为this的最后一个子元素
   * @param target
   * @return {boolean}
   */
  isLastChildren (target) {
    return this.children().eq(-1).is(target)
  },
  indexOf(el) {
    if (el instanceof ZxEditorQuery) el = el[0]
    for (let i = 0; i < this.length; i++) {
      if (this[i] === el) return i
    }
    return -1
  },

  /**
   * this is in $parent children
   * @param $parent
   * @return {boolean}
   */
  isInChild ($parent) {
    let el = this[0]
    let $child = $parent.children()
    let $item
    for (let i = 0; i < $child.length; i++) {
      $item = $($child[i])
      if ($item.is(el)) {
        return true
      }
      if ($item.children().length && this.isInChild($item)) {
        return true
      }
    }
    return false
  },

  /**
   * every
   * @param fn
   * @return {boolean}
   */
  every (fn) {
    if (typeof fn !== 'function') throw new TypeError(`every(fn) fn is not a function`)
    let len = this.length
    let thisArg = arguments.length >= 2 ? arguments[1] : void 0
    for (let i = 0; i < len; i++) {
      if (fn.call(thisArg, $(this[i]), i)) return false
    }
    return true
  },
  /**
   * ********************************************
   * content
   * ********************************************
   */
  text (text) {
    if (typeof text === 'undefined') {
      if (this[0]) {
        return this[0].textContent.trim()
      }
      return ''
    }

    for (let i = 0; i < this.length; i++) {
      this[i].textContent = text
    }
    return this
  },
  html (html) {
    if (typeof html === 'undefined') {
      return this[0] ? this[0].innerHTML : ''
    }

    for (let i = 0; i < this.length; i++) {
      this[i].innerHTML = html
    }
    return this
  },
  /**
   * ********************************************
   * node
   * ********************************************
   */
  nodeName () {
    return this[0] ? this[0].nodeName.toLowerCase() : null
  },
  // https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
  nodeType () {
    return this[0] ? this[0].nodeType : 0
  },
  changeNodeName (nodeName) {
    for (let i = 0; i < this.length; i++) {
      // change nodeName
      this[i] = changeNodeName(this[i], nodeName)
    }
    return this
  },
  /**
   * ********************************************
   * visible
   * ********************************************
   */
  hide () {
    for (let i = 0; i < this.length; i++) {
      this[i].style.display = 'none'
    }
    return this
  },
  show () {
    for (let i = 0; i < this.length; i++) {
      const el = this[i]
      if (el.style.display === 'none') {
        el.style.display = ''
      }
      if (window.getComputedStyle(el, null).getPropertyValue('display') === 'none') {
        // Still not visible
        el.style.display = 'block'
      }
    }
    return this
  },
  /**
   * ********************************************
   * Events
   * ********************************************
   */
  on (...args) {
    let [eventType, fn, useCapture] = args
    let el
    for (let i = 0; i < this.length; i++) {
      el = this[i]
      if (el.nodeType === 1 || el === document || el === window) {
        addEventListener(el, eventType, fn, useCapture)
      }
    }
    return this
  },
  off(...args) {
    let [eventType, fn, useCapture] = args
    let el
    for (let i = 0; i < this.length; i++) {
      el = this[i]
      if (el.nodeType === 1 || el === document || el === window) {
        removeEventListener(el, eventType, fn, useCapture)
      }
    }
    return this;
  },
  trigger(...args) {
    const events = args[0].split(' ')
    const eventData = args[1]
    for (let i = 0; i < events.length; i++) {
      const event = events[i]
      for (let j = 0; j < this.length; j++) {
        const el = this[j]
        let evt
        try {
          evt = new window.CustomEvent(event, {
            detail: eventData,
            bubbles: true,
            cancelable: true,
          })
        } catch (e) {
          evt = document.createEvent('Event')
          evt.initEvent(event, true, true)
          evt.detail = eventData
        }
        el.dispatchEvent(evt)
      }
    }
    return this
  },
  /**
   * ********************************************
   * css
   * ********************************************
   */
  css(props, value) {
    let i
    if (arguments.length === 1) {
      if (typeof props === 'string') {
        if (this[0]) return window.getComputedStyle(this[0], null).getPropertyValue(props)
        return void 0
      } else {
        for (i = 0; i < this.length; i += 1) {
          for (let prop in props) {
            this[i].style[prop] = props[prop]
          }
        }
      }
    }
    if (arguments.length === 2 && typeof props === 'string') {
      for (i = 0; i < this.length; i += 1) {
        this[i].style[props] = value;
      }
    }
    return this
  },
  styles() {
    if (this[0]) return window.getComputedStyle(this[0], null)
    return {}
  },
  /**
   * ********************************************
   * size
   * ********************************************
   */
  width() {
    if (this[0] === window) return window.innerWidth
    return this.length > 0 ? parseFloat(this.css('width')) : null
  },
  outerWidth(includeMargins) {
    if (this.length > 0) {
      let offsetWidth = this[0].offsetWidth
      if (includeMargins) {
        const styles = this.styles()
        return offsetWidth + parseFloat(styles.getPropertyValue('margin-right')) + parseFloat(styles.getPropertyValue('margin-left'))
      }
      return offsetWidth
    }
    return null
  },
  height() {
    if (this[0] === window) return window.innerHeight
    return this.length > 0 ? parseFloat(this.css('height')) : null
  },
  outerHeight(includeMargins) {
    if (this.length > 0) {
      let offsetHeight = this[0].offsetHeight
      if (includeMargins) {
        let styles = this.styles()
        return offsetHeight + parseFloat(styles.getPropertyValue('margin-top')) + parseFloat(styles.getPropertyValue('margin-bottom'))
      }
      return offsetHeight
    }
    return null
  },
  offset() {
    if (this.length > 0) {
      const el = this[0];
      let box = el.getBoundingClientRect()
      const body = document.body
      const clientTop = el.clientTop || body.clientTop || 0
      const clientLeft = el.clientLeft || body.clientLeft || 0
      const scrollTop = el === window ? window.scrollY : el.scrollTop
      const scrollLeft = el === window ? window.scrollX : el.scrollLeft
      return {
        top: (box.top + scrollTop) - clientTop,
        left: (box.left + scrollLeft) - clientLeft,
      }
    }
    return null
  }
}

const $ = function (selector, context) {
  return new ZxEditorQuery(selector, context)
}

export default $
