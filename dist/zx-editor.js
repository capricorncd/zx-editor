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

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

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
   * Released on: Sun May 08 2022 17:06:00 GMT+0900 (Japan Standard Time)
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
  // export const toCamelCase = (str: string): string => {
  //   return str.replace(/[-_\s](\w)/g, (_, s) => s.toUpperCase())
  // }


  var slice = function slice(arrLike) {
    var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    return Array.prototype.slice.call(arrLike, offset);
  };
  /**
   * Created by Capricorncd.
   * https://github.com/capricorncd
   * Date: 2022/05/05 11:55:07 (GMT+0900)
   */


  var CLASS_NAME_EDITOR = 'zx-editor';
  var CLASS_NAME_CONTENT = 'zx-editor-content-wrapper';
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
   * Date: 2022/05/05 10:55:25 (GMT+0900)
   */

  var REPLACE_NODE_LIST = ['DIV', 'P', 'ARTICLE', 'ASIDE', 'DETAILS', // 'SUMMARY',
  'FOOTER', 'HEADER', 'MAIN', 'NAV'];

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

  var createStyles = function createStyles(data) {
    var arr = [];

    for (var _i2 = 0, _Object$entries2 = Object.entries(data); _i2 < _Object$entries2.length; _i2++) {
      var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2),
          key = _Object$entries2$_i[0],
          value = _Object$entries2$_i[1];

      arr.push("".concat(toSnakeCase(key), ":").concat(value));
    }

    return arr.join(';');
  };

  var replace = function replace(input, oldNodeName, newNodeName) {
    return input.replace(RegExp("(^<" + oldNodeName + ")|(" + oldNodeName + ">$)", "gi"), function (match) {
      return match.toUpperCase().replace(oldNodeName, newNodeName.toLowerCase());
    });
  };
  /**
   *
   * @param input
   * @param tagName
   */


  var changeNodeName = function changeNodeName(input) {
    var tagName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : NODE_NAME_SECTION;
    var oldNodeName = input.nodeName;
    var newNodeName = tagName.toUpperCase();
    if (oldNodeName === newNodeName) return input;
    var el = createElement(tagName);
    var parent = input.parentElement;

    if (REPLACE_NODE_LIST.includes(oldNodeName)) {
      el.innerHTML = replace(input.outerHTML, oldNodeName, newNodeName);
      parent === null || parent === void 0 ? void 0 : parent.replaceChild(el.firstChild, input);
      return el.firstChild;
    }

    el.append(input.cloneNode(true));
    parent === null || parent === void 0 ? void 0 : parent.replaceChild(el, input);
    return el;
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
  /**
   * Created by Capricorncd.
   * https://github.com/capricorncd
   * Date: 2022/05/07 10:33:02 (GMT+0900)
   */


  var CursorClass = /*#__PURE__*/function () {
    function CursorClass(rootElement) {
      _classCallCheck(this, CursorClass);

      _defineProperty(this, "rootElement", void 0);

      _defineProperty(this, "selection", void 0);

      _defineProperty(this, "range", void 0);

      _defineProperty(this, "timer", void 0);

      this.rootElement = rootElement;
      this.selection = window.getSelection();
      this.range = this.selection ? this.selection.getRangeAt(0) : new Range();
      this.timer = null; // init range

      var el = rootElement.lastElementChild;

      if (el) {
        var _el$textContent;

        this.setRange(el, (_el$textContent = el.textContent) === null || _el$textContent === void 0 ? void 0 : _el$textContent.length);
      }
    }

    _createClass(CursorClass, [{
      key: "setRange",
      value: function setRange(el) {
        var _this = this;

        var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        // remove all range object
        if (this.selection) this.selection.removeAllRanges(); // el: '<section>inner text.</section>'

        var targetNode = el.childNodes[el.childNodes.length - 1] || el; // check img/video/audio
        // console.log(targetNode.nodeName, this.offset)

        if (/IMG|VIDEO|AUDIO/.test(targetNode.nodeName)) {
          offset = 1; // get parentNode, can't set offset = 1 of IMG node.

          targetNode = targetNode.parentNode;
        }

        this.range.setStart(targetNode, offset); // cursor start and end position is collapse

        this.range.collapse(true);

        this._clearTimeout(); // 延时执行，键盘自动收起后再触发focus


        this.timer = setTimeout(function () {
          var _this$selection;

          // 插入新的光标对象
          (_this$selection = _this.selection) === null || _this$selection === void 0 ? void 0 : _this$selection.addRange(_this.range);
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
        this.range = this.selection ? this.selection.getRangeAt(0) : new Range();
        var currentNode = this.range.endContainer;

        while (this.rootElement !== currentNode) {
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

        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
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
        var _this2 = this;

        Object.keys(this.eventList).forEach(function (key) {
          return _this2.off(key);
        });
      }
    }]);

    return EventEmitter;
  }();
  /**
   * Created by Capricorncd.
   * https://github.com/capricorncd
   * Date: 2022/05/05 11:07:32 (GMT+0900)
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
  /**
   * init content dom
   * @param options
   */


  var initContentDom = function initContentDom(options) {
    var contentStyles = _objectSpread({
      lineHeight: options.lineHeight,
      minHeight: options.minHeight,
      position: 'relative',
      overflowY: 'scroll',
      outline: 'none'
    }, options.styles);

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
   * Created by Capricorncd.
   * https://github.com/capricorncd
   * Date: 2022/05/05 10:29:43 (GMT+0900)
   */


  var ZxEditor = /*#__PURE__*/function (_EventEmitter) {
    _inherits(ZxEditor, _EventEmitter);

    var _super = _createSuper(ZxEditor);

    function ZxEditor(selector, options) {
      var _this3;

      _classCallCheck(this, ZxEditor);

      _this3 = _super.call(this);

      _defineProperty(_assertThisInitialized(_this3), "$wrapper", void 0);

      _defineProperty(_assertThisInitialized(_this3), "version", void 0);

      _defineProperty(_assertThisInitialized(_this3), "options", void 0);

      _defineProperty(_assertThisInitialized(_this3), "$editor", void 0);

      _defineProperty(_assertThisInitialized(_this3), "$content", void 0);

      _defineProperty(_assertThisInitialized(_this3), "cursor", void 0);

      _defineProperty(_assertThisInitialized(_this3), "_contentEvent", void 0);

      if (!(_assertThisInitialized(_this3) instanceof ZxEditor)) {
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

      _this3.$wrapper = container; // version

      _this3.version = '3.1.0';
      console.log(_this3.version);
      _this3.options = _objectSpread(_objectSpread({}, DEF_OPTIONS), options);
      _this3.$content = initContentDom(_this3.options);
      _this3.$editor = initEditorDom();

      _this3.$editor.append(_this3.$content);

      _this3.$wrapper.append(_this3.$editor);

      _this3.$content.focus();

      _this3.cursor = new CursorClass(_this3.$content);

      _this3._contentEvent = function (e) {
        var type = e.type;
        if (type === 'blur') _this3._lastLine();

        _this3.emit(type === 'input' ? 'change' : type, e);
      };

      _this3._initEvents();

      return _this3;
    }

    _createClass(ZxEditor, [{
      key: "_initEvents",
      value: function _initEvents() {
        this.$content.addEventListener('focus', this._contentEvent);
        this.$content.addEventListener('blur', this._contentEvent);
        this.$content.addEventListener('input', this._contentEvent);
      }
      /**
       * use
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
    }, {
      key: "setHtml",
      value: function setHtml(html) {
        this.$content.innerHTML = '';
        this.insert(html);

        this._lastLine();
      }
    }, {
      key: "getHtml",
      value: function getHtml() {
        return this.$content.innerHTML.replace(/<section><br><\/section>$/, '');
      }
      /**
       * Node.nodeType
       * ELEMENT_NODE  1
       * ATTRIBUTE_NODE  2
       * TEXT_NODE  3
       * CDATA_SECTION_NODE  4
       * PROCESSING_INSTRUCTION_NODE  7
       * COMMENT_NODE  8
       * DOCUMENT_NODE  9
       * DOCUMENT_TYPE_NODE  10
       * DOCUMENT_FRAGMENT_NODE  11
       * @param input
       */

    }, {
      key: "insert",
      value: function insert(input) {
        var _this4 = this;

        if (input instanceof HTMLElement) {
          this._insert(input);
        } else {
          var el = createElement('div');
          el.innerHTML = input;
          slice(el.childNodes).forEach(function (node) {
            if (node.nodeType === Node.ELEMENT_NODE) {
              if (node.nodeName === NODE_NAME_BR) {
                _this4._insert(createElement(NODE_NAME_SECTION, {}, '<br/>'));
              } else {
                _this4._insert(node);
              }
            } else if (node.textContent) {
              _this4._insert(createElement(NODE_NAME_SECTION, {}, node.textContent));
            }
          });
        }
      }
    }, {
      key: "_insert",
      value: function _insert(input) {
        console.log(input);
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

        changeNodeName(input, NODE_NAME_SECTION);
      }
    }, {
      key: "_lastLine",
      value: function _lastLine() {
        if (!isBrSection(this.$content.lastElementChild)) {
          this.$content.appendChild(createElement('section', {}, '<br>'));
        }
      }
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
