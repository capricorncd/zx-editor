function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.unknown = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.ZxEditor = void 0;

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

  function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

  function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

  function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

  function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

  function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

  function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

  function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

  /*!
   * zx-editor v3.1.0
   * https://github.com/capricorncd/zx-editor
   * Released under the MIT License
   * Released on: Tue May 10 2022 22:22:39 GMT+0900 (Japan Standard Time)
   * Copyright © 2018-present, capricorncd
   */

  /**
   * Created by Capricorncd.
   * https://github.com/capricorncd
   * Date: 2022/05/05 14:47:02 (GMT+0900)
   */

  /**
   * to snake case
   * helloWorld => hello-world
   * helloWorld => hello_world
   * helloWorld => hello world
   * @param str
   * @param connectSymbol word connect symbol
   */
  var toSnakeCase = function toSnakeCase(str) {
    var connectSymbol = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '-';
    return str.replace(/[A-Z]/g, function (s) {
      return "".concat(connectSymbol).concat(s.toLowerCase());
    });
  };
  /**
   * to camel case
   * hello_world => helloWorld
   * hello-world => helloWorld
   * hello world => helloWorld
   * @param str
   */


  var toCamelCase = function toCamelCase(str) {
    return str.replace(/[-_\s](\w)/g, function (_, s) {
      return s.toUpperCase();
    });
  };

  var slice = function slice(arrLike) {
    var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    return Array.prototype.slice.call(arrLike, offset);
  };
  /**
   * Created by Capricorncd.
   * https://github.com/capricorncd
   * Date: 2022/05/05 10:55:25 (GMT+0900)
   */


  var $ = function $(selector) {
    var doc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
    if (selector instanceof HTMLElement) return selector;
    return doc.querySelector(selector);
  }; // export const $$ = <T extends HTMLElement>(selector: string, doc: Document | HTMLElement = document): T[] => {
  //   return Array.prototype.slice.call(doc.querySelectorAll(selector), 0)
  // }


  var createElement = function createElement(tag) {
    var attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var innerHTML = arguments.length > 2 ? arguments[2] : undefined;
    var el = document.createElement(tag);

    for (var _i = 0, _Object$entries = Object.entries(attrs); _i < _Object$entries.length; _i++) {
      var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
          key = _Object$entries$_i[0],
          val = _Object$entries$_i[1];

      el.setAttribute(key, val);
    }

    if (innerHTML) el.innerHTML = innerHTML;
    return el;
  };
  /**
   * 将样式对象转换为字符串
   * {color: 'red', fontSize: '16px'} => 'color:red;font-size:16px'
   * @param data
   * @param extendStyles
   */


  var createStyles = function createStyles(data, extendStyles) {
    if (extendStyles) {
      // 防止extendStyles存在snake的属性，不能成功覆盖旧样式
      // data['lineHeight'] = 1.5, extendStyles['line-height'] = ''
      for (var _i2 = 0, _Object$entries2 = Object.entries(extendStyles); _i2 < _Object$entries2.length; _i2++) {
        var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2),
            key = _Object$entries2$_i[0],
            value = _Object$entries2$_i[1];

        data[toCamelCase(key)] = value;
      }
    }

    var arr = [];

    for (var _i3 = 0, _Object$entries3 = Object.entries(data); _i3 < _Object$entries3.length; _i3++) {
      var _Object$entries3$_i = _slicedToArray(_Object$entries3[_i3], 2),
          _key = _Object$entries3$_i[0],
          _value = _Object$entries3$_i[1];

      if (_value === '' || typeof _value === 'undefined' || _value === null) continue;
      arr.push("".concat(toSnakeCase(_key), ":").concat(_value));
    }

    return arr.join(';');
  };

  var replaceHtmlTag = function replaceHtmlTag(input, oldNodeName, newNodeName) {
    return input.replace(RegExp("(^<" + oldNodeName + ")|(" + oldNodeName + ">$)", "gi"), function (match) {
      return match.toUpperCase().replace(oldNodeName, newNodeName.toLowerCase());
    });
  };

  var isUlElement = function isUlElement(el) {
    return /UL|OL/.test(el.nodeName);
  };
  /**
   * is <br> section
   * <section><br></section>
   * @param el
   */


  var isBrSection = function isBrSection(el) {
    if (!el) return false;
    var nodes = slice(el.childNodes);
    return nodes.length === 1 && nodes[0].nodeName === 'BR';
  };

  var getStyles = function getStyles(el) {
    var style = el.getAttribute('style') || '';
    return style.split(/\s?;\s?/).reduce(function (prev, s) {
      var _s$split = s.split(/\s?:\s?/),
          _s$split2 = _slicedToArray(_s$split, 2),
          key = _s$split2[0],
          val = _s$split2[1];

      prev[toCamelCase(key)] = val;
      return prev;
    }, {});
  };
  /**
   * Created by Capricorncd.
   * https://github.com/capricorncd
   * Date: 2022/05/05 11:55:07 (GMT+0900)
   */


  var CLASS_NAME_EDITOR = 'zx-editor';
  var CLASS_NAME_CONTENT = "".concat(CLASS_NAME_EDITOR, "__content-wrapper");
  var ALLOWED_NODE_NAMES = ['SECTION', 'H1', 'H2', 'H3', 'H4', 'H5', 'BLOCKQUOTE', 'UL', 'OL'];
  var REPLACE_NODE_LIST = ['DIV', 'P', 'ARTICLE', 'ASIDE', 'DETAILS', 'SUMMARY', 'FOOTER', 'HEADER', 'MAIN', 'NAV', 'SECTION', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'BLOCKQUOTE'];
  var DEF_OPTIONS = {
    // 内容是否可以被编辑
    editable: true,
    // 编辑器输入内容绝对定位
    // fixed: false,
    // editor min height
    minHeight: '50vh',
    // style
    placeholder: 'Enter...',
    placeholderColor: '',
    lineHeight: 1.5,
    allowedNodeNames: ALLOWED_NODE_NAMES,
    // paragraph tail spacing, default 10px
    // paragraphTailSpacing: '',
    caretColor: '',
    textColor: '',
    // iphone会自动移动，难控制
    // 光标所在行距页面顶部的距离30px
    cursorOffsetTop: 30,
    // 自定义粘贴处理函数
    customPasteHandler: undefined,

    /**
     * ******************************
     * toolbar options
     * ******************************
     */
    // Has the toolbar been fixed?
    toolbarBeenFixed: true,
    toolbarHeight: 50,
    // buttons name, and order
    toolbarButtons: ['select-picture', 'text-style'],

    /**
     * ******************************
     * image options
     * ******************************
     */
    // customize Picture Handler
    // customPictureHandler: undefined,
    // image max width
    imageMaxWidth: 720,
    // image max size, unit Kib, default 20M
    imageMaxSize: 20480,
    // template
    imageSectionTemp: "<section class=\"child-is-picture\"><img src=\"{url}\" loading=\"lazy\"></section>",
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
    // textStyleColors: undefined,
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
  /**
   * Created by Capricorncd.
   * https://github.com/capricorncd
   * Date: 2022/05/05 10:32:12 (GMT+0900)
   */

  var NODE_NAME_SECTION = 'SECTION';
  var NODE_NAME_BR = 'BR';
  /**
   * Created by Capricorncd.
   * https://github.com/capricorncd
   * Date: 2022/05/09 21:12:46 (GMT+0900)
   */

  /**
   * init editor dom
   */

  var initEditorDom = function initEditorDom() {
    var el = createElement('div', {
      "class": CLASS_NAME_EDITOR
    });
    return el;
  };

  var createPseudoClassBefore = function createPseudoClassBefore(placeholder) {
    var _$;

    // 伪类content
    var beforeStyle = ".".concat(CLASS_NAME_EDITOR, " .").concat(CLASS_NAME_CONTENT, ".is-empty:before{content:'").concat(placeholder, "' !important;");
    var style = createElement('style', {
      type: 'text/css'
    }, beforeStyle);
    (_$ = $('head')) === null || _$ === void 0 ? void 0 : _$.append(style);
  };
  /**
   * init content dom
   * @param options
   */


  var initContentDom = function initContentDom(options) {
    var contentStyles = _objectSpread(_objectSpread({
      lineHeight: options.lineHeight,
      minHeight: options.minHeight,
      position: 'relative',
      overflowY: 'scroll',
      outline: 'none'
    }, options.styles), {}, {
      // placeholder
      '--placeholder-color': options.placeholderColor,
      '--line-height': options.lineHeight
    });

    createPseudoClassBefore(options.placeholder);
    if (options.caretColor) contentStyles.caretColor = options.caretColor;
    if (options.textColor) contentStyles.color = options.textColor;
    var contentAttrs = {
      "class": "".concat(CLASS_NAME_CONTENT, " is-empty"),
      style: createStyles(contentStyles)
    };
    if (options.editable) contentAttrs.contenteditable = 'true';
    var el = createElement('div', contentAttrs);
    el.innerHTML = "<section><br></section>"; // return

    return el;
  };
  /**
   *
   * @param input
   * @param tagName
   */


  var _changeNodeName = function changeNodeName(input) {
    var tagName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : NODE_NAME_SECTION;
    var oldNodeName = input.nodeName;
    var newNodeName = tagName.toUpperCase();
    if (oldNodeName === newNodeName) return input;
    var el = createElement(tagName);
    var parent = input.parentElement;
    var newEl; // LI元素处理：被修改的元素为UL/OL的内部元素

    if (oldNodeName === 'LI' && isUlElement(parent)) {
      // 替换当前LI元素标签为新元素标签
      el.innerHTML = replaceHtmlTag(input.outerHTML, oldNodeName, newNodeName); // 获取新元素

      newEl = el.firstChild; // 有多个LI元素

      if (parent.childElementCount > 1) {
        // 当前LI元素为UL的第一个元素
        if (parent.firstElementChild === input) {
          var _parent$parentElement;

          // 将新元素移动至UL/OL前面
          (_parent$parentElement = parent.parentElement) === null || _parent$parentElement === void 0 ? void 0 : _parent$parentElement.insertBefore(newEl, parent);
        } // 当前LI元素为UL的最后一个元素
        else if (parent.lastElementChild === input) {
          var _parent$parentElement2;

          var parentNext = (_parent$parentElement2 = parent.parentElement) === null || _parent$parentElement2 === void 0 ? void 0 : _parent$parentElement2.nextElementSibling; // 下一个兄弟元素存在，添加至下一个兄弟元素前面

          if (parentNext) {
            var _parentNext$parentEle;

            (_parentNext$parentEle = parentNext.parentElement) === null || _parentNext$parentEle === void 0 ? void 0 : _parentNext$parentEle.insertBefore(newEl, parentNext);
          } else {
            var _parent$parentElement3;

            // 下一个兄弟元素不存在，添加至内容尾部
            (_parent$parentElement3 = parent.parentElement) === null || _parent$parentElement3 === void 0 ? void 0 : _parent$parentElement3.append(newEl);
          }
        } // 当前LI元素为UL中间的一个元素，拆分当前UL/OL
        else {
          var _parent$parentElement4, _parent$parentElement5;

          var elList = slice(parent.children);
          var prevEl = createElement(parent.nodeName);
          var tempEl = elList.shift();

          while (tempEl) {
            if (tempEl === input) break;
            prevEl.append(tempEl);
            tempEl = elList.shift();
          }

          (_parent$parentElement4 = parent.parentElement) === null || _parent$parentElement4 === void 0 ? void 0 : _parent$parentElement4.insertBefore(prevEl, parent); // 将新元素插入到当前UL/OL元素前面

          (_parent$parentElement5 = parent.parentElement) === null || _parent$parentElement5 === void 0 ? void 0 : _parent$parentElement5.insertBefore(newEl, parent); // 删除被替换的对象元素

          parent.removeChild(input);
        }
      } // 只有一个LI元素
      else {
        var _parent$parentElement6, _parent$parentElement7;

        // 将新元素移动至UL/OL前面
        (_parent$parentElement6 = parent.parentElement) === null || _parent$parentElement6 === void 0 ? void 0 : _parent$parentElement6.insertBefore(newEl, parent); // 移除UL/OL空元素

        (_parent$parentElement7 = parent.parentElement) === null || _parent$parentElement7 === void 0 ? void 0 : _parent$parentElement7.removeChild(parent);
      }

      return newEl;
    }

    if (REPLACE_NODE_LIST.includes(oldNodeName)) {
      // change to ul, ol
      if (/UL|OL/.test(newNodeName)) {
        var prev = input.previousElementSibling;
        var next = input.nextElementSibling;

        if (prev && isUlElement(prev)) {
          el.innerHTML = replaceHtmlTag(input.outerHTML, oldNodeName, 'li');
          newEl = el.firstChild;
          prev.append(newEl);
          parent === null || parent === void 0 ? void 0 : parent.removeChild(input); // parent的下一个元素也为UL/OL元素，将其合并

          if (next && next.nodeName === prev.nodeName) {
            var _next$parentElement;

            var nextEls = slice(next.children);
            prev.append.apply(prev, _toConsumableArray(nextEls));
            (_next$parentElement = next.parentElement) === null || _next$parentElement === void 0 ? void 0 : _next$parentElement.removeChild(next);
          }
        } else if (next && isUlElement(next)) {
          el.innerHTML = replaceHtmlTag(input.outerHTML, oldNodeName, 'li');
          newEl = el.firstChild;
          next.insertBefore(newEl, next.firstElementChild);
          parent === null || parent === void 0 ? void 0 : parent.removeChild(input); // parent的上一个元素也为UL/OL元素，将其合并
          // 不可能发生never
        } else {
          // 替换当前元素为UL/OL
          newEl = el;
          el.innerHTML = replaceHtmlTag(input.outerHTML, oldNodeName, 'li');
          parent === null || parent === void 0 ? void 0 : parent.replaceChild(newEl, input);
        }
      } else {
        el.innerHTML = replaceHtmlTag(input.outerHTML, oldNodeName, newNodeName);
        newEl = el.firstChild;
        parent === null || parent === void 0 ? void 0 : parent.replaceChild(newEl, input);
      }

      return newEl;
    }

    el.append(input.cloneNode(true));
    parent === null || parent === void 0 ? void 0 : parent.replaceChild(el, input);
    return el;
  };

  var checkIsEmpty = function checkIsEmpty(el) {
    if (el.children.length <= 1 && isBrSection(el.children[0])) {
      el.classList.add('is-empty');
    } else {
      el.classList.remove('is-empty');
    }
  };
  /**
   * Created by Capricorncd.
   * https://github.com/capricorncd
   * Date: 2022/05/07 10:33:02 (GMT+0900)
   */


  var CursorClass = /*#__PURE__*/function () {
    function CursorClass(rootElement) {
      var _el$textContent;

      _classCallCheck(this, CursorClass);

      _defineProperty(this, "rootElement", void 0);

      _defineProperty(this, "timer", void 0);

      this.rootElement = rootElement;
      this.timer = null; // init range

      var el = rootElement.lastElementChild;
      if (el) this.setRange(el, (_el$textContent = el.textContent) === null || _el$textContent === void 0 ? void 0 : _el$textContent.length);
    }

    _createClass(CursorClass, [{
      key: "getRange",
      value: function getRange() {
        try {
          var _window$getSelection;

          // @ts-ignore
          return (_window$getSelection = window.getSelection()) === null || _window$getSelection === void 0 ? void 0 : _window$getSelection.getRangeAt(0);
        } catch (e) {// ..
        }

        return new Range();
      }
      /**
       * 获取当前元素的最后一个无子节点的节点
       * @param el
       * @private
       */

    }, {
      key: "_getLastNode",
      value: function _getLastNode(el) {
        var node = el;

        while (node.lastChild) {
          node = node.lastChild;
        }

        return node;
      }
    }, {
      key: "setRange",
      value: function setRange(el, offset) {
        var range = this.getRange(); // remove all range object

        var selection = window.getSelection();
        if (selection) selection.removeAllRanges(); // el: '<section>inner text.</section>'
        // let targetNode = el.childNodes[el.childNodes.length - 1] || el
        // // check img/video/audio
        // if (/IMG|VIDEO|AUDIO/.test(targetNode.nodeName)) {
        //   offset = 1
        //   // get parentNode, can't set offset = 1 of IMG node.
        //   targetNode = targetNode.parentNode as HTMLElement
        // }

        var targetNode = this._getLastNode(el);

        if (typeof offset === 'undefined') {
          var _targetNode$textConte, _targetNode$textConte2;

          offset = (_targetNode$textConte = (_targetNode$textConte2 = targetNode.textContent) === null || _targetNode$textConte2 === void 0 ? void 0 : _targetNode$textConte2.length) !== null && _targetNode$textConte !== void 0 ? _targetNode$textConte : 0;
        }

        range.setStart(targetNode, offset); // cursor start and end position is collapse

        range.collapse(true);

        this._clearTimeout(); // 延时执行，键盘自动收起后再触发focus
        // @ts-ignore


        this.timer = setTimeout(function () {
          // 插入新的光标对象
          selection === null || selection === void 0 ? void 0 : selection.addRange(range);
        }, 100);
      }
    }, {
      key: "_clearTimeout",
      value: function _clearTimeout() {
        if (this.timer) {
          clearTimeout(this.timer);
          this.timer = null;
        }
      }
    }, {
      key: "getCurrentNode",
      value: function getCurrentNode() {
        var isOnlyContentChild = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        var range = this.getRange();
        var currentNode = range.endContainer;

        while (currentNode && this.rootElement !== currentNode) {
          var _currentNode$parentEl;

          // li元素判断
          if (!isOnlyContentChild && currentNode.nodeName === 'LI' && ((_currentNode$parentEl = currentNode.parentElement) === null || _currentNode$parentEl === void 0 ? void 0 : _currentNode$parentEl.parentElement) === this.rootElement) {
            return currentNode;
          }

          if (currentNode.parentElement === this.rootElement) {
            return currentNode;
          } else {
            currentNode = currentNode.parentNode;
          }
        }

        return this.rootElement.lastElementChild;
      }
    }]);

    return CursorClass;
  }();

  var EventEmitter = /*#__PURE__*/function () {
    function EventEmitter() {
      _classCallCheck(this, EventEmitter);

      _defineProperty(this, "eventList", void 0);

      this.eventList = {};
    }
    /**
     * on
     * @param eventName
     * @param fn
     */


    _createClass(EventEmitter, [{
      key: "on",
      value: function on(eventName, fn) {
        if (!eventName || !fn || typeof fn !== 'function') return;

        if (!this.eventList[eventName]) {
          this.eventList[eventName] = [];
        }

        this.eventList[eventName].push(fn);
      }
      /**
       * emit
       * @param eventName
       * @param args
       */

    }, {
      key: "emit",
      value: function emit(eventName) {
        var fnList = this.eventList[eventName];
        if (!fnList) return;

        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key2 = 1; _key2 < _len; _key2++) {
          args[_key2 - 1] = arguments[_key2];
        }

        for (var i = 0; i < fnList.length; i++) {
          try {
            fnList[i].apply(null, args);
          } catch (e) {
            this.emit('error', e, 'emit');
          }
        }
      }
      /**
       * off
       * @param eventName
       * @param fn
       */

    }, {
      key: "off",
      value: function off(eventName, fn) {
        if (!this.eventList[eventName]) return;
        var eventList = this.eventList[eventName];

        if (typeof fn === 'function') {
          var index = eventList.findIndex(function (item) {
            return item === fn;
          });
          if (index >= 0) eventList.splice(index, 1);
        } else {
          this.eventList[eventName].length = 0;
        }

        this._removeEmpty(eventName);
      }
      /**
       * remove empty event list
       * @param eventName
       * @private
       */

    }, {
      key: "_removeEmpty",
      value: function _removeEmpty(eventName) {
        if (!this.eventList[eventName].length) {
          delete this.eventList[eventName];
        }
      }
    }, {
      key: "destroyEventEmitter",
      value: function destroyEventEmitter() {
        var _this = this;

        Object.keys(this.eventList).forEach(function (key) {
          return _this.off(key);
        });
      }
    }]);

    return EventEmitter;
  }();
  /**
   * Created by Capricorncd.
   * https://github.com/capricorncd
   * Date: 2022/05/05 10:29:43 (GMT+0900)
   */


  var ZxEditor = /*#__PURE__*/function (_EventEmitter) {
    _inherits(ZxEditor, _EventEmitter);

    var _super = _createSuper(ZxEditor);

    // 编辑器外部容器HTML元素
    // 版本
    // 参数
    // 编辑器HTML元素
    // 编辑器内容区域HTML元素
    // 光标处理对象
    // 内容元素事件处理函数
    // 内容中允许使用的元素标签
    function ZxEditor(selector, options) {
      var _this2;

      _classCallCheck(this, ZxEditor);

      _this2 = _super.call(this);

      _defineProperty(_assertThisInitialized(_this2), "$wrapper", void 0);

      _defineProperty(_assertThisInitialized(_this2), "version", void 0);

      _defineProperty(_assertThisInitialized(_this2), "options", void 0);

      _defineProperty(_assertThisInitialized(_this2), "$editor", void 0);

      _defineProperty(_assertThisInitialized(_this2), "$content", void 0);

      _defineProperty(_assertThisInitialized(_this2), "cursor", void 0);

      _defineProperty(_assertThisInitialized(_this2), "_contentEvent", void 0);

      _defineProperty(_assertThisInitialized(_this2), "allowedNodeNames", void 0);

      if (!(_assertThisInitialized(_this2) instanceof ZxEditor)) {
        throw new Error('ZxEditor is a constructor and should be called with the `new` keyword');
      }
      /**
       * ***************************************************
       * check selector
       * ***************************************************
       */


      var container = $(selector);

      if (!container) {
        throw new Error("Can't found '".concat(selector, "' Node in document!"));
      }

      _this2.$wrapper = container; // version

      _this2.version = '3.1.0'; // options

      _this2.options = _objectSpread(_objectSpread({}, DEF_OPTIONS), options);
      _this2.allowedNodeNames = (_this2.options.allowedNodeNames || ALLOWED_NODE_NAMES).map(function (item) {
        return item.toUpperCase();
      }); // elements

      _this2.$content = initContentDom(_this2.options);
      _this2.$editor = initEditorDom();

      _this2.$editor.append(_this2.$content);

      _this2.$wrapper.append(_this2.$editor); // cursor


      _this2.cursor = new CursorClass(_this2.$content); // content event handler

      _this2._contentEvent = function (e) {
        var type = e.type;
        if (type === 'blur') _this2._lastLine();

        _this2.emit(type === 'input' ? 'change' : type, e);

        checkIsEmpty(_this2.$content);
      };

      _this2._initEvents();

      return _this2;
    }
    /**
     * init events
     * @private
     */


    _createClass(ZxEditor, [{
      key: "_initEvents",
      value: function _initEvents() {
        this.$content.addEventListener('focus', this._contentEvent);
        this.$content.addEventListener('blur', this._contentEvent);
        this.$content.addEventListener('input', this._contentEvent);
      }
      /**
       * 扩展插件
       * @param plugin
       */

    }, {
      key: "use",
      value: function use(plugin) {
        if (typeof plugin.install === 'function') {
          plugin.install(this);
        }
      }
      /**
       * plugin
       * @param fn
       */

    }, {
      key: "plugin",
      value: function plugin(fn) {
        if (typeof fn === 'function') fn.call(this);
      }
      /**
       * 设置编辑器内容，会覆盖之前内容
       * set html to the content element
       * @param html
       */

    }, {
      key: "setHtml",
      value: function setHtml(html) {
        this.$content.innerHTML = '';
        this.insert(html);

        this._lastLine();
      }
      /**
       * 获取编辑器中的HTML代码，会自动去除结尾处的空行
       * get html string from content element
       * remove last line that `<section><br></section>`
       * @return html string
       */

    }, {
      key: "getHtml",
      value: function getHtml() {
        return this.$content.innerHTML.replace(/<section><br><\/section>$/, '');
      }
      /**
       * 向编辑器中插入内容/HTML代码/元素等
       * insert html or element to content element
       * @param input
       */

    }, {
      key: "insert",
      value: function insert(input) {
        var _this3 = this;

        // insert HTMLElement
        if (input instanceof HTMLElement) {
          this._insert(input);
        } // insert string
        else {
          var el = createElement('div');
          el.innerHTML = input;
          slice(el.childNodes).forEach(function (node) {
            // element node
            if (node.nodeType === Node.ELEMENT_NODE) {
              // <br> element
              if (node.nodeName === NODE_NAME_BR) {
                _this3._insert(createElement(NODE_NAME_SECTION, {}, '<br/>'));
              } else {
                _this3._insert(node);
              }
            } // text
            else if (node.textContent) {
              _this3._insert(createElement(NODE_NAME_SECTION, {}, node.textContent));
            }
          });
        }
      }
      /**
       * insert element to content element
       * @param input
       * @private
       */

    }, {
      key: "_insert",
      value: function _insert(input) {
        var currentSection = this.cursor.getCurrentNode();

        if (currentSection) {
          if (isBrSection(currentSection)) {
            this.$content.insertBefore(input, currentSection);
          } else {
            this.$content.insertBefore(input, currentSection.nextElementSibling);
          }
        } else {
          this.$content.append(input);
        }

        if (!this.allowedNodeNames.includes(input.nodeName)) {
          input = _changeNodeName(input, NODE_NAME_SECTION);
        }

        this.$content.dispatchEvent(new InputEvent('input')); // 设置光标元素对象

        this.cursor.setRange(input);
      }
      /**
       * 检查编辑器最后一段是否为空行，非空行则插入
       * append br section to content element when the lastElementChild is not a br section element
       * @private
       */

    }, {
      key: "_lastLine",
      value: function _lastLine() {
        if (!isBrSection(this.$content.lastElementChild)) {
          this.$content.appendChild(createElement('section', {}, '<br>'));
        }
      }
      /**
       * 修改光标所在元素的标签
       * @param nodeName
       */

    }, {
      key: "changeNodeName",
      value: function changeNodeName(nodeName) {
        // 判断nodeName是否被允许设置
        if (!this.allowedNodeNames.includes(nodeName.toUpperCase())) return false;
        var currentSection = this.cursor.getCurrentNode();
        return !!(currentSection && _changeNodeName(currentSection, nodeName));
      }
      /**
       * 修改光标所在元素的样式
       * @param styles
       * @param value
       */

    }, {
      key: "changeStyles",
      value: function changeStyles(styles, value) {
        var current = this.cursor.getCurrentNode(true);

        if (current) {
          var s = typeof styles === 'string' ? _defineProperty({}, styles, value) : styles;
          current.setAttribute('style', createStyles(getStyles(current), s));
        }
      }
      /**
       * 销毁事件
       * destroy events
       */

    }, {
      key: "destroy",
      value: function destroy() {
        this.$content.removeEventListener('focus', this._contentEvent);
        this.$content.removeEventListener('blur', this._contentEvent);
        this.$content.removeEventListener('input', this._contentEvent);
        this.destroyEventEmitter();
      }
    }]);

    return ZxEditor;
  }(EventEmitter);

  _exports.ZxEditor = ZxEditor;
});
//# sourceMappingURL=zx-editor.js.map
