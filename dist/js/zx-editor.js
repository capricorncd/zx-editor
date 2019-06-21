/*!
 * zx-editor v3.0.2
 * https://github.com/capricorncd/zx-editor
 * Copyright © 2018-present, capricorncd
 * Released under the MIT License
 * Released on: 2019-06-21 23:06:27
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.ZxEditor = factory());
}(this, function () { 'use strict';

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  /**
   * SSR Window 1.0.1
   * Better handling for window object in SSR environment
   * https://github.com/nolimits4web/ssr-window
   *
   * Copyright 2018, Vladimir Kharlampidi
   *
   * Licensed under MIT
   *
   * Released on: July 18, 2018
   */
  var doc = typeof document === 'undefined' ? {
    body: {},
    addEventListener: function addEventListener() {},
    removeEventListener: function removeEventListener() {},
    activeElement: {
      blur: function blur() {},
      nodeName: ''
    },
    querySelector: function querySelector() {
      return null;
    },
    querySelectorAll: function querySelectorAll() {
      return [];
    },
    getElementById: function getElementById() {
      return null;
    },
    createEvent: function createEvent() {
      return {
        initEvent: function initEvent() {}
      };
    },
    createElement: function createElement() {
      return {
        children: [],
        childNodes: [],
        style: {},
        setAttribute: function setAttribute() {},
        getElementsByTagName: function getElementsByTagName() {
          return [];
        }
      };
    },
    location: {
      hash: ''
    }
  } : document; // eslint-disable-line

  var win = typeof window === 'undefined' ? {
    document: doc,
    navigator: {
      userAgent: ''
    },
    location: {},
    history: {},
    CustomEvent: function CustomEvent() {
      return this;
    },
    addEventListener: function addEventListener() {},
    removeEventListener: function removeEventListener() {},
    getComputedStyle: function getComputedStyle() {
      return {
        getPropertyValue: function getPropertyValue() {
          return '';
        }
      };
    },
    Image: function Image() {},
    Date: function Date() {},
    screen: {},
    setTimeout: function setTimeout() {},
    clearTimeout: function clearTimeout() {}
  } : window; // eslint-disable-line

  /**
   * unique
   * Remove duplicate elements in an array
   * @param arr
   * @return {Array}
   */

  function unique(arr) {
    var uniqueArray = [];

    for (var i = 0; i < arr.length; i += 1) {
      if (uniqueArray.indexOf(arr[i]) === -1) uniqueArray.push(arr[i]);
    }

    return uniqueArray;
  }
  /**
   * 改变元素的nodeName
   * @param oldNode
   * @param tagName target nodeName
   * @return {*}
   */

  function changeNodeName(oldNode, tagName) {
    var oldNodeName = oldNode.nodeName.toLowerCase(); // check tagName

    if (typeof tagName !== 'string' || util.strip(tagName).length === 0) {
      throw new TypeError("changeNodeName(oldNode, tagName) 'tagName' is ".concat(tagName, ", should be a 'string'"));
    }

    if (oldNodeName === tagName.toLowerCase()) return oldNode;
    var el = doc.createElement(tagName); // 非Element节点，当字符串节点处理

    if (oldNode.nodeType !== 1) {
      el.appendChild(oldNode);
    } else {
      // 获取属性class, style, id
      if (oldNode.className) el.className = oldNode.className;
      if (oldNode.id) el.id = oldNode.id;
      var style = oldNode.getAttribute('style');
      if (style) el.setAttribute('style', style);
      el.innerHTML = oldNode.innerHTML;
    } // replace Node on document


    if (oldNode.parentNode) {
      oldNode.parentNode.replaceChild(el, oldNode);
    }

    return el;
  }
  /**
   * addEventListener
   * @param el
   * @param eventType
   * @param fn
   * @param useCapture
   */

  function addEventListener(el, eventType, fn, useCapture) {
    if (el.addEventListener) {
      el.addEventListener(eventType, fn, useCapture);
    } else if (el.attachEvent) {
      el.attachEvent(eventType, fn);
    } else {
      el["on".concat(eventType)] = fn;
    }
  }
  /**
   * removeEventListener
   * @param el
   * @param eventType
   * @param fn
   * @param useCapture
   */

  function removeEventListener(el, eventType, fn, useCapture) {
    if (el.removeEventListener) {
      el.removeEventListener(eventType, fn, useCapture);
    } else if (el.detachEvent) {
      el.detachEvent(eventType, fn);
    } else {
      el["on".concat(eventType)] = null;
    }
  }
  /**
   * crate text node
   * @param str
   * @return {Text | ActiveX.IXMLDOMText}
   */

  function createTextNode(str) {
    return doc.createTextNode(str);
  }
  /**
   * create element
   * @param tag HTML tag name
   * @param attrs attributes
   * @return {*|{children, childNodes, style, setAttribute, getElementsByTagName}|ActiveX.IXMLDOMElement|HTMLElement}
   */


  function createElement(tag, attrs) {
    if (!tag && typeof tag !== 'string') {
      throw new TypeError('Parameter error');
    }

    var el = doc.createElement(tag);

    if (attrs && _typeof(attrs) === 'object') {
      for (var key in attrs) {
        if (attrs.hasOwnProperty(key)) {
          el.setAttribute(key, attrs[key]);
        }
      }
    }

    return el;
  }
  /**
   * create dom
   * @param vnode {tag: 'div', attrs: {class: 'class-name', 'data-id': 1000}, child: ['any text', vnode]}
   * @return {*}
   */

  function createVdom(vnode) {
    if (!vnode) return null;

    if (typeof vnode === 'string') {
      return createTextNode(vnode);
    }

    var tag = vnode.tag;
    var attrs = vnode.attrs;
    var child = vnode.child;
    if (!tag && !attrs && !child) return null; // 创建dom

    var el = createElement(tag || 'div', attrs);

    if (Array.isArray(child) && child.length) {
      var itemNode;
      child.forEach(function (item) {
        itemNode = createVdom(item);
        if (itemNode) el.appendChild(itemNode);
      });
    } else if (child && typeof child === 'string') {
      el.appendChild(createTextNode(child));
    }

    return el;
  }

  var arr = []; // Support: Android <=4.0 only
  // Make sure we trim BOM and NBSP

  var regTrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g; // navigator

  var USER_AGENT = win.navigator.userAgent;
  var PLATFORM = win.navigator.platform;
  /**
   * 转换为整数
   * @param n
   * @returns {*}
   */

  function _int(n) {
    var num = parseInt(n);
    return isNaN(num) ? 0 : num;
  }
  /**
   * 去除字符串首尾空格
   * @param str
   * @returns {string}
   */


  function trim(str) {
    return str ? str.toString().replace(regTrim, '') : '';
  }
  /**
   * 将伪数组，转化为数组
   * @param ArrayLike
   * @param index
   * @return {T[]}
   */


  function slice(ArrayLike, index) {
    return arr.slice.call(ArrayLike, _int(index));
  }
  /**
   * 去除字符串多余空格
   * 除首尾外，中间连续空格被替换为一个空格
   * @param str
   * @return {string}
   */


  function strip(str) {
    return trim(str).replace(/\s+/g, ' ');
  }
  /**
   * 是否为Element对象
   * @param el
   * @return {*|boolean}
   */


  function isElement(el) {
    return isObject(el) && el.nodeType;
  }
  /**
   * 是否为对象
   * @param obj
   * @param isAbsolute 必须满足父级原型为Object的对象
   * @return {*|boolean}
   */


  function isObject(obj, isAbsolute) {
    var isObj = obj && _typeof(obj) === 'object';
    return isAbsolute ? isObj && obj.toString() === '[object Object]' : isObj;
  }

  function isIPhone() {
    return /iphone/i.test(USER_AGENT) && /iphone/.test(PLATFORM);
  }

  function isIPhoneX() {
    return win.screen.height === 812 && win.screen.width === 375;
  }

  function isWindow(obj) {
    return obj !== null && obj === obj.window;
  }
  /**
   * 移除html标签
   * @param str
   * @return {string}
   */


  function removeHtmlTags(str) {
    str = (str + '').replace(/<\/?.+?>/g, '');
    return strip(str);
  }

  function toHex(num) {
    var n = typeof num === 'number' ? num : _int(num);
    var hex = n.toString(16);
    return hex[1] ? hex : '0' + hex;
  }

  function rgbToHex(rgb) {
    var hex = '';

    if (/rgb.*?\((\d+)\D+?(\d+)\D+?(\d+)/.test(rgb)) {
      hex += toHex(RegExp.$1);
      hex += toHex(RegExp.$2);
      hex += toHex(RegExp.$3);
    }

    return hex ? '#' + hex : rgb;
  }
  /**
   * string to hump format
   * @param str line-height: lineHeight
   * @return {string}
   */


  function toHump(str) {
    return strip(str).replace(/([-_\s]+\w)/g, function (match, $1) {
      // console.log(match, $1)
      return $1[1].toUpperCase();
    });
  }

  function supportBoxModel() {
    var body = doc.getElementsByTagName('body')[0];
    var div = doc.createElement('div');
    body.appendChild(div); // Figure out if the W3C box model works as expected

    div.innerHTML = '';
    div.style.width = div.style.paddingLeft = '1px'; // 通过检测div块的offsetWidth值是否是2px来判断浏览器是否支持盒模型

    var result = div.offsetWidth === 2;
    body.removeChild(div);
    return result;
  }

  var util = {
    isIPhone: isIPhone(),
    isIPhoneX: isIPhoneX(),
    supportBoxModel: supportBoxModel(),
    changeNodeName: changeNodeName,
    "int": _int,
    isElement: isElement,
    isObject: isObject,
    isWindow: isWindow,
    removeHtmlTags: removeHtmlTags,
    rgbToHex: rgbToHex,
    slice: slice,
    strip: strip,
    trim: trim,
    toHump: toHump,
    unique: unique
  };

  /**
   * Created by Capricorncd.
   * User: https://github.com/capricorncd
   * Date: 2019/04/17 20:36
   */
  /**
   * DOM操作
   * @param selector
   * @param context
   * @constructor
   */

  function ZxQuery(selector, context) {
    var _this = this;

    // HANDLE: $(""), $(null), $(undefined), $(false)
    if (!selector) return this;
    if (selector instanceof ZxQuery) return selector;
    var doms; // Handle HTML strings

    if (typeof selector === 'string') {
      if (selector[0] === '<' && selector[selector.length - 1] === '>' && selector.length >= 3) {
        // Assume that strings that start and end with <> are HTML and skip the regex check
        var tempDiv = doc.createElement('div');
        tempDiv.innerHTML = selector;
        doms = util.slice(tempDiv.childNodes);
      } else if (/^[#\w\d_,\s-]+$/.test(selector)) {
        if (context instanceof ZxQuery) {
          context = context[0];
        }

        context = util.isElement(context) && context.nodeType === 1 ? context : doc;
        doms = util.slice(context.querySelectorAll(util.strip(selector)));
      } // HANDLE: $(DOMElement)

    } else if (selector.nodeType || selector === win || selector === doc) {
      doms = [selector]; // HANDLE: $(DOMElements)
    } else if (Array.isArray(selector) && selector.every(function (item) {
      return util.isElement(item);
    })) {
      doms = selector;
    }

    if (doms) {
      doms.forEach(function (el, i) {
        _this[i] = el;
      });
      this.length = doms.length;
    }

    return this;
  }
  /**
   * prototype
   */

  ZxQuery.prototype = {
    /**
     * constructor
     */
    constructor: ZxQuery,

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
     * @param anyNode Boolean
     * @return {*|HTMLElement}
     */
    children: function children(selector, anyNode) {
      // check arguments
      if (typeof selector === 'boolean') {
        anyNode = selector;
        selector = void 0;
      }

      var children = [];
      var el;

      for (var i = 0; i < this.length; i++) {
        var childNodes = this[i].childNodes;

        for (var j = 0; j < childNodes.length; j++) {
          el = childNodes[j];

          if (!selector) {
            if (anyNode) {
              children.push(el);
            } else if (el.nodeType === 1) {
              children.push(el);
            }
          } else if (el.nodeType === 1 && $(el).is(selector)) {
            children.push(el);
          }
        }
      }

      return $(unique(children));
    },

    /**
     * Find the nearest matching element in the parent
     * @param selector
     * @return {*}
     */
    closest: function closest(selector) {
      var closest = this;

      if (typeof selector === 'undefined') {
        return new $();
      }

      if (!closest.is(selector)) {
        closest = closest.parents(selector).eq(0);
      }

      return closest;
    },

    /**
     * equal
     * @param i
     * @return {*|jQuery|HTMLElement}
     */
    eq: function eq(i) {
      var len = this.length;
      var index = util["int"](i) + (i < 0 ? len : 0);
      return $(this[index]);
    },

    /**
     * find item
     * @param selector
     * @return {*|jQuery|HTMLElement}
     */
    find: function find(selector) {
      var found;
      var foundElements = [];

      for (var i = 0; i < this.length; i++) {
        if (this[i].nodeType !== 1) continue;
        found = this[i].querySelectorAll(selector);

        for (var j = 0; j < found.length; j++) {
          foundElements.push(found[j]);
        }
      }

      return $(foundElements);
    },

    /**
     *
     * @param parent
     * @return {*}
     */
    findParentFrom: function findParentFrom(parent) {
      if (parent instanceof ZxQuery) parent = parent[0];
      var current = this[0]; // if (!current || !current.nodeType || !parent || !parent.nodeType) return null

      if (current === parent) return null;
      var tmpParent;

      while (current.parentNode) {
        tmpParent = current.parentNode;
        if (tmpParent === parent) return $(current);
        current = tmpParent;
      }

      return null;
    },

    /**
     * get first child
     * @return {*|jQuery|HTMLElement}
     */
    firstChild: function firstChild() {
      return this.children().eq(0);
    },

    /**
     * get last child
     * @return {*|jQuery|HTMLElement}
     */
    lastChild: function lastChild() {
      return this.children().eq(-1);
    },

    /**
     * get next siblings
     * @param selector
     * @return {*|jQuery|HTMLElement}
     */
    next: function next(selector) {
      if (this.length > 0) {
        if (selector) {
          if (this[0].nextElementSibling && $(this[0].nextElementSibling).is(selector)) {
            return $([this[0].nextElementSibling]);
          }

          return $();
        }

        if (this[0].nextElementSibling) return $([this[0].nextElementSibling]);
      }

      return $();
    },

    /**
     * get nearest parents
     * @param selector
     * @return {*|jQuery|HTMLElement}
     */
    parent: function parent(selector) {
      var parents = [];

      for (var i = 0; i < this.length; i++) {
        if (this[i].parentNode !== null) {
          if (selector) {
            if ($(this[i].parentNode).is(selector)) parents.push(this[i].parentNode);
          } else {
            parents.push(this[i].parentNode);
          }
        }
      }

      return $(unique(parents));
    },

    /**
     * get all parents
     * @param selector
     * @return {*|jQuery|HTMLElement}
     */
    parents: function parents(selector) {
      var parents = [];

      for (var i = 0; i < this.length; i++) {
        var parent = this[i].parentNode;

        while (parent) {
          if (selector) {
            if ($(parent).is(selector)) parents.push(parent);
          } else {
            parents.push(parent);
          }

          parent = parent.parentNode;
        }
      }

      return $(unique(parents));
    },

    /**
     * ********************************************
     * class
     * ********************************************
     */

    /**
     * add className
     * @param className
     * @return {ZxQuery}
     */
    addClass: function addClass(className) {
      var _this2 = this;

      if (!className) return this;
      var classes = className.split(' ');
      classes.forEach(function (cls) {
        for (var j = 0; j < _this2.length; j++) {
          _this2[j] && _this2[j].classList && _this2[j].classList.add(cls);
        }
      });
      return this;
    },

    /**
     * remove className
     * @param className
     * @return {ZxQuery}
     */
    removeClass: function removeClass(className) {
      var _this3 = this;

      var classes = className.split(' ');
      classes.forEach(function (cls) {
        for (var j = 0; j < _this3.length; j++) {
          _this3[j] && _this3[j].classList && _this3[j].classList.remove(cls);
        }
      });
      return this;
    },

    /**
     * check className
     * @param className
     * @return {boolean}
     */
    hasClass: function hasClass(className) {
      if (!this[0]) return false;
      return this[0].classList.contains(className);
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
    attr: function attr(attrs, value) {
      if (arguments.length === 1 && typeof attrs === 'string') {
        // Get attr
        if (this[0]) return this[0].getAttribute(attrs);
        return void 0;
      } // Set attrs


      for (var i = 0; i < this.length; i++) {
        if (arguments.length === 2) {
          // String
          this[i].setAttribute(attrs, value);
        } else {
          // Object
          for (var attr in attrs) {
            this[i][attr] = attrs[attr];
            this[i].setAttribute(attr, attrs[attr]);
          }
        }
      }

      return this;
    },

    /**
     * remove attribute
     * @param attr
     * @return {ZxQuery}
     */
    removeAttr: function removeAttr(attr) {
      for (var i = 0; i < this.length; i++) {
        this[i].removeAttribute(attr);
      }

      return this;
    },

    /**
     * get/set data-
     * @param key
     * @param value
     * @return {*}
     */
    data: function data(key, value) {
      var el;

      if (typeof value === 'undefined') {
        el = this[0];

        if (el) {
          if (el.dataStorage) return el.dataStorage[key];
          var val = el.getAttribute("data-".concat(key));
          return /^\d+\.?\d*$/.test(val) ? +val : val;
        }

        return undefined;
      } // Set value


      for (var i = 0; i < this.length; i++) {
        el = this[i];
        if (!el.dataStorage) el.dataStorage = {};
        el.dataStorage[key] = value;
      }

      return this;
    },

    /**
     * ********************************************
     * insert node
     * ********************************************
     */

    /**
     * appendChild
     * @param args
     * @return {ZxQuery}
     */
    append: function append() {
      var newChild;

      for (var k = 0; k < arguments.length; k++) {
        newChild = k < 0 || arguments.length <= k ? undefined : arguments[k];

        for (var i = 0; i < this.length; i++) {
          if (typeof newChild === 'string') {
            var tempDiv = doc.createElement('div');
            tempDiv.innerHTML = newChild;

            while (tempDiv.firstChild) {
              this[i].appendChild(tempDiv.firstChild);
            }
          } else if (newChild instanceof ZxQuery) {
            for (var j = 0; j < newChild.length; j++) {
              this[i].appendChild(newChild[j]);
            }
          } else {
            this[i].appendChild(newChild);
          }
        }
      }

      return this;
    },

    /**
     * append child to parent
     * @param parent
     * @return {ZxQuery}
     */
    appendTo: function appendTo(parent) {
      $(parent).append(this);
      return this;
    },

    /**
     * insert after selector
     * @param selector
     */
    insertAfter: function insertAfter(selector) {
      var after = $(selector);

      for (var i = 0; i < this.length; i++) {
        if (after.length === 1) {
          after[0].parentNode.insertBefore(this[i], after[0].nextSibling);
        } else if (after.length > 1) {
          for (var j = 0; j < after.length; j++) {
            after[j].parentNode.insertBefore(this[i].cloneNode(true), after[j].nextSibling);
          }
        }
      }
    },
    insertBefore: function insertBefore(selector) {
      var before = $(selector);

      for (var i = 0; i < this.length; i++) {
        if (before.length === 1) {
          before[0].parentNode.insertBefore(this[i], before[0]);
        } else if (before.length > 1) {
          for (var j = 0; j < before.length; j++) {
            before[j].parentNode.insertBefore(this[i].cloneNode(true), before[j]);
          }
        }
      }
    },
    prepend: function prepend(newChild) {
      var i;
      var j;

      for (i = 0; i < this.length; i++) {
        if (typeof newChild === 'string') {
          var tempDiv = doc.createElement('div');
          tempDiv.innerHTML = newChild;

          for (j = tempDiv.childNodes.length - 1; j >= 0; j--) {
            this[i].insertBefore(tempDiv.childNodes[j], this[i].childNodes[0]);
          }
        } else if (newChild instanceof ZxQuery) {
          for (j = 0; j < newChild.length; j++) {
            this[i].insertBefore(newChild[j], this[i].childNodes[0]);
          }
        } else {
          this[i].insertBefore(newChild, this[i].childNodes[0]);
        }
      }

      return this;
    },
    prependTo: function prependTo(parent) {
      $(parent).prepend(this);
      return this;
    },

    /**
     * replace child
     * @param selector
     * @return {ZxQuery}
     */
    replace: function replace(selector) {
      var newChild = $(selector);
      var parentNode;

      for (var i = 0; i < this.length; i++) {
        parentNode = this[i].parentNode;

        if (parentNode) {
          parentNode.replaceChild(newChild[0].cloneNode(true), this[i]);
        }
      }

      return this;
    },

    /**
     * remove item
     * @param index
     * @return {ZxQuery}
     */
    remove: function remove(index) {
      var el;

      if (typeof index !== 'number') {
        for (var i = 0; i < this.length; i++) {
          el = this[i];
          if (el.parentNode) el.parentNode.removeChild(el);
        }
      } else {
        el = this[index];
        if (el && el.parentNode) el.parentNode.removeChild(el);
      }

      return this;
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
    is: function is(selector) {
      var el = this[0];
      var compareWith;
      var i;
      if (!el || typeof selector === 'undefined') return false;

      if (typeof selector === 'string') {
        if (el.matches) return el.matches(selector);else if (el.webkitMatchesSelector) return el.webkitMatchesSelector(selector);else if (el.msMatchesSelector) return el.msMatchesSelector(selector);
        compareWith = $(selector);

        for (i = 0; i < compareWith.length; i++) {
          if (compareWith[i] === el) return true;
        }

        return false;
      } else if (selector === doc) return el === doc;else if (selector === win) return el === win;

      if (selector.nodeType || selector instanceof ZxQuery) {
        compareWith = selector.nodeType ? [selector] : selector;

        for (i = 0; i < compareWith.length; i++) {
          if (compareWith[i] === el) return true;
        }

        return false;
      }

      return false;
    },
    isTextNode: function isTextNode() {
      var el = this[0];
      if (!el || !el.nodeType) return false;
      return el.nodeType === 3;
    },

    /**
     * 子元素（不包含br）是否为空
     * @return {boolean}
     */
    isEmpty: function isEmpty() {
      return !util.strip(this.text()) && !this.find('img, video, audio')[0];
    },

    /**
     * target是否为this的第一个子元素
     * @param target
     * @return {boolean}
     */
    isFirstChildren: function isFirstChildren(target) {
      return this.children().eq(0).is(target);
    },

    /**
     * target是否为this的最后一个子元素
     * @param target
     * @return {boolean}
     */
    isLastChildren: function isLastChildren(target) {
      return this.children().eq(-1).is(target);
    },
    indexOf: function indexOf(el) {
      if (el instanceof ZxQuery) el = el[0];

      for (var i = 0; i < this.length; i++) {
        if (this[i] === el) return i;
      }

      return -1;
    },

    /**
     * this is in $parent children
     * @param $parent
     * @return {boolean}
     */
    // isInChild ($parent) {
    //   let el = this[0]
    //   let childNodes = $parent[0].childNodes
    //   let tmp
    //   for (let i = 0; i < childNodes.length; i++) {
    //     tmp = childNodes[i]
    //     if (tmp === el) return true
    //     if (tmp.nodeType === 1 && this.isInChild($(tmp))) return true
    //   }
    //   return false
    // },

    /**
     * every
     * @param fn
     * @return {boolean}
     */
    every: function every(fn) {
      if (typeof fn !== 'function') throw new TypeError("every(fn) fn is not a function");
      var len = this.length;
      var thisArg = arguments.length >= 2 ? arguments[1] : void 0;

      for (var i = 0; i < len; i++) {
        if (fn.call(thisArg, $(this[i]), i)) return false;
      }

      return true;
    },

    /**
     * ********************************************
     * content
     * ********************************************
     */
    text: function text(_text) {
      if (typeof _text === 'undefined') {
        if (this[0]) {
          return this[0].textContent.trim();
        }

        return '';
      }

      for (var i = 0; i < this.length; i++) {
        this[i].textContent = _text;
      }

      return this;
    },
    html: function html(_html) {
      if (typeof _html === 'undefined') {
        return this[0] ? this[0].innerHTML : '';
      }

      for (var i = 0; i < this.length; i++) {
        this[i].innerHTML = _html;
      }

      return this;
    },

    /**
     * ********************************************
     * node
     * ********************************************
     */
    nodeName: function nodeName() {
      return this[0] ? this[0].nodeName.toLowerCase() : null;
    },
    // https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
    nodeType: function nodeType() {
      return this[0] ? this[0].nodeType : 0;
    },
    changeNodeName: function changeNodeName$1(nodeName) {
      for (var i = 0; i < this.length; i++) {
        // change nodeName
        this[i] = changeNodeName(this[i], nodeName);
      }

      return this;
    },

    /**
     * ********************************************
     * visible
     * ********************************************
     */
    hide: function hide() {
      for (var i = 0; i < this.length; i++) {
        this[i].style.display = 'none';
      }

      return this;
    },
    show: function show() {
      for (var i = 0; i < this.length; i++) {
        var el = this[i];

        if (el.style.display === 'none') {
          el.style.display = '';
        }

        if (win.getComputedStyle(el, null).getPropertyValue('display') === 'none') {
          // Still not visible
          el.style.display = 'block';
        }
      }

      return this;
    },

    /**
     * ********************************************
     * Events
     * ********************************************
     */
    on: function on() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var eventType = args[0],
          fn = args[1],
          useCapture = args[2];
      var el;

      for (var i = 0; i < this.length; i++) {
        el = this[i];

        if (el.nodeType === 1 || el === doc || el === win) {
          addEventListener(el, eventType, fn, useCapture);
        }
      }

      return this;
    },
    off: function off() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      var eventType = args[0],
          fn = args[1],
          useCapture = args[2];
      var el;

      for (var i = 0; i < this.length; i++) {
        el = this[i];

        if (el.nodeType === 1 || el === doc || el === win) {
          removeEventListener(el, eventType, fn, useCapture);
        }
      }

      return this;
    },
    trigger: function trigger() {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      var events = args[0].split(' ');
      var eventData = args[1];

      for (var i = 0; i < events.length; i++) {
        var event = events[i];

        for (var j = 0; j < this.length; j++) {
          var el = this[j];
          var evt = void 0;

          try {
            evt = new win.CustomEvent(event, {
              detail: eventData,
              bubbles: true,
              cancelable: true
            });
          } catch (e) {
            evt = doc.createEvent('Event');
            evt.initEvent(event, true, true);
            evt.detail = eventData;
          }

          el.dispatchEvent(evt);
        }
      }

      return this;
    },

    /**
     * ********************************************
     * css
     * ********************************************
     */
    css: function css(props, value) {
      var i;

      if (arguments.length === 1) {
        if (typeof props === 'string') {
          if (this[0]) return win.getComputedStyle(this[0], null).getPropertyValue(props);
          return void 0;
        } else {
          for (i = 0; i < this.length; i += 1) {
            for (var prop in props) {
              this[i].style[prop] = props[prop];
            }
          }
        }
      }

      if (arguments.length === 2 && typeof props === 'string') {
        for (i = 0; i < this.length; i += 1) {
          this[i].style[props] = value;
        }
      }

      return this;
    },
    styles: function styles() {
      if (this[0]) return win.getComputedStyle(this[0], null);
      return {};
    },

    /**
     * ********************************************
     * size
     * ********************************************
     */
    width: function width() {
      if (this[0] === win) return win.innerWidth;
      return this.length > 0 ? parseFloat(this.css('width')) : null;
    },
    outerWidth: function outerWidth(includeMargins) {
      if (this.length > 0) {
        var offsetWidth = this[0].offsetWidth;

        if (includeMargins) {
          var styles = this.styles();
          return offsetWidth + parseFloat(styles.getPropertyValue('margin-right')) + parseFloat(styles.getPropertyValue('margin-left'));
        }

        return offsetWidth;
      }

      return null;
    },
    height: function height() {
      if (this[0] === win) return win.innerHeight;
      return this.length > 0 ? parseFloat(this.css('height')) : null;
    },
    outerHeight: function outerHeight(includeMargins) {
      if (this.length > 0) {
        var offsetHeight = this[0].offsetHeight;

        if (includeMargins) {
          var styles = this.styles();
          return offsetHeight + parseFloat(styles.getPropertyValue('margin-top')) + parseFloat(styles.getPropertyValue('margin-bottom'));
        }

        return offsetHeight;
      }

      return null;
    },
    offset: function offset() {
      if (this.length > 0) {
        var el = this[0];
        var box = el.getBoundingClientRect();
        var body = doc.body;
        var clientTop = el.clientTop || body.clientTop || 0;
        var clientLeft = el.clientLeft || body.clientLeft || 0;
        var scrollTop = el === win ? win.scrollY : el.scrollTop;
        var scrollLeft = el === win ? win.scrollX : el.scrollLeft;
        return {
          top: box.top + scrollTop - clientTop,
          left: box.left + scrollLeft - clientLeft
        };
      }

      return null;
    },

    /**
     * ********************************************
     * for
     * ********************************************
     */
    each: function each(fn) {
      if (!fn) return this;

      for (var i = 0; i < this.length; i++) {
        if (fn.call(this[i], i, this[i]) === false) {
          return this;
        }
      }

      return this;
    },

    /**
     * ********************************************
     * scroll
     * ********************************************
     */
    scrollTop: function scrollTop(value) {
      if (!this.length) return;
      var hasScrollTop = 'scrollTop' in this[0];
      if (value === undefined) return hasScrollTop ? this[0].scrollTop : this[0].pageYOffset;
      return this.each(hasScrollTop ? function () {
        this.scrollTop = value;
      } : function () {
        this.scrollTo(this.scrollX, value);
      });
    }
  };

  var $ = function $(selector, context) {
    return new ZxQuery(selector, context);
  };

  /**
   * Created by Capricorncd.
   * Date: 2019/04/15 13:14
   * Copyright © 2017-present, https://github.com/capricorncd
   */
  /**
   * Cursor Class
   * @param $parent
   * @constructor
   */

  function CursorClass($parent) {
    // Limit focus range
    this.$parent = $parent;
    this.selection = null;
    this.range = null;
    this.currentNode = null;
    this.timer = null;
    var $el = $parent.lastChild(); // init offset

    this.offset = $el.text().length || 0;
    if ($el[0]) this.setRange($el[0], this.offset);
  }
  /**
   * prototype
   * @type {{constructor: CursorClass, init(*=): void, setRange(*=, *=): void, getRange(): *}}
   */


  CursorClass.prototype = {
    /**
     * constructor
     */
    constructor: CursorClass,
    init: function init() {
      this.selection = window.getSelection();

      try {
        this.range = this.selection.getRangeAt(0);
      } catch (e) {
        this.range = new Range();
      }
    },

    /**
     * 设置或创建光标位置
     * @param el
     * @param offset
     */
    setRange: function setRange(el, offset) {
      var _this = this;

      if (el instanceof ZxQuery) {
        el = el[0];
      }

      if (this.selection === null) {
        this.init();
      } else {
        // remove all range object
        this.selection.removeAllRanges();
      } // 光标移动到到原来的位置加上新内容的长度


      el = el || this.currentNode;

      if (el) {
        // el: '<section>inner text.</section>'
        var targetNode = el.childNodes[el.childNodes.length - 1] || el; // check img/video/audio
        // console.log(targetNode.nodeName, this.offset)

        if (/IMG|VIDEO|AUDIO/.test(targetNode.nodeName)) {
          this.offset = 1; // get parentNode, can't set offset = 1 of IMG node.

          targetNode = targetNode.parentNode;
        } else if (typeof offset === 'undefined') {
          // get min offset, because offset cannot exceed the length of targetNode.textContent
          this.offset = Math.min($(targetNode).text().length, this.offset);
        } else {
          this.offset = offset;
        }

        this.range.setStart(targetNode, this.offset);
        this.currentNode = el;
      } // cursor start and end position is collapse


      this.range.collapse(true);

      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      } // 延时执行，键盘自动收起后再触发focus


      this.timer = setTimeout(function () {
        // 插入新的光标对象
        _this.selection.addRange(_this.range);
      }, 100);
    },

    /**
     * get cursor node in $parent
     * @param needElement Want to get element node, not ZxQuery object
     * @return {*}
     */
    getCurrentNode: function getCurrentNode(needElement) {
      // 获取选定对象
      // this.selection = window.getSelection()
      // 设置最后光标对象
      try {
        this.range = this.selection.getRangeAt(0);
      } catch (e) {
        this.range = new Range();
      }

      this.currentNode = this.range.endContainer;
      this.offset = this.range.startOffset; // Check whether currentNode is in the this.$parent

      var $currentNode = $(this.currentNode).findParentFrom(this.$parent);
      var $current = $currentNode || this.$parent.lastChild();
      return needElement ? $current[0] : $current;
    }
  };

  /**
   * Created by Capricorncd.
   * User: https://github.com/capricorncd
   * Date: 2019/04/21 22:42
   */

  var fn = function fn() {};

  var DEF_OPTS = {
    head: null,
    // className
    className: '',
    // head setup
    headHeight: 44,
    headLeftBtnClassName: '',
    headLeftBtnText: '',
    headTitle: 'Expansion Panel',
    // height
    height: 260,
    // body内容
    body: null,
    // Used to distinguish ExpansionPanel instance
    name: 'expansion-panel',
    onHeadClick: fn,
    onBodyClick: fn,
    onBeforeShow: fn,
    onShow: fn,
    onBeforeHide: fn,
    onHide: fn
    /**
     * ExpansionPanel
     * Extension panel fixed at the bottom of the editor
     * @param options
     * @param zxEditor ZxEditor instance
     * @constructor
     */

  };

  function ExpansionPanel(options, zxEditor) {
    var _this = this;

    if (!zxEditor instanceof ZxEditor) {
      throw new TypeError("new ExpansionPanel() parameter error, arguments[1] is not a ZxEditor instance.");
    } // options


    var opts = this.options = Object.assign({}, DEF_OPTS, options); // editor instance

    this.editorInstance = zxEditor;
    zxEditor.expansionPanels.push(this); // visible

    this.visible = false; // Used to distinguish ExpansionPanel instance

    this.name = opts.name;
    this.$body = $("<div class=\"body-wrapper\" style=\"height:".concat(opts.height - opts.headHeight, "px;\"></div>")); // node

    this.$el = $("<div class=\"zx-editor-expansion-panel border-top\"></div>"); // click
    // stop propagation

    zxEditor.$eventHandlers[this.name] = {
      $target: this.$el,
      type: 'click',
      handler: function handler(e) {
        e.stopPropagation();
      }
    };
    this.$el.on('click', zxEditor.$eventHandlers[this.name].handler);

    if (opts.headHeight > 0) {
      // custom head
      if (opts.head) {
        this.$head = $(opts.head);
      } else {
        // default head
        this.$head = $("<div class=\"head-wrapper border-bottom ".concat(opts.headAlign, "\" style=\"height:").concat(opts.headHeight, "px;line-height:").concat(opts.headHeight, "px;\"><div class=\"l cur ").concat(opts.headLeftBtnClassName, "\">").concat(opts.headLeftBtnText, "</div>").concat(opts.headTitle || '', "</div>")); // left btn

        var $leftBtn = this.$head.find('.l');
        zxEditor.$eventHandlers[this.name + 'HeadLeftBtn'] = {
          $target: $leftBtn,
          type: 'click',
          handler: function handler(e) {
            opts.onHeadClick.call(_this, e, 'left-button');
          }
        };
        $leftBtn.on('click', zxEditor.$eventHandlers[this.name + 'HeadLeftBtn'].handler);
        var $switch = $("<i class=\"switch\" style=\"width:".concat(opts.headHeight, "px;height:").concat(opts.headHeight, "px;\"></i>"));
        this.$head.append($switch); // switch event

        zxEditor.$eventHandlers[this.name + 'HeadSwitch'] = {
          $target: $switch,
          type: 'click',
          handler: function handler(e) {
            opts.onHeadClick.call(_this, e, 'switch');

            _this.hide();
          }
        };
        $switch.on('click', zxEditor.$eventHandlers[this.name + 'HeadSwitch'].handler);
      }

      this.$el.append(this.$head);
      this.$head.on('click', function (e) {
        opts.onHeadClick.call(_this, e);
      });
    } // body


    try {
      this.$body.append($(opts.body));
    } catch (e) {
      throw e;
    }

    this.$body.on('click', function (e) {
      opts.onBodyClick.call(_this, e);
    });
    this.$el.append(this.$body); // append to $editor

    zxEditor.$editor.append(this.$el); // init

    this.init(this.options);
  }

  ExpansionPanel.prototype = {
    /**
     * constructor
     */
    constructor: ExpansionPanel,

    /**
     * init position
     * Used to window.onresize
     * @param options
     */
    init: function init(options) {
      options = options || this.options;
      var winHeight = window.innerHeight;
      this.$el.css({
        height: "".concat(options.height, "px"),
        top: winHeight + 'px'
      });
    },

    /**
     * show
     */
    show: function show() {
      if (!this.visible) {
        this.options.onBeforeShow.call(this);
        this.$el.removeClass('out').addClass('in');
        this.visible = true;
        this.editorInstance.emit('expansionPanelShow', this, this.editorInstance);
        this.options.onShow.call(this);
      }
    },

    /**
     * hide
     */
    hide: function hide() {
      if (this.visible) {
        this.options.onBeforeHide.call(this);
        this.$el.removeClass('in').addClass('out');
        this.visible = false;
        this.editorInstance.emit('expansionPanelHide', this, this.editorInstance);
        this.options.onHide.call(this);
      }
    }
  };

  /**
   * Created by Capricorncd.
   * User: https://github.com/capricorncd
   * Date: 2019/04/29 21:08
   */
  function changeTag(tag) {
    // same tag
    if (this.$cursorNode.nodeName() === tag) return;
    var cursorNode = this.$cursorNode[0];
    var childNodes = cursorNode.childNodes;
    var len = childNodes.length; // to ul

    if (tag === 'ul') {
      var ul = doc.createElement('ul');
      cloneAttrs(ul, cursorNode);

      for (var i = 0; i < len; i++) {
        ul.appendChild(createLi(childNodes[i].cloneNode(true)));
      }

      cursorNode.parentNode.replaceChild(ul, cursorNode); // save current node

      this.$cursorNode = $(ul);
      return;
    } // change ul


    if (cursorNode.nodeName === 'UL') {
      var li, el;

      for (var _i = 0; _i < len; _i++) {
        li = childNodes[_i].cloneNode(true);
        cloneAttrs(li, cursorNode);
        el = this.changeNodeName(li, tag);
        $(el).insertBefore(this.$cursorNode);
      } // remove old ul


      this.$cursorNode.remove();
      this.$cursorNode = $(el);
      return;
    }

    this.$cursorNode.changeNodeName(tag);
    this.cursor.setRange(this.$cursorNode);
  }

  function createLi(child) {
    var li = doc.createElement('li');
    li.appendChild(child);
    return li;
  }

  function cloneAttrs(target, source) {
    var style, id, className;
    style = source.getAttribute('style');
    id = source.id;
    className = source.className;
    if (style) target.setAttribute('style', style);
    if (id) target.id = id;
    if (className) target.className = className;
  }

  /**
   * Created by Capricorncd.
   * User: https://github.com/capricorncd
   * Date: 2019/04/21 10:33
   */
  var IPHONEX_BOTTOM_OFFSET_HEIGHT = 34;

  /**
   * Created by Capricorncd.
   * User: https://github.com/capricorncd
   * Date: 2019/04/27 21:11
   */

  var DEF_COLORS = ['#333', '#d0d0d0', '#ff583d', '#fdaa25', '#44c67b', '#14b2e0', '#b065e2'];
  /**
   * create color vnode
   * @param colors
   * @return Object
   */

  function createColorVNode(colors) {
    var arr = [];
    colors.forEach(function (color, i) {
      if (/^#\w{3,6}$/.test(color)) {
        arr.push({
          tag: 'dd',
          attrs: {
            "class": i === 0 ? 'active' : '',
            'data-color': formatColorHexadecimal(color.toLowerCase())
          },
          child: [{
            tag: 'i',
            attrs: {
              style: "background:".concat(color)
            }
          }]
        });
      }
    });
    return arr;
  }

  function formatColorHexadecimal(hex) {
    var len = hex.length;
    return len === 7 ? hex : "#".concat(hex[1]).concat(hex[1]).concat(hex[2]).concat(hex[2]).concat(hex[3]).concat(hex[3]);
  }
  /**
   * text style panel
   * @param options
   * @return {{name: string, className: string, events: {type: string, handler: events.handler}}}
   */


  function styleExpansionPanel(options) {
    var _this = this;

    var zxEditor = this; // dom structure

    var panelBodyChild = [];
    var styleNode = {
      tag: 'dl',
      attrs: {
        "class": '__style-wrapper border-bottom'
      },
      child: [{
        tag: 'dd',
        attrs: {
          style: 'font-weight: 800;',
          'data-style': 'fontWeight:800'
        },
        child: ['B']
      }, {
        tag: 'dd',
        attrs: {
          style: 'font-style: italic;',
          'data-style': 'fontStyle:italic'
        },
        child: ['I']
      }, {
        tag: 'dd',
        attrs: {
          style: 'text-decoration: line-through;',
          'data-style': 'textDecoration:line-through'
        },
        child: ['abc']
      }, {
        tag: 'dd',
        attrs: {
          style: '',
          'data-style': 'textAlign:left',
          "class": 'text-align--l'
        }
      }, {
        tag: 'dd',
        attrs: {
          style: '',
          'data-style': 'textAlign:center',
          "class": 'text-align--c'
        }
      }, {
        tag: 'dd',
        attrs: {
          style: '',
          'data-style': 'textAlign:right',
          "class": 'text-align--r'
        }
      }]
    };
    panelBodyChild.push(styleNode);
    var COLORS = Array.isArray(options.textStyleColors) ? options.textStyleColors : DEF_COLORS;

    if (COLORS.length) {
      var colorsNode = {
        tag: 'dl',
        attrs: {
          "class": '__color-wrapper border-bottom'
        },
        child: createColorVNode(COLORS)
      };
      panelBodyChild.push(colorsNode);
    }

    var tagNode = {
      tag: 'dl',
      attrs: {
        "class": '__tag-wrapper'
      },
      child: [{
        tag: 'dd',
        attrs: {
          "class": '__h2',
          'data-tag': 'h2'
        },
        child: ['大标题', {
          tag: 'i'
        }]
      }, {
        tag: 'dd',
        attrs: {
          "class": '__h4',
          'data-tag': 'h4'
        },
        child: ['小标题', {
          tag: 'i'
        }]
      }, {
        tag: 'dd',
        attrs: {
          "class": '__section active',
          'data-tag': 'section'
        },
        child: ['正文', {
          tag: 'i'
        }]
      }, {
        tag: 'dd',
        attrs: {
          "class": '__blockquote',
          'data-tag': 'blockquote'
        },
        child: ['引用', {
          tag: 'i'
        }]
      }, {
        tag: 'dd',
        attrs: {
          "class": '__ul',
          'data-tag': 'ul'
        },
        child: ['无序列表', {
          tag: 'i'
        }]
      }]
    };
    panelBodyChild.push(tagNode);
    var panelBody = createVdom({
      tag: 'div',
      attrs: {
        "class": 'text-style-outer-wrapper'
      },
      child: panelBodyChild
    });
    var $panelBody = $(panelBody); // instance text style

    this.textStylePanel = new this.ExpansionPanel({
      headLeftBtnText: options.textStyleHeadLeftBtnText,
      headTitle: options.textStyleTitle,
      headAlign: options.textStyleHeadAlign,
      body: $panelBody,
      onHeadClick: handleHeadClick
    }, this); // handle events
    // style

    var $styles = $panelBody.find('.__style-wrapper').children();
    $styles.on('click', function () {
      var style = $(this).data('style').split(':');
      var key = style[0];
      var cursorNode = zxEditor.$cursorNode[0];
      cursorNode.style[key] = cursorNode.style[key] === style[1] ? '' : style[1];
      zxEditor.cursor.setRange();
    }); // color

    var $colorsParent = $panelBody.find('.__color-wrapper');
    var $colors = $colorsParent.children();
    $colors.on('click', function () {
      var $el;

      for (var i = 0; i < $colors.length; i++) {
        $el = $($colors[i]);

        if ($el[0] === this && !$el.hasClass('active')) {
          $el.addClass('active');
          zxEditor.$cursorNode.css('color', $el.data('color'));
        } else if ($el.hasClass('active')) {
          $el.removeClass('active');
        }
      }

      zxEditor.cursor.setRange();
    }); // tag

    var $tagsParent = $panelBody.find('.__tag-wrapper');
    var $tags = $tagsParent.children();
    $tags.on('click', function () {
      if ($(this).hasClass('active')) return;
      var tag = $(this).data('tag');
      var $el;

      for (var i = 0; i < $tags.length; i++) {
        $el = $($tags[i]);

        if ($el[0] === this) {
          // add active class name
          $el.addClass('active'); // change tag

          changeTag.call(zxEditor, tag);
        } else if ($el.hasClass('active')) {
          $el.removeClass('active');
        }
      }
    });

    if (this.isIPhoneX) {
      $tagsParent.css('margin-bottom', IPHONEX_BOTTOM_OFFSET_HEIGHT + 'px');
    } // extend method

    /**
     * reset active state
     * when content onClick and onKeyup code === 13
     */


    this.textStylePanel.resetActiveState = function () {
      var $cursorNode = _this.cursor.getCurrentNode(); // check tag


      var tag = $cursorNode.nodeName();
      setTagInPanel(tag); // check color

      var color = _this.rgbToHex($cursorNode.css('color'));

      setColorInPanel(color);
    };
    /**
     * set tag in panel
     * @param tag
     */


    function setTagInPanel(tag) {
      var $activeTag = $tagsParent.find('.active');

      if ($activeTag.data('tag') !== tag) {
        $activeTag.removeClass('active');
        $tagsParent.find(".__".concat(tag)).addClass('active');
      }
    }
    /**
     * set color in panel
     * @param color
     */


    function setColorInPanel(color) {
      var $activeColor = $colorsParent.find('.active');

      if ($activeColor.data('color') !== color) {
        $activeColor.removeClass('active');
        var $tmp;

        for (var i = 0; i < $colors.length; i++) {
          $tmp = $($colors[i]);

          if ($tmp.data('color') === color) {
            $tmp.addClass('active');
            break;
          }
        }
      }
    }
    /**
     * handle head click
     * @param type
     */


    function handleHeadClick(type) {
      // clear style
      if (type === 'left-button') {
        // clear style
        var currentNode = zxEditor.$cursorNode[0];
        currentNode.className = '';
        currentNode.setAttribute('style', '');

        if (currentNode.nodeName !== 'SECTION') {
          zxEditor.$cursorNode = $(zxEditor.changeNodeName(currentNode, 'section'));
        } // reset text style expansion


        setColorInPanel(COLORS[0]);
        setTagInPanel('section'); // set Range

        zxEditor.cursor.setRange(zxEditor.$cursorNode);
      }
    }

    return {
      name: 'text-style',
      className: 'text-style-btn',
      events: {
        type: 'click',
        handler: function handler() {
          _this.textStylePanel.show();
        }
      }
    };
  }

  /**
   * Created by Capricorncd.
   * User: https://github.com/capricorncd
   * Date: 2019/05/04 00:09
   */
  function textStyle() {
    this.toolbar.addButton(styleExpansionPanel.call(this, this.options));
  }

  /**
   * Created by Capricorncd.
   * User: https://github.com/capricorncd
   * Date: 2019/04/27 21:19
   */
  function selectPictureBtn() {
    var _this = this;

    var options = this.options;
    /**
     * *******************************************
     * select picture
     * image file handler
     * *******************************************
     */
    // select picture

    var $selectPictureLabel = $('<label class="toolbar-icon-pic" style="position:absolute;top:0;left:0;width:100%;height:100%;"></label>');
    var $selectPictrueInput = $('<input type="file" accept="image/*" style="display:none">');
    $selectPictureLabel.append($selectPictrueInput);
    var input = $selectPictrueInput[0]; // register selectPictureInputClick

    this.$eventHandlers['selectPictureInputClick'] = {
      $target: $selectPictrueInput,
      type: 'click',
      handler: function handler() {
        input.value = '';
      },
      capture: false // image section template

    };
    var imageSectionTemplate = /^<\w+\b.*<\/\w+>$/.test(options.imageSectionTemp) ? options.imageSectionTemp : "<section><img src=\"{url}\"></section>"; // register selectPictureInputChange

    var imageOptions = Object.assign({}, _this.options, {
      width: options.imageMaxWidth
    });
    this.$eventHandlers['selectPictureInputChange'] = {
      $target: $selectPictrueInput,
      type: 'change',
      handler: function handler(e) {
        var file = input.files[0];

        _this.emit('selectPictureInputChange', file, e, _this); // customize Picture Handler


        if (options.customPictureHandler) return; // handler picture

        _this.fileToBase64(file, imageOptions).then(function (res) {
          // console.log(res)
          var $el = $(imageSectionTemplate.replace('{url}', res.base64)); // set attribute

          $el.find('img').attr({
            id: 'zxEditor_img_' + +new Date(),
            alt: file.name
          }); // insert to $content

          _this.insertElm($el);
        })["catch"](function (e) {
          _this.emit('error', e, 'fileToBase64');
        });
      },
      capture: false
    };
    this.toolbar.addButton({
      name: 'select-picture',
      el: $selectPictureLabel
    });
  }

  var DEF_BTN_OPTS = {
    name: '',
    // button className
    className: '',
    // ElementHTML or $()
    el: null,
    // innerHTML
    innerHtml: '',
    // style
    style: '',
    // obj{type: 'click', handler: fn, capture: false} or array[obj1, obj2]
    events: null
  };

  function Toolbar(options, zxEditor) {
    // zxEditor instance
    this.editorInstance = zxEditor; // options

    this.options = options; // visible

    this.visible = options.toolbarBeenFixed; // create element

    this.height = options.toolbarHeight;
    this.$el = $("<div class=\"zx-editor-toolbar-wrapper border-top ".concat(this.visible ? 'in' : 'out', "\" style=\"height:").concat(this.height + (util.isIPhoneX ? IPHONEX_BOTTOM_OFFSET_HEIGHT : 0), "px;\"><dl class=\"inner-wrapper\" style=\"height:").concat(this.height, "px;\"></dl></div>")); // append to $editor

    zxEditor.$editor.append(this.$el); // init

    this.init(options);
  }

  Toolbar.prototype = {
    /**
     * constructor
     */
    constructor: Toolbar,

    /**
     * Used to window.onresize
     * @param options
     */
    init: function init(options) {
      options = options || this.options;
      var winHeight = win.innerHeight;
      this.$el.css({
        top: winHeight + 'px'
      });
      if (this.visible) this.editorInstance.emit('toolbarShow', this, this.editorInstance);
    },

    /**
     * show
     */
    show: function show() {
      if (!this.visible) {
        // change className
        this.$el.removeClass('out').addClass('in');
        this.visible = true;
        this.editorInstance.emit('toolbarShow', this, this.editorInstance);
      }
    },

    /**
     * hide
     */
    hide: function hide() {
      if (this.visible) {
        // change className
        this.$el.removeClass('in').addClass('out');
        this.visible = false;
        this.editorInstance.emit('toolbarHide', this, this.editorInstance);
      }
    },

    /**
     * add button
     * @param opts
     * @param index Insert index
     */
    addButton: function addButton(opts, index) {
      var _this = this;

      // params
      var params = Object.assign({}, DEF_BTN_OPTS, opts); // name

      if (!params.name) params.name = 'toolbar-btn-' + +new Date(); // create $node

      var $btn = $("<dd class=\"icon-item\" data-name=\"".concat(params.name, "\" style=\"").concat(params.style, "\"></dd>")); // handle el

      if (params.el && _typeof(params.el) === 'object') {
        $btn.append($(params.el));
      } else {
        // handle innerHtml
        $btn.html(params.innerHtml);
      } // className


      if (params.className) {
        $btn.addClass(params.className);
      } // style


      var css = {};

      if (this.options.toolbarHeight) {
        css.width = css.height = this.options.toolbarHeight + 'px';
      }

      $btn.css(css); // insert to document

      var $btns = this.$el.find('.inner-wrapper').children();

      if (typeof index === 'number' && index < $btns.length) {
        $btn.insertBefore($btns[index]);
      } else {
        this.$el.find('.inner-wrapper').append($btn);
      } // events


      if (params.events) {
        var events;

        if (util.isObject(params.events)) {
          events = [];
          events.push(params.events);
        } else if (Array.isArray(params.events)) {
          events = params.events;
        } // register events


        var eventHandlerKey;
        var $eventHandlers = this.editorInstance.$eventHandlers;
        events.forEach(function (item) {
          if (item && typeof item.type === 'string' && typeof item.handler === 'function') {
            eventHandlerKey = "toolbarBtnEvent_".concat(item.name);
            $eventHandlers[eventHandlerKey] = {
              $target: $btn,
              type: item.type,
              handler: item.handler.bind(_this.editorInstance),
              capture: typeof item.capture === 'boolean' ? item.capture : false
            };
            $btn.on(item.type, $eventHandlers[eventHandlerKey].handler, $eventHandlers[eventHandlerKey].capture);
          } else {
            throw new TypeError("Function addButton(opts), opts.events's parameter error.");
          }
        });
      }
    }
  };

  /**
   * Created by Capricorncd.
   * User: https://github.com/capricorncd
   * Date: 2019/04/15 21:49
   */
  function initDom(options) {
    var _this = this;

    // content
    this.$content = $("<div class=\"zx-editor-content-wrapper is-empty\" contenteditable=\"".concat(options.editable, "\"><section><br></section></div>"));
    this.setContentHeight(options); // editor

    this.$editor = $("<div class=\"zx-editor\"></div>"); // append to $eidtor

    this.$editor.append(this.$content); // toolbar

    this.toolbar = new Toolbar(options, this); // append to $wrapper

    this.$wrapper.append(this.$editor); // get lineHeight

    this.lineHeight = util["int"](this.$content.styles().lineHeight); // plugin
    // sort btn

    options.toolbarBtns.forEach(function (name) {
      if (name === 'select-picture') {
        _this.plugin(selectPictureBtn);
      } else if (name === 'text-style') {
        _this.plugin(textStyle);
      }
    });
  }

  /**
   * Created by Capricorncd.
   * User: https://github.com/capricorncd
   * Date: 2019/04/15 21:46
   */
  function initStyle(options) {
    /**
     * *****************************************
     * append style
     * *****************************************
     */
    // main color
    var style = ".zx-editor .m-color{color:".concat(options.mainColor, " !important;}.zx-editor .text-style-outer-wrapper .__tag-wrapper dd i {border-color:").concat(options.mainColor, " !important;}"); // line-height, caret-color

    if (options.lineHeight || options.cursorColor || options.textColor) {
      var lineHeight = options.lineHeight ? "line-height:".concat(options.lineHeight, ";") : '';
      var caretColor = options.cursorColor ? "caret-color:".concat(options.cursorColor, ";") : '';
      var textColor = options.textColor ? "color:".concat(options.textColor, ";") : '';
      style += ".zx-editor .zx-editor-content-wrapper{".concat(lineHeight + caretColor + textColor, "}");
    }

    if (options.paragraphTailSpacing) {
      style += ".zx-editor .zx-editor-content-wrapper > *{margin-bottom:".concat(options.paragraphTailSpacing, ";}");
    } // placeholder


    if (options.placeholder || options.placeholderColor) {
      var content = options.placeholder ? "content:'".concat(options.placeholder, "';") : '';
      var color = options.placeholderColor ? "color:".concat(options.placeholderColor, ";") : '';
      style += ".zx-editor .zx-editor-content-wrapper.is-empty:before{".concat(content + color, "}");
    }

    if (options.borderColor) {
      style += ".zx-editor .border-top:before, .zx-editor .border-bottom:after {border-color: ".concat(options.borderColor);
    }
    /**
     * *****************************************
     * editor $content
     * *****************************************
     */


    $('head').append("<style type=\"text/css\">".concat(style, "</style>"));
  }

  /**
   * Created by Capricorncd.
   * User: https://github.com/capricorncd
   * Date: 2019/04/15 21:52
   */
  /**
   * 获取剪切文本内容
   * @param e event
   * @return {Promise<any>}
   */

  function getPasteText(e) {
    return new Promise(function (resolve) {
      var clipboardData = e.clipboardData;
      var pasteStr = '';

      if (!clipboardData) {
        resolve('');
        return;
      }

      var items = clipboardData.items; // console.log(e)
      // console.log(clipboardData)
      // console.log(items)

      if (items && items.length > 0) {
        (function () {
          var len = items.length;
          var count = 0;
          var i, item;

          for (i = 0; i < len; i++) {
            item = items[i]; // 获取文本内容

            if (/^text\/plain/.test(item.type)) {
              item.getAsString(function (str) {
                pasteStr += str;
                counter(count, len);
              });
            } else {
              counter(count, len);
            }
          }
        })();
      } else {
        resolve('');
      }
      /**
       * 计数
       * @param count
       * @param len
       */


      function counter(count, len) {
        count++;
        if (count === len) resolve(util.strip(pasteStr));
      }
    });
  }

  /**
   * Created by Capricorncd.
   * User: https://github.com/capricorncd
   * Date: 2019/04/15 21:53
   */
  /**
   * handle events
   */

  function handleEvents() {
    var $content = this.$content;
    var $window = $(win);
    var options = this.options;
    /**
     * ****************************************************
     * window on resize
     * ****************************************************
     */

    function windowResize(e) {
      this.emit('windowResize', e, this); // toolbar

      this.toolbar.init(); // expansion panels

      this.expansionPanels.forEach(function (item) {
        item.init();
      });
    }

    this.$eventHandlers.windowResize = {
      $target: $window,
      type: 'resize',
      handler: windowResize.bind(this)
      /**
       * ****************************************************
       * content on paste
       * ****************************************************
       */

    };

    function contentPaste(e) {
      var _this = this;

      this.emit('paste', e, this);

      if (!options.customPasteHandler) {
        e.preventDefault();
        getPasteText(e).then(function (str) {
          // 添加至焦点处
          _this.insertElm(util.removeHtmlTags(str));
        });
      }
    }

    this.$eventHandlers.contentPaste = {
      $target: $content,
      type: 'paste',
      handler: contentPaste.bind(this)
      /**
       * ****************************************************
       * content on input
       * ****************************************************
       */

    };

    function contentInput(e) {
      this.emit('input', e, this); // check empty in content

      this._checkEmpty(); // check cursor node position


      this.checkPosition(); // emit content on change

      this.emit('change', e, this);
    }

    this.$eventHandlers.contentInput = {
      $target: $content,
      type: 'input',
      handler: contentInput.bind(this)
      /**
       * ****************************************************
       * content on focus
       * ****************************************************
       */

    };

    function contentFocus(e) {
      this.emit('focus', e, this); // console.error('contentFocus')
      // hide all expansionPanels
      // this.expansionPanels.forEach(ep => {
      //   ep.hide()
      // })
      // toolbar

      if (!this.options.toolbarBeenFixed) {
        this.toolbar.show();
      }
    }

    this.$eventHandlers.contentFocus = {
      $target: $content,
      type: 'focus',
      handler: contentFocus.bind(this)
      /**
       * ****************************************************
       * content on blur
       * ****************************************************
       */

    };

    function contentBlur(e) {
      this.emit('blur', e, this); // save $cursorNode

      this.$cursorNode = this.cursor.getCurrentNode();

      this._checkChildSection(); // console.warn(this.$cursorNode[0])
      // toolbar


      if (!this.options.toolbarBeenFixed) {
        this.toolbar.hide();
      }
    }

    this.$eventHandlers.contentBlur = {
      $target: $content,
      type: 'blur',
      handler: contentBlur.bind(this)
      /**
       * ****************************************************
       * content on click
       * ****************************************************
       */

    };

    function contentClick(e) {
      this.emit('click', e, this); // save $cursorNode

      this.$cursorNode = this.cursor.getCurrentNode(); // check position

      this.checkPosition(); // textStylePanel is undefined, or is hide

      if (!this.textStylePanel || !this.textStylePanel.visible) return;
      this.textStylePanel.resetActiveState();
    }

    this.$eventHandlers.contentClick = {
      $target: $content,
      type: 'click',
      handler: contentClick.bind(this)
      /**
       * ****************************************************
       * content on keydown
       * ****************************************************
       */

    };

    function contentKeydown(e) {
      this.emit('keydown', e, this);
    }

    this.$eventHandlers.contentKeyup = {
      $target: $content,
      type: 'keydown',
      handler: contentKeydown.bind(this)
      /**
       * ****************************************************
       * content on keyup
       * ****************************************************
       */

    };

    function contentKeyup(e) {
      this.emit('keyup', e, this); // handle enter keyup

      if (e.key === 'Enter' || e.keyCode === 13) {
        // check section node
        this._checkChildSection(); // content on click


        contentClick.call(this);
      } // check position
      // this.checkPosition()

    }

    this.$eventHandlers.contentKeyup = {
      $target: $content,
      type: 'keyup',
      handler: contentKeyup.bind(this)
      /**
       * ****************************************************
       * register events
       * ****************************************************
       */

    };
    var evt;

    for (var key in this.$eventHandlers) {
      evt = this.$eventHandlers[key];
      evt.$target.on(evt.type, evt.handler, evt.capture);
    }
  }

  /**
   * Create by capricorncd
   * 2018/5/30 0030.
   */

  /**
   * on
   * @param notifyName
   * @param fn
   */
  function on(notifyName, fn) {
    if (!notifyName || typeof notifyName !== 'string' || !fn || typeof fn !== 'function') return;

    if (!this.customEvents[notifyName]) {
      this.customEvents[notifyName] = [];
    }

    this.customEvents[notifyName].push(fn);
  }
  /**
   * emit
   * @param notifyName
   */


  function emit(notifyName) {
    var notifyArr = this.customEvents[notifyName];
    if (!notifyArr) return;
    var args = Array.prototype.slice.call(arguments, 1);

    for (var i = 0; i < notifyArr.length; i++) {
      try {
        notifyArr[i].apply(null, args);
      } catch (e) {
        this.emit('error', e, 'emit');
      }
    }
  }
  /**
   * off
   * @param notifyName
   */


  function off(notifyName, fn) {
    if (this.customEvents[notifyName]) {
      if (typeof fn === 'function' && this.customEvents[notifyName]) {
        var index = this.customEvents[notifyName].findIndex(function (item) {
          return item === fn;
        });
        if (index >= 0) this.customEvents[notifyName].splice(index, 1);
      } else {
        this.customEvents[notifyName] = null;
        delete this.customEvents[notifyName];
      }
    }
  }

  /**
   * Created by Capricorncd.
   * User: https://github.com/capricorncd
   * Date: 2019/04/24 21:37
   */
  function getImageInfo(base64, file, opts, callback) {
    var img = doc.createElement('img');
    img.src = base64;
    img.setAttribute('alt', file.name); // 加载图片

    img.onload = function () {
      var defaultData = {
        element: img,
        base64: base64,
        width: img.naturalWidth || img.width,
        height: img.naturalHeight || img.height,
        type: file.type,
        size: file.size,
        name: file.name,
        file: file
      };
      callback(null, opts.orientation > 1 ? rotateAndToBase64(defaultData, opts.orientation) : defaultData);
    };

    img.onerror = callback;
  }
  /**
   * Decide whether the picture is rotated or not according to 'opts.orientation' value
   * @param raw
   * @param type
   * @returns {Object}
   */

  function rotateAndToBase64(raw, orientation) {
    var canvas = doc.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var img = raw.element;
    var imgWidth = raw.width;
    var imgHeight = raw.height;
    canvas.width = imgWidth;
    canvas.height = imgHeight; // rotate image

    switch (orientation) {
      // 90deg
      case 6:
        canvas.width = imgHeight;
        canvas.height = imgWidth;
        ctx.rotate(Math.PI / 2); // (0, -imgHeight)

        ctx.drawImage(img, 0, -imgHeight, imgWidth, imgHeight);
        break;
      // 180deg

      case 3:
        ctx.rotate(Math.PI);
        ctx.drawImage(img, -imgWidth, -imgHeight, imgWidth, imgHeight);
        break;
      // -90(270)deg

      case 8:
        canvas.width = imgHeight;
        canvas.height = imgWidth;
        ctx.rotate(3 * Math.PI / 2);
        ctx.drawImage(img, -imgWidth, 0, imgWidth, imgHeight);
        break;

      default:
        ctx.drawImage(img, 0, 0, imgWidth, imgHeight);
    }

    var base64 = canvas.toDataURL(raw.type);
    img.src = base64;
    return Object.assign(raw, {
      element: canvas,
      base64: base64,
      width: canvas.width,
      height: canvas.height
    });
  }
  /**
   * 创建Canvas
   * @param el Image object or Canvas element
   * @param p clip options
   * @returns {Element}
   */


  function createCanvas(el, p) {
    var canvas = doc.createElement('canvas');
    canvas.width = p.cw;
    canvas.height = p.ch;
    var ctx = canvas.getContext('2d'); // 操作过于频繁，iPhone部分手机会获取不到ctx，is null
    // 下面代码会抛出异常

    ctx.drawImage(el, p.sx, p.sy, p.sw, p.sh, 0, 0, canvas.width, canvas.height);
    return canvas;
  }
  /**
   * 缩放比列
   * @param {Number} numerator
   * @param {Number} denominator
   */

  function ratio(numerator, denominator) {
    return parseInt(numerator / denominator * 10000) / 10000;
  }
  /**
   * Calculate the position and size of the generated image clipping
   * @param {Number} iw // image width
   * @param {Number} ih // image height
   * @param {Object} opts
   */


  function computeCropInfo(iw, ih, opts) {
    // target image width, height
    var targetWidth = util["int"](opts.width);
    var targetHeight = util["int"](opts.height); // image width or height, less than target width or height
    // don't resize

    if (!opts.forceImageResize && targetWidth > 0 && iw < targetWidth && targetHeight > 0 && ih < targetHeight) {
      return {
        sx: 0,
        sy: 0,
        sw: iw,
        sh: ih,
        scaling: 1,
        cw: iw,
        ch: ih
      };
    } // scaling


    var scaling = 1; // Pictures begin to crop in x, y coordinates

    var sx = 0;
    var sy = 0; // canvas

    var canvasWidth = iw;
    var canvasHieght = ih; // Picture Size after Equal Ratio Scaling

    var sw = 0;
    var sh = 0; // Scale to the right size, then cut in the middle

    if (targetWidth > 0 && targetHeight > 0) {
      // The size of canvas is to set the size for cutting
      canvasWidth = targetWidth;
      canvasHieght = targetHeight; // Adjust the size of the picture according to the target width: the width of the picture equals the width of the clipping frame

      sw = targetWidth;
      sh = Math.floor(targetWidth * ih / iw);
      scaling = ratio(iw, targetWidth); // Picture height beyond the clipping box, can be normal clipping

      if (sh >= targetHeight) {
        sx = 0;
        sy = util["int"]((sh - targetHeight) / 2 * scaling);
      } // To satisfy the clipping requirement, we need to resize: image height === clipping frame height
      else {
          scaling = ratio(ih, targetHeight);
          sw = Math.floor(targetHeight * iw / ih);
          sh = targetHeight;
          sx = util["int"]((sw - targetWidth) / 2 * scaling);
          sy = 0;
        }
    } // Zoom Picture Code **********************************
    // Only width is set
    else if (targetWidth > 0) {
        scaling = ratio(iw, targetWidth);
        canvasWidth = targetWidth;
        canvasHieght = Math.floor(targetWidth * ih / iw);
      } // Only height is set
      else if (targetHeight > 0) {
          scaling = ratio(ih, targetHeight);
          canvasWidth = Math.floor(targetHeight * iw / ih);
          canvasHieght = targetHeight;
        }

    return {
      sx: sx,
      sy: sy,
      sw: util["int"](canvasWidth * scaling),
      sh: util["int"](canvasHieght * scaling),
      scaling: scaling,
      cw: canvasWidth,
      ch: canvasHieght
    };
  }

  /**
   * Created by Capricorncd.
   * User: https://github.com/capricorncd
   * Date: 2019/04/24 21:13
   */
  var DEF_OPTIONS = {
    width: 0,
    heigth: 0,
    imageMaxSize: null,
    ignoreGif: true,
    forceResize: false
    /**
     * base64 data to Blob
     * @param base64Data
     * @return {Blob}
     */

  };

  function base64ToBlobData(base64Data) {
    // base64数据格式:
    // "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAkGB+wgHBgkIBwgKCgkLDRYPDQw//9k="
    var type, onlyData;

    if (/^data:(\w+\/\w+);base64,(.+)/.test(base64Data)) {
      type = RegExp.$1;
      onlyData = RegExp.$2;
    } else {
      throw new TypeError("base64ToBlobData(base64Data), base64Data non-base64 data!");
    }

    var data = win.atob(onlyData);
    var ia = new Uint8Array(data.length);

    for (var i = 0; i < data.length; i++) {
      ia[i] = data.charCodeAt(i);
    }

    return new Blob([ia], {
      type: type
    });
  }
  /**
   * file to base64 data
   * @param file
   * @param opts
   * @return {Promise<any>}
   */


  function fileToBase64(file, opts) {
    return new Promise(function (resolve, reject) {
      if (!file || !file instanceof File) {
        throw new TypeError("file is not a File object");
      }

      var options = Object.assign({}, DEF_OPTIONS, opts); // check file type

      if (!/image\/.*/i.test(file.type)) {
        reject(new TypeError("\"".concat(file.name, "\" is not Image File!")));
        return;
      } // rotate image


      if (typeof win.EXIF === 'undefined') {
        options.orientation = 0;
        handleFile(file, options).then(resolve)["catch"](reject);
      } else {
        win.EXIF.getData(file, function () {
          var info = win.EXIF.getAllTags(this) || {}; // Shooting direction

          options.orientation = info.Orientation;
          handleFile(file, options).then(resolve)["catch"](reject);
        });
      }
    });
  }
  /**
   * to blob url
   * @param blob Blob数据
   * @returns {*}
   */


  function blobToUrl(blob) {
    return win.URL.createObjectURL(blob);
  }

  function handleFile(file, opts) {
    return new Promise(function (resolve, reject) {
      var reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = function () {
        // get image info
        getImageInfo(this.result, file, opts, function (e, raw) {
          if (e) {
            reject(e);
            return;
          } // check gif


          if (file.type === 'image/gif' && opts.ignoreGif) {
            raw.data = file;
            raw.url = blobToUrl(file);
            raw.raw = raw;
            resolve(raw);
            return;
          }

          var result = handleImageData(raw, opts); // check file size

          if (opts.imageMaxSize > 0 && result.size / 1024 > opts.imageMaxSize) {
            reject(new RangeError("File size \"".concat(result.size / 1024, "\" out of range, limit is ").concat(opts.imageMaxSize, "Kib")));
            return;
          }

          resolve(result);
        });
      };

      reader.onerror = reject;
    });
  }
  /**
   * Processing picture data, clipping and compression
   * @param raw
   * @param opts
   * @private
   */


  function handleImageData(raw, opts) {
    // file type
    var dataType = raw.type || raw.file.type; // Calculate the position and size of zooming or clipping pictures

    var res = computeCropInfo(raw.width, raw.height, opts); // image or canvas

    var el = raw.element;
    var scaling = 2;
    var sw = res.sw;
    var sh = res.sh;
    var sx = res.sx;
    var sy = res.sy;

    if (res.scaling > scaling) {
      scaling = res.scaling;

      while (scaling > 2) {
        el = createCanvas(el, {
          cw: res.cw * scaling,
          ch: res.ch * scaling,
          sx: sx,
          sy: sy,
          sw: sw,
          sh: sh
        });
        sw = el.width;
        sh = el.height;
        sx = sy = 0;
        scaling -= 1;
      }
    }

    el = createCanvas(el, {
      cw: res.cw,
      ch: res.ch,
      sx: sx,
      sy: sy,
      sw: sw,
      sh: sh
    });
    var base64 = el.toDataURL(dataType);
    var blob = base64ToBlobData(base64);
    return {
      element: el,
      type: dataType,
      width: res.cw,
      height: res.ch,
      data: blob,
      base64: base64,
      size: blob.size,
      url: blobToUrl(blob),
      // 原始图片数据
      raw: raw
    };
  }

  /**
   * Created by Capricorncd.
   * User: https://github.com/capricorncd
   * Date: 2019/04/16 20:28
   */
  function extendPrototypes(ZxEditor) {
    // custom events
    ZxEditor.prototype.on = on;
    ZxEditor.prototype.emit = emit;
    ZxEditor.prototype.off = off; // static method

    ZxEditor.prototype.getPasteText = getPasteText; // static utils

    for (var key in util) {
      if (util.hasOwnProperty(key)) {
        ZxEditor.prototype[key] = util[key];
      }
    }

    ZxEditor.prototype.blobToUrl = blobToUrl;
    ZxEditor.prototype.base64ToBlobData = base64ToBlobData;
    ZxEditor.prototype.fileToBase64 = fileToBase64; // dom

    ZxEditor.prototype.createElement = createElement;
    ZxEditor.prototype.createVdom = createVdom;
  }

  /**
   * Created by Capricorncd.
   * Date: 2019/04/12 11:12
   * Copyright © 2017-present, https://github.com/capricorncd
   */
  var DEF_OPTIONS$1 = {
    // 内容是否可以被编辑
    editable: true,
    // 编辑器输入内容绝对定位
    fixed: false,
    // editor min height
    // minHeight: window.innerHeight,
    // style
    placeholder: 'Enter...',
    placeholderColor: '',
    lineHeight: 1.5,
    // paragraph tail spacing, default 10px
    paragraphTailSpacing: '',
    cursorColor: '',
    textColor: '',
    // iphone会自动移动，难控制
    cursorOffsetTop: 30,
    // 自定义粘贴处理
    customPasteHandler: false,

    /**
     * ******************************
     * toolbar options
     * ******************************
     */
    // Has the toolbar been fixed?
    toolbarBeenFixed: true,
    toolbarHeight: 50,
    // buttons name, and order
    toolbarBtns: ['select-picture', 'text-style'],

    /**
     * ******************************
     * image options
     * ******************************
     */
    // customize Picture Handler
    customPictureHandler: false,
    // image max width
    imageMaxWidth: 720,
    // image max size, unit Kib, default 20M
    imageMaxSize: 20480,
    // template
    imageSectionTemp: "<section class=\"child-is-picture\"><img src=\"{url}\"></section>",
    // GIF pictures are not processed
    ignoreGif: true,
    // Force the width/height of the picture, even if the width/height of the picture
    // is smaller than the target width/height
    forceImageResize: false,

    /**
     * ******************************
     * text style options
     * ******************************
     */
    // text style, value ['#333', '#f00', ...]
    textStyleColors: null,
    textStyleTitle: 'Set Style',
    textStyleHeadLeftBtnText: 'Clear style',
    textStyleHeadAlign: 'center',

    /**
     * ******************************
     * color options
     * ******************************
     */
    mainColor: '',
    // border color
    borderColor: ''
  };

  function ZxEditor(selector, _options) {
    if (!this instanceof ZxEditor) {
      throw new Error('ZxEditor is a constructor and should be called with the `new` keyword');
    }
    /**
     * ***************************************************
     * check selector
     * ***************************************************
     */


    this.$wrapper = $(selector);

    if (!this.$wrapper[0]) {
      throw new Error("Can't found '".concat(selector, "' Node in document!"));
    } // version


    this.version = '3.0.2'; // ZxQuery instance

    this.$ = $;
    this.ExpansionPanel = ExpansionPanel; // options

    this.options = Object.assign(DEF_OPTIONS$1, _options);
    this.init(this.options);
  }

  ZxEditor.prototype = {
    constructor: ZxEditor,
    init: function init(options) {
      options = options || this.options;
      /**
       * ***************************************************
       * event listeners
       * or expansionPanel instance
       * ***************************************************
       */
      // $().on, $().off, $().trigger

      this.$eventHandlers = {}; // this.on, this.off, this.emit

      this.customEvents = {}; // extend prototype

      extendPrototypes(ZxEditor); // expansionPanel instances

      this.expansionPanels = [];
      /**
       * ***************************************************
       * create dom
       * ***************************************************
       */

      initDom.call(this, options);
      /**
       * ***************************************************
       * style and placeholder
       * ***************************************************
       */

      initStyle.call(this, options);
      /**
       * ***************************************************
       * cursor
       * ***************************************************
       */

      this.cursor = new CursorClass(this.$content);
      this.$cursorNode = this.cursor.getCurrentNode();
      /**
       * ***************************************************
       * event: last
       * ***************************************************
       */

      handleEvents.call(this);
    },

    /**
     * 插入元素或字符串
     * @param el
     */
    insertElm: function insertElm(el) {
      // string
      if (!el) return; // 光标元素及偏移量

      var $cursorNode = this.$cursorNode;
      var newRangeEl, newRangeOffset;
      /**
       * string
       */

      if (typeof el === 'string') {
        // 光标所在元素内容为空
        if ($cursorNode.isEmpty()) {
          $cursorNode.text(el);
          newRangeEl = $cursorNode;
          newRangeOffset = el.length;
        } else if ($cursorNode.children().every(function ($item) {
          return $item.isTextNode();
        })) {
          var rangeOffset = this.cursor.offset;
          var rangeNodeStr = $cursorNode.text();
          var tmpStr = rangeNodeStr.substr(0, rangeOffset) + el + rangeNodeStr.substr(rangeOffset); // $section = $cursorNode.closest('section')

          $cursorNode.text(tmpStr);
          newRangeEl = $cursorNode;
          newRangeOffset = el.length + rangeOffset;
        } else {
          // 创建一个section
          var $newEl = $("<section>".concat(el, "</section>")); // 插入到childIndex后

          $newEl.insertAfter($cursorNode);
          newRangeEl = $newEl;
          newRangeOffset = el.length;
        }
      }
      /**
       * 插入元素为：非文本
       */
      else {
          var $el = $(el);
          var $elm;

          for (var i = 0; i < $el.length; i++) {
            $elm = $($el[i]);
            var nodeName = $elm.nodeName(); // SECTION

            if (nodeName !== 'section') {
              if ($elm.nodeType() === 1 && !/video|img|audio/.test(nodeName)) {
                $elm.changeNodeName('section');
              } else {
                var $tmp = $("<section></section>");
                $elm = $tmp.append($elm);
              }
            }

            if ($cursorNode.isEmpty()) {
              // siblings is empty
              if ($cursorNode.next()[0] && $cursorNode.next().isEmpty()) {
                $cursorNode.replace($elm);
              } else {
                $elm.insertBefore($cursorNode);
              }
            } else {
              $elm.insertAfter($cursorNode);
            } // 判断$el是否有下一个节点，有：光标指向el结束，无：则插入空行，并移动光标


            var next = $elm.next()[0];

            if (next) {
              newRangeEl = $elm;
              newRangeOffset = $elm.isTextNode() ? $elm.text().length : 0;
            } else {
              var $section = $("<section><br></section>");
              this.$content.append($section);
              newRangeEl = $section;
              newRangeOffset = 0;
            }
          }
        }

      this._checkChildSection();

      this.$content.trigger('input');
      console.log(newRangeEl, newRangeOffset);
      this.cursor.setRange(newRangeEl, newRangeOffset);
    },

    /**
     * 插入空行
     */
    insertBlankLine: function insertBlankLine() {
      var $el = $("<section><br></section>");
      this.insertElm($el);
      this.cursor.setRange($el, 0);
    },

    /**
     * 检查内容是否为空
     * @private
     */
    _checkEmpty: function _checkEmpty() {
      var $el = this.$content;

      if ($el.isEmpty()) {
        $el.addClass('is-empty');
      } else if ($el.hasClass('is-empty')) {
        $el.removeClass('is-empty');
      }
    },

    /**
     * 检查一级子元素，nodeName是否为(SECTION|H1|H2|H3|H4|BLOCKQUOTE|UL)
     * 否：则替换为section标签，或者放入section标签内
     * @private
     */
    _checkChildSection: function _checkChildSection() {
      if (!this.$cursorNode) this.$cursorNode = this.cursor.getCurrentNode();
      var cursorNode = this.$cursorNode[0];
      var isCursorNode = false;
      var parent = this.$content[0];
      var childNodes = parent.childNodes;
      var el;

      for (var i = 0; i < childNodes.length; i++) {
        el = childNodes[i];

        if (el.nodeType === 1) {
          if (!/SECTION|H1|H2|H3|H4|BLOCKQUOTE|UL/.test(el.nodeName)) {
            isCursorNode = el === cursorNode;
            el = util.changeNodeName(el, 'section');

            if (isCursorNode) {
              this.$cursorNode = $(el);
              this.cursor.setRange(el);
            }
          }
        } else {
          var $tmp = $("<section></section>");
          $tmp.append(el.cloneNode());
          parent.replaceChild($tmp[0], el);
          this.$cursorNode = $tmp;
          this.cursor.setRange($tmp);
        }
      }
    },

    /**
     * 清空内容
     */
    remove: function remove() {
      this.setHtml();
    },

    /**
     * 设置编辑器内容
     * @param html
     */
    setHtml: function setHtml(html) {
      this.$content.html(html || '<section><br></section>');

      this._checkChildSection();

      this.cursor.setRange(this.$content.firstChild(), 0);
      this.$content.trigger('input');
    },

    /**
     * 获取编辑器html内容
     * 返回html内容
     * @return {*}
     */
    getHtml: function getHtml() {
      return this.$content.html();
    },

    /**
     * 获取编辑器文本内容，
     * 以纯文本形式返回数据
     * @return {*|string}
     */
    getText: function getText() {
      return this.$content.text();
    },

    /**
     * destroy event and Node
     */
    destroy: function destroy() {
      var evt; // remove $events

      for (var key in this.$eventHandlers) {
        evt = this.$eventHandlers[key];
        evt.$target.off(evt.type, evt.handler, evt.capture);
        delete this.$eventHandlers[key];
      } // remove customEvents


      for (var _key in this.customEvents) {
        evt = this.customEvents[_key];
        this.off(_key);
      } // other object


      this.cursor = null;
      this.toolbar = null;
      this.textStylePanel = null; // other ExpansionPanel

      for (var _key2 in this) {
        if (this[_key2] instanceof ExpansionPanel) {
          this[_key2] = null;
        }
      } // Node


      this.$editor.remove();
    },

    /**
     * set content height
     * default minHeight is window innerHeight, marginBottom
     * @param data
     */
    setContentHeight: function setContentHeight(data) {
      var winHeight = window.innerHeight;
      var styles = {
        // 防止正文内容被键盘挡住，无法查看
        marginBottom: winHeight + 'px' // check height

      };

      if (data.height) {
        styles.height = typeof data.height === 'number' ? data.height + 'px' : data.height;
      } else {
        styles.minHeight = (util["int"](data.minHeight) || winHeight) + 'px';
      }

      this.$content.css(styles);
    },

    /**
     * get base64 images from this.$content
     * @returns {Array}
     */
    getBase64Images: function getBase64Images() {
      var arr = [];
      var $imgs = this.$content.find('img');
      var img, base64;

      for (var i = 0; i < $imgs.length; i++) {
        img = $imgs[i];
        base64 = img.src;

        if (/^data:.+?;base64,/.test(base64)) {
          arr.push({
            id: img.id,
            base64: base64,
            blob: base64ToBlobData(base64)
          });
        }
      }

      return arr;
    },

    /**
     * 设置指定id图片src
     * @param id
     * @param src
     * @returns {boolean}
     */
    setImageSrc: function setImageSrc(id, src) {
      var img = this.$content.find('#' + id)[0];

      if (img) {
        img.src = src;
        img.removeAttribute('id');
        return true;
      }

      return false;
    },

    /**
     * plugin
     * @param fn
     */
    plugin: function plugin(fn) {
      if (typeof fn === 'function') {
        fn.call(this);
      }
    },

    /**
     * check cursor position
     */
    checkPosition: function checkPosition() {
      var $el = this.$cursorNode = this.cursor.getCurrentNode(); // 当前光标位置

      var cursorOffset = this.cursor.offset; // 文本内容长度

      var len = $el.text().length; // 当前元素高度

      var height = $el.height(); // 当前元素top

      var top = $el.offset().top;
      var scrollTop; // 当前光标位置，距当前元素顶部距离

      var cursorHeight = 0; // 每行大概有几个字

      var textNumOfPerLine = len / (height / this.lineHeight); // 当前光标所在行

      var line = height > this.lineHeight ? Math.floor(cursorOffset / textNumOfPerLine) : 1; // 当前光标位置，至当前元素顶部高度 - 1行高，防止移动后，光标位置太贴近顶部

      var cursorHeightInCurrentNode = (line - 1) * this.lineHeight; // editor postion: fixed;

      if (this.options.fixed) ; else {
        // 当前光标位置超过了屏幕的4分之1
        if (cursorHeightInCurrentNode > window.innerHeight / 4) {
          cursorHeight = cursorHeightInCurrentNode;
        }

        scrollTop = $(window).scrollTop();
        $(window).scrollTop(scrollTop + top + cursorHeight - this.options.cursorOffsetTop);
      }
    }
  };

  return ZxEditor;

}));
