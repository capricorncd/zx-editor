/*!
 * zx-editor version 3.1.0
 * Author: capricorncd
 * Released under the MIT License
 * Repository: https://github.com/capricorncd/zx-editor
 * Released on: 2022-06-19 23:07:34 (GMT+0900)
 * Copyright © 2018-present, capricorncd
 */
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class EventEmitter {
  constructor() {
    __publicField(this, "eventList");
    this.eventList = {};
  }
  on(eventName, fn) {
    if (!eventName || !fn || typeof fn !== "function")
      return;
    if (!this.eventList[eventName]) {
      this.eventList[eventName] = [];
    }
    this.eventList[eventName].push(fn);
  }
  emit(eventName, ...args) {
    const fnList = this.eventList[eventName];
    if (!fnList)
      return;
    for (let i = 0; i < fnList.length; i++) {
      try {
        fnList[i].apply(null, args);
      } catch (e) {
        this.emit("error", e, "emit");
      }
    }
  }
  off(eventName, fn) {
    if (!this.eventList[eventName])
      return;
    const eventList = this.eventList[eventName];
    if (typeof fn === "function") {
      const index = eventList.findIndex((item) => item === fn);
      if (index >= 0)
        eventList.splice(index, 1);
    } else {
      this.eventList[eventName].length = 0;
    }
    this._removeEmpty(eventName);
  }
  _removeEmpty(eventName) {
    if (!this.eventList[eventName].length) {
      delete this.eventList[eventName];
    }
  }
  destroyEventEmitter() {
    Object.keys(this.eventList).forEach((key) => this.off(key));
  }
}
/*!
 * zx-sml version 0.1.1
 * Author: Capricorncd <capricorncd@qq.com>
 * Repository: https://github.com/capricorncd/zx-sml
 * Released on: 2022-06-19 23:05:31 (GMT+0900)
 */
