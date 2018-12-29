/*!
 * zx-editor v2.5.1
 * https://github.com/capricorncd/zx-editor
 * Copyright © 2017-present, capricorncd
 * Released under the MIT License
 * Released on: 2018-12-29 23:15:57
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.ZxEditor = {}));
}(this, function (exports) { 'use strict';

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

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  if (typeof Object.assign !== 'function') {
    // Must be writable: true, enumerable: false, configurable: true
    Object.defineProperty(Object, 'assign', {
      value: function assign(target, varArgs) {
        // .length of function is 2
        if (!target) {
          // TypeError if undefined or null
          throw new TypeError('Cannot convert undefined or null to object');
        }

        var to = Object(target);

        for (var index = 1; index < arguments.length; index++) {
          var nextSource = arguments[index];

          if (nextSource) {
            // Skip over if undefined or null
            for (var nextKey in nextSource) {
              // Avoid bugs when hasOwnProperty is shadowed
              if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                to[nextKey] = nextSource[nextKey];
              }
            }
          }
        }

        return to;
      },
      writable: true,
      configurable: true
    });
  } // Production steps of ECMA-262, Edition 5, 15.4.4.14
  // Reference: http://es5.github.io/#x15.4.4.14


  if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (searchElement, fromIndex) {
      var k; // 1. Let O be the result of calling ToObject passing
      //    the this value as the argument.

      if (!this) {
        throw new TypeError('"this" is null or not defined');
      }

      var O = Object(this); // 2. Let lenValue be the result of calling the Get
      //    internal method of O with the argument "length".
      // 3. Let len be ToUint32(lenValue).

      var len = O.length >>> 0; // 4. If len is 0, return -1.

      if (len === 0) {
        return -1;
      } // 5. If argument fromIndex was passed let n be
      //    ToInteger(fromIndex); else let n be 0.


      var n = +fromIndex || 0;

      if (Math.abs(n) === Infinity) {
        n = 0;
      } // 6. If n >= len, return -1.


      if (n >= len) {
        return -1;
      } // 7. If n >= 0, then Let k be n.
      // 8. Else, n<0, Let k be len - abs(n).
      //    If k is less than 0, then let k be 0.


      k = Math.max(n >= 0 ? n : len - Math.abs(n), 0); // 9. Repeat, while k < len

      while (k < len) {
        // a. Let Pk be ToString(k).
        //   This is implicit for LHS operands of the in operator
        // b. Let kPresent be the result of calling the
        //    HasProperty internal method of O with argument Pk.
        //   This step can be combined with c
        // c. If kPresent is true, then
        //    i.  Let elementK be the result of calling the Get
        //        internal method of O with the argument ToString(k).
        //   ii.  Let same be the result of applying the
        //        Strict Equality Comparison Algorithm to
        //        searchElement and elementK.
        //  iii.  If same is true, return k.
        if (k in O && O[k] === searchElement) {
          return k;
        }

        k++;
      }

      return -1;
    };
  } // Production steps of ECMA-262, Edition 5, 15.4.4.18
  // Reference: http://es5.github.io/#x15.4.4.18


  if (!Array.prototype.forEach) {
    Array.prototype.forEach = function (callback, thisArg) {
      var T, k;

      if (!this) {
        throw new TypeError(' this is null or not defined');
      } // 1. Let O be the result of calling toObject() passing the
      // |this| value as the argument.


      var O = Object(this); // 2. Let lenValue be the result of calling the Get() internal
      // method of O with the argument "length".
      // 3. Let len be toUint32(lenValue).

      var len = O.length >>> 0; // 4. If isCallable(callback) is false, throw a TypeError exception.
      // See: http://es5.github.com/#x9.11

      if (typeof callback !== "function") {
        throw new TypeError(callback + ' is not a function');
      } // 5. If thisArg was supplied, let T be thisArg; else let
      // T be undefined.


      if (arguments.length > 1) {
        T = thisArg;
      } // 6. Let k be 0


      k = 0; // 7. Repeat, while k < len

      while (k < len) {
        var kValue = void 0; // a. Let Pk be ToString(k).
        //    This is implicit for LHS operands of the in operator
        // b. Let kPresent be the result of calling the HasProperty
        //    internal method of O with argument Pk.
        //    This step can be combined with c
        // c. If kPresent is true, then

        if (k in O) {
          // i. Let kValue be the result of calling the Get internal
          // method of O with argument Pk.
          kValue = O[k]; // ii. Call the Call internal method of callback with T as
          // the this value and argument list containing kValue, k, and O.

          callback.call(T, kValue, k, O);
        } // d. Increase k by 1.


        k++;
      } // 8. return undefined

    };
  }

  if (!Array.isArray) {
    Array.isArray = function (arg) {
      return Object.prototype.toString.call(arg) === '[object Array]';
    };
  }

  /**
   * Create by capricorncd
   * 2018/1/24 0024.
   * https://github.com/capricorncd
   */
  // 十六进制
  var util = {
    /**
     * Exception 通知
     * @param msg
     */
    err: function err(msg) {
      throw new Error(msg);
    },

    /**
     * 获取文件后缀名
     * @param fileName
     * @returns {*}
     */
    getSuffix: function getSuffix(fileName) {
      return fileName ? fileName.toString().split('.').pop().toLowerCase() : null;
    },

    /**
     * 转换为整数
     * @param n
     * @returns {*}
     */
    int: function int(n) {
      var num = parseInt(n);
      return isNaN(num) ? 0 : num;
    },

    /**
     * 去除字符串首尾空格
     * @param str
     * @returns {string}
     */
    trim: function trim(str) {
      return str ? str.toString().replace(/^\s+|\s+$/g, '') : '';
    },

    /**
     * 十进制转十六进制
     * @param num
     * @returns {string}
     */
    toHex: function toHex(num) {
      var n = typeof num === 'number' ? num : this.int(num);
      var hex = n.toString(16);
      return hex[1] ? hex : '0' + hex;
    },

    /**
     * 字符串'font-size'转换为驼峰
     * @param str
     * @returns {string}
     */
    strToHump: function strToHump(str) {
      return str ? str.toString().replace(/-(\w)/g, function (group, item) {
        return item.toUpperCase();
      }) : '';
    },

    /**
     * rgb(68, 198, 123)转16进制字符串
     * @param rgb
     * @returns {string}
     */
    rgbToHex: function rgbToHex(rgb) {
      var hex = '';

      if (/rgb.*?\((\d+)\D+?(\d+)\D+?(\d+)/.test(rgb)) {
        hex += this.toHex(RegExp.$1);
        hex += this.toHex(RegExp.$2);
        hex += this.toHex(RegExp.$3);
      }

      return hex ? '#' + hex : rgb;
    },

    /**
     * 是否为空
     * @param str
     * @returns {boolean}
     */
    isEmpty: function isEmpty(str) {
      return !str || /^\s*$/.test(str.toString());
    },

    /**
     * 是否为http(s)链接
     * @param url
     * @returns {*|boolean}
     */
    isHttpUrl: function isHttpUrl(url) {
      return url && /^(http|https):\/\//i.test(url.toString());
    },

    /**
     * 将伪数组，转换为数组
     * @param pseudoArray 伪数组
     * @returns {*}
     */
    slice: function slice(pseudoArray) {
      var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      if (pseudoArray.length && pseudoArray[0]) {
        return Array.prototype.slice.call(pseudoArray, index);
      }

      return [];
    },

    /**
     * 带时间戳的随机字符串
     * @param prefix 前缀
     * @returns {string}
     * @private
     */
    randStr: function randStr() {
      var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'zxEditor_';
      return prefix + +new Date();
    },

    /**
     * 判断o是否为对象{}
     * @param o
     * @returns {*|boolean}
     */
    isObject: function isObject(o) {
      return o && _typeof(o) === 'object' && !Array.isArray(o);
    },

    /**
     * 空函数
     */
    fn: function fn() {}
  };

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
  var doc = (typeof document === 'undefined') ? {
    body: {},
    addEventListener: function addEventListener() {},
    removeEventListener: function removeEventListener() {},
    activeElement: {
      blur: function blur() {},
      nodeName: '',
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
        initEvent: function initEvent() {},
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
        },
      };
    },
    location: { hash: '' },
  } : document; // eslint-disable-line

  var win = (typeof window === 'undefined') ? {
    document: doc,
    navigator: {
      userAgent: '',
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
        },
      };
    },
    Image: function Image() {},
    Date: function Date() {},
    screen: {},
    setTimeout: function setTimeout() {},
    clearTimeout: function clearTimeout() {},
  } : window; // eslint-disable-line

  /**
   * Create by capricorncd
   * 2018/1/23 0023.
   * https://github.com/capricorncd
   */
  var d = doc;
  var dom = {
    /**
     * 添加样式
     * @param className 样式名
     * @param $el 元素节点
     */
    addClass: function addClass(className, $el) {
      if ($el.classList) {
        $el.classList.add(className);
      } else {
        $el.className += ' ' + className;
      }
    },
    removeClass: function removeClass(className, $el) {
      if (!className || !$el) return;

      if ($el.classList) {
        $el.classList.remove(className);
        return;
      }

      var classArray = dom.getClass($el, true);
      if (classArray.length === 0) return;

      for (var i = 0; i < classArray.length; i++) {
        if (className === classArray[i]) {
          classArray.splice(i, 1);
        }
      }

      $el.className = classArray.join(' ');
    },
    hasClass: function hasClass(className, $el) {
      if ($el.classList) {
        return $el.classList.contains(className);
      }

      var clses = dom.getClass($el, true);
      return clses.indexOf(className) > -1;
    },

    /**
     * 获取class
     * @param $el dom元素
     * @param needArray 是否返回数组格式
     * @returns {*|Array}
     */
    getClass: function getClass($el, needArray) {
      if (!$el) return;
      var className = util.trim($el.className);
      return needArray ? className ? className.split(' ') : [] : className;
    },

    /**
     * 事件绑定
     * @param $el
     * @param eventName 事件名称
     * @param handler 事件处理函数
     * @param useCapture 是否在冒泡阶段
     */
    addEvent: function addEvent($el, eventName, handler) {
      var useCapture = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      if (!$el || !eventName || !handler) return;

      if ($el.length) {
        for (var i = 0; i < $el.length; i++) {
          addEventListener($el[i], eventName, handler, useCapture);
        }
      } else {
        addEventListener($el, eventName, handler, useCapture);
      }
    },
    removeEvent: function removeEvent($el, eventName, handler) {
      var useCapture = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      if (!$el || !eventName || !handler) return;

      if ($el.length) {
        for (var i = 0; i < $el.length; i++) {
          removeEventListener($el[i], eventName, handler, useCapture);
        }
      } else {
        removeEventListener($el, eventName, handler, useCapture);
      }
    },

    /**
     * 创建DOM元素
     * @param tag 标签名称
     * @param opts 标签属性
     * @returns {Element}
     */
    createElm: function createElm() {
      var tag = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'div';
      var opts = arguments.length > 1 ? arguments[1] : undefined;
      var $el = d.createElement(tag);

      if (opts && opts instanceof Object) {
        for (var key in opts) {
          if (opts.hasOwnProperty(key)) {
            $el.setAttribute(key, opts[key]);
          }
        }
      }

      return $el;
    },

    /**
     * 创建Vdom
     * @param vnode
     * @returns {*}
     */
    createVdom: function createVdom(vnode) {
      if (!vnode) return null;

      if (typeof vnode === 'string') {
        return d.createTextNode(vnode);
      }

      var tag = vnode.tag;
      var attrs = vnode.attrs;
      var child = vnode.child;
      if (!tag && !attrs && !child) return null; // 创建dom

      var $el = dom.createElm(tag || 'div', attrs);

      if (Array.isArray(child) && child.length) {
        var $itemNode;
        child.forEach(function (item) {
          $itemNode = dom.createVdom(item);
          if ($itemNode) $el.appendChild($itemNode);
        });
      } else if (child && typeof child === 'string') {
        $el.appendChild(d.createTextNode(child));
      }

      return $el;
    },

    /**
     * 设置已有DOM节点的标签（实际是改变DOM节点标签）
     * @param $el DOM节点对象
     * @param newTagName 新标签名称
     * @returns {Element}
     */
    changeTagName: function changeTagName($el, newTagName) {
      if (!newTagName || $el.nodeName === newTagName.toUpperCase()) return $el; // 新的dom对象

      var $new = dom.createElm(newTagName); // 获取旧标签名

      var oldTagName = $el.nodeName.toLowerCase(); // 获取旧元素class/id/style属性，并赋予新DOM对象

      var className = $el.className;
      var id = $el.id; // 是否有自定义style样式

      var style = $el.getAttribute('style');
      var inner = '';

      if (oldTagName === 'ul') {
        var $ulChildren = util.slice($el.children);
        $ulChildren.forEach(function ($item) {
          inner += $item.innerHTML;
        });
      } else if (oldTagName === 'blockquote') {
        inner = $el.innerText;
      } else {
        inner = $el.innerHTML;
      } // blockquote


      if (newTagName === 'blockquote') {
        inner = "<p style=\"color: inherit\">".concat(inner, "</p>");
      } else if (newTagName === 'ul') {
        inner = "<li style=\"color: inherit\">".concat(inner, "</li>");
      }

      if (className) $new.className = className;
      if (id) $new.id = id;
      if (style) $new.setAttribute('style', style);
      $new.innerHTML = inner;
      $el = null;
      return $new;
    },

    /**
     * 获取满足selector条件$el的最近的父级元素
     * @param selector
     * @param $el
     * @returns {*}
     */
    closest: function closest(selector, $el) {
      var matchesSelector = $el.matches || $el.webkitMatchesSelector || $el.mozMatchesSelector || $el.msMatchesSelector;

      while ($el) {
        if (matchesSelector.call($el, selector)) {
          break;
        } // console.log($el)


        $el = $el.parentNode;
      }

      return $el;
    },

    /**
     * 判断元素innerText是否为空
     * 如果元素内存在hr分割线，则不为空
     * @param $el
     * @param checkBr 是否忽略<br>标签
     * @returns {boolean}
     */
    isEmptyInner: function isEmptyInner($el, checkBr) {
      if (!$el) util.err("Function 'isEmptyInner($el)', $el is ".concat($el));
      var $childs = $el.children;
      return util.isEmpty($el.innerText) && ($childs.length === 0 || $childs[0].nodeType !== 1 || $childs[0].nodeName === 'BR');
    },

    /**
     * $el是否为HTML元素节点
     * @param $el
     * @returns {*|boolean}
     */
    isHTMLElement: function isHTMLElement($el) {
      return $el && $el instanceof HTMLElement;
    },
    isWindow: function isWindow(obj) {
      return obj != null && obj === obj.window;
    },

    /**
     * dom节点选择器
     * @param selector 元素id、class、属性等
     * @param context 作用域，默认为documet
     * @returns {*}
     */
    query: function query(selector) {
      var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : d;

      if (typeof d.querySelector === 'function') {
        return context.querySelector(selector);
      }

      var result = dom.queryAll(selector, context);
      return result.length > 0 ? result[0] : null;
    },
    queryAll: function queryAll(selector) {
      var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : d;

      if (typeof d.querySelectorAll === 'function') {
        return util.slice(context.querySelectorAll(selector));
      } // 查询结果


      var result = []; // 被查找到的元素

      var $item; // id选择器

      if (/^#\w+$/.test(selector)) {
        $item = context.getElementById(selector);

        if ($item) {
          result.push($item);
        }
      } // className, tag
      else {
          var nodes = context.getElementsByTagName('*');
          var len = nodes.length; // className

          if (/^\.(\w+)$/.test(selector)) {
            var word = RegExp.$1;

            for (var i = 0; i < len; i++) {
              $item = nodes[i];

              if ($item.nodeType === 1 && xmq.hasClass(word, $item)) {
                result.push($item);
              }
            }
          } // tag
          else {
              var tag = selector.toUpperCase();

              for (var j = 0; j < len; j++) {
                $item = nodes[j];

                if ($item.nodeName === tag) {
                  result.push($item);
                }
              }
            }
        }

      return result;
    },

    /**
     * 获取$el的css样式
     * @param $el
     * @param prop 指定属性
     * @returns {*}
     */
    getStyle: function getStyle($el, prop) {
      if (!dom.isHTMLElement($el)) return null;
      var style = win.getComputedStyle($el, null);
      var result = null;

      if (prop) {
        try {
          result = style[util.strToHump(prop)];
        } catch (e) {}
      } else {
        result = style;
      }

      return result;
    },

    /**
     * 获取最大z-index
     * @returns {Number}
     */
    maxZIndex: function maxZIndex() {
      var $els = d.getElementsByTagName('*');
      var $el, css, zindex;
      var arr = [];

      for (var i = 0; i < $els.length; i++) {
        $el = $els[i];
        if ($el.nodeType !== 1) continue;
        css = dom.getStyle($el) || {};

        if (css.position !== 'static') {
          zindex = util.int(css.zIndex);
          if (zindex > 0) arr.push(zindex);
        }
      }

      return util.int(Math.max.apply(null, arr));
    },

    /**
     * 在当前元素节点el后插入新节点newNode
     * @param el 当前元素节点
     * @param newNode 要插入的新元素节点
     */
    insertAfter: function insertAfter(el, newNode) {
      var nextNode = el.nextElementSibling;
      var parentNode = el.parentNode;

      if (nextNode === null) {
        parentNode.appendChild(newNode);
      } else {
        parentNode.insertBefore(newNode, nextNode);
      }
    },

    /**
     * 将元素插入到$rangeElm位置
     * @param $el
     * @param $rangeElm
     * @param className $p元素class样式
     * @param addRemoveIcon 添加删除icon
     * @returns {*} 返回新的$rangeElm
     */
    insertToRangeElm: function insertToRangeElm($el, $rangeElm, className, addRemoveIcon) {
      // if (typeof editDisabled === 'undefined' && typeof className === 'boolean') {
      //   editDisabled = className
      //   className = null
      // }
      var $p; // 获取或创建$p元素

      if (dom.isEmptyInner($rangeElm, true)) {
        $p = $rangeElm;
        $p.innerHTML = '';
        $p.appendChild($el);
      } else {
        $p = dom.createElm('p');
        $p.appendChild($el); // 将p元素插入到$rangeElm之后

        dom.insertAfter($rangeElm, $p);
      } // 添加样式名


      if (className) {
        $p.className = className;
      }

      if (addRemoveIcon) {
        var $i = dom.createElm('i', {
          class: '__remove'
        });
        $p.setAttribute('contenteditable', false);
        $p.appendChild($i);
        $i = null;
      } // 如果是在$content结尾插入的话，新增一占位段落


      var $content = $p.parentNode;

      if ($content && $content.lastElementChild === $p) {
        return dom.insertParagraph($content);
      } else {
        return $p.nextElementSibling;
      }
    },

    /**
     * 查找元素节点el的兄弟节点
     * @param el
     * @param 可选参数，className兄弟节点包含的样式名
     * @returns {*}
     */
    siblings: function siblings($el, className) {
      var arr = [];
      var elmNodes = [];
      var siblings = util.slice($el.parentNode.children); // 只取元素节点

      siblings.forEach(function (item) {
        if (item !== $el) {
          elmNodes.push(item);
        }
      });

      if (className) {
        var reg = new RegExp("\\b(".concat(className, ")\\b"));
        elmNodes.forEach(function (item) {
          if (reg.test(item.className)) {
            arr.push(item);
          }
        });
      } else {
        arr = elmNodes;
      }

      return arr.length ? arr : null;
    },

    /**
     * 创建a标签链接字符串
     * @param url 链接地址
     * @param name 链接名称
     * @returns {string}
     */
    // createLinkStr (url, name) {
    //   if (!url) return ''
    //   let alt = name || ''
    //   url = url + ''
    //   name = name || (url.length > 20 ? url.substr(0, 20) + '...' : url)
    //   return `<a href="${url}" target="_blank" alt="${alt}">${name}</a>`
    // },

    /**
     * 设置或获取$el data-属性
     * @param $el
     * @param key data-key
     * @param value 值
     * @returns {*}
     */
    data: function data($el, key, value) {
      if (!$el || !key) return null;

      if (dom.isHTMLElement($el)) {
        if (typeof value !== 'undefined') {
          $el.setAttribute("data-".concat(key), value);
        } else {
          return $el.getAttribute("data-".concat(key));
        }
      }

      return null;
    },

    /**
     * 往字符串中插入字符串
     * @param str 原字符串
     * @param insertString 需要插入的字符串
     * @param position 插入位置
     * @returns {string}
     */
    insertStr: function insertStr(str, insertString, position) {
      return str.substring(0, position) + insertString + str.substring(position);
    },

    /**
     * 元素后面插入分割线
     * @param $el
     */
    insertHr: function insertHr($el) {
      var $p = dom.isEmptyInner($el) ? $el : dom.createElm('p');
      $p.innerHTML = '<hr>';
      dom.insertAfter($el, $p);
    },

    /**
     * 获取当前元素节点最近的文本节点
     * @param $el
     * @returns {*}
     */
    getTextNode: function getTextNode($el) {
      while ($el && $el.nodeType === 1) {
        // 当$el.childNodes[0] == <br>时，不能继续获取childNode
        if ($el.childNodes[0]) {
          $el = $el.childNodes[0];
        } else {
          break;
        }
      }

      return $el;
    },
    getWindow: function getWindow($el) {
      return dom.isWindow($el) ? $el : $el.nodeType === 9 && $el.defaultView;
    },

    /**
     * 获取$item在$list中的索引
     * @param $item
     * @param $list
     * @returns {number}
     */
    findIndex: function findIndex($item, $list) {
      for (var i = 0; i < $list.length; i++) {
        if ($item === $list[i]) {
          return i;
        }
      }

      return -1;
    },

    /**
     * 插入空行
     * @param $parent 父级
     * @returns {*|Element} p元素
     */
    insertParagraph: function insertParagraph($parent) {
      var $p = dom.createElm('p');
      $p.innerHTML = '<br>';

      if (dom.isHTMLElement($parent)) {
        $parent.appendChild($p);
      }

      return $p;
    },

    /**
     * overflow: hidden
     * @param $el
     */
    lock: function lock($el) {
      if (typeof $el === 'undefined') {
        $el = dom.query('body');
      }

      if (dom.isHTMLElement($el)) {
        $el.style.overflow = 'hidden';
      }
    },

    /**
     * overflow: ''
     * @param $el
     */
    unlock: function unlock($el) {
      if (typeof $el === 'undefined') {
        $el = dom.query('body');
      }

      if (dom.isHTMLElement($el)) {
        $el.style.overflow = '';
      }
    },

    /**
     * 获取文档scroll位置
     * @param pos
     * @returns {{}}
     */
    getScroll: function getScroll(pos) {
      var data = {}; // ie9+ 高版本浏览器

      if (win.pageYOffset !== null) {
        // 因为 window.pageYOffset 默认的是0, 所以这里需要判断
        data = {
          left: win.pageXOffset,
          top: win.pageYOffset
        };
      } // 标准浏览器,判断有没有声明DTD
      else if (doc.compatMode === "CSS1Compat") {
          data = {
            left: doc.documentElement.scrollLeft,
            top: doc.documentElement.scrollTop
          };
        } // 未声明 DTD
        else {
            data = {
              left: doc.body.scrollLeft,
              top: doc.body.scrollTop
            };
          }

      return pos === 'left' || pos === 'top' ? data[pos] : data;
    },

    /**
     * 设置或获取垂直滚动位置
     * @param $el
     * @param offset
     * @returns {Number}
     */
    scrollTop: function scrollTop($el, offset) {
      var $win = dom.getWindow($el); // 获取scrollTop

      if (offset === undefined) {
        return $win ? $win.pageYOffset : $el.scrollTop;
      }

      if ($win) {
        $win.scrollTo(0, offset);
      } else {
        $el.scrollTop = offset;
      }
    },

    /**
     * 去除html标签
     * @param htmlStr
     * @returns {string}
     */
    removeHtmlTags: function removeHtmlTags(htmlStr) {
      htmlStr = htmlStr.toString().replace(/<\/?.*?>/g, '');
      return util.trim(htmlStr);
    },

    /**
     * 移除多余的html代码
     * @param content
     * @returns {string}
     */
    removeRedundantCode: function removeRedundantCode(content) {
      return (content + '').replace(/<p><br><\/p>|\scontenteditable="false"|<i class="__remove"><\/i>/ig, '');
    }
  };

  function addEventListener($el, eventType, fn, useCapture) {
    if ($el.addEventListener) {
      $el.addEventListener(eventType, fn, useCapture);
    } else if ($el.attachEvent) {
      $el.attachEvent(eventType, fn);
    } else {
      $el["on".concat(eventType)] = fn;
    }
  }

  function removeEventListener($el, eventType, fn, useCapture) {
    if ($el.removeEventListener) {
      $el.removeEventListener(eventType, fn, useCapture);
    } else if ($el.detachEvent) {
      $el.detachEvent(eventType, fn);
    } else {
      $el["on".concat(eventType)] = null;
    }
  }

  /**
   * Create by capricorncd
   * 2018/5/30 0030.
   */
  var broadcast = {
    /**
     * BroadCast
     */
    broadcast: {},

    /**
     * on
     * @param notifyName
     * @param fn
     */
    on: function on(notifyName, fn) {
      if (!notifyName || typeof notifyName !== 'string' || !fn || typeof fn !== 'function') return;

      if (!this.broadcast[notifyName]) {
        this.broadcast[notifyName] = [];
      }

      this.broadcast[notifyName].push(fn);
    },

    /**
     * emit
     * @param notifyName
     */
    emit: function emit(notifyName) {
      var notifyArr = this.broadcast[notifyName];
      if (!notifyArr) return;
      var args = Array.prototype.slice.call(arguments, 1);

      for (var i = 0; i < notifyArr.length; i++) {
        try {
          notifyArr[i].apply(null, args);
        } catch (e) {
          this.emit('error', {
            code: 1,
            msg: "emit(".concat(notifyName, "): ").concat(e.message),
            data: e
          });
        }
      }
    },

    /**
     * off
     * @param notifyName
     */
    off: function off(notifyName) {
      if (this.broadcast[notifyName]) {
        this.broadcast[notifyName] = null;
        delete this.broadcast[notifyName];
      }
    }
  };

  var DEFAULT_OPTS = {
    // onSet () {},
    prefix: 'zxEditor'
  };

  var ZxStorage =
  /*#__PURE__*/
  function () {
    function ZxStorage(opts) {
      _classCallCheck(this, ZxStorage);

      this.opts = Object.assign({}, DEFAULT_OPTS, opts);
    }

    _createClass(ZxStorage, [{
      key: "_key",
      value: function _key(key) {
        return key ? this.opts.prefix + '_' + key : null;
      }
    }, {
      key: "set",
      value: function set(key, data, isSession) {
        // check key
        key = this._key(key);
        if (!key) return false; // check data

        if (data && _typeof(data) === 'object') {
          data = JSON.stringify(data);
        }

        if (!data || data === '{}' || data === '[]') {
          this.remove(key);
          return false;
        }

        var storage = getStorage(isSession); // 存储

        try {
          storage.setItem(key, data);
        } catch (e) {
          // this.opts.onSet({
          //   code: 1,
          //   msg: 'set error',
          //   data: e
          // })
          return false;
        }

        return true;
      }
    }, {
      key: "get",
      value: function get(key, isSession) {
        // check key
        key = this._key(key);
        if (!key) return null;
        var storage = getStorage(isSession);
        var data = storage.getItem(key);

        if (data) {
          try {
            data = JSON.parse(data);
          } catch (e) {}

          return data;
        }

        return null;
      }
    }, {
      key: "remove",
      value: function remove(key, isSession) {
        // check key
        key = this._key(key);
        if (!key) return;
        var storage = getStorage(isSession);
        storage.removeItem(key);
      }
    }]);

    return ZxStorage;
  }();

  function getStorage(isSession) {
    // check isSession
    if (typeof isSession !== 'boolean') {
      isSession = false;
    }

    return isSession ? sessionStorage : localStorage;
  }

  var Cursor =
  /*#__PURE__*/
  function () {
    function Cursor($content) {
      _classCallCheck(this, Cursor);

      this.$content = $content;
      this.selection = null;
      this.range = null;
      this.offset = 0;
      this.timer = null;
      this.init();
    }

    _createClass(Cursor, [{
      key: "init",
      value: function init() {
        this.selection = win.getSelection();

        try {
          this.range = this.selection.getRangeAt(0);
        } catch (e) {
          this.range = new Range();
        }

        this.offset = 0;
      }
      /**
       * 设置光标元素及位置
       * @param $el
       * @param offset
       */

    }, {
      key: "setRange",
      value: function setRange($el, offset) {
        var _this = this;

        if (this.selection === null) {
          this.init();
        } else {
          // 清除选定对象的所有光标对象
          this.selection.removeAllRanges();
        }

        this.offset = util.int(offset);

        if ($el) {
          this.range.setStart(dom.getTextNode($el), this.offset);
        } // 光标开始和光标结束重叠


        this.range.collapse(true); // 清除定时器

        if (this.timer) {
          clearTimeout(this.timer);
          this.timer = null;
        } // 延时执行，键盘自动收起后再触发focus


        this.timer = setTimeout(function () {
          // 插入新的光标对象
          _this.selection.addRange(_this.range);
        }, 100);
      }
      /**
       * 获取光标及当前光标所在的DOM元素节点
       * @returns {*} $rangeElm
       */

    }, {
      key: "getRange",
      value: function getRange() {
        if (!this.selection) {
          this.init();
        } else {
          try {
            this.range = this.selection.getRangeAt(0);
          } catch (e) {}

          this.offset = this.range.startOffset;
        } // 当前Node


        var $currentNode = this.range.endContainer; // 获取光标所在元素的父级为this.$content.children

        return findRootNode($currentNode, this.$content) // 或获取$content的最后一个元素
        || this.$content.lastElementChild // 以上未获取到任何元素，
        // 则向$content中插入一个新p元素
        || dom.insertParagraph(this.$content);
      }
    }]);

    return Cursor;
  }();
  /**
   * 查找当前元素节点(textNode、ElemNode等)，在$context内的父根节点
   * @param currentNode 当前DOM节点
   * @param $context
   * @returns {*}
   */


  function findRootNode(currentNode, $context) {
    if (currentNode === $context) return null;
    var $node = currentNode;
    var $parentNode = $node.parentNode;

    while ($parentNode) {
      if ($parentNode === $context) {
        return $node;
      } else {
        $node = $parentNode;
      }

      $parentNode = $node.parentNode;
    }

    return null;
  }

  var DEFUALT_OPTS = {
    // mask opacity
    maskOpacity: 0.3,
    // 确定按钮颜色
    confirmBtnColor: '',
    // 取消按钮颜色
    cancelBtnColor: ''
  };

  var ZxDialog =
  /*#__PURE__*/
  function () {
    function ZxDialog() {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, ZxDialog);

      this.visible = false;
      this.opts = Object.assign({}, DEFUALT_OPTS, opts); // 已创建的dialog id

      this.ids = []; // loading元素

      this.$loadings = []; // 初始化

      this._init();

      this.version = '__VERSION__';
    }

    _createClass(ZxDialog, [{
      key: "_init",
      value: function _init() {
        this.broadcast = broadcast.broadcast;
      }
      /**
       * 创建dialog
       * @param $innerChild
       * @private
       */

    }, {
      key: "_createDialog",
      value: function _createDialog(type, dialogId, $innerChild) {
        var _this = this;

        this.ids.push(dialogId);
        var opts = this.opts; // 获取最大z-index

        var zIndex = dom.maxZIndex() + 1; // 创建dom结构

        var vnode = {
          attrs: {
            type: type,
            id: dialogId,
            class: 'zx-dialog-wrapper',
            style: "background:rgba(0,0,0,".concat(opts.maskOpacity, ");z-index:").concat(zIndex, ";")
          },
          child: [{
            attrs: {
              class: 'zx-dialog-inner'
            },
            child: $innerChild
          }]
        };
        var $dialog = dom.createVdom(vnode);
        var $body = dom.query('body');

        if ($body) {
          // 阻止文档滚动
          dom.lock($body);
          $body.appendChild($dialog); // 按钮

          var $confirmBtn = dom.query('.__confirm', $dialog);
          var $cancelBtn = dom.query('.__cancel', $dialog); // 绑定事件

          dom.addEvent($confirmBtn, 'click', function (_) {
            _this.emit(dialogId, true);

            _this.destroy($dialog, dialogId);
          }); // 取消

          dom.addEvent($cancelBtn, 'click', function (_) {
            _this.emit(dialogId, false);

            _this.destroy($dialog, dialogId);
          });
        }

        return $dialog;
      }
    }, {
      key: "alert",
      value: function alert(s, callback) {
        var opts = this.opts; // 生产随机id

        var dialogId = util.randStr('zxDialog_');
        var $innerVnode = [];
        $innerVnode.push({
          attrs: {
            class: 'zx-dialog-message'
          },
          child: s || 'not message!'
        });
        $innerVnode.push({
          attrs: {
            class: 'zx-dialog-footer'
          },
          child: [{
            tag: 'span',
            attrs: {
              class: '__confirm',
              style: opts.confirmBtnColor ? "color:".concat(opts.confirmBtnColor) : ''
            },
            child: '确定'
          }]
        });

        this._createDialog('alert', dialogId, $innerVnode); // 注册事件


        if (typeof callback === 'function') {
          this.on(dialogId, callback);
        }
      }
    }, {
      key: "confirm",
      value: function confirm(s, callback) {
        var opts = this.opts; // 生产随机id

        var dialogId = util.randStr('zxDialog_');
        var $innerVnode = [];
        $innerVnode.push({
          attrs: {
            class: 'zx-dialog-message'
          },
          child: s || '无提示内容'
        });
        $innerVnode.push({
          attrs: {
            class: 'zx-dialog-footer'
          },
          child: [{
            tag: 'span',
            attrs: {
              class: '__cancel',
              style: opts.cancelBtnColor ? "color:".concat(opts.cancelBtnColor) : ''
            },
            child: '取消'
          }, {
            tag: 'span',
            attrs: {
              class: '__confirm',
              style: opts.confirmBtnColor ? "color:".concat(opts.confirmBtnColor) : ''
            },
            child: '确定'
          }]
        });

        this._createDialog('confirm', dialogId, $innerVnode); // 注册事件


        if (typeof callback === 'function') {
          this.on(dialogId, callback);
        }
      }
      /**
       * loading
       * @param s 提示文字内容
       * @returns {*} 返回当前$dialog
       */

    }, {
      key: "loading",
      value: function loading(s) {
        // 生产随机id
        var dialogId = util.randStr('zxDialog_');
        var $innerVnode = [{
          attrs: {
            class: 'zx-dialog-message'
          },
          child: s || 'loading ...'
        }];

        var $el = this._createDialog('loading', dialogId, $innerVnode);

        this.$loadings.push($el);
      }
      /**
       * 移除loading
       */

    }, {
      key: "removeLoading",
      value: function removeLoading() {
        var $el;

        while (this.$loadings.length) {
          $el = this.$loadings.pop();

          if ($el.parentNode) {
            $el.parentNode.removeChild($el);
          }
        } // 解除文档滚动


        dom.unlock();
      }
      /**
       * 删除所有dialog
       */

    }, {
      key: "removeAll",
      value: function removeAll() {
        var $dialogs = dom.queryAll('.zx-dialog-wrapper');

        if ($dialogs.length > 0) {
          var i, $el;

          for (i = 0; i < $dialogs.length; i++) {
            $el = $dialogs[i];
            this.destroy($el, $el.id);
          }
        }

        this.ids = [];
        this.$loadings = [];
      }
      /**
       * 销毁$dialog
       * @param $dialog
       * @param dialogId
       */

    }, {
      key: "destroy",
      value: function destroy($dialog, dialogId) {
        if ($dialog && $dialog.parentNode) {
          $dialog.parentNode.removeChild($dialog);
        } // 删除事件


        this.off(dialogId); // 删除ids数组

        var index = this.ids.indexOf(dialogId);
        this.ids.splice(index, 1); // 解除文档滚动

        dom.unlock();
      }
    }]);

    return ZxDialog;
  }();

  ZxDialog.prototype.on = broadcast.on;
  ZxDialog.prototype.emit = broadcast.emit;
  ZxDialog.prototype.off = broadcast.off;

  /**
   * Created by capricorncd 7/21/2018
   * https://github.com/capricorncd
   */

  var TOOL_BAR_HEIGHT = 48; // 默认参数

  var DEFAULT_OPTIONS = {
    // 自动保存，单位秒。等于0则不保存
    autoSave: 0,
    // 是否绝对定位
    fixed: false,
    // 顶部距离
    top: 0,
    // 底部距离
    bottom: 0,
    // 内边距
    padding: 15,
    // 显示工具栏
    showToolbar: true,
    // 图片文件大小最大值，单位MB
    imageMaxSize: 20,
    // 禁用键盘删除图片、链接等附件
    disableBackspaceDelete: true
    /**
     * 初始化
     * @param _this
     * @param selector
     * @param params
     */

  };
  function initMixin(_this, selector, params) {
    /**
     * ***************************************************
     * check h5 Object
     * ***************************************************
     */
    if (typeof FileReader === 'undefined') {
      _this.emit('error', {
        msg: 'FileReader is undefined!'
      });
    }

    if (typeof localStorage === 'undefined') {
      _this.emit('error', {
        msg: 'localStorage is undefined!'
      });
    }
    /**
     * ***************************************************
     * dialcheck selectorog
     * ***************************************************
     */


    if (!selector || typeof selector !== 'string') {
      util.err("selector is '".concat(selector, "', is not valid"));
    } // 保存容器


    _this.$wrapper = dom.query(selector);

    if (_this.$wrapper === null) {
      util.err("Cann't found '".concat(selector, "' Node in document!"));
    }
    /**
     * ***************************************************
     * options
     * ***************************************************
     */
    // 初始化参数


    var options = Object.assign({}, DEFAULT_OPTIONS, params); // id

    _this.id = util.randStr();
    /**
     * ***************************************************
     * dialog
     * ***************************************************
     */

    _this.dialog = new ZxDialog();

    _this.on('loading', function (msg) {
      _this.dialog.loading(msg);
    });

    _this.on('removeLoading', function (_) {
      _this.dialog.removeLoading();
    });
    /**
     * ***************************************************
     * 参数处理
     * ***************************************************
     */


    _this.options = options; // toolbarHeight

    _this.toolbarHeight = TOOL_BAR_HEIGHT; // 自动保存

    _this.saveTimer = null;

    if (params.autoSave > 0) {
      _this.autoSave(util.int(params.autoSave));
    }
    /**
     * ***************************************************
     * storage
     * ***************************************************
     */


    _this.storage = new ZxStorage();
    /**
     * ***************************************************
     * Vnode
     * ***************************************************
     */

    var contentStyle = '';
    var padding = util.int(options.padding);
    var paddingStyle = "padding-left:".concat(padding, "px;padding-right:").concat(padding, "px");

    if (options.fixed) {
      contentStyle = "top:".concat(util.int(options.top), "px;bottom:").concat(util.int(options.bottom), "px;").concat(paddingStyle);
    } else {
      contentStyle = paddingStyle;
    } // dom结构


    var editorVnode = {
      tag: 'div',
      attrs: {
        class: 'zxeditor-container' + (options.fixed ? ' fixed' : '')
      },
      child: [// 内容容器
      {
        tag: 'div',
        attrs: {
          class: 'zxeditor-content-wrapper is-empty',
          contenteditable: true,
          style: contentStyle
        },
        // 添加一行元素，防止编辑器内容为空
        child: [{
          tag: 'p',
          child: [{
            tag: 'br'
          }]
        }]
      }] // 创建dom

    };
    _this.$editor = dom.createVdom(editorVnode);
    _this.$content = dom.query('.zxeditor-content-wrapper', _this.$editor); // 设置content底部距离

    if (options.showToolbar) {
      _this.resetContentPostion(options.bottom + TOOL_BAR_HEIGHT);
    } // 添加$editor至文档流中


    _this.$wrapper.appendChild(_this.$editor); // 本地存储内容初始化


    _getStorageAndInitContent(_this); // 编辑器已添加至document
    // 初始化关闭及元素


    _this.cursor = new Cursor(_this.$content); // $content 内光标元素

    _this.$cursorElm = _this.cursor.getRange();
  }
  /**
   * 获取存储内容，并添加至$content中
   * @private
   */

  function _getStorageAndInitContent(_this) {
    var storageContent = _this.storage.get('content');

    if (storageContent) {
      _this.setContent(storageContent);
    }
  }

  /**
   * Created by capricorncd 7/22/2018
   * https://github.com/capricorncd
   */

  var NODENAME_ARRAY = ['p', 'h2', 'h4', 'ul', 'blockquote']; // 内容附件

  var CONTENT_ATTACH = {
    img: '图片',
    a: '链接',
    video: '视频',
    audio: '音频'
  };
  function handleContent(_this) {
    var cursor = _this.cursor;
    var $content = _this.$content;
    /**
     * 初始化文本框内容及当前光标元素
     * @private
     */

    function initRangElm() {
      // 编辑器内容为空
      if (dom.isEmptyInner($content)) {
        var p = dom.createElm('p');
        p.innerHTML = '<br>';
        $content.appendChild(p);
        p.focus();
        broadcast.emit('change', 'content', _this);
        _this.$cursorElm = p;
      } else {
        _this.$cursorElm = cursor.getRange();
      }
    } // 激活文本编辑框
    // 删除附件等操作


    dom.addEvent($content, 'click', function (e) {
      e.stopPropagation();
      broadcast.emit('click', $content, e); // 隐藏emojiModal

      _this.emojiModal.hide();

      _this.textstyleModal.hide(); // 删除附件a、或img


      var $target = e.target;
      var nodeName = $target.nodeName; // 阻止a标签默认行为

      if (nodeName === 'A') {
        e.preventDefault();
      } // 删除链接、图片


      if (nodeName === 'I' && $target.className.indexOf('__remove') >= 0) {
        // 阻止冒泡，触发a标签默认事件
        // e.stopPropagation()
        // 阻止触发a标签默认事件
        e.preventDefault(); // 处理附件删除

        handleDeleteAttach($target);
        return;
      } // 当前$content元素


      var $el = e.currentTarget; // 防止toolbar被击穿

      if ($el !== $content) return;
      initRangElm();
      removeContentClass($content);
    }); // 阻止$content内容被删空

    dom.addEvent($content, 'keydown', function (e) {
      if (e.keyCode === 8) {
        if (_this.options.disableBackspaceDelete) {
          disableBackspaceDelete(e);
        } // 判断容器内容是否被删空


        if (checkContentInnerNull($content)) {
          e.preventDefault();
        }
      }
    }); // focus移除$content placeholder

    dom.addEvent($content, 'focus', function (_) {
      broadcast.emit('focus', $content);
      removeContentClass($content);
    }); // 离开编辑输入框时，内容是否为空
    // 为空则添加<br>

    dom.addEvent($content, 'blur', function (e) {
      broadcast.emit('blur', $content); // 存储$curor element

      _this.$cursorElm = cursor.getRange(); // 检查$content是否为空

      checkContentIsEmpty($content); // $cursorElm内容检查

      if (_this.$cursorElm && !_this.$cursorElm.innerHTML) {
        _this.$cursorElm.innerHTML = '<br>';
      } // 检查光标元素是否为指定(p, h2, h4, ul, blockquote)元素
      // className


      checkChildName(); // 校验光标所在元素位置
      // _this.checkCursorPosition()
    }); // 文本编辑框内容输入

    dom.addEvent($content, 'keyup', function (_) {
      // 存储$curor element
      _this.$cursorElm = cursor.getRange();

      _this.checkCursorPosition();

      broadcast.emit('change', 'content', _this);
    }, false); // 粘贴

    dom.addEvent($content, 'paste', function (e) {
      e.preventDefault();
      var clipboardData = e.clipboardData;
      if (!clipboardData) return;
      var items = clipboardData.items; // console.log(e)
      // console.log(clipboardData)
      // console.log(items)

      if (items) {
        (function () {
          var _handlePasteCount = function _handlePasteCount(str) {
            count++;
            pasteStr += util.trim(str);

            if (count === len) {
              _insertToContent(pasteStr);
            }
          };

          var len = items.length;
          var count = 0;
          var pasteStr = '';
          var i, item;

          for (i = 0; i < len; i++) {
            item = items[i]; // 获取文本内容

            if (/^text\/plain/.test(item.type)) {
              item.getAsString(function (str) {
                _handlePasteCount(str);
              });
            } else {
              _handlePasteCount('');
            }
          }
        })();
      }
    });
    /**
     * 将粘贴内容插入至content中
     * @param pasteStr 粘贴内容文本
     * @private
     */

    function _insertToContent(pasteStr) {
      if (!pasteStr) {
        _this.dialog.alert('剪贴板无有效的文本内容');
      } else {
        // 去除html标签
        pasteStr = dom.removeHtmlTags(pasteStr); // 创建文本节点

        var $paste = doc.createTextNode(pasteStr);

        _this.insertElm($paste, 'text');

        var tmr = setTimeout(function (_) {
          _this.checkCursorPosition();

          clearTimeout(tmr);
          tmr = null;
        }, 350);
      }

      broadcast.emit('paste', $content, {
        content: pasteStr
      });
      broadcast.emit('change', 'content', _this);
    }
    /**
     * 检查$content子元素的合法性
     */


    function checkChildName() {
      var $rootNode = findRootNode(_this.$cursorElm, $content);

      if ($rootNode) {
        // 标签内容检查
        var className = $rootNode.className;

        if (className) {
          var type = className.replace(/child-node-is-(\w+)/ig, '$1');

          if (type && !dom.query(type, $rootNode)) {
            $rootNode.removeAttribute('class');
            $rootNode.removeAttribute('contenteditable'); // dom.removeClass('child-node-is-a', $rootNode)
          }
        } // 检查光标元素是否为指定(p, h2, h4, ul, blockquote)元素


        var nodeName = $rootNode.nodeName.toLowerCase();

        if (NODENAME_ARRAY.indexOf(nodeName) === -1) {
          // 修改器标签为p
          var $newNode = dom.changeTagName($rootNode, 'p');
          $content.replaceChild($newNode, $rootNode);
        }

        broadcast.emit('change', 'content', _this);
      }
    }
    /**
     * disableBackspaceDelete
     * 禁用Backspace键删除a/img/video/audio
     * @param e
     */


    function disableBackspaceDelete(e) {
      var $rootParent, $prevNode;

      try {
        // $content子节点
        $rootParent = findRootNode(_this.$cursorElm, $content); // 上一个节点

        $prevNode = $rootParent.previousElementSibling;
      } catch (e) {}

      if (!$prevNode) return; // 上一个兄弟节点含义附件（非文本、emoji类型）
      // 并且光标在当前节点首位

      if ((dom.query('a', $prevNode) || dom.query('img', $prevNode) || dom.query('video', $prevNode) || dom.query('audio', $prevNode)) && _this.cursor.offset === 0) {
        e.preventDefault();
      }
    }
    /**
     * 处理正文附件删除
     * @param $el
     */


    function handleDeleteAttach($el) {
      var $parent = findRootNode($el, $content);
      var className = $parent ? $parent.className : '';
      var type = className.replace(/child-node-is-(\w+)/, '$1');
      var attachName = CONTENT_ATTACH[type];

      _this.emit('debug', "Delete ".concat(attachName));

      _this.dialog.confirm("\u60A8\u786E\u5B9A\u8981\u5220\u9664".concat(attachName, "\u5417\uFF1F"), function (result) {
        if (result) {
          if ($parent) {
            // 获取相邻元素
            var $sibling = $parent.nextElementSibling || $parent.previousElementSibling;
            $parent.parentNode.removeChild($parent); // 移动光标

            cursor.setRange($sibling, 0);
          }

          broadcast.emit('change', 'content', _this);
        }

        $parent = null;
      });
    }
  }
  /**
   * 检查$content字符串内容是否为空
   * @param $content
   */

  function checkContentIsEmpty($content) {
    if (util.isEmpty($content.innerText) && !dom.query('img', $content)) {
      dom.addClass('is-empty', $content);
    } else {
      removeContentClass($content);
    }
  }
  /**
   * 移除$content is-empty样式名
   * @param $content
   */


  function removeContentClass($content) {
    if (dom.hasClass('is-empty', $content)) {
      dom.removeClass('is-empty', $content);
    }
  }
  /**
   * 阻止$content内容被删空
   * @param $content
   * @returns {boolean|*}
   */

  function checkContentInnerNull($content) {
    var $childs = $content.children;
    return $childs.length <= 1 && util.isEmpty($content.innerText);
  }

  var DEFAULT_OPTS$1 = {
    // class-hook，供选择器用
    classHook: '',
    // 初始显示状态
    visible: false,
    // head配置
    headHeight: 44,
    headTitle: 'Modal',
    headSwitch: null,
    height: 260,
    // 父容器
    $parent: null,
    // body内容
    bodyChildVnode: null,
    onShow: function onShow() {},
    onHide: function onHide() {},
    onError: function onError() {}
  };

  var BottomModal =
  /*#__PURE__*/
  function () {
    function BottomModal() {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, BottomModal);

      this.opts = Object.assign({}, DEFAULT_OPTS$1, opts);
      this.height = util.int(this.opts.height);
      this.visible = opts.visible;
      this.init(this.opts);
    }

    _createClass(BottomModal, [{
      key: "init",
      value: function init(opts) {
        // 父容器
        var $parent = opts.$parent; // head height

        var headHeight = util.int(opts.headHeight); // modal height

        var modalHeight = util.int(opts.height);

        if (!$parent || !dom.isHTMLElement($parent)) {
          opts.onError({
            msg: "class[BottomModal]: opts.$parent is not HTMLElement, is ".concat($parent)
          });
          return;
        }

        var bodyChildVnode = opts.bodyChildVnode;
        var vnode = {
          tag: 'div',
          attrs: {
            class: 'zxeditor-modal-wrapper ' + opts.classHook,
            style: "transform:translateY(".concat(opts.visible ? 0 : '100%', ");height:").concat(modalHeight, "px")
          },
          child: [{
            attrs: {
              class: 'zxeditor-modal-head',
              style: "height: ".concat(headHeight, "px;")
            },
            child: [{
              tag: 'span',
              attrs: {
                class: '__title'
              },
              child: opts.headTitle
            }, {
              attrs: {
                class: '__switch',
                style: "height: ".concat(headHeight, "px;")
              },
              child: opts.headSwitch
            }]
          }, {
            attrs: {
              class: 'zxeditor-modal-body',
              style: "height:".concat(modalHeight - headHeight, "px;")
            },
            child: Array.isArray(bodyChildVnode) ? bodyChildVnode : [bodyChildVnode]
          }]
        };
        this.$modal = dom.createVdom(vnode);
        $parent.appendChild(this.$modal);
        this.$switch = dom.query('.__switch', this.$modal);
        this.$body = dom.query('.zxeditor-modal-body', this.$modal);

        this._initEvent();
      }
    }, {
      key: "_initEvent",
      value: function _initEvent() {
        // 获取document body元素
        var $docBody = dom.query('body'); // modal body

        var $modalBody = this.$body; // 是否以touch

        var isTouched = false; // 阻止冒泡

        dom.addEvent(this.$modal, 'click', function (e) {
          e.stopPropagation();
        }); // 阻止document跟随上下滚动

        dom.addEvent($modalBody, 'touchstart', function (e) {
          isTouched = true;
          dom.lock($docBody);
        });
        dom.addEvent($modalBody, 'touchmove', function (e) {
          if (!isTouched) return;
        });
        dom.addEvent($modalBody, 'touchend', function (e) {
          isTouched = false; // 延迟执行解锁

          var timer = setTimeout(function (_) {
            dom.unlock($docBody);
            clearTimeout(timer);
            timer = null;
          }, 300);
        });
      }
    }, {
      key: "show",
      value: function show() {
        if (this.visible) return;
        this.$modal.style.transform = 'translateY(0)';
        this.visible = true;
        this.opts.onShow();
      }
    }, {
      key: "hide",
      value: function hide() {
        if (this.visible) {
          this.$modal.style.transform = 'translateY(100%)';
          this.visible = false;
          this.opts.onHide();
        }
      }
    }]);

    return BottomModal;
  }();

  var EMOJI = ['😄', '😀', '😁', '😂', '😃', '😅', '😆', '😇', '😉', '😊', '😋', '😌', '😍', '😎', '😏', '😐', '😑', '😒', '😓', '😔', '😕', '😖', '😗', '😘', '😙', '😚', '😛', '😜', '😝', '😞', '😟', '😠', '😡', '😢', '😣', '😤', '😥', '😦', '😧', '😨', '😩', '😪', '😫', '😬', '😭', '😮', '😯', '😰', '😱', '😲', '😳', '😴', '😵', '😶', '😷', '💩', '👼', '😸', '😹', '😺', '😻', '😼', '😽', '😾', '😿', '🙀', '🙅', '🙆', '🙇', '🙋', '🙌', '🙍', '🙎', '🙏', '👦', '👧', '👨', '👩', '👪', '👫', '👬', '👭', '👮', '👯', '👰', '👱', '👲', '👳', '👴', '👵', '👶', '👷', '👸', '💁', '💂', '💏', '💑', '🚶', '👽', '👻', '👹', '👺', '😈', '👿', '🙈', '🙉', '🙊', '💓', '💔', '💕', '💖', '💗', '💘', '💙', '💚', '💛', '💜', '💝', '💞', '💟', '💠', '💡', '🌸', '🌹', '🌺', '🌻', '👀', '👂', '👃', '👄', '👅', '👆', '👇', '👈', '👉', '👊', '👋', '👌', '👍', '👎', '👏', '🖖', '✊', '✋', '💪'];

  function initEmoji(_this) {
    var bodyChildVnode = [];
    EMOJI.forEach(function (item) {
      bodyChildVnode.push({
        tag: 'i',
        child: item
      });
    });
    var emojiModal = new BottomModal({
      headTitle: 'Emoji',
      headSwitch: '完成',
      $parent: _this.$editor,
      bodyChildVnode: [{
        attrs: {
          class: 'zxeditor-emoji-wrapper'
        },
        child: bodyChildVnode
      }],
      onError: function onError(err) {
        _this.emit('error', err);
      },
      onShow: function onShow() {
        _this.emit('bottom-modal', {
          type: 'emoji',
          show: true,
          height: emojiModal.height
        });

        _this.resetContentPostion(emojiModal.height);

        _this.checkCursorPosition();
      },
      onHide: function onHide() {
        _this.emit('bottom-modal', {
          type: 'emoji',
          show: false,
          height: 0
        });

        _this.resetContentPostion(_this.toolbarHeight);

        _this.checkCursorPosition();
      }
    });
    _this.emojiModal = emojiModal; // 事件处理

    dom.addEvent(emojiModal.$body, 'click', function (e) {
      var $el = e.target;

      if ($el.nodeName === 'I') {
        var emojiCode = $el.innerText;
        addEmoji(emojiCode);
      }
    });
    /**
     * 添加emoji表情到正文
     * @param emojiCode
     */

    function addEmoji(emojiCode) {
      var offset = _this.cursor.offset;

      try {
        _this.$cursorElm.innerHTML = dom.insertStr(_this.$cursorElm.innerText, emojiCode, offset);

        _this.cursor.setRange(_this.$cursorElm, offset + 2);

        _this.checkCursorPosition();
      } catch (e) {
        _this.emit('error', {
          msg: 'addEmoji error',
          data: e
        });
      }
    } // 隐藏emojiModal


    dom.addEvent(emojiModal.$switch, 'click', function (_) {
      emojiModal.hide();
    });
  }

  var COLORS = {
    black: '#333',
    gray: '#d0d0d0',
    red: '#ff583d',
    yellow: '#fdaa25',
    green: '#44c67b',
    blue: '#14b2e0',
    purple: '#b065e2'
  };
  function initTextStyle(_this) {
    // 文字样式child Vnode
    var textStyleChild = [{
      attrs: {
        class: '__style-wrapper border-bottom'
      },
      child: [{
        attrs: {
          class: 'text-bold',
          'data-style': 'fontWeight:800'
        },
        child: 'B'
      }, {
        attrs: {
          class: 'text-italic',
          'data-style': 'fontStyle:italic'
        },
        child: 'I'
      }, {
        attrs: {
          class: 'through-line',
          'data-style': 'textDecoration:line-through'
        },
        child: 'abc'
      }]
    }, {
      tag: 'dl',
      attrs: {
        class: '__color-wrapper border-bottom'
      },
      child: [{
        tag: 'dd',
        attrs: {
          class: 'active __black',
          'data-color': ''
        }
      }, {
        tag: 'dd',
        attrs: {
          class: '__gray',
          'data-color': COLORS.gray
        }
      }, {
        tag: 'dd',
        attrs: {
          class: '__red',
          'data-color': COLORS.red
        }
      }, {
        tag: 'dd',
        attrs: {
          class: '__yellow',
          'data-color': COLORS.yellow
        }
      }, {
        tag: 'dd',
        attrs: {
          class: '__green',
          'data-color': COLORS.green
        }
      }, {
        tag: 'dd',
        attrs: {
          class: '__blue',
          'data-color': COLORS.blue
        }
      }, {
        tag: 'dd',
        attrs: {
          class: '__purple',
          'data-color': COLORS.purple
        }
      }]
    }, {
      attrs: {
        class: '__tag-wrapper'
      },
      child: [{
        attrs: {
          class: '__h2',
          'data-tag': 'h2'
        },
        child: ['大标题', {
          tag: 'i'
        }]
      }, {
        attrs: {
          class: '__h4',
          'data-tag': 'h4'
        },
        child: ['小标题', {
          tag: 'i'
        }]
      }, {
        attrs: {
          class: '__p',
          'data-tag': 'p'
        },
        child: ['正文', {
          tag: 'i',
          attrs: {
            class: 'checked'
          }
        }]
      }, {
        attrs: {
          class: '__blockquote',
          'data-tag': 'blockquote'
        },
        child: [{
          tag: 'b'
        }, '引用', {
          tag: 'i'
        }]
      }, {
        attrs: {
          class: '__ul',
          'data-tag': 'ul'
        },
        child: [{
          tag: 'b'
        }, '无序列表', {
          tag: 'i'
        }]
      }]
    }];
    var textStyleVnode = {
      attrs: {
        class: 'text-style-outer-wrapper'
      },
      child: textStyleChild // 实例化 textstyleModal

    };
    var textstyleModal = new BottomModal({
      headTitle: '样式',
      headSwitch: '完成',
      $parent: _this.$editor,
      bodyChildVnode: textStyleVnode,
      onError: function onError(err) {
        _this.emit('error', err);
      },
      onShow: function onShow() {
        _this.emit('bottom-modal', {
          type: 'text-style',
          show: true,
          height: textstyleModal.height
        });

        _initTextStyleCheck();

        _this.resetContentPostion(textstyleModal.height);

        _this.checkCursorPosition();
      },
      onHide: function onHide() {
        _this.emit('bottom-modal', {
          type: 'text-style',
          show: false,
          height: 0
        });

        _this.resetContentPostion(_this.toolbarHeight);

        _this.checkCursorPosition();
      }
    });
    _this.textstyleModal = textstyleModal; // textstyleModal.$body

    var $modalBody = textstyleModal.$body;
    /**
     * ***************************************************
     * B I throuthLine
     * ***************************************************
     */

    var $styleWrapper = dom.query('.__style-wrapper', $modalBody);
    var $styleChildren = util.slice($styleWrapper.children);

    if ($styleWrapper) {
      handleStyleItemClick();
    }

    function handleStyleItemClick() {
      for (var i = 0; i < $styleChildren.length; i++) {
        dom.addEvent($styleChildren[i], 'click', _textStyleHandler);
      }
    }

    function _textStyleHandler(e) {
      var $el = e.currentTarget;
      var value = $el.getAttribute('data-style');
      var style = value.split(':');
      var key = style[0];

      if (_this.$cursorElm.style[key] === style[1]) {
        _this.$cursorElm.style[key] = '';
      } else {
        _this.$cursorElm.style[key] = style[1];
      }

      _this.cursor.setRange();
    }
    /**
     * ***************************************************
     * Color
     * ***************************************************
     */


    var $colorWrapper = dom.query('.__color-wrapper', $modalBody);
    var $colorChildren = util.slice($colorWrapper.children);

    if ($colorWrapper) {
      dom.addEvent($colorChildren, 'click', _colorClickHandler);
    }

    function _colorClickHandler(e) {
      var $el = e.currentTarget;
      var color = dom.data($el, 'color');
      _this.$cursorElm.style.color = color;
      dom.addClass('active', $el);
      var $siblings = dom.siblings($el, 'active') || [];
      $siblings.forEach(function ($item) {
        dom.removeClass('active', $item);
      });

      _this.cursor.setRange();
    }
    /**
     * ***************************************************
     * tag change
     * ***************************************************
     */


    var $tagWrapper = dom.query('.__tag-wrapper', $modalBody);
    var $tagChildren = util.slice($tagWrapper.children);

    if ($tagWrapper) {
      dom.addEvent($tagChildren, 'click', _tagClickHandler);
    }
    /**
     * 点击修改段落风格处理器
     * @param e
     * @private
     */


    function _tagClickHandler(e) {
      var $current = e.currentTarget; // 已被选中

      if (dom.query('.checked', $current)) return; // 显示选中图标

      _showCheckedIcon($current); // 去掉兄弟节点上的选中图标


      var $siblings = dom.siblings($current) || [];
      $siblings.forEach(function ($item) {
        _hideCheckedIcon($item);
      }); // 给当前焦点元素，添加样式

      _addCursorElmStyle($current);
    } // 给当前焦点元素，添加样式


    function _addCursorElmStyle($el) {
      var tag = dom.data($el, 'tag'); // this.log(this.range)

      var $newElm = dom.changeTagName(_this.$cursorElm, tag);

      _this.$content.replaceChild($newElm, _this.$cursorElm);

      _this.$cursorElm = $newElm;

      _this.cursor.setRange(_this.$cursorElm);
    }
    /**
     * ***************************************************
     * 初始化文字样式选项
     * ***************************************************
     */


    function _initTextStyleCheck() {
      if (!$modalBody) return; // 初始化节点类型 ****************************************
      // 检查当前焦点DOM节点类型

      var tagName = _this.$cursorElm.tagName.toLowerCase(); // console.error('$cursorElm: ' + tagName)


      $tagChildren.forEach(function ($item) {
        var tag = dom.data($item, 'tag'); // console.error('tag: ' + tag)

        if (tag === tagName) {
          _showCheckedIcon($item);
        } else {
          _hideCheckedIcon($item);
        }
      }); // 初始化文字颜色选 ****************************************

      var color = _this.$cursorElm.style.color;

      if (/rgb\(/.test(color)) {
        // 十进制转十六进制
        color = util.rgbToHex(color);
      }

      $colorChildren.forEach(function ($item) {
        var tag = dom.data($item, 'color');

        if (tag === color) {
          dom.addClass('active', $item);
        } else {
          dom.removeClass('active', $item);
        }
      }); // 标记焦点位置

      _this.cursor.setRange();
    }
    /**
     * 添加一个checked图标
     * @param $el
     * @private
     */


    function _showCheckedIcon($el) {
      var $i = dom.query('i', $el);
      if (dom.hasClass('checked', $i)) return;
      dom.addClass('checked', $i);
    }
    /**
     * 移除checked图标
     * @param $el
     * @private
     */


    function _hideCheckedIcon($el) {
      var $i = dom.query('i', $el);

      if (dom.hasClass('checked', $i)) {
        dom.removeClass('checked', $i);
      }
    }
    /**
     * ***************************************************
     * 隐藏textstyleModal
     * ***************************************************
     */
    // 隐藏textstyleModal


    dom.addEvent(textstyleModal.$switch, 'click', function (_) {
      textstyleModal.hide();
    });
  }

  /**
   * Created by capricorncd 8/1/2018
   * https://github.com/capricorncd
   */
  function initLink(_this) {
    /**
     * ***************************************************
     * init
     * ***************************************************
     */
    // 添加链接容器内容
    var linkChildVnode = [{
      attrs: {
        class: 'linkinput-wrapper'
      },
      child: [{
        attrs: {
          class: 'linkinput-title'
        },
        child: '添加链接'
      }, {
        attrs: {
          class: 'linkinput-group'
        },
        child: [{
          tag: 'input',
          attrs: {
            type: 'text',
            class: 'link-input',
            placeholder: 'http(s)://'
          }
        }, {
          tag: 'input',
          attrs: {
            type: 'text',
            class: 'link-input',
            placeholder: '链接名称(选填)'
          }
        }]
      }, {
        attrs: {
          class: 'linkinput-footer'
        },
        child: [{
          tag: 'button',
          attrs: {
            class: 'cancel-hook'
          },
          child: '取消'
        }, {
          tag: 'button',
          attrs: {
            class: 'submit-hook disabled'
          },
          child: '确定'
        }]
      }]
    }]; // 连接地址输入容器

    var linkVnode = {
      tag: 'div',
      attrs: {
        class: 'zxeditor-linkinput-wrapper',
        style: 'display:none;'
      },
      child: linkChildVnode
    };
    _this.$link = dom.createVdom(linkVnode);

    _this.$editor.appendChild(_this.$link);
    /**
     * ***************************************************
     * 输入处理
     * ***************************************************
     */
    // 链接：输入容器按钮


    var $submitBtn = dom.query('.submit-hook', _this.$link);
    var $cancelBtn = dom.query('.cancel-hook', _this.$link);
    var $linkInputs = dom.queryAll('input', _this.$link); // 确定

    dom.addEvent($submitBtn, 'click', function (e) {
      var $el = e.currentTarget; // const className = el.className

      if (dom.hasClass('disabled', $el)) return; // 创建url，并添加至焦点出

      var url = $linkInputs[0].value;
      var title = $linkInputs[1].value;

      if (url) {
        _this.addLink(url, title);

        _this.$link.style.display = 'none';
      }
    }, false); // 取消

    dom.addEvent($cancelBtn, 'click', function (e) {
      _this.$link.style.display = 'none';
    }, false); // 链接输入框

    dom.addEvent($linkInputs[0], 'keyup', function (e) {
      var val = $linkInputs[0].value;

      if (util.isHttpUrl(val)) {
        if (dom.hasClass('disabled', $submitBtn)) {
          dom.removeClass('disabled', $submitBtn);
        }
      }
    }, false);
  }

  /**
   * Created by capricorncd 8/1/2018
   * https://github.com/capricorncd
   */

  var TOOL_BAR_ICONS = ['pic', 'emoji', 'text', 'link']; // toolbar配置

  var TOOL_BAR_OPTIONS = Object.create(null);
  TOOL_BAR_OPTIONS.pic = {
    name: 'pic',
    class: '__pic',
    icon: '',
    on: 'select-picture'
  };
  TOOL_BAR_OPTIONS.emoji = {
    name: 'emoji',
    class: '__emoji',
    icon: '',
    on: 'show-emoji'
  };
  TOOL_BAR_OPTIONS.text = {
    name: 'text',
    class: '__text',
    icon: '',
    on: 'show-textstyle'
  };
  TOOL_BAR_OPTIONS.link = {
    name: 'link',
    class: '__link',
    icon: '',
    on: 'add-link' // TOOL_BAR_OPTIONS.split = {
    //   name: 'split',
    //   class: '__split',
    //   icon: '',
    //   on: 'add-split-line'
    // }

    /**
     * 初始化toolbar
     * @param _this
     */

  };
  function initToolbar(_this) {
    // 获取参数
    var showToolbar = _this.options.showToolbar; // 获取图标

    var toolbarArray = Array.isArray(showToolbar) ? showToolbar : showToolbar ? TOOL_BAR_ICONS : [];
    /**
     * ***************************************************
     * 创建dom结构
     * ***************************************************
     */

    var toolbarVnoe = {
      tag: 'div',
      attrs: {
        class: 'zxeditor-toolbar-wrapper',
        style: toolbarArray.length ? '' : "display:none;"
      },
      child: [{
        tag: 'dl',
        child: handlerToolbarOptions(toolbarArray)
      }]
    };
    _this.$toolbar = dom.createVdom(toolbarVnoe);

    _this.$editor.appendChild(_this.$toolbar);

    calculationToolbarWidth(_this.$toolbar);
    /**
     * ***************************************************
     * 事件处理
     * ***************************************************
     */

    var $toolbarBtns = dom.queryAll('dd', _this.$toolbar); // 点击toolbar

    if ($toolbarBtns.length) {
      dom.addEvent($toolbarBtns, 'click', toolbarChildClickHandler);
    } // 阻止冒泡


    dom.addEvent(_this.$toolbar, 'click', function (e) {
      e.stopPropagation();
    }); // 创建fileInput

    var $fileInput = initFileInput();
    /**
     * 点击工具栏按钮处理函数
     * @param e
     */

    function toolbarChildClickHandler(e) {
      var $current = e.currentTarget; // 通知名称

      var customEvent = dom.data($current, 'on'); // 按钮名称

      var name = dom.data($current, 'name');

      _this.emit('debug', 'toolbarClick:', customEvent);

      switch (name) {
        // 图片
        case 'pic':
          if (_this.broadcast[customEvent]) {
            _this.emit(customEvent);
          } else if ($fileInput) {
            $fileInput.click();
          }

          break;
        // 表情

        case 'emoji':
          _this.emojiModal.show();

          break;
        // 文字样式

        case 'text':
          _this.textstyleModal.show();

          break;
        // 链接

        case 'link':
          if (_this.broadcast[customEvent]) {
            _this.emit(customEvent, function (url, title) {
              _this.addLink(url, title);
            });
          } else {
            _this.$link.style.display = 'flex';
          }

          break;
        // 分割线

        case 'split':
          dom.insertHr(_this.$cursorElm);
          break;
      }
    }
    /**
     * ***************************************************
     * 模拟选中图片文件
     * ***************************************************
     */

    /**
     * 初始化图片选择input[type=file]
     * @returns {*}
     */


    function initFileInput() {
      // 有自定义监听点击选择图片按钮
      if (_this.broadcast['select-picture']) return null; // 未设置监听事件，则模拟input[file]获取图片数据

      var $input = dom.createVdom({
        tag: 'input',
        attrs: {
          style: 'display: none',
          type: 'file',
          accept: 'image/*' // multiple: 'multiple'

        }
      }); // 添加至文档流中

      _this.$wrapper.appendChild($input); // 绑定change事件


      dom.addEvent($input, 'change', fileInputChangeHandler); // 清除value，防止选中同一文件不触发change事件

      dom.addEvent($input, 'click', function (e) {
        e.target.value = '';
      }); // 返回$input，模拟click[type=file]时使用

      return $input;
    }
    /**
     * input[file]选中文件后处理函数
     * @param e
     */


    function fileInputChangeHandler(e) {
      _this.emit('loading', '图片处理中...');

      var files = this.files; // 转数组

      var arr = util.slice(files);

      _this.emit('debug', '选中的文件', arr); // 处理图片数据
      // 等比缩放图片，最大宽度640


      _this.filesToBase64(arr, {
        width: 640
      }, function (err, res) {
        _this.emit('removeLoading');

        if (err) {
          err.forEach(function (errItem) {
            _this.emit('error', errItem);
          });
        }

        if (res) {
          // console.log(res)
          res.forEach(function (item) {
            _this.addImage(item.base64);
          });
        }
      });
    }
  }
  /**
   * 处理toolbar配置参数，
   * 生成vnode数据
   * @param options 配置参数
   * @returns {[null]}
   */

  function handlerToolbarOptions(toolbarArray) {
    var arr = []; // const _DEFAULT = {
    //   title: '',
    //   // 按钮外容器样式
    //   class: '',
    //   // 按钮内i元素样式名
    //   icon: '',
    //   // 需要注册的监听事件名
    //   on: ''
    // }

    var item;
    toolbarArray.forEach(function (keyName) {
      item = TOOL_BAR_OPTIONS[keyName];

      if (item) {
        arr.push({
          tag: 'dd',
          attrs: {
            class: "".concat(item.class),
            'data-name': item.name,
            'data-on': item.on
          },
          child: [{
            tag: 'i',
            attrs: {
              class: item.icon
            }
          }]
        });
      }
    });
    return arr;
  }
  /**
   * 计算toolbar宽度
   * @param $el
   */


  function calculationToolbarWidth($el) {
    var $dl = dom.query('dl', $el);
    var $dd = $dl.children;
    if (!$dd[0]) return; // 获取一个$dd元素的宽度

    var itemWidth = $dd[0].offsetWidth * $dd.length;
    $dl.style.width = itemWidth + 'px';
  }

  var MEDIA_TYPES = ['img', 'audio', 'video'];
  /**
   * 创建媒体元素
   * @param tag 媒体标签
   * @param url
   * @returns {*|Element}
   */

  function createMedia(tag, url) {
    var id = util.randStr("zxeditor_".concat(tag, "_"));
    var params = {
      src: url,
      width: '100%',
      height: 'auto',
      id: id
    };

    if (tag !== 'img') {
      params.controls = true;
    }

    return dom.createElm(tag, params); // $el.onload = function () {
    //   callback(null, $el)
    // }
    // $el.onerror = function (e) {
    //   callback(e)
    // }
  }
  /**
   * base64转换为Blob数据
   * @param base64Data
   * @returns {*}
   */

  function toBlobData(base64Data) {
    // base64数据格式:
    // "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAkGB+wgHBgkIBwgKCgkLDRYPDQw//9k="
    var type, onlyData;

    if (/^data:(\w+\/\w+);base64,(.+)/.test(base64Data)) {
      type = RegExp.$1;
      onlyData = RegExp.$2;
    } else {
      console.error("toBlobData(data), \"".concat(base64Data, "\" is not base64 data!"));
      return null;
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
   * 图片文件数据转为base64/blob
   * @param files原始文件数据数组
   * @param opts 处理参数
   * @param callback(errArray, sucArray)
   */

  function filesToBase64(files, opts, callback) {
    // check files
    if (!files) {
      callback([{
        msg: "files is not valid. is ".concat(files)
      }]);
      return;
    }

    var len = files.length; // check files type

    if (!len) {
      callback([{
        msg: "files's length is ".concat(len)
      }]);
      return;
    }

    if (typeof callback === 'undefined' && typeof opts === 'function') {
      callback = opts;
      opts = {};
    } // 文件最大限制


    var imageMaxSize = 10;

    try {
      // this 指向ZxEditor实例
      imageMaxSize = util.int(this.options.imageMaxSize);
    } catch (e) {} // 转换为 B(byte)


    imageMaxSize *= 1048576; // 文件数量

    var count = 0;
    var errArray = [];
    var sucArray = [];
    var i, file;

    for (i = 0; i < len; i++) {
      file = files[i]; // 非图片文件
      // if (!isImage(file.name)) {
      //   errArray.push({msg: `files[${i}]: "${file.name}" is not Image File!`})
      //   _checkCount()
      //   continue
      // }
      // 文件大小判断

      if (file.size > imageMaxSize) {
        errArray.push({
          msg: "files[".concat(i, "]: \"").concat(file.name, "\" size is beyond the ").concat(this.options.imageMaxSize, "MB!")
        });

        _checkCount();

        continue;
      }

      if (typeof EXIF === 'undefined') {
        opts.orientation = 0;

        _handler(file);
      } else {
        EXIF.getData(file, function () {
          var info = EXIF.getAllTags(this) || {}; // 拍摄方向

          opts.orientation = info.Orientation;

          _handler(file);
        });
      }
    } // end of for


    function _handler(file) {
      // 转换为Base64数据
      imgFileToBase64(file, opts, function (err, res) {
        if (err) {
          errArray.push(err);
        } else if (res) {
          sucArray.push(res);
        }

        _checkCount();
      });
    }
    /**
     * check 文件是否处理完成
     * @private
     */


    function _checkCount() {
      count++;
      if (len === count) callback(errArray.length ? errArray : null, sucArray.length ? sucArray : null);
    }

    files = null;
  } // 图片文件数据转为base64

  function imgFileToBase64(file, opts, callback) {
    // 实例化FileReader
    var reader = new FileReader(); // readAsDataURL方法用于读取指定Blob或File的内容。
    // 当读操作完成，readyState变为DONE, loadend被触发，
    // 此时result属性包含数据：URL以base64编码的字符串表示文件的数据。

    reader.readAsDataURL(file);

    reader.onload = function () {
      var base64 = this.result; // 文件类型判断

      if (!/^data:image\//i.test(base64)) {
        callback({
          msg: "\"".concat(file.name, "\" is not Image File!")
        });
        return;
      }

      opts.type = file.type;
      opts.size = file.size;
      opts.name = file.name; // 获取图片信息

      _getImageInfo(base64, opts, function (err, res) {
        if (err) {
          callback(err);
          return;
        } // gif文件, 不做任何处理


        if (opts.type === 'image/gif') {
          callback(err, res);
          return;
        }

        _handleImageData(res, opts, callback);
      });

      file = null;
    };

    reader.onerror = function (e) {
      callback({
        msg: "Error, FileReader \"".concat(file.name, "\"!"),
        data: e
      });
      file = null;
    };
  }
  /**
   * 创建图片，并获取信息
   * @param fileBase64Data
   * @param opts
   * @param callback
   * @private
   */


  function _getImageInfo(fileBase64Data, opts, callback) {
    var $img = new Image(); // 创建图片

    $img.src = fileBase64Data;
    $img.setAttribute('alt', opts.name); // 加载图片

    $img.onload = function (e) {
      // gif文件, 不做任何处理
      // 强制裁剪除外
      if (opts.type === 'image/gif' && opts.clip !== true) {
        var blob = toBlobData(fileBase64Data);
        callback(null, {
          element: $img,
          type: opts.type,
          width: $img.width,
          height: $img.height,
          data: blob,
          base64: fileBase64Data,
          size: opts.size,
          url: blobToUrl(blob),
          // 原始图片数据
          rawdata: {}
        });
        return;
      } // 旋转图片，并转为base64


      var result = rotateAndToBase64($img, opts);
      callback(null, result);
    };

    $img.onerror = function (e) {
      callback(e);
    };
  } // 处理图片数据

  /**
   * 处理图片数据，裁剪压缩
   * @param imageInfo 图片信息
   * @param opts 压缩参数
   * @param callback
   * @private
   */


  function _handleImageData(imageInfo, opts, callback) {
    // 文件类型
    var dataType = imageInfo.type; // 计算图片缩放或裁剪位置、尺寸

    var res = calculateCropInfo(imageInfo.width, imageInfo.height, opts);
    var canvas = imageInfo.element;
    var scaling = 2;
    var sw = res.sw;
    var sh = res.sh;
    var sx = res.sx;
    var sy = res.sy;

    if (res.scaling > scaling) {
      scaling = res.scaling;

      do {
        canvas = createCanvas(canvas, {
          cw: res.cw * scaling,
          ch: res.ch * scaling,
          sx: sx,
          sy: sy,
          sw: sw,
          sh: sh
        });
        sw = canvas.width;
        sh = canvas.height;
        sx = sy = 0;
        scaling -= 1;
      } while (scaling > 2);
    }

    canvas = createCanvas(canvas, {
      cw: res.cw,
      ch: res.ch,
      sx: sx,
      sy: sy,
      sw: sw,
      sh: sh
    });
    var base64 = canvas.toDataURL(dataType);
    var blob = toBlobData(base64, dataType);
    callback(null, {
      element: canvas,
      type: dataType,
      width: res.cw,
      height: res.ch,
      data: blob,
      base64: base64,
      size: blob.size,
      url: blobToUrl(blob),
      // 原始图片数据
      rawdata: imageInfo
    });
  }
  /**
   * 创建blob url
   * @param blob Blob数据
   * @returns {*}
   */


  function blobToUrl(blob) {
    return URL.createObjectURL(blob);
  }
  /**
   * 计算生成图片裁剪位置及尺寸
   * @param {Number} iw // 原图宽
   * @param {Number} ih // 原图高
   * @param {Object} opts 压缩，裁剪尺寸的参数
   */


  function calculateCropInfo(iw, ih, opts) {
    // 目标图片尺寸
    var targetWidth = util.int(opts.width);
    var targetHeight = util.int(opts.height); // 提示：图片实际尺寸，小于目标尺寸

    if (!opts.clip && targetWidth > 0 && iw < targetWidth && targetHeight > 0 && ih < targetHeight) {
      return {
        sx: 0,
        sy: 0,
        sw: iw,
        sh: ih,
        scaling: 1,
        cw: iw,
        ch: ih
      };
    } // 缩放比列


    var scaling = 1; // 图片开始裁剪位置 x,y坐标

    var sx = 0;
    var sy = 0; // canvas 尺寸

    var canvasWidth = iw;
    var canvasHieght = ih; // 等比缩放后的图片尺寸

    var sw = 0;
    var sh = 0; // 裁剪图片代码 **********************************
    // 等比缩放到合适大小，在居中裁剪

    if (targetWidth > 0 && targetHeight > 0) {
      // canvas的尺寸即为裁剪设置尺寸
      canvasWidth = targetWidth;
      canvasHieght = targetHeight; // 按目标宽度调整图片尺寸：图片宽度 === 裁剪框宽

      sw = targetWidth;
      sh = Math.floor(targetWidth * ih / iw);
      scaling = ratio(iw, targetWidth); // 图片高度超出裁剪框，能正常裁剪

      if (sh >= targetHeight) {
        sx = 0;
        sy = util.int((sh - targetHeight) / 2 * scaling);
      } // 不满足裁剪需求，需重新缩放：图片高度 === 裁剪框高度
      else {
          scaling = ratio(ih, targetHeight);
          sw = Math.floor(targetHeight * iw / ih);
          sh = targetHeight;
          sx = util.int((sw - targetWidth) / 2 * scaling);
          sy = 0;
        }
    } // 缩放图片代码 **********************************
    // 只设置了宽度
    else if (targetWidth > 0) {
        scaling = ratio(iw, targetWidth);
        canvasWidth = targetWidth;
        canvasHieght = Math.floor(targetWidth * ih / iw);
      } // 只设置了宽度
      else if (targetHeight > 0) {
          scaling = ratio(ih, targetHeight);
          canvasWidth = Math.floor(targetHeight * iw / ih);
          canvasHieght = targetHeight;
        }

    return {
      sx: sx,
      // 裁剪开始x坐标
      sy: sy,
      // 裁剪开始y坐标
      sw: util.int(canvasWidth * scaling),
      sh: util.int(canvasHieght * scaling),
      scaling: scaling,
      cw: canvasWidth,
      ch: canvasHieght
    };
  }
  /**
   * 创建Canvas
   * @param $el Image对象或Canvas元素
   * @param p 裁剪参数
   * @returns {Element}
   */


  function createCanvas($el, p) {
    var canvas = doc.createElement('canvas');
    canvas.width = p.cw;
    canvas.height = p.ch;
    var ctx = canvas.getContext('2d');
    ctx.drawImage($el, p.sx, p.sy, p.sw, p.sh, 0, 0, canvas.width, canvas.height);
    return canvas;
  }
  /**
   * 缩放比列
   * @param {Number} numerator 分子
   * @param {Number} denominator 分母
   */


  function ratio(numerator, denominator) {
    return parseInt(numerator / denominator * 10000) / 10000;
  }
  /**
   * 将图片转为base64数据，
   * 根据opts.orientation决定图片是否旋转
   * @param $img
   * @param opts
   * @returns {Object}
   */


  function rotateAndToBase64($img, opts) {
    var $canvas = dom.createElm('canvas');
    var ctx = $canvas.getContext('2d');
    var imgWidth = $canvas.width = $img.width;
    var imgHeight = $canvas.height = $img.height; // 如果方向角不为 1，都需要进行旋转 added by lzk

    if (opts.orientation > 1) {
      switch (opts.orientation) {
        // 旋转90度
        case 6:
          $canvas.width = imgHeight;
          $canvas.height = imgWidth;
          ctx.rotate(Math.PI / 2); // (0, -imgHeight) 从旋转原理图那里获得的起始点

          ctx.drawImage($img, 0, -imgHeight, imgWidth, imgHeight);
          break;
        // 旋转180度

        case 3:
          ctx.rotate(Math.PI);
          ctx.drawImage($img, -imgWidth, -imgHeight, imgWidth, imgHeight);
          break;

        case 8:
          // 旋转-90(270)度
          $canvas.width = imgHeight;
          $canvas.height = imgWidth;
          ctx.rotate(3 * Math.PI / 2);
          ctx.drawImage($img, -imgWidth, 0, imgWidth, imgHeight);
          break;
      }
    } else {
      ctx.drawImage($img, 0, 0, imgWidth, imgHeight);
    }

    return {
      element: $canvas,
      data: $canvas.toDataURL(opts.type),
      width: $canvas.width,
      height: $canvas.height,
      type: opts.type,
      size: opts.size
    };
  }

  /**
   * Created by Capricorncd
   * https://github.com/capricorncd
   * 2018-09-18 22:58
   */
  function initKeyboard(_this) {
    /**
     * ***************************************************
     * keyboard
     * ***************************************************
     */
    _this.keyboard = {
      height: 0
    };

    _this.setKeyboard = function (params) {
      var isUpdate = false;

      if (util.isObject(params)) {
        for (var key in params) {
          if (params.hasOwnProperty(key)) {
            _this.keyboard[key] = params[key];
            isUpdate = true;
          }
        }
      }

      if (isUpdate) {
        _this.resetContentPostion(_this.keyboard.height, _this.toolbarHeight);

        broadcast.emit('message', {
          msg: 'Property keyboard has been updated!'
        });
      }
    };
  }

  /**
   * Note:
   * 1. 非特殊说明，带$符号的属性为Element对象
   */

  var ZxEditor =
  /*#__PURE__*/
  function () {
    /**
     * constructor
     * @param selector
     * @param options
     * @constructor
     */
    function ZxEditor(selector, options) {
      _classCallCheck(this, ZxEditor);

      if (this instanceof ZxEditor) {
        this._init(selector, options);
      } else {
        throw new Error('ZxEditor is a constructor and should be called with the `new` keyword');
      }
    }
    /**
     * 初始化
     * @param selector
     * @param options
     * @private
     */


    _createClass(ZxEditor, [{
      key: "_init",
      value: function _init(selector, options) {
        // version
        this.version = '__VERSION__'; // broadcast

        this.broadcast = broadcast.broadcast; // 初始化dom、参数

        initMixin(this, selector, options); // 初始化 toolbar

        initToolbar(this); // 初始化 emojiModal

        initEmoji(this); // 初始化 textStyleModal

        initTextStyle(this); // 初始化link

        initLink(this); // 处理content容器相关的

        handleContent(this); // 移动端键盘

        initKeyboard(this); // 检查光标位置

        this.checkCursorPosition();
      }
      /**
       * 插入dom元素
       * @param $el
       * @param type
       * @param addRemoveIcon 添加remove icon
       */

    }, {
      key: "insertElm",
      value: function insertElm($el, type) {
        var _this2 = this;

        var addRemoveIcon = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        if (!$el) {
          this.emit('error', {
            msg: "insertElm($el), $el is ".concat($el)
          });
          return;
        } // 元素类型


        type = type || $el.nodeName.toLowerCase(); // console.log($el, type)
        // 将图片插入至合适位置

        this.$cursorElm = dom.insertToRangeElm($el, this.$cursorElm, 'child-node-is-' + type, addRemoveIcon); // 重置光标位置

        this.cursor.setRange(this.$cursorElm, 0); // 延时执行光标所在元素位置计算

        var tmr = setTimeout(function (_) {
          _this2.checkCursorPosition();

          clearTimeout(tmr);
          tmr = null;
        }, 350);
        broadcast.emit('change', 'content', this);
      }
      /**
       * 添加媒体元素
       * @param url
       * @param tag 媒体类型，img、audio、video
       */

    }, {
      key: "addMedia",
      value: function addMedia(url, tag) {
        this.emit('debug', 'addMedia start', url); // check media type

        if (!tag) {
          this.emit('error', {
            msg: "Unknown media type"
          });
          return;
        }

        if (MEDIA_TYPES.indexOf(tag) === -1) {
          this.emit('error', {
            msg: "Media type \"".concat(tag, "\" is not valid!")
          });
          return;
        }

        var $media = createMedia(tag, url);
        this.insertElm($media, tag, true);
      }
      /**
       * 向文档中添加图片
       * @param src
       */

    }, {
      key: "addImage",
      value: function addImage(src) {
        this.addMedia(src, 'img');
      }
      /**
       * 添加链接
       * @param title
       * @param url
       */

    }, {
      key: "addLink",
      value: function addLink(url, title) {
        this.emit('debug', 'addLink() is start', {
          url: url,
          title: title
        });
        if (!url) return;

        if (!title) {
          title = url;
        }

        var avnode = {
          tag: 'a',
          attrs: {
            href: url,
            // 'data-url': url,
            target: '_blank',
            contenteditable: false
          },
          child: [title, {
            tag: 'i',
            attrs: {
              class: '__remove'
            }
          }] // 创建$a元素

        };
        var $a = dom.createVdom(avnode);
        this.insertElm($a);
      }
      /**
       * 添加toolbar button
       * @param opts
       */

    }, {
      key: "addFooterButton",
      value: function addFooterButton(opts) {
        this.emit('debug', 'addFooterButton start');
        var arr = [];

        if (util.isObject(opts)) {
          arr.push(opts);
        } else if (Array.isArray(opts)) {
          arr = opts;
        } else {
          this.emit('error', {
            msg: 'addFooterButton failure',
            data: arr
          });
          return;
        }

        this._addToolbarChild(arr);
      }
    }, {
      key: "_addToolbarChild",
      value: function _addToolbarChild(arr) {
        var $dl = dom.query('dl', this.$toolbar);

        var _this = this;

        var $item, vnode;
        arr.forEach(function (item) {
          vnode = {
            tag: 'dd',
            attrs: {
              class: "".concat(item.class),
              'data-name': item.name,
              'data-on': item.on
            },
            child: [{
              tag: 'i',
              attrs: {
                class: item.icon
              }
            }]
          };
          $item = dom.createVdom(vnode);

          _addEvent($item, item);
        }); // 添加事件

        function _addEvent($item, item) {
          // 添加事件
          dom.addEvent($item, 'click', function (_) {
            _this.emit(item.on, item);
          });
          $dl.appendChild($item);
        }

        this.emit('debug', 'addFooterButton ended');
      }
      /**
       * 设置$content底部距离
       * @param pos
       * @param offset 偏移量，使文章内容更容易查看
       */

    }, {
      key: "resetContentPostion",
      value: function resetContentPostion(pos) {
        var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var isFixed = this.options.fixed;
        var styleName = isFixed ? 'bottom' : 'marginBottom';
        this.$content.style[styleName] = pos + util.int(offset) + 'px';
      }
      /**
       * 获取正文中的base64图片
       * @returns {Array}
       */

    }, {
      key: "getBase64Images",
      value: function getBase64Images() {
        var arr = [];
        var $imgs = dom.queryAll('img', this.$content);
        var $img, base64;

        for (var i = 0; i < $imgs.length; i++) {
          $img = $imgs[i];
          base64 = $img.src;

          if (/^data:.+?;base64,/.test(base64)) {
            arr.push({
              id: $img.id,
              base64: base64,
              blob: toBlobData(base64)
            });
          }
        }

        return arr;
      }
      /**
       * 设置指定id图片src
       * @param id
       * @param src
       * @returns {boolean}
       */

    }, {
      key: "setImageSrc",
      value: function setImageSrc(id, src) {
        var $img = dom.query('#' + id, this.$content);

        if ($img) {
          $img.src = src;
          $img.removeAttribute('id');
          broadcast.emit('change', 'content', this);
          return true;
        }

        return false;
      }
      /**
       * 可视区间位置参数
       */

    }, {
      key: "_visiblePostion",
      value: function _visiblePostion() {
        // const winW = window.innerWidth
        var winH = win.innerHeight;
        var opts = this.options;
        var top = util.int(opts.top); // 底部位置

        var bottom = 0; // 底部modal容器
        // 是否显示

        if (this.emojiModal && this.emojiModal.visible) {
          bottom = this.emojiModal.height;
        } else if (this.textstyleModal && this.textstyleModal.visible) {
          bottom = this.textstyleModal.height;
        } // 设置的bottom + 底部工具栏高度
        else {
            bottom = util.int(opts.bottom) + (opts.showToolbar ? this.toolbarHeight : 0);
          }

        var visiblePosition = {
          fixed: opts.fixed,
          // winWidth: winW,
          winHeight: winH,
          // startX: 0,
          // endX: winW,
          startY: top,
          endY: winH - bottom - top - util.int(this.keyboard.height)
        };
        this.emit('message', visiblePosition);
        return visiblePosition;
      }
      /**
       * 检查光标元素位置
       */

    }, {
      key: "checkCursorPosition",
      value: function checkCursorPosition() {
        var vpos = this._visiblePostion(); // 编辑器绝对定位时，光标位置交给系统处理


        if (vpos.fixed) return; // 编辑器失去焦点时的焦点元素

        var $el = this.$cursorElm;
        if (!$el) return; // 垂直偏移量，使内容滚动位置不要太贴边

        var offsetY = 10;
        var pos = $el.getBoundingClientRect();
        this.emit('message', '编辑器光标元素位置参数', pos); // documentElement scrollTop
        // let docScrollTop = d.documentElement.scrollTop
        // body scrollTop
        // let bodyScrollTop = d.body.scrollTop
        // 取最大值
        // let scrollTop = Math.max(docScrollTop, bodyScrollTop)

        var scrollTop = dom.getScroll('top'); // 获取滚动容器
        // let $body = docScrollTop >= bodyScrollTop ? d.documentElement : d.body

        var top = 0; // 焦点元素顶部在可视开始区域以上位置

        if (pos.top < vpos.startY) {
          top = scrollTop - (vpos.startY - pos.top) - offsetY; // dom.scrollTop($body, top)

          dom.scrollTop(win, top);
        } // 焦点元素底部在可视结束区域以下位置


        if (pos.bottom > vpos.endY) {
          top = scrollTop + vpos.endY + offsetY; // dom.scrollTop($body, top)

          dom.scrollTop(win, top);
        } // this.emit('message', {
        //   wrapper: $body.toString(),
        //   scrollTop: [
        //     'doc: ' + docScrollTop,
        //     'body: ' + bodyScrollTop
        //   ],
        //   top
        // })

      }
      /**
       * 设置内容
       * @param data
       */

    }, {
      key: "setContent",
      value: function setContent(data) {
        this.$content.innerHTML = data; // 检查内容是否为空

        if (!checkContentInnerNull(this.$content)) {
          removeContentClass(this.$content);
        } // 重新获取$content 内光标元素


        if (this.cursor) {
          // 初始化完成后
          this.$cursorElm = this.cursor.getRange();
        }

        broadcast.emit('change', 'content', this);
      }
      /**
       * 获取正文内容
       * @param isText 只需要文本内容，即不含html标签
       * 默认为false，获取html代码
       */

    }, {
      key: "getContent",
      value: function getContent() {
        var isText = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        // 获取文本内容
        if (isText) {
          return this.$content.innerText;
        } // 获取html内容
        // 处理文本节点


        var childNodes = this.$content.childNodes;
        var i, node;

        for (i = 0; i < childNodes.length; i++) {
          node = childNodes[i]; // 将非空文本节点，转换为p元素节点

          if (node.nodeType === 3) {
            var text = util.trim(node.nodeValue);

            if (text) {
              var $p = dom.createElm('p');
              $p.innerText = text;
              this.$content.replaceChild($p, node);
            }
          }
        }

        return this.$content.innerHTML;
      }
      /**
       * 自动保存
       * @param interval 保存间隔时间，单位秒
       */

    }, {
      key: "autoSave",
      value: function autoSave(interval) {
        var _this3 = this;

        if (typeof interval !== 'number' || interval <= 0) return;
        this.saveTimer = setInterval(function (_) {
          _this3.save();
        }, interval * 1000);
      }
      /**
       * 停止自动保存
       * @private
       */

    }, {
      key: "stopAutoSave",
      value: function stopAutoSave() {
        if (this.saveTimer) {
          clearInterval(this.saveTimer);
          this.saveTimer = null;
        }
      }
      /**
       * 本地存储
       */

    }, {
      key: "save",
      value: function save() {
        this.storage.set('content', this.getContent());
      }
      /**
       * 移除本地存储的content内容
       */

    }, {
      key: "removeSave",
      value: function removeSave() {
        this.storage.remove('content');
      }
    }]);

    return ZxEditor;
  }(); // 扩展属性


  ZxEditor.prototype.on = broadcast.on;
  ZxEditor.prototype.off = broadcast.off;
  ZxEditor.prototype.emit = broadcast.emit;
  ZxEditor.prototype.toBlobData = toBlobData;
  ZxEditor.prototype.filesToBase64 = filesToBase64;

  for (var key in dom) {
    if (dom.hasOwnProperty(key)) {
      ZxEditor.prototype[key] = dom[key];
    }
  }

  for (var _key in util) {
    if (util.hasOwnProperty(_key)) {
      ZxEditor.prototype[_key] = util[_key];
    }
  }

  exports.ZxEditor = ZxEditor;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
