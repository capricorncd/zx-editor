/*!
 * @zx-editor/editor version 1.0.0
 * Author: Capricorncd
 * Released under the MIT License
 * Repository: https://github.com/capricorncd/zx-editor
 * Released on: 2022-08-13 22:57:42 (GMT+0900)
 * Copyright © 2018-present, Capricorncd
 */
var k = Object.defineProperty;
var U = (t, n, e) => n in t ? k(t, n, { enumerable: !0, configurable: !0, writable: !0, value: e }) : t[n] = e;
var E = (t, n, e) => (U(t, typeof n != "symbol" ? n + "" : n, e), e);
class F {
  constructor() {
    this._events = {};
  }
  on(n, e) {
    return !n || !e || typeof e != "function" ? this : (this._events[n] || (this._events[n] = []), this._events[n].push(e), this);
  }
  once(n, e) {
    const s = (...i) => {
      e.apply(this, i), this.off(n, s);
    };
    return this.on(n, s);
  }
  emit(n, ...e) {
    const s = this._events[n];
    if (!s)
      return this;
    for (let i = 0; i < s.length; i++)
      try {
        s[i].apply(this, e);
      } catch (r) {
        this.emit("error", r, "emit");
      }
    return this;
  }
  off(n, e) {
    if (!this._events[n])
      return this;
    const s = this._events[n];
    if (typeof e == "function") {
      const i = s.findIndex((r) => r === e);
      i >= 0 && s.splice(i, 1);
    } else
      this._events[n].length = 0;
    return this._removeEmpty(n), this;
  }
  _removeEmpty(n) {
    this._events[n].length || delete this._events[n];
  }
  removeAllListeners() {
    Object.keys(this._events).forEach((n) => this.off(n));
  }
}
/*!
 * zx-sml version 0.2.1
 * Author: Capricorncd <capricorncd@qq.com>
 * Repository: https://github.com/capricorncd/zx-sml
 * Released on: 2022-07-24 15:34:05 (GMT+0900)
 */
