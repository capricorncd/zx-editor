/*!
 * @sp-editor/editor version 1.0.0
 * Author: Capricorncd
 * Released under the MIT License
 * Repository: https://github.com/capricorncd/sp-editor
 * Released on: 2022-08-15 12:22:58 (GMT+0900)
 * Copyright © 2018-present, Capricorncd
 */
var I = Object.defineProperty;
var U = (t, i, e) => i in t ? I(t, i, { enumerable: !0, configurable: !0, writable: !0, value: e }) : t[i] = e;
var E = (t, i, e) => (U(t, typeof i != "symbol" ? i + "" : i, e), e);
class F {
  constructor() {
    this._events = {};
  }
  on(i, e) {
    return !i || !e || typeof e != "function" ? this : (this._events[i] || (this._events[i] = []), this._events[i].push(e), this);
  }
  once(i, e) {
    const n = (...s) => {
      e.apply(this, s), this.off(i, n);
    };
    return this.on(i, n);
  }
  emit(i, ...e) {
    const n = this._events[i];
    if (!n)
      return this;
    for (let s = 0; s < n.length; s++)
      try {
        n[s].apply(this, e);
      } catch (r) {
        this.emit("error", r, "emit");
      }
    return this;
  }
  off(i, e) {
    if (!this._events[i])
      return this;
    const n = this._events[i];
    if (typeof e == "function") {
      const s = n.findIndex((r) => r === e);
      s >= 0 && n.splice(s, 1);
    } else
      this._events[i].length = 0;
    return this._removeEmpty(i), this;
  }
  _removeEmpty(i) {
    this._events[i].length || delete this._events[i];
  }
  removeAllListeners() {
    Object.keys(this._events).forEach((i) => this.off(i));
  }
}
/*!
 * zx-sml version 0.5.1
 * Author: Capricorncd <capricorncd@qq.com>
 * Repository: https://github.com/capricorncd/zx-sml
 * Released on: 2022-08-14 09:57:06 (GMT+0900)
 */
