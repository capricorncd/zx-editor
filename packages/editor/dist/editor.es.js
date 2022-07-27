/*!
 * editor version 1.0.0
 * Author: Capricorncd
 * Released under the MIT License
 * Repository: https://github.com/capricorncd/zx-editor
 * Released on: 2022-07-27 20:49:28 (GMT+0900)
 * Copyright © 2018-present, Capricorncd
 */
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class EventEmitter {
  constructor() {
    this._events = {};
  }
  on(eventName, fn) {
    if (!eventName || !fn || typeof fn !== "function")
      return this;
    if (!this._events[eventName])
      this._events[eventName] = [];
    this._events[eventName].push(fn);
    return this;
  }
  once(eventName, fn) {
    const onceFn = (...args) => {
      fn.apply(this, args);
      this.off(eventName, onceFn);
    };
    return this.on(eventName, onceFn);
  }
  emit(eventName, ...args) {
    const fnList = this._events[eventName];
    if (!fnList)
      return this;
    for (let i = 0; i < fnList.length; i++) {
      try {
        fnList[i].apply(this, args);
      } catch (e) {
        this.emit("error", e, "emit");
      }
    }
    return this;
  }
  off(eventName, fn) {
    if (!this._events[eventName])
      return this;
    const events = this._events[eventName];
    if (typeof fn === "function") {
      const index = events.findIndex((item) => item === fn);
      if (index >= 0)
        events.splice(index, 1);
    } else {
      this._events[eventName].length = 0;
    }
    this._removeEmpty(eventName);
    return this;
  }
  _removeEmpty(eventName) {
    if (!this._events[eventName].length) {
      delete this._events[eventName];
    }
  }
  removeAllListeners() {
    Object.keys(this._events).forEach((key) => this.off(key));
  }
}
/*!
 * zx-sml version 0.2.1
 * Author: Capricorncd <capricorncd@qq.com>
 * Repository: https://github.com/capricorncd/zx-sml
 * Released on: 2022-07-24 15:34:05 (GMT+0900)
 */
var __defProp2 = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp2 = (obj, key, value) => key in obj ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp2(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
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
  if (!selector)
    return null;
  if (selector instanceof HTMLElement)
    return selector;
  return doc.querySelector(selector);
}
function createElement(tag, attrs = {}, children) {
  const el = document.createElement(tag);
  for (const [key, val] of Object.entries(attrs)) {
    el.setAttribute(toSnakeCase(key), key === "style" && isObject(val) ? toStrStyles(val) : val);
  }
  if (children) {
    if (!Array.isArray(children)) {
      children = [children];
    }
    children.forEach((child) => {
      if (typeof child === "string") {
        const temp = createElement("div");
        temp.innerHTML = child;
        el.append(...temp.childNodes);
      } else {
        el.append(child);
      }
    });
  }
  return el;
}
function toStrStyles(...args) {
  const styles = args.reduce((prev, obj) => {
    return __spreadValues(__spreadValues({}, prev), formatKeys(obj));
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
const ROOT_CLASS_NAME = "zx-editor__editor";
const NODE_NAME_SECTION = "SECTION";
const NODE_NAME_BR = "BR";
const ALLOWED_NODE_NAMES = ["SECTION", "H1", "H2", "H3", "H4", "H5", "BLOCKQUOTE", "UL", "OL"];
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
const setContentValueOfPseudoElementBefore = (placeholder) => {
  var _a;
  const beforeStyle = `.${ROOT_CLASS_NAME}.is-empty:before{content:'${placeholder}' !important;`;
  const style = createElement("style", { type: "text/css" }, beforeStyle);
  (_a = $("head")) == null ? void 0 : _a.append(style);
};
const initContentDom = (options) => {
  const contentStyles = {
    lineHeight: options.lineHeight,
    minHeight: options.minHeight,
    position: "relative",
    overflowY: "scroll",
    outline: "none",
    ...options.styles,
    "--placeholder-color": options.placeholderColor,
    "--line-height": options.lineHeight
  };
  setContentValueOfPseudoElementBefore(options.placeholder);
  if (options.caretColor)
    contentStyles.caretColor = options.caretColor;
  if (options.textColor)
    contentStyles.color = options.textColor;
  const contentAttrs = {
    class: `${ROOT_CLASS_NAME} is-empty`,
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
const DEF_OPTIONS = {
  editable: true,
  minHeight: "50vh",
  placeholder: "\u8BF7\u5728\u6B64\u8F93\u5165\u5185\u5BB9..",
  placeholderColor: "#999",
  lineHeight: 1.5,
  allowedNodeNames: ALLOWED_NODE_NAMES,
  caretColor: "",
  textColor: "",
  customPasteHandler: void 0
};
var editor = "";
class Editor extends EventEmitter {
  constructor(options) {
    super();
    __publicField(this, "version");
    __publicField(this, "options");
    __publicField(this, "$editor");
    __publicField(this, "cursor");
    __publicField(this, "_eventHandler");
    __publicField(this, "allowedNodeNames");
    const container = typeof options.container === "string" ? $(options.container) : options.container;
    if (!container) {
      throw new Error(`Can't found '${options.container}' Node in document!`);
    }
    this.version = "1.0.0";
    this.options = { ...DEF_OPTIONS, ...options };
    this.allowedNodeNames = (this.options.allowedNodeNames || ALLOWED_NODE_NAMES).map((item) => item.toUpperCase());
    this.$editor = initContentDom(this.options);
    container.append(this.$editor);
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
    this.removeAllListeners();
  }
}
export { Editor };