var V = Object.defineProperty, $ = Object.getOwnPropertySymbols, K = Object.prototype.hasOwnProperty, W = Object.prototype.propertyIsEnumerable, x = (t, n, e) => n in t ? V(t, n, { enumerable: !0, configurable: !0, writable: !0, value: e }) : t[n] = e, D = (t, n) => {
  for (var e in n || (n = {}))
    K.call(n, e) && x(t, e, n[e]);
  if ($)
    for (var e of $(n))
      W.call(n, e) && x(t, e, n[e]);
  return t;
};
function Y(t) {
  return Array.isArray(t);
}
function M(t) {
  return t !== null && !Y(t) && typeof t == "object";
}
var Q = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, L = { exports: {} };
/*! For license information please see date-utils-2020.js.LICENSE.txt */
(function(t, n) {
  (function(e, s) {
    t.exports = s();
  })(typeof self < "u" ? self : Q, function() {
    return (() => {
      var e = { 949: (i, r) => {
        Object.defineProperty(r, "__esModule", { value: !0 }), r.toTwoDigits = void 0, r.toTwoDigits = function(o) {
          return o[1] ? o : "0" + o;
        };
      }, 607: (i, r, o) => {
        Object.defineProperty(r, "__esModule", { value: !0 }), r.toTwoDigits = r.toDate = r.formatDate = void 0;
        var h = o(949);
        Object.defineProperty(r, "toTwoDigits", { enumerable: !0, get: function() {
          return h.toTwoDigits;
        } });
        var _ = { weeks: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] };
        function v(u) {
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
            if (l = l.replace(/[年月日]/g, function(a) {
              return a === "\u65E5" ? "" : "/";
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
          var f, a = v(u);
          if (!a || !l)
            return u + "";
          if (l === "timestamp")
            return a.getTime().toString();
          /(y+)/i.test(l) && (f = RegExp.$1, l = l.replace(f, (a.getFullYear() + "").substr(4 - f.length))), p && Array.isArray(p.weeks) || (p = _);
          var N = { "M+": a.getMonth() + 1, "d+": a.getDate(), "h+": a.getHours(), "m+": a.getMinutes(), "s+": a.getSeconds(), "w+": a.getDay(), "W+": p.weeks[a.getDay()], "a+": a.getHours() < 12 ? "am" : "pm", "A+": a.getHours() < 12 ? "AM" : "PM" };
          for (var c in N)
            if (new RegExp("(" + c + ")").test(l)) {
              f = RegExp.$1;
              var d = N[c] + "";
              l = l.replace(f, f.length === 1 ? d : h.toTwoDigits(d));
            }
          if (/(g)/i.test(l)) {
            var m = a.toString().split(/\s+/).slice(5), P = l.includes("g");
            l = l.replace(/g/i, P ? m[0] : m.join(" "));
          }
          return l;
        }, r.toDate = v;
      } }, s = {};
      return function i(r) {
        if (s[r])
          return s[r].exports;
        var o = s[r] = { exports: {} };
        return e[r](o, o.exports, i), o.exports;
      }(607);
    })();
  });
})(L);
function R(t = "", n = "-") {
  return t.replace(/[A-Z]/g, (e, s) => `${s > 0 ? n : ""}${e.toLowerCase()}`);
}
function B(t = "", n = !1) {
  const e = t.replace(/[-_\s](\w)/g, (s, i) => i.toUpperCase());
  return n ? e.replace(/^\w/, (s) => s.toUpperCase()) : e;
}
function C(t, n = 0) {
  return Array.prototype.slice.call(t, n);
}
function j(t = {}, n = !1) {
  const e = n ? B : R, s = {};
  for (const [i, r] of Object.entries(t))
    s[e(i)] = M(r) ? j(r, n) : r;
  return s;
}
function q(t, n = document) {
  return t ? t instanceof HTMLElement ? t : n.querySelector(t) : null;
}
function g(t, n = {}, e) {
  const s = document.createElement(t);
  for (const [i, r] of Object.entries(n))
    s.setAttribute(R(i), i === "style" && M(r) ? H(r) : r);
  return e && (Array.isArray(e) || (e = [e]), e.forEach((i) => {
    if (typeof i == "string") {
      const r = g("div");
      r.innerHTML = i, s.append(...r.childNodes);
    } else
      s.append(i);
  })), s;
}
function H(...t) {
  const n = t.reduce((s, i) => D(D({}, s), j(i)), {}), e = [];
  for (const [s, i] of Object.entries(n))
    i === "" || typeof i > "u" || i === null || e.push(`${s}:${i}`);
  return e.join(";");
}
L.exports.formatDate;
L.exports.toDate;
L.exports.toTwoDigits;
const O = (t, n = "style") => t ? (t.getAttribute(n) || "").split(/\s?;\s?/).reduce((s, i) => {
  const [r, o] = i.split(/\s?:\s?/);
  return r && (s[B(r)] = o), s;
}, {}) : {}, z = (t) => document.createTextNode(t), G = "zx-editor__editor", b = "SECTION", J = "BR", I = [b, "H1", "H2", "H3", "H4", "H5", "BLOCKQUOTE", "UL", "OL"], X = [
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
  b,
  "H1",
  "H2",
  "H3",
  "H4",
  "H5",
  "H6",
  "BLOCKQUOTE"
];
function y(t, n, e) {
  return t.replace(RegExp("(^<" + n + ")|(" + n + ">$)", "gi"), (s) => s.toUpperCase().replace(n, e.toLowerCase()));
}
function T(t) {
  return /^UL|OL$/.test(t.nodeName);
}
function w(t) {
  if (!t)
    return !1;
  const n = C(t.childNodes);
  return n.length === 1 && n[0].nodeName === "BR";
}
const Z = (t, n) => {
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
  const s = {
    class: `${G} is-empty`,
    style: H(e)
  };
  return t.editable && (s.contenteditable = "true"), g("div", s, n);
}, S = (t, n) => {
  var h, _, v, u, l, p, f, a, N;
  if (!t)
    return null;
  const e = t.nodeName, s = n.toUpperCase();
  if (e === s)
    return null;
  const i = g(n), r = t.parentElement;
  let o;
  if (e === "LI" && T(r)) {
    if (i.innerHTML = y(t.outerHTML, e, s), o = i.firstChild, r.childElementCount > 1)
      if (r.firstElementChild === t)
        (h = r.parentElement) == null || h.insertBefore(o, r);
      else if (r.lastElementChild === t) {
        const c = (_ = r.parentElement) == null ? void 0 : _.nextElementSibling;
        c ? (v = c.parentElement) == null || v.insertBefore(o, c) : (u = r.parentElement) == null || u.append(o);
      } else {
        const c = C(r.children), d = g(r.nodeName);
        let m = c.shift();
        for (; m && m !== t; )
          d.append(m), m = c.shift();
        (l = r.parentElement) == null || l.insertBefore(d, r), (p = r.parentElement) == null || p.insertBefore(o, r), r.removeChild(t);
      }
    else
      (f = r.parentElement) == null || f.insertBefore(o, r), (a = r.parentElement) == null || a.removeChild(r);
    return o;
  }
  if (X.includes(e)) {
    if (/UL|OL/.test(s)) {
      const c = t.previousElementSibling, d = t.nextElementSibling;
      if (c && T(c)) {
        if (i.innerHTML = y(t.outerHTML, e, "li"), o = i.firstChild, c.append(o), r == null || r.removeChild(t), d && d.nodeName === c.nodeName) {
          const m = C(d.children);
          c.append(...m), (N = d.parentElement) == null || N.removeChild(d);
        }
      } else
        d && T(d) ? (i.innerHTML = y(t.outerHTML, e, "li"), o = i.firstChild, d.insertBefore(o, d.firstElementChild), r == null || r.removeChild(t)) : (o = i, i.innerHTML = y(t.outerHTML, e, "li"), r == null || r.replaceChild(o, t));
    } else
      i.innerHTML = y(t.outerHTML, e, s), o = i.firstChild, r == null || r.replaceChild(o, t);
    return o;
  }
  return i.append(t.cloneNode(!0)), r == null || r.replaceChild(i, t), i;
}, A = (t) => {
  t.children.length <= 1 && w(t.children[0]) ? t.classList.add("is-empty") : t.classList.remove("is-empty");
};
function ee(t, n, e = !1) {
  var s;
  for (; t && n !== t; ) {
    if (!e && t.nodeName === "LI" && ((s = t.parentElement) == null ? void 0 : s.parentElement) === n || t.parentElement === n)
      return t;
    t = t.parentElement;
  }
  return n.lastElementChild;
}
const te = {
  editable: !0,
  minHeight: "50vh",
  paddingBottom: "50vh",
  placeholder: "\u8BF7\u5728\u6B64\u8F93\u5165\u5185\u5BB9..",
  placeholderColor: "#999",
  lineHeight: 1.5,
  childNodeName: b,
  allowedNodeNames: I,
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
    const s = typeof e.container == "string" ? q(e.container) : e.container;
    if (!s)
      throw new Error(`Can't found '${e.container}' Node in document!`);
    this.version = "1.0.0", this.options = { ...te, ...e }, this.allowedNodeNames = (this.options.allowedNodeNames || I).map((r) => r.toUpperCase());
    const i = this.options.childNodeName.toUpperCase();
    this.options.childNodeName = i, this.blankLine = `<${i}><br></${i}>`, this.allowedNodeNames.includes(i) || this.allowedNodeNames.push(i), this.$editor = Z(this.options, this.blankLine), s.append(this.$editor), this._eventHandler = (r) => {
      const o = r.type;
      if (o === "blur" || o === "click") {
        this._lastLine();
        const h = window.getSelection(), _ = h && h.rangeCount ? h.getRangeAt(h.rangeCount - 1).endContainer : r.currentTarget;
        this.setCursorElement(_);
      }
      this.emit(o === "input" ? "change" : o, r), A(this.$editor);
    }, this._pasteHandler = (r) => {
      var h;
      if (typeof this.options.customPasteHandler == "function")
        return this.options.customPasteHandler(r);
      r.preventDefault();
      const o = (h = r.clipboardData) == null ? void 0 : h.getData("text");
      this._insertText(o);
    }, this._initEvents();
  }
  _initEvents() {
    this.$editor.addEventListener("focus", this._eventHandler), this.$editor.addEventListener("blur", this._eventHandler), this.$editor.addEventListener("input", this._eventHandler), this.$editor.addEventListener("click", this._eventHandler), this.$editor.addEventListener("paste", this._pasteHandler);
  }
  use(e, s) {
    typeof e.install == "function" && e.install(this, s);
  }
  setHtml(e) {
    this.$editor.innerHTML = this.blankLine, this.insert(e, !0), this._lastLine(), A(this.$editor);
  }
  getHtml() {
    const e = this.options.childNodeName;
    return this.$editor.innerHTML.replace(new RegExp(`<${e}><brs?/?></${e}>$`, "i"), "");
  }
  insert(e, s = !1) {
    if (e instanceof HTMLElement)
      this._insertEl(e);
    else {
      const i = g("div", {}, e), r = C(i.childNodes);
      if (!s && !this.options.insertTextToNewParagraph && r.every((o) => o.nodeType === Node.TEXT_NODE))
        return this._insertText(e);
      r.forEach((o) => {
        o.nodeType === Node.ELEMENT_NODE ? o.nodeName === J ? this._insertEl(g(this.options.childNodeName, {}, "<br/>")) : this._insertEl(o) : o.textContent && this._insertEl(g(this.options.childNodeName, {}, o.textContent));
      });
    }
    this._dispatchChange();
  }
  _insertEl(e) {
    const s = this.getCursorElement();
    w(s) ? this.$editor.insertBefore(e, s) : this.$editor.insertBefore(e, s.nextElementSibling), this.allowedNodeNames.includes(e.nodeName) || (e = S(e, this.options.childNodeName)), this.setCursorElement(e);
  }
  _insertText(e) {
    if (!e)
      return;
    const s = window.getSelection(), i = s == null ? void 0 : s.rangeCount;
    if (!i)
      return this.insert(e, !0);
    s.deleteFromDocument(), s.getRangeAt(0).insertNode(z(e)), this.setCursorElement(s.getRangeAt(i - 1).endContainer), s.collapseToEnd(), this._dispatchChange();
  }
  _lastLine() {
    if (!w(this.$editor.lastElementChild)) {
      const e = this.options.childNodeName;
      this.$editor.appendChild(g(e, {}, "<br>"));
    }
  }
  changeNodeName(e) {
    if (e = (e || this.options.childNodeName).toUpperCase(), !this.allowedNodeNames.includes(e))
      return !1;
    const s = this.getCursorElement(), i = S(s, e);
    return i ? (this.setCursorElement(i), this._dispatchChange(), !0) : !1;
  }
  changeStyles(e, s) {
    const i = this.getCursorElement(!0);
    if (i) {
      const r = O(i);
      if (e) {
        const o = typeof e == "string" ? { [e]: s } : e;
        i.setAttribute("style", H(r, o));
      } else {
        if (!Object.keys(r).length)
          return;
        i.removeAttribute("style");
      }
      this._dispatchChange();
    }
  }
  _dispatchChange() {
    this.$editor.dispatchEvent(new InputEvent("input"));
  }
  getStyles() {
    return O(this.getCursorElement());
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
  I as ALLOWED_NODE_NAMES,
  ne as Editor
};