var W = Object.defineProperty, H = Object.getOwnPropertySymbols, K = Object.prototype.hasOwnProperty, V = Object.prototype.propertyIsEnumerable, $ = (t, i, e) => i in t ? W(t, i, { enumerable: !0, configurable: !0, writable: !0, value: e }) : t[i] = e, x = (t, i) => {
  for (var e in i || (i = {}))
    K.call(i, e) && $(t, e, i[e]);
  if (H)
    for (var e of H(i))
      V.call(i, e) && $(t, e, i[e]);
  return t;
};
function Y(t) {
  return Array.isArray(t);
}
function M(t) {
  return t !== null && !Y(t) && typeof t == "object";
}
var q = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, w = { exports: {} };
/*! For license information please see date-utils-2020.js.LICENSE.txt */
(function(t, i) {
  (function(e, n) {
    t.exports = n();
  })(typeof self < "u" ? self : q, function() {
    return (() => {
      var e = { 949: (s, r) => {
        Object.defineProperty(r, "__esModule", { value: !0 }), r.toTwoDigits = void 0, r.toTwoDigits = function(o) {
          return o[1] ? o : "0" + o;
        };
      }, 607: (s, r, o) => {
        Object.defineProperty(r, "__esModule", { value: !0 }), r.toTwoDigits = r.toDate = r.formatDate = void 0;
        var a = o(949);
        Object.defineProperty(r, "toTwoDigits", { enumerable: !0, get: function() {
          return a.toTwoDigits;
        } });
        var m = { weeks: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] };
        function _(u) {
          if (u instanceof Date)
            return u;
          if (typeof u == "number")
            return new Date(u);
          if (typeof u == "string") {
            var l = u.trim();
            if (/^\d+$/.test(l)) {
              var p = l.length;
              return p === 8 ? new Date([l.substr(0, 4), l.substr(4, 2), l.substr(6, 2)].join("/")) : p === 6 ? new Date([l.substr(0, 4), l.substr(4, 2), "01"].join("/")) : p === 4 ? new Date(l + "/01/01") : new Date(parseInt(u));
            }
            if (l = l.replace(/[年月日]/g, function(c) {
              return c === "\u65E5" ? "" : "/";
            }).replace(/[(（（].*?[)））]/g, " ").replace(/\bam|pm\b/gi, " ").replace(/\s+/g, " "), /^(\d{4})[-/](\d{1,2})[-/](\d{1,2})$/.test(l))
              return new Date([RegExp.$1, RegExp.$2, RegExp.$3].join("/"));
            if (/^(\d{4})[-/](\d{1,2})$/.test(l))
              return new Date([RegExp.$1, RegExp.$2, "01"].join("/"));
            var f = new Date(l);
            return isNaN(f.getFullYear()) ? null : f;
          }
          return null;
        }
        r.formatDate = function(u, l, p) {
          var f, c = _(u);
          if (!c || !l)
            return u + "";
          if (l === "timestamp")
            return c.getTime().toString();
          /(y+)/i.test(l) && (f = RegExp.$1, l = l.replace(f, (c.getFullYear() + "").substr(4 - f.length))), p && Array.isArray(p.weeks) || (p = m);
          var y = { "M+": c.getMonth() + 1, "d+": c.getDate(), "h+": c.getHours(), "m+": c.getMinutes(), "s+": c.getSeconds(), "w+": c.getDay(), "W+": p.weeks[c.getDay()], "a+": c.getHours() < 12 ? "am" : "pm", "A+": c.getHours() < 12 ? "AM" : "PM" };
          for (var d in y)
            if (new RegExp("(" + d + ")").test(l)) {
              f = RegExp.$1;
              var h = y[d] + "";
              l = l.replace(f, f.length === 1 ? h : a.toTwoDigits(h));
            }
          if (/(g)/i.test(l)) {
            var g = c.toString().split(/\s+/).slice(5), P = l.includes("g");
            l = l.replace(/g/i, P ? g[0] : g.join(" "));
          }
          return l;
        }, r.toDate = _;
      } }, n = {};
      return function s(r) {
        if (n[r])
          return n[r].exports;
        var o = n[r] = { exports: {} };
        return e[r](o, o.exports, s), o.exports;
      }(607);
    })();
  });
})(w);
function A(t = "", i = "-") {
  return t.replace(/[A-Z]/g, (e, n) => `${n > 0 ? i : ""}${e.toLowerCase()}`);
}
function j(t = "", i = !1) {
  const e = t.replace(/[-_\s](\w)/g, (n, s) => s.toUpperCase());
  return i ? e.replace(/^\w/, (n) => n.toUpperCase()) : e;
}
function C(t, i = 0) {
  return Array.prototype.slice.call(t, i);
}
function B(t = {}, i = !1) {
  const e = i ? j : A, n = {};
  for (const [s, r] of Object.entries(t))
    n[e(s)] = M(r) ? B(r, i) : r;
  return n;
}
function G(t, i = document) {
  return t ? t instanceof HTMLElement ? t : i.querySelector(t) : null;
}
function v(t, i = {}, e) {
  const n = document.createElement(t);
  for (const [s, r] of Object.entries(i))
    n.setAttribute(A(s), s === "style" && M(r) ? L(r) : r);
  return e && (Array.isArray(e) || (e = [e]), e.forEach((s) => {
    if (typeof s == "string") {
      const r = v("div");
      r.innerHTML = s, n.append(...r.childNodes);
    } else
      n.append(s);
  })), n;
}
function L(...t) {
  const i = t.reduce((n, s) => x(x({}, n), B(s)), {}), e = [];
  for (const [n, s] of Object.entries(i))
    s === "" || typeof s > "u" || s === null || e.push(`${n}:${s}`);
  return e.join(";");
}
w.exports.formatDate;
w.exports.toDate;
w.exports.toTwoDigits;
const D = (t, i = "style") => t ? (t.getAttribute(i) || "").split(/\s?;\s?/).reduce((n, s) => {
  const [r, o] = s.split(/\s?:\s?/);
  return r && (n[j(r)] = o), n;
}, {}) : {}, J = (t) => document.createTextNode(t), Q = "sp-editor__editor", R = "SECTION", X = "BR", k = [R, "H1", "H2", "H3", "H4", "H5", "BLOCKQUOTE", "UL", "OL"];
function N(t, i, e) {
  return t.replace(RegExp("(^<" + i + ")|(" + i + ">$)", "gi"), (n) => n.toUpperCase().replace(i, e.toLowerCase()));
}
function Z(t) {
  return t.replace(/<li[^>]*>(.+)<\/li>/gi, "$1");
}
function T(t) {
  const i = typeof t == "string" ? t : t.nodeName;
  return /^UL|OL$/i.test(i);
}
function b(t) {
  if (!t)
    return !1;
  const i = C(t.childNodes);
  return i.length === 1 && i[0].nodeName === "BR";
}
const z = (t, i) => {
  const e = {
    minHeight: t.minHeight,
    "--placeholder": JSON.stringify(t.placeholder),
    "--placeholder-color": t.placeholderColor,
    "--line-height": t.lineHeight,
    "--paragraph-spacing": t.paragraphTailSpacing,
    "--padding-bottom": t.paddingBottom,
    ...t.styles
  };
  t.caretColor && (e.caretColor = t.caretColor), t.textColor && (e.color = t.textColor);
  const n = {
    class: `${Q} is-empty`,
    style: L(e)
  };
  return t.editable && (n.contenteditable = "true"), v("div", n, i);
}, O = (t, i) => {
  var a, m, _, u, l, p, f, c, y;
  if (!t)
    return null;
  const e = t.nodeName, n = i.toUpperCase();
  if (e === n)
    return null;
  const s = v(i), r = t.parentElement;
  let o;
  if (e === "LI" && T(r)) {
    if (s.innerHTML = N(t.outerHTML, e, n), o = s.firstChild, r.childElementCount > 1)
      if (r.firstElementChild === t)
        (a = r.parentElement) == null || a.insertBefore(o, r);
      else if (r.lastElementChild === t) {
        const d = (m = r.parentElement) == null ? void 0 : m.nextElementSibling;
        d ? (_ = d.parentElement) == null || _.insertBefore(o, d) : (u = r.parentElement) == null || u.append(o);
      } else {
        const d = C(r.children), h = v(r.nodeName);
        let g = d.shift();
        for (; g && g !== t; )
          h.append(g), g = d.shift();
        (l = r.parentElement) == null || l.insertBefore(h, r), (p = r.parentElement) == null || p.insertBefore(o, r), r.removeChild(t);
      }
    else
      (f = r.parentElement) == null || f.insertBefore(o, r), (c = r.parentElement) == null || c.removeChild(r);
    return o;
  }
  if (/UL|OL/.test(n)) {
    const d = t.previousElementSibling, h = t.nextElementSibling;
    if (d && T(d)) {
      if (s.innerHTML = N(t.outerHTML, e, "li"), o = s.firstChild, d.append(o), r == null || r.removeChild(t), h && h.nodeName === d.nodeName) {
        const g = C(h.children);
        d.append(...g), (y = h.parentElement) == null || y.removeChild(h);
      }
    } else
      h && T(h) ? (s.innerHTML = N(t.outerHTML, e, "li"), o = s.firstChild, h.insertBefore(o, h.firstElementChild), r == null || r.removeChild(t)) : (o = s, s.innerHTML = N(t.outerHTML, e, "li"), r == null || r.replaceChild(o, t));
  } else
    s.innerHTML = Z(N(t.outerHTML, e, n)), o = s.firstChild, r == null || r.replaceChild(o, t);
  return o;
}, S = (t) => {
  t.children.length <= 1 && b(t.children[0]) ? t.classList.add("is-empty") : t.classList.remove("is-empty");
};
function ee(t, i, e = !1) {
  var n;
  for (; t && i !== t; ) {
    if (!e && t.nodeName === "LI" && ((n = t.parentElement) == null ? void 0 : n.parentElement) === i || t.parentElement === i)
      return t;
    t = t.parentElement;
  }
  return i.lastElementChild;
}
const te = {
  editable: !0,
  minHeight: "50vh",
  paddingBottom: "50vh",
  placeholder: "\u8BF7\u5728\u6B64\u8F93\u5165\u5185\u5BB9..",
  placeholderColor: "#999",
  lineHeight: 1.5,
  childNodeName: R,
  allowedNodeNames: k,
  paragraphTailSpacing: "10px",
  caretColor: "",
  textColor: "#333333",
  customPasteHandler: void 0,
  insertTextToNewParagraph: !1
};
class ne extends F {
  constructor(e) {
    super();
    E(this, "version");
    E(this, "options");
    E(this, "$editor");
    E(this, "_cursorElement", null);
    E(this, "_eventHandler");
    E(this, "allowedNodeNames");
    E(this, "blankLine");
    E(this, "_pasteHandler");
    const n = typeof e.container == "string" ? G(e.container) : e.container;
    if (!n)
      throw new Error(`Can't found '${e.container}' Node in document!`);
    this.version = "1.0.0", this.options = { ...te, ...e }, this.allowedNodeNames = (this.options.allowedNodeNames || k).map((r) => r.toUpperCase());
    const s = this.options.childNodeName.toUpperCase();
    this.options.childNodeName = s, this.blankLine = `<${s}><br></${s}>`, this.allowedNodeNames.includes(s) || this.allowedNodeNames.push(s), this.$editor = z(this.options, this.blankLine), n.append(this.$editor), this._eventHandler = (r) => {
      const o = r.type;
      if (o === "blur" || o === "click") {
        const a = window.getSelection(), m = a && a.rangeCount ? a.getRangeAt(a.rangeCount - 1).endContainer : r.currentTarget;
        this.setCursorElement(m), this._verifyChild();
      }
      this.emit(o === "input" ? "change" : o, r), S(this.$editor);
    }, this._pasteHandler = (r) => {
      var a;
      if (typeof this.options.customPasteHandler == "function")
        return this.options.customPasteHandler(r);
      r.preventDefault();
      const o = (a = r.clipboardData) == null ? void 0 : a.getData("text");
      this._insertText(o);
    }, this._initEvents();
  }
  _initEvents() {
    this.$editor.addEventListener("focus", this._eventHandler), this.$editor.addEventListener("blur", this._eventHandler), this.$editor.addEventListener("input", this._eventHandler), this.$editor.addEventListener("click", this._eventHandler), this.$editor.addEventListener("paste", this._pasteHandler);
  }
  use(e, n) {
    typeof e.install == "function" && e.install(this, n);
  }
  setHtml(e) {
    this.$editor.innerHTML = this.blankLine, this.insert(e, !0), this._verifyChild(), S(this.$editor);
  }
  getHtml(e) {
    const n = this.$editor.innerHTML;
    if (e)
      return n;
    const s = this.options.childNodeName;
    return n.replace(new RegExp(`(<${s}><br\\s?\\/?><\\/${s}>)+$`, "i"), "");
  }
  insert(e, n = !1) {
    if (e instanceof HTMLElement)
      this._insertEl(e);
    else {
      const s = v("div", {}, e), r = C(s.childNodes);
      if (!n && !this.options.insertTextToNewParagraph && r.every((o) => o.nodeType === Node.TEXT_NODE))
        return this._insertText(e);
      r.forEach((o) => {
        o.nodeType === Node.ELEMENT_NODE ? o.nodeName === X ? this._insertEl(v(this.options.childNodeName, {}, "<br/>")) : this._insertEl(o) : o.textContent && this._insertEl(v(this.options.childNodeName, {}, o.textContent));
      });
    }
    this._dispatchChange();
  }
  _insertEl(e) {
    const n = this.getCursorElement();
    b(n) ? /<(\w+)[^>]*>.*<\/\1>/.test(e.outerHTML) ? this.$editor.insertBefore(e, n) : (n.innerHTML = "", n.append(e)) : this.$editor.insertBefore(e, n.nextElementSibling), this.setCursorElement(e);
  }
  _insertText(e) {
    if (!e)
      return;
    const n = window.getSelection(), s = n == null ? void 0 : n.rangeCount;
    if (!s)
      return this.insert(e, !0);
    n.deleteFromDocument(), n.getRangeAt(0).insertNode(J(e)), this.setCursorElement(n.getRangeAt(s - 1).endContainer), n.collapseToEnd(), this._dispatchChange();
  }
  _verifyChild() {
    const e = this.getCursorElement(!0), n = this.options.childNodeName, s = this.$editor.children;
    let r, o = !1;
    for (let a = 0; a < s.length; a++) {
      if (r = s[a], this.allowedNodeNames.includes(r.nodeName))
        continue;
      o = e === r;
      const m = O(r, n);
      o && m && this.setCursorElement(m);
    }
    if (!b(this.$editor.lastElementChild)) {
      const a = this.options.childNodeName;
      this.$editor.appendChild(v(a, {}, "<br>"));
    }
  }
  changeNodeName(e) {
    if (e = (e || this.options.childNodeName).toUpperCase(), !this.allowedNodeNames.includes(e))
      return !1;
    const n = this.getCursorElement(), s = O(n, e);
    return s ? (this.setCursorElement(s), this._dispatchChange(), !0) : !1;
  }
  changeStyles(e, n) {
    const s = this.getCursorElement(!0);
    if (s) {
      const r = D(s);
      if (e) {
        const o = typeof e == "string" ? { [e]: n } : e;
        s.setAttribute("style", L(r, o));
      } else {
        if (!Object.keys(r).length)
          return;
        s.removeAttribute("style");
      }
      this._dispatchChange();
    }
  }
  _dispatchChange() {
    this.$editor.dispatchEvent(new InputEvent("input"));
  }
  getStyles() {
    return D(this.getCursorElement());
  }
  setCursorElement(e) {
    if (e instanceof Node)
      for (; e; ) {
        if (e.nodeType === Node.ELEMENT_NODE) {
          this._cursorElement = e;
          break;
        }
        e = e.parentElement;
      }
    else
      e && (this._cursorElement = e);
  }
  getCursorElement(e = !1) {
    return ee(this._cursorElement, this.$editor, e);
  }
  destroy() {
    this.$editor.removeEventListener("focus", this._eventHandler), this.$editor.removeEventListener("blur", this._eventHandler), this.$editor.removeEventListener("input", this._eventHandler), this.$editor.removeEventListener("paste", this._pasteHandler), this.removeAllListeners();
  }
}
export {
  k as ALLOWED_NODE_NAMES,
  ne as Editor
};
