/**
 * Create by zx1984
 * 2018/1/23 0023.
 * https://github.com/zx1984
 */
// 添加样式
HTMLElement.prototype.addClass = function (className) {
  this.classList.add(className)
}
// 删除样式
HTMLElement.prototype.removeClass = function (className) {
  this.classList.remove(className)
}

// 包含某个样式
HTMLElement.prototype.hasClass = function (className) {
  let reg = new RegExp(`\\b(${className})\\b`)
  return className && reg.test(this.className)
}

export default  {
  /**
   * 创建DOM元素
   * @param tag 标签名称
   * @param opts 标签属性
   * @returns {Element}
   */
  create (tag = 'div', opts) {
    let elm = document.createElement(tag)
    if (opts && opts instanceof Object) {
      for (let key in opts) {
        if (opts.hasOwnProperty(key)) {
          elm.setAttribute(key, opts[key])
        }
      }
    }
    return elm
  },

  /**
   * 设置已有DOM节点的标签（实际是改变DOM节点标签）
   * @param oldElm DOM节点对象
   * @param newTagName 新标签名称
   * @returns {Element}
   */
  changeTagName (oldElm, newTagName) {
    if (!newTagName || oldElm.nodeName === newTagName.toUpperCase()) {
      return oldElm
    }
    // 新的dom对象
    const el = this.create(newTagName)
    // 获取元素class/id/style属性，并赋予新DOM对象
    const className = oldElm.className
    const id = oldElm.id
    // 是否有自定义style样式
    const style = oldElm.getAttribute('style')

    // innerHTML
    // let innerHTML = oldElm.innerHTML
    // innerText
    let innerText = oldElm.innerText
    // blockquote
    if (newTagName === 'blockquote') {
      innerText = `<p style="color: inherit">${innerText}</p>`
    } else if (newTagName === 'ul') {
      innerText = `<li style="color: inherit">${innerText}</li>`
    }

    if (className) el.className = className
    if (id) el.id = id
    if (style) el.setAttribute('style', style)

    el.innerHTML = innerText
    return el
  },

  /**
   * 查找当前元素节点(textNode、ElemNode等)，在context内的父根节点
   * @param currentNode 当前DOM节点
   * @param targetParent
   * @returns {*}
   */
  closest (currentNode, context) {
    let parentNode
    do {
      parentNode = currentNode.parentNode
      if (parentNode === context) {
        parentNode = null
        break
      } else {
        currentNode = parentNode
      }
    } while (parentNode)
    return currentNode
  },

  /**
   * 判断元素innerText是否为空
   * 如果元素内存在hr分割线，则不为空
   * @param el
   * @returns {boolean}
   */
  isInnerEmpty (el) {
    return !el.innerHTML || el.innerHTML === '<br>'
    // return !el.innerText.replace(/&nbsp;|\s/ig, '') && !el.querySelectorAll('hr')[0] && !el.querySelectorAll('img')[0]
  },

  /**
   * 对象是否为HTML元素节点对象
   * @param obj
   * @returns {Function}
   */
  // isHTMLElement (obj) {
  //   return (typeof HTMLElement === 'object') ?
  //     function (obj) {
  //       return obj instanceof HTMLElement
  //     } :
  //     function (obj) {
  //       return obj && typeof obj === 'object' && obj.nodeType === 1 && typeof obj.nodeName === 'string'
  //     }
  // },

  /**
   * dom节点选择器
   * @param selector 元素id、class、属性等
   * @param context 作用域，默认为documet
   * @returns {*}
   */
  query (selector, context = document) {
    return context.querySelector(selector)
  },

  queryAll (selector, context = document) {
    return context.querySelectorAll(selector)
  },

  /**
   * 在当前元素节点el后插入新节点newNode
   * @param el 当前元素节点
   * @param newNode 要插入的新元素节点
   */
  insertAfter (el, newNode) {
    const nextNode = el.nextElementSibling
    const parentNode = el.parentNode
    if (nextNode === null) {
      parentNode.appendChild(newNode)
    } else {
      parentNode.insertBefore(newNode, nextNode)
    }
  },

  /**
   * 查找元素节点el的兄弟节点
   * @param el
   * @param 可选参数，className兄弟节点包含的样式名
   * @returns {*}
   */
  siblings (el, className) {
    let arr = []
    let elmNodes = []
    const siblings = el.parentNode.childNodes
    // 只取元素节点
    siblings.forEach((item) => {
      if (item.nodeType === 1 && item !== el) {
        elmNodes.push(item)
      }
    })

    if (className) {
      let reg = new RegExp(`\\b(${className})\\b`)
      elmNodes.forEach((item) => {
        if (reg.test(item.className)) {
          arr.push(item)
        }
      })
    } else {
      arr = elmNodes
    }
    return arr.length ? arr : null
  },

  /**
   * 创建a标签链接字符串
   * @param url 链接地址
   * @param name 链接名称
   * @returns {string}
   */
  createLinkStr (url, name) {
    if (!url) return ''
    url = url + ''
    name = name || (url.length > 20 ? url.substr(0, 20) + '...' : url)
    return `<a href="${url}" target="_blank" alt="${name}">${name}</a>`
  },

  /**
   * 往字符串中插入字符串
   * @param str 原字符串
   * @param insertString 需要插入的字符串
   * @param position 插入位置
   * @returns {string}
   */
  insertStr (str, insertString, position) {
    return str.substring(0, position) + insertString + str.substring(position)
  },

  /**
   * 元素后面插入分割线
   * @param el
   */
  insertHr (el) {
    let p = this.isInnerEmpty(el) ? el : this.create('p')
    p.innerHTML = '<hr>'
    this.insertAfter(el, p)
  },

  // 获取当前元素节点最近的文本节点
  getTextNode (el) {
    while (el && el.nodeType === 1) {
      // 当el.childNodes[0] == <br>时，不能继续获取childNode
      if (el.childNodes[0]) {
        el = el.childNodes[0]
      } else {
        break
      }
    }
    return el
  }
}