var __defProp2 = Object.defineProperty;
var __getOwnPropSymbols2 = Object.getOwnPropertySymbols;
var __hasOwnProp2 = Object.prototype.hasOwnProperty;
var __propIsEnum2 = Object.prototype.propertyIsEnumerable;
var __defNormalProp2 = (obj, key, value) => key in obj ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues2 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp2.call(b, prop))
      __defNormalProp2(a, prop, b[prop]);
  if (__getOwnPropSymbols2)
    for (var prop of __getOwnPropSymbols2(b)) {
      if (__propIsEnum2.call(b, prop))
        __defNormalProp2(a, prop, b[prop]);
    }
  return a;
};
function isArray(input) {
  return Array.isArray(input);
}
function isObject(input) {
  return input !== null && !isArray(input) && typeof input === "object";
}
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var dateUtils2020 = { exports: {} };
/*! For license information please see date-utils-2020.js.LICENSE.txt */
(function(module, exports) {
  !function(e, t) {
    module.exports = t();
  }(typeof self != "undefined" ? self : commonjsGlobal, function() {
    return (() => {
      var e = { 949: (e2, t2) => {
        Object.defineProperty(t2, "__esModule", { value: true }), t2.toTwoDigits = void 0, t2.toTwoDigits = function(e3) {
          return e3[1] ? e3 : "0" + e3;
        };
      }, 607: (e2, t2, r) => {
        Object.defineProperty(t2, "__esModule", { value: true }), t2.toTwoDigits = t2.toDate = t2.formatDate = void 0;
        var n = r(949);
        Object.defineProperty(t2, "toTwoDigits", { enumerable: true, get: function() {
          return n.toTwoDigits;
        } });
        var i = { weeks: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] };
        function o(e3) {
          if (e3 instanceof Date)
            return e3;
          if (typeof e3 == "number")
            return new Date(e3);
          if (typeof e3 == "string") {
            var t3 = e3.trim();
            if (/^\d+$/.test(t3)) {
              var r2 = t3.length;
              return r2 === 8 ? new Date([t3.substr(0, 4), t3.substr(4, 2), t3.substr(6, 2)].join("/")) : r2 === 6 ? new Date([t3.substr(0, 4), t3.substr(4, 2), "01"].join("/")) : r2 === 4 ? new Date(t3 + "/01/01") : new Date(parseInt(e3));
            }
            if (t3 = t3.replace(/[年月日]/g, function(e4) {
              return e4 === "\u65E5" ? "" : "/";
            }).replace(/[(（（].*?[)））]/g, " ").replace(/\bam|pm\b/gi, " ").replace(/\s+/g, " "), /^(\d{4})[-/](\d{1,2})[-/](\d{1,2})$/.test(t3))
              return new Date([RegExp.$1, RegExp.$2, RegExp.$3].join("/"));
            if (/^(\d{4})[-/](\d{1,2})$/.test(t3))
              return new Date([RegExp.$1, RegExp.$2, "01"].join("/"));
            var n2 = new Date(t3);
            return isNaN(n2.getFullYear()) ? null : n2;
          }
          return null;
        }
        t2.formatDate = function(e3, t3, r2) {
          var s, a = o(e3);
          if (!a || !t3)
            return e3 + "";
          if (t3 === "timestamp")
            return a.getTime().toString();
          /(y+)/i.test(t3) && (s = RegExp.$1, t3 = t3.replace(s, (a.getFullYear() + "").substr(4 - s.length))), r2 && Array.isArray(r2.weeks) || (r2 = i);
          var u = { "M+": a.getMonth() + 1, "d+": a.getDate(), "h+": a.getHours(), "m+": a.getMinutes(), "s+": a.getSeconds(), "w+": a.getDay(), "W+": r2.weeks[a.getDay()], "a+": a.getHours() < 12 ? "am" : "pm", "A+": a.getHours() < 12 ? "AM" : "PM" };
          for (var f in u)
            if (new RegExp("(" + f + ")").test(t3)) {
              s = RegExp.$1;
              var g = u[f] + "";
              t3 = t3.replace(s, s.length === 1 ? g : n.toTwoDigits(g));
            }
          if (/(g)/i.test(t3)) {
            var p = a.toString().split(/\s+/).slice(5), l = t3.includes("g");
            t3 = t3.replace(/g/i, l ? p[0] : p.join(" "));
          }
          return t3;
        }, t2.toDate = o;
      } }, t = {};
      return function r(n) {
        if (t[n])
          return t[n].exports;
        var i = t[n] = { exports: {} };
        return e[n](i, i.exports, r), i.exports;
      }(607);
    })();
  });
})(dateUtils2020);
function toSnakeCase(input = "", connectSymbol = "-") {
  return input.replace(/[A-Z]/g, (s, offset) => `${offset > 0 ? connectSymbol : ""}${s.toLowerCase()}`);
}
function toCamelCase(input = "", isFirstCapitalLetter = false) {
  const result = input.replace(/[-_\s](\w)/g, (_, s) => s.toUpperCase());
  return isFirstCapitalLetter ? result.replace(/^\w/, (s) => s.toUpperCase()) : result;
}
function toString(input) {
  if (typeof input === "string")
    return input;
  if (input === null || typeof input === "undefined")
    return "";
  if (Array.isArray(input))
    return input.map(toString).join(" ");
  if (typeof input === "object") {
    return Object.keys(input).filter((key) => input[key]).join(" ");
  }
  return String(input);
}
function classNames(...args) {
  return args.map(toString).filter((item) => !!item).join(" ");
}
function slice(arrayLike, offset = 0) {
  return Array.prototype.slice.call(arrayLike, offset);
}
function formatKeys(obj = {}, isCamelCase = false) {
  const formatter = isCamelCase ? toCamelCase : toSnakeCase;
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    result[formatter(key)] = isObject(value) ? formatKeys(value, isCamelCase) : value;
  }
  return result;
}
function $(selector, doc = document) {
  if (selector instanceof HTMLElement)
    return selector;
  return doc.querySelector(selector);
}
function $$(selector, doc = document) {
  return slice(doc.querySelectorAll(selector));
}
function createElement(tag, attrs = {}, children) {
  const el = document.createElement(tag);
  for (const [key, val] of Object.entries(attrs)) {
    el.setAttribute(key, key === "style" && isObject(val) ? toStrStyles(val) : val);
  }
  if (children) {
    if (typeof children === "string") {
      el.innerHTML = children;
    } else {
      el.append(children);
    }
  }
  return el;
}
function toStrStyles(...args) {
  const styles = args.reduce((prev, obj) => {
    return __spreadValues2(__spreadValues2({}, prev), formatKeys(obj));
  }, {});
  const arr = [];
  for (const [key, value] of Object.entries(styles)) {
    if (value === "" || typeof value === "undefined" || value === null)
      continue;
    arr.push(`${key}:${value}`);
  }
  return arr.join(";");
}
dateUtils2020.exports.formatDate;
dateUtils2020.exports.toDate;
dateUtils2020.exports.toTwoDigits;
function isIPhoneX() {
  return window.screen.height === 812 && window.screen.width === 375;
}
const replaceHtmlTag = (input, oldNodeName, newNodeName) => {
  return input.replace(RegExp("(^<" + oldNodeName + ")|(" + oldNodeName + ">$)", "gi"), (match) => match.toUpperCase().replace(oldNodeName, newNodeName.toLowerCase()));
};
const isUlElement = (el) => {
  return /UL|OL/.test(el.nodeName);
};
const isBrSection = (el) => {
  if (!el)
    return false;
  const nodes = slice(el.childNodes);
  return nodes.length === 1 && nodes[0].nodeName === "BR";
};
const getStyles = (el, attr = "style") => {
  if (!el)
    return {};
  const style = el.getAttribute(attr) || "";
  return style.split(/\s?;\s?/).reduce((prev, s) => {
    const [key, val] = s.split(/\s?:\s?/);
    if (key)
      prev[toCamelCase(key)] = val;
    return prev;
  }, {});
};
const createTextNode = (str) => {
  return document.createTextNode(str);
};
const createNode = (vNode) => {
  if (!vNode)
    return null;
  if (typeof vNode === "string") {
    return createTextNode(vNode);
  }
  const { tag, attrs, child } = vNode;
  if (!tag && !attrs && !child)
    return null;
  const el = createElement(tag || "div", attrs);
  if (Array.isArray(child) && child.length) {
    let itemNode;
    child.forEach((item) => {
      itemNode = createNode(item);
      if (itemNode)
        el.appendChild(itemNode);
    });
  } else if (child && typeof child === "string") {
    el.appendChild(createTextNode(child));
  }
  return el;
};
const addClass = (el, className) => {
  el.classList.add(className);
};
const removeClass = (el, className) => {
  el.classList.remove(className);
};
const CLASS_NAME_ZX_EDITOR = "zx-editor";
const IPHONEX_BOTTOM_OFFSET_HEIGHT = 34;
const ALLOWED_NODE_NAMES = [
  "SECTION",
  "H1",
  "H2",
  "H3",
  "H4",
  "H5",
  "BLOCKQUOTE",
  "UL",
  "OL"
];
const REPLACE_NODE_LIST = [
  "DIV",
  "P",
  "ARTICLE",
  "ASIDE",
  "DETAILS",
  "SUMMARY",
  "FOOTER",
  "HEADER",
  "MAIN",
  "NAV",
  "SECTION",
  "H1",
  "H2",
  "H3",
  "H4",
  "H5",
  "H6",
  "BLOCKQUOTE"
];
const DEF_OPTIONS$2 = {
  editable: true,
  minHeight: "50vh",
  placeholder: "\u8BF7\u5728\u6B64\u8F93\u5165\u5185\u5BB9..",
  placeholderColor: "",
  lineHeight: 1.5,
  allowedNodeNames: ALLOWED_NODE_NAMES,
  caretColor: "",
  textColor: "",
  cursorOffsetTop: 30,
  customPasteHandler: void 0
};
const CLASS_NAME_EDITOR = `${CLASS_NAME_ZX_EDITOR}__editor`;
const NODE_NAME_SECTION = "SECTION";
const NODE_NAME_BR = "BR";
const setContentValueOfPseudoElementBefore = (placeholder) => {
  var _a;
  const beforeStyle = `.${CLASS_NAME_EDITOR}.is-empty:before{content:'${placeholder}' !important;`;
  const style = createElement("style", { type: "text/css" }, beforeStyle);
  (_a = $("head")) == null ? void 0 : _a.append(style);
};
const initContentDom = (options) => {
  const contentStyles = __spreadProps(__spreadValues({
    lineHeight: options.lineHeight,
    minHeight: options.minHeight,
    position: "relative",
    overflowY: "scroll",
    outline: "none"
  }, options.styles), {
    "--placeholder-color": options.placeholderColor,
    "--line-height": options.lineHeight
  });
  setContentValueOfPseudoElementBefore(options.placeholder);
  if (options.caretColor)
    contentStyles.caretColor = options.caretColor;
  if (options.textColor)
    contentStyles.color = options.textColor;
  const contentAttrs = {
    class: `${CLASS_NAME_EDITOR} is-empty`,
    style: toStrStyles(contentStyles)
  };
  if (options.editable)
    contentAttrs.contenteditable = "true";
  const el = createElement("div", contentAttrs);
  el.innerHTML = "<section><br></section>";
  return el;
};
const changeNodeName = (input, tagName = NODE_NAME_SECTION) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i;
  const oldNodeName = input.nodeName;
  const newNodeName = tagName.toUpperCase();
  if (oldNodeName === newNodeName)
    return input;
  const el = createElement(tagName);
  const parent = input.parentElement;
  let newEl;
  if (oldNodeName === "LI" && isUlElement(parent)) {
    el.innerHTML = replaceHtmlTag(input.outerHTML, oldNodeName, newNodeName);
    newEl = el.firstChild;
    if (parent.childElementCount > 1) {
      if (parent.firstElementChild === input) {
        (_a = parent.parentElement) == null ? void 0 : _a.insertBefore(newEl, parent);
      } else if (parent.lastElementChild === input) {
        const parentNext = (_b = parent.parentElement) == null ? void 0 : _b.nextElementSibling;
        if (parentNext) {
          (_c = parentNext.parentElement) == null ? void 0 : _c.insertBefore(newEl, parentNext);
        } else {
          (_d = parent.parentElement) == null ? void 0 : _d.append(newEl);
        }
      } else {
        const elList = slice(parent.children);
        const prevEl = createElement(parent.nodeName);
        let tempEl = elList.shift();
        while (tempEl) {
          if (tempEl === input)
            break;
          prevEl.append(tempEl);
          tempEl = elList.shift();
        }
        (_e = parent.parentElement) == null ? void 0 : _e.insertBefore(prevEl, parent);
        (_f = parent.parentElement) == null ? void 0 : _f.insertBefore(newEl, parent);
        parent.removeChild(input);
      }
    } else {
      (_g = parent.parentElement) == null ? void 0 : _g.insertBefore(newEl, parent);
      (_h = parent.parentElement) == null ? void 0 : _h.removeChild(parent);
    }
    return newEl;
  }
  if (REPLACE_NODE_LIST.includes(oldNodeName)) {
    if (/UL|OL/.test(newNodeName)) {
      const prev = input.previousElementSibling;
      const next = input.nextElementSibling;
      if (prev && isUlElement(prev)) {
        el.innerHTML = replaceHtmlTag(input.outerHTML, oldNodeName, "li");
        newEl = el.firstChild;
        prev.append(newEl);
        parent == null ? void 0 : parent.removeChild(input);
        if (next && next.nodeName === prev.nodeName) {
          const nextEls = slice(next.children);
          prev.append(...nextEls);
          (_i = next.parentElement) == null ? void 0 : _i.removeChild(next);
        }
      } else if (next && isUlElement(next)) {
        el.innerHTML = replaceHtmlTag(input.outerHTML, oldNodeName, "li");
        newEl = el.firstChild;
        next.insertBefore(newEl, next.firstElementChild);
        parent == null ? void 0 : parent.removeChild(input);
      } else {
        newEl = el;
        el.innerHTML = replaceHtmlTag(input.outerHTML, oldNodeName, "li");
        parent == null ? void 0 : parent.replaceChild(newEl, input);
      }
    } else {
      el.innerHTML = replaceHtmlTag(input.outerHTML, oldNodeName, newNodeName);
      newEl = el.firstChild;
      parent == null ? void 0 : parent.replaceChild(newEl, input);
    }
    return newEl;
  }
  el.append(input.cloneNode(true));
  parent == null ? void 0 : parent.replaceChild(el, input);
  return el;
};
const checkIsEmpty = (el) => {
  if (el.children.length <= 1 && isBrSection(el.children[0])) {
    el.classList.add("is-empty");
  } else {
    el.classList.remove("is-empty");
  }
};
class CursorClass {
  constructor(rootElement) {
    __publicField(this, "rootElement");
    __publicField(this, "timer");
    __publicField(this, "selection");
    __publicField(this, "range", new Range());
    var _a;
    this.rootElement = rootElement;
    this.timer = null;
    this.selection = window.getSelection();
    const el = rootElement.lastElementChild;
    if (el)
      this.setRange(el, (_a = el.textContent) == null ? void 0 : _a.length);
  }
  _getLastNode(el) {
    let node = el;
    while (node.lastChild) {
      node = node.lastChild;
    }
    return node;
  }
  setRange(el, offset) {
    var _a, _b, _c;
    if (!this.selection) {
      this.selection = window.getSelection();
      try {
        this.range = (_a = this.selection) == null ? void 0 : _a.getRangeAt(0);
      } catch (e) {
        this.range = new Range();
      }
    } else {
      this.selection.removeAllRanges();
    }
    let targetNode;
    if (el) {
      targetNode = this._getLastNode(el);
    } else {
      targetNode = this.range.endContainer;
    }
    console.log(targetNode);
    if (typeof offset === "undefined") {
      offset = (_c = (_b = targetNode.textContent) == null ? void 0 : _b.length) != null ? _c : 0;
    }
    this.range.setStart(targetNode, offset);
    this.range.collapse(true);
    this._clearTimeout();
    this.timer = setTimeout(() => {
      var _a2;
      (_a2 = this.selection) == null ? void 0 : _a2.addRange(this.range);
    }, 100);
  }
  _clearTimeout() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }
  getCurrentNode(isOnlyContentChild = false) {
    var _a;
    let currentNode = this.range.endContainer;
    while (currentNode && this.rootElement !== currentNode) {
      if (!isOnlyContentChild && currentNode.nodeName === "LI" && ((_a = currentNode.parentElement) == null ? void 0 : _a.parentElement) === this.rootElement) {
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
}
var editor = /* @__PURE__ */ (() => ':root{--placeholder-color: #999;--line-height: 1.5}.zx-editor__editor.is-empty:before{position:absolute;z-index:1;top:0;left:0;pointer-events:none;color:var(--placeholder-color);line-height:var(--line-height);content:""}\n')();
class Editor extends EventEmitter {
  constructor(options) {
    super();
    __publicField(this, "version");
    __publicField(this, "options");
    __publicField(this, "$editor");
    __publicField(this, "cursor");
    __publicField(this, "_eventHandler");
    __publicField(this, "allowedNodeNames");
    this.version = "3.1.0";
    this.options = __spreadValues(__spreadValues({}, DEF_OPTIONS$2), options);
    this.allowedNodeNames = (this.options.allowedNodeNames || ALLOWED_NODE_NAMES).map((item) => item.toUpperCase());
    this.$editor = initContentDom(this.options);
    options.container.append(this.$editor);
    this.cursor = new CursorClass(this.$editor);
    this._eventHandler = (e) => {
      const type = e.type;
      if (type === "blur")
        this._lastLine();
      this.emit(type === "input" ? "change" : type, e);
      checkIsEmpty(this.$editor);
      if (type === "click") {
        this.cursor.setRange(e.target);
      }
    };
    this._initEvents();
  }
  _initEvents() {
    this.$editor.addEventListener("focus", this._eventHandler);
    this.$editor.addEventListener("blur", this._eventHandler);
    this.$editor.addEventListener("input", this._eventHandler);
    this.$editor.addEventListener("click", this._eventHandler);
  }
  use(plugin, parentElement) {
    if (typeof plugin.install === "function") {
      plugin.install(this, parentElement);
    }
  }
  setHtml(html) {
    this.$editor.innerHTML = "";
    this.insert(html);
    this._lastLine();
  }
  getHtml() {
    return this.$editor.innerHTML.replace(/<section><br><\/section>$/, "");
  }
  insert(input) {
    if (input instanceof HTMLElement) {
      this._insert(input);
    } else {
      const el = createElement("div");
      el.innerHTML = input;
      slice(el.childNodes).forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          if (node.nodeName === NODE_NAME_BR) {
            this._insert(createElement(NODE_NAME_SECTION, {}, "<br/>"));
          } else {
            this._insert(node);
          }
        } else if (node.textContent) {
          this._insert(createElement(NODE_NAME_SECTION, {}, node.textContent));
        }
      });
    }
    this._dispatchChange();
  }
  _insert(input) {
    const currentSection = this.getCurrentNode();
    if (currentSection) {
      if (isBrSection(currentSection)) {
        this.$editor.insertBefore(input, currentSection);
      } else {
        this.$editor.insertBefore(input, currentSection.nextElementSibling);
      }
    } else {
      this.$editor.append(input);
    }
    if (!this.allowedNodeNames.includes(input.nodeName)) {
      input = changeNodeName(input, NODE_NAME_SECTION);
    }
    this.cursor.setRange(input);
  }
  _lastLine() {
    if (!isBrSection(this.$editor.lastElementChild)) {
      this.$editor.appendChild(createElement("section", {}, "<br>"));
    }
  }
  changeNodeName(nodeName) {
    if (!this.allowedNodeNames.includes(nodeName.toUpperCase()))
      return false;
    const currentSection = this.getCurrentNode();
    if (currentSection && changeNodeName(currentSection, nodeName)) {
      this._dispatchChange();
      return true;
    }
    return false;
  }
  changeStyles(styles, value) {
    const current = this.getCurrentNode(true);
    if (current) {
      const s = typeof styles === "string" ? { [styles]: value } : styles;
      current.setAttribute("style", toStrStyles(getStyles(current), s));
      this._dispatchChange();
    }
  }
  _dispatchChange() {
    this.$editor.dispatchEvent(new InputEvent("input"));
  }
  getStyles() {
    return getStyles(this.getCurrentNode());
  }
  getCurrentNode(isOnlyContentChild = false) {
    return this.cursor.getCurrentNode(isOnlyContentChild);
  }
  destroy() {
    this.$editor.removeEventListener("focus", this._eventHandler);
    this.$editor.removeEventListener("blur", this._eventHandler);
    this.$editor.removeEventListener("input", this._eventHandler);
    this.destroyEventEmitter();
  }
}
const createColorVNode = (colors) => {
  const arr = [];
  colors.forEach((color, i) => {
    if (/^#\w{3,6}$/.test(color)) {
      arr.push({
        tag: "dd",
        attrs: {
          class: i === 0 ? "active" : "",
          "data-color": formatColorHexadecimal(color.toLowerCase())
        },
        child: [
          {
            tag: "i",
            attrs: {
              style: `background:${color}`
            }
          }
        ]
      });
    }
  });
  return arr;
};
const formatColorHexadecimal = (hex) => {
  const len = hex.length;
  return len === 7 ? hex : `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`;
};
const DEF_OPTIONS$1 = {
  textStyleTitle: "Set Style",
  textStyleHeadLeftBtnText: "Clear style"
};
const DEF_COLORS = [
  "#333",
  "#d0d0d0",
  "#ff583d",
  "#fdaa25",
  "#44c67b",
  "#14b2e0",
  "#b065e2"
];
const STYLE_NODE_DATA = {
  tag: "dl",
  attrs: {
    class: "__style-wrapper border-bottom"
  },
  child: [
    {
      tag: "dd",
      attrs: {
        style: "font-weight: 800;",
        "data-style": "fontWeight:800"
      },
      child: ["B"]
    },
    {
      tag: "dd",
      attrs: {
        style: "font-style: italic;",
        "data-style": "fontStyle:italic"
      },
      child: ["I"]
    },
    {
      tag: "dd",
      attrs: {
        style: "text-decoration: line-through;",
        "data-style": "textDecoration:line-through"
      },
      child: ["abc"]
    },
    {
      tag: "dd",
      attrs: {
        style: "",
        "data-style": "textAlign:left",
        class: "text-align--l"
      }
    },
    {
      tag: "dd",
      attrs: {
        style: "",
        "data-style": "textAlign:center",
        class: "text-align--c"
      }
    },
    {
      tag: "dd",
      attrs: {
        style: "",
        "data-style": "textAlign:right",
        class: "text-align--r"
      }
    }
  ]
};
const TAG_NODE_DATA = {
  tag: "dl",
  attrs: {
    class: "__tag-wrapper"
  },
  child: [
    {
      tag: "dd",
      attrs: {
        class: "__h2",
        "data-tag": "h2"
      },
      child: ["\u5927\u6807\u9898", { tag: "i" }]
    },
    {
      tag: "dd",
      attrs: {
        class: "__h4",
        "data-tag": "h4"
      },
      child: ["\u5C0F\u6807\u9898", { tag: "i" }]
    },
    {
      tag: "dd",
      attrs: {
        class: "__section active",
        "data-tag": "section"
      },
      child: ["\u6B63\u6587", { tag: "i" }]
    },
    {
      tag: "dd",
      attrs: {
        class: "__blockquote",
        "data-tag": "blockquote"
      },
      child: ["\u5F15\u7528", { tag: "i" }]
    },
    {
      tag: "dd",
      attrs: {
        class: "__ul",
        "data-tag": "ul"
      },
      child: ["\u65E0\u5E8F\u5217\u8868", { tag: "i" }]
    }
  ]
};
var stylePanel = /* @__PURE__ */ (() => `@charset "UTF-8";.zx-editor-style-panel{position:fixed;z-index:9999;left:0;bottom:0;width:100%;height:30vh;transform:translateY(100%);overflow:hidden;background:#fff;transition:.3s transform ease-in-out}.zx-editor-style-panel.zx-editor-style-panel__fade-in{transform:translateY(0)}.zx-editor-style-panel__header{position:absolute;top:0;left:0;width:100%;height:44px;box-shadow:0 0 3px #0000001a;display:flex;align-items:center;justify-content:center}.zx-editor-style-panel__header__left{position:absolute;top:0;left:0;padding:0 10px;height:100%;font-size:.8em;color:#999;display:flex;align-items:center}.zx-editor-style-panel__header__switch{position:absolute;top:0;right:0;width:44px;height:44px;display:flex;align-items:center;justify-content:center;cursor:pointer}.zx-editor-style-panel__header__switch:after{display:inline-block;content:"";border-top:6px solid #999;border-left:6px solid transparent;border-right:6px solid transparent}.zx-editor-style-panel__body{position:absolute;top:44px;left:0;bottom:0;width:100%;overflow-x:hidden;overflow-y:auto}.zx-editor-style-panel__body .__style-wrapper{position:relative;display:flex;height:50px}.zx-editor-style-panel__body .__style-wrapper dd{position:relative;flex:1;line-height:50px;text-align:center;font-size:1.5em}.zx-editor-style-panel__body .__style-wrapper dd:after{position:absolute;top:0;right:0;height:50px;content:"";transform:scaleX(.5);border-right:1px solid #ddd}.zx-editor-style-panel__body .__style-wrapper dd:last-child:after{border-right-width:0}.zx-editor-style-panel__body .__style-wrapper dd.text-align--l:before,.zx-editor-style-panel__body .__style-wrapper dd.text-align--c:before,.zx-editor-style-panel__body .__style-wrapper dd.text-align--r:before{display:inline-block;content:"=";line-height:15px;width:20px;height:19px;border-top:2px solid #333;border-bottom:2px solid #333;box-sizing:border-box;overflow:hidden}.zx-editor-style-panel__body .__style-wrapper dd.text-align--l:before{text-indent:-10px}.zx-editor-style-panel__body .__style-wrapper dd.text-align--r:before{text-indent:8px}.zx-editor-style-panel__body .__color-wrapper{display:flex;position:relative;height:50px}.zx-editor-style-panel__body .__color-wrapper dd{flex:1;position:relative;height:50px;display:flex;justify-content:center;align-items:center}.zx-editor-style-panel__body .__color-wrapper dd i{position:relative;display:inline-block;width:32px;height:32px;border-radius:50%}.zx-editor-style-panel__body .__color-wrapper dd i:before,.zx-editor-style-panel__body .__color-wrapper dd i:after{content:"";position:absolute;width:26px;height:26px;border-radius:50%}.zx-editor-style-panel__body .__color-wrapper dd i:before{top:-1px;left:-1px;border:4px solid #fff}.zx-editor-style-panel__body .__color-wrapper dd i:after{top:1px;left:1px;border:2px solid #fff}.zx-editor-style-panel__body .__color-wrapper dd.active i:before{display:none}.zx-editor-style-panel__body .__tag-wrapper{border-top:5px solid #ddd}.zx-editor-style-panel__body .__tag-wrapper dd{position:relative;margin:0 20px;height:50px;line-height:50px;text-align:center}.zx-editor-style-panel__body .__tag-wrapper dd:after{position:absolute;bottom:0;left:0;width:100%;content:"";border-top:1px solid #ddd;transform:scaleY(.5)}.zx-editor-style-panel__body .__tag-wrapper dd:last-child:after{border-top:0}.zx-editor-style-panel__body .__tag-wrapper dd.__h2{font-size:1.2em;font-weight:800!important}.zx-editor-style-panel__body .__tag-wrapper dd.__h4{font-weight:800!important}.zx-editor-style-panel__body .__tag-wrapper dd.__blockquote:before{display:inline-block;vertical-align:top;margin:8px 4px 0 0;font-size:2em;content:'"'}.zx-editor-style-panel__body .__tag-wrapper dd.__ul:before{display:inline-block;vertical-align:top;margin-right:4px;font-size:1.5em;content:"\\b7"}.zx-editor-style-panel__body .__tag-wrapper dd i{display:none;position:absolute;z-index:1;top:18px;right:30px;width:14px;height:8px;transform:rotate(-45deg);border-left:2px solid #00c1b7;border-bottom:2px solid #00c1b7}.zx-editor-style-panel__body .__tag-wrapper dd.active i{display:inline-block}
`)();
const rootClassName = "zx-editor-style-panel";
const classNameFadeIn = `${rootClassName}__fade-in`;
class StylePanel {
  constructor(_options) {
    __publicField(this, "editorInstance", null);
    __publicField(this, "$el");
    __publicField(this, "_headerSwitchHandler");
    __publicField(this, "$elMap");
    __publicField(this, "_styleHandler");
    __publicField(this, "_colorHandler");
    __publicField(this, "_tagHandler");
    const options = __spreadValues(__spreadValues({}, DEF_OPTIONS$1), _options);
    this.$el = createElement("div", { class: `${rootClassName} border-top` });
    const header = createElement("div", { class: `${rootClassName}__header` }, options.textStyleTitle);
    const headerLeft = createElement("div", { class: `${rootClassName}__header__left` }, options.textStyleHeadLeftBtnText);
    const headerSwitch = createElement("div", { class: `${rootClassName}__header__switch` });
    header.append(headerLeft, headerSwitch);
    const panelBodyChild = [STYLE_NODE_DATA];
    const COLORS = Array.isArray(options.textStyleColors) ? options.textStyleColors : DEF_COLORS;
    if (COLORS.length) {
      const colorsNode = {
        tag: "dl",
        attrs: {
          class: "__color-wrapper border-bottom"
        },
        child: createColorVNode(COLORS)
      };
      panelBodyChild.push(colorsNode);
    }
    panelBodyChild.push(TAG_NODE_DATA);
    const body = createNode({
      tag: "div",
      attrs: {
        class: `${rootClassName}__body`
      },
      child: panelBodyChild
    });
    this.$el.append(header, body);
    this.$elMap = /* @__PURE__ */ new Map([
      ["headerSwitch", headerSwitch]
    ]);
    this._headerSwitchHandler = () => {
      if (this.$el.classList.contains(classNameFadeIn)) {
        this.hide();
      } else {
        this.show();
      }
    };
    this._styleHandler = (e) => {
      const editor2 = this.editorInstance;
      const el = e.currentTarget;
      const newStyle = getStyles(el, "data-style");
      const oldStyle = editor2.getStyles();
      Object.keys(newStyle).forEach((k) => {
        if (oldStyle[k])
          newStyle[k] = "";
      });
      editor2.changeStyles(newStyle);
    };
    this._colorHandler = (e) => {
      const el = e.currentTarget;
      if (el.classList.contains("active"))
        return;
      $(".active", el.parentElement).classList.remove("active");
      el.classList.add("active");
      const editor2 = this.editorInstance;
      const color = el.getAttribute("data-color");
      editor2.changeStyles({ color });
    };
    this._tagHandler = (e) => {
      const el = e.currentTarget;
      if (el.classList.contains("active"))
        return;
      $(".active", el.parentElement).classList.remove("active");
      el.classList.add("active");
      const editor2 = this.editorInstance;
      const tag = el.getAttribute("data-tag");
      editor2.changeNodeName(tag);
    };
    headerSwitch.addEventListener("click", this._headerSwitchHandler);
    $$(".__style-wrapper dd", body).forEach((item) => {
      item.addEventListener("click", this._styleHandler);
    });
    $$(".__color-wrapper dd", body).forEach((item) => {
      item.addEventListener("click", this._colorHandler);
    });
    $$(".__tag-wrapper dd", body).forEach((item) => {
      item.addEventListener("click", this._tagHandler);
    });
  }
  install(editor2, parentElement) {
    this.editorInstance = editor2;
    if (parentElement)
      parentElement.append(this.$el);
  }
  show() {
    this.$el.classList.add(classNameFadeIn);
  }
  hide() {
    this.$el.classList.remove(classNameFadeIn);
  }
  destroy() {
    var _a;
    (_a = this.$elMap.get("headerSwitch")) == null ? void 0 : _a.removeEventListener("click", this._headerSwitchHandler);
  }
}
var toolbar = /* @__PURE__ */ (() => ".zx-editor-toolbar{position:fixed;z-index:999;left:0;bottom:0;width:100%;background-color:#fff;height:250px;transform:translateY(-100%);opacity:0}.zx-editor-toolbar .inner-wrapper{position:absolute;top:0;left:0;width:100%;height:50px;overflow-y:hidden;overflow-x:auto;white-space:nowrap}.zx-editor-toolbar .inner-wrapper .icon-item{position:relative;display:inline-block;width:50px;height:50px;cursor:pointer;vertical-align:top}.zx-editor-toolbar .inner-wrapper .toolbar-icon-pic{background:url(data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgc3R5bGU9IndpZHRoOiAxZW07aGVpZ2h0OiAxZW07dmVydGljYWwtYWxpZ246IG1pZGRsZTtmaWxsOiBjdXJyZW50Q29sb3I7b3ZlcmZsb3c6IGhpZGRlbjsiIHZpZXdCb3g9IjAgMCAxMDI0IDEwMjQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBwLWlkPSIxMTgyIj48cGF0aCBkPSJNNjQwLjQ2OTMzMyA4NS4zMzMzMzNhNjQgNjQgMCAwIDEgNTguODE2IDM4Ljc4NEw3MjguMzg0IDE5Mkg4MzJhMTI4IDEyOCAwIDAgMSAxMjggMTI4djQ5MC42NjY2NjdhMTI4IDEyOCAwIDAgMS0xMjggMTI4SDE5MmExMjggMTI4IDAgMCAxLTEyOC0xMjhWMzIwYTEyOCAxMjggMCAwIDEgMTI4LTEyOGgxMDMuNjE2bDI5LjA5ODY2Ny02Ny44ODI2NjdBNjQgNjQgMCAwIDEgMzgzLjUzMDY2NyA4NS4zMzMzMzNoMjU2LjkzODY2NnogbTAgNjRIMzgzLjUzMDY2N2wtNDUuNzE3MzM0IDEwNi42NjY2NjdIMTkyYTY0IDY0IDAgMCAwLTYzLjg5MzMzMyA2MC4yNDUzMzNMMTI4IDMyMHY0OTAuNjY2NjY3YTY0IDY0IDAgMCAwIDYwLjI0NTMzMyA2My44OTMzMzNMMTkyIDg3NC42NjY2NjdoNjQwYTY0IDY0IDAgMCAwIDYzLjg5MzMzMy02MC4yNDUzMzRMODk2IDgxMC42NjY2NjdWMzIwYTY0IDY0IDAgMCAwLTYwLjI0NTMzMy02My44OTMzMzNMODMyIDI1NmgtMTQ1LjgxMzMzM2wtNDUuNzE3MzM0LTEwNi42NjY2Njd6TTUxMiAzNDEuMzMzMzMzYzExNy44MjQgMCAyMTMuMzMzMzMzIDk1LjUwOTMzMyAyMTMuMzMzMzMzIDIxMy4zMzMzMzRzLTk1LjUwOTMzMyAyMTMuMzMzMzMzLTIxMy4zMzMzMzMgMjEzLjMzMzMzMy0yMTMuMzMzMzMzLTk1LjUwOTMzMy0yMTMuMzMzMzMzLTIxMy4zMzMzMzMgOTUuNTA5MzMzLTIxMy4zMzMzMzMgMjEzLjMzMzMzMy0yMTMuMzMzMzM0eiBtMCA2NGExNDkuMzMzMzMzIDE0OS4zMzMzMzMgMCAxIDAgMCAyOTguNjY2NjY3IDE0OS4zMzMzMzMgMTQ5LjMzMzMzMyAwIDAgMCAwLTI5OC42NjY2Njd6IG0yODgtODUuMzMzMzMzYTMyIDMyIDAgMSAxIDAgNjQgMzIgMzIgMCAwIDEgMC02NHoiIGZpbGw9ImN1cnJlbnRDb2xvciIgcC1pZD0iMTE4MyI+PC9wYXRoPjwvc3ZnPgo=) no-repeat center center}.zx-editor-toolbar .inner-wrapper .toolbar-icon-pic,.zx-editor-toolbar .inner-wrapper .text-style-btn{background-size:25px 25px}.zx-editor-toolbar.__fade-in{transform:translateY(0);opacity:1}\n")();
const DEF_OPTIONS = {
  toolbarBeenFixed: true,
  toolbarHeight: 50,
  toolbarButtons: ["select-picture", "text-style"]
};
class Toolbar {
  constructor(options) {
    __publicField(this, "editorInstance", null);
    __publicField(this, "visible");
    __publicField(this, "options");
    __publicField(this, "height");
    __publicField(this, "$el");
    this.options = __spreadValues(__spreadValues({}, DEF_OPTIONS), options);
    this.visible = this.options.toolbarBeenFixed;
    this.height = this.options.toolbarHeight;
    this.$el = createElement("div", { class: "zx-editor-toolbar border-top", style: toStrStyles({ height: `${this.height + (isIPhoneX() ? IPHONEX_BOTTOM_OFFSET_HEIGHT : 0)}px` }) }, `<dl class="inner-wrapper" style="height:${this.height}px;"></dl>`);
  }
  install(editor2, parentElement) {
    this.editorInstance = editor2;
    if (parentElement)
      parentElement.append(this.$el);
    if (this.visible) {
      this.show();
    }
  }
  show() {
    addClass(this.$el, "__fade-in");
    this.visible = true;
    this.editorInstance.emit("toolbarShow", true, this);
  }
  hide() {
    removeClass(this.$el, "__fade-in");
    this.visible = false;
    this.editorInstance.emit("toolbarShow", false, this);
  }
  addButton(params, index) {
    if (!params.name)
      params.name = "toolbar-btn-" + +new Date();
    const styles = __spreadValues({}, params.style);
    if (this.options.toolbarHeight) {
      styles.width = styles.height = this.options.toolbarHeight + "px";
    }
    const $btn = createElement("dd", {
      class: classNames("icon-item", params.className),
      dataName: params.name,
      style: toStrStyles(styles)
    }, params.el);
    const buttons = $$("dl > dd", this.$el);
    const btnContainer = $("dl", this.$el);
    if (typeof index === "number" && index < buttons.length) {
      btnContainer.insertBefore($btn, buttons[index]);
    } else {
      btnContainer.append($btn);
    }
    if (params.events)
      ;
  }
}
var zxEditor = /* @__PURE__ */ (() => '.zx-editor *{margin:0;padding:0;word-wrap:break-word;box-sizing:border-box;-webkit-tap-highlight-color:rgba(0,0,0,0)}.zx-editor .border-bottom:after{position:absolute;bottom:0;left:0;width:100%;content:"";transform:scaleY(.5);border-bottom:1px solid #ddd}.zx-editor .border-top:before{position:absolute;top:0;left:0;width:100%;content:"";transform:scaleY(.5);border-top:1px solid #ddd}\n')();
class ZxEditor extends Editor {
  constructor(selector, options = {}) {
    if (typeof selector === "string" || selector instanceof HTMLElement) {
      options.container = $(selector);
    }
    if (!options.container) {
      throw new Error(`Can't found '${selector}' Node in document!`);
    }
    const container = options.container;
    const $el = createElement("div", { class: CLASS_NAME_ZX_EDITOR });
    super(__spreadProps(__spreadValues({}, options), {
      container: $el
    }));
    __publicField(this, "$el");
    __publicField(this, "stylePanel");
    __publicField(this, "toolbar");
    container.append($el);
    this.$el = $el;
    this.stylePanel = new StylePanel(options);
    this.use(this.stylePanel, this.$el);
    this.toolbar = new Toolbar(options);
    this.use(this.toolbar, this.$el);
    this.stylePanel.show();
  }
  destroy() {
    super.destroy();
    this.stylePanel.destroy();
  }
}
export { Editor, StylePanel, Toolbar, ZxEditor };
