/*!
 * @zx-editor/editor version 1.0.0
 * Author: Capricorncd
 * Released under the MIT License
 * Repository: https://github.com/capricorncd/zx-editor
 * Released on: 2022-08-01 22:07:12 (GMT+0900)
 * Copyright © 2018-present, Capricorncd
 */
var k = Object.defineProperty;
var F = (t, n, e) => n in t ? k(t, n, { enumerable: !0, configurable: !0, writable: !0, value: e }) : t[n] = e;
var E = (t, n, e) => (F(t, typeof n != "symbol" ? n + "" : n, e), e);
class K {
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
var V = Object.defineProperty, x = Object.getOwnPropertySymbols, W = Object.prototype.hasOwnProperty, Y = Object.prototype.propertyIsEnumerable, O = (t, n, e) => n in t ? V(t, n, { enumerable: !0, configurable: !0, writable: !0, value: e }) : t[n] = e, D = (t, n) => {
  for (var e in n || (n = {}))
    W.call(n, e) && O(t, e, n[e]);
  if (x)
    for (var e of x(n))
      Y.call(n, e) && O(t, e, n[e]);
  return t;
};
function Q(t) {
  return Array.isArray(t);
}
function M(t) {
  return t !== null && !Q(t) && typeof t == "object";
}
var q = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, L = { exports: {} };
/*! For license information please see date-utils-2020.js.LICENSE.txt */
(function(t, n) {
  (function(e, s) {
    t.exports = s();
  })(typeof self < "u" ? self : q, function() {
    return (() => {
      var e = { 949: (i, r) => {
        Object.defineProperty(r, "__esModule", { value: !0 }), r.toTwoDigits = void 0, r.toTwoDigits = function(o) {
          return o[1] ? o : "0" + o;
        };
      }, 607: (i, r, o) => {
        Object.defineProperty(r, "__esModule", { value: !0 }), r.toTwoDigits = r.toDate = r.formatDate = void 0;
        var m = o(949);
        Object.defineProperty(r, "toTwoDigits", { enumerable: !0, get: function() {
          return m.toTwoDigits;
        } });
        var C = { weeks: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] };
        function _(f) {
          if (f instanceof Date)
            return f;
          if (typeof f == "number")
            return new Date(f);
          if (typeof f == "string") {
            var a = f.trim();
            if (/^\d+$/.test(a)) {
              var h = a.length;
              return h === 8 ? new Date([a.substr(0, 4), a.substr(4, 2), a.substr(6, 2)].join("/")) : h === 6 ? new Date([a.substr(0, 4), a.substr(4, 2), "01"].join("/")) : h === 4 ? new Date(a + "/01/01") : new Date(parseInt(f));
            }
            if (a = a.replace(/[年月日]/g, function(l) {
              return l === "\u65E5" ? "" : "/";
            }).replace(/[(（（].*?[)））]/g, " ").replace(/\bam|pm\b/gi, " ").replace(/\s+/g, " "), /^(\d{4})[-/](\d{1,2})[-/](\d{1,2})$/.test(a))
              return new Date([RegExp.$1, RegExp.$2, RegExp.$3].join("/"));
            if (/^(\d{4})[-/](\d{1,2})$/.test(a))
              return new Date([RegExp.$1, RegExp.$2, "01"].join("/"));
            var u = new Date(a);
            return isNaN(u.getFullYear()) ? null : u;
          }
          return null;
        }
        r.formatDate = function(f, a, h) {
          var u, l = _(f);
          if (!l || !a)
            return f + "";
          if (a === "timestamp")
            return l.getTime().toString();
          /(y+)/i.test(a) && (u = RegExp.$1, a = a.replace(u, (l.getFullYear() + "").substr(4 - u.length))), h && Array.isArray(h.weeks) || (h = C);
          var v = { "M+": l.getMonth() + 1, "d+": l.getDate(), "h+": l.getHours(), "m+": l.getMinutes(), "s+": l.getSeconds(), "w+": l.getDay(), "W+": h.weeks[l.getDay()], "a+": l.getHours() < 12 ? "am" : "pm", "A+": l.getHours() < 12 ? "AM" : "PM" };
          for (var c in v)
            if (new RegExp("(" + c + ")").test(a)) {
              u = RegExp.$1;
              var d = v[c] + "";
              a = a.replace(u, u.length === 1 ? d : m.toTwoDigits(d));
            }
          if (/(g)/i.test(a)) {
            var p = l.toString().split(/\s+/).slice(5), U = a.includes("g");
            a = a.replace(/g/i, U ? p[0] : p.join(" "));
          }
          return a;
        }, r.toDate = _;
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
function I(t = "", n = !1) {
  const e = t.replace(/[-_\s](\w)/g, (s, i) => i.toUpperCase());
  return n ? e.replace(/^\w/, (s) => s.toUpperCase()) : e;
}
function T(t, n = 0) {
  return Array.prototype.slice.call(t, n);
}
function P(t = {}, n = !1) {
  const e = n ? I : R, s = {};
  for (const [i, r] of Object.entries(t))
    s[e(i)] = M(r) ? P(r, n) : r;
  return s;
}
function z(t, n = document) {
  return t ? t instanceof HTMLElement ? t : n.querySelector(t) : null;
}
function g(t, n = {}, e) {
  const s = document.createElement(t);
  for (const [i, r] of Object.entries(n))
    s.setAttribute(R(i), i === "style" && M(r) ? b(r) : r);
  return e && (Array.isArray(e) || (e = [e]), e.forEach((i) => {
    if (typeof i == "string") {
      const r = g("div");
      r.innerHTML = i, s.append(...r.childNodes);
    } else
      s.append(i);
  })), s;
}
function b(...t) {
  const n = t.reduce((s, i) => D(D({}, s), P(i)), {}), e = [];
  for (const [s, i] of Object.entries(n))
    i === "" || typeof i > "u" || i === null || e.push(`${s}:${i}`);
  return e.join(";");
}
L.exports.formatDate;
L.exports.toDate;
L.exports.toTwoDigits;
const $ = (t, n = "style") => t ? (t.getAttribute(n) || "").split(/\s?;\s?/).reduce((s, i) => {
  const [r, o] = i.split(/\s?:\s?/);
  return r && (s[I(r)] = o), s;
}, {}) : {}, G = (t) => document.createTextNode(t), J = "zx-editor__editor", N = "SECTION", X = "BR", B = ["SECTION", "H1", "H2", "H3", "H4", "H5", "BLOCKQUOTE", "UL", "OL"], Z = [
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
], j = "<section><br></section>";
function y(t, n, e) {
  return t.replace(RegExp("(^<" + n + ")|(" + n + ">$)", "gi"), (s) => s.toUpperCase().replace(n, e.toLowerCase()));
}
function w(t) {
  return /^UL|OL$/.test(t.nodeName);
}
function H(t) {
  if (!t)
    return !1;
  const n = T(t.childNodes);
  return n.length === 1 && n[0].nodeName === "BR";
}
const ee = (t) => {
  const n = {
    minHeight: t.minHeight,
    "--placeholder": JSON.stringify(t.placeholder),
    "--placeholder-color": t.placeholderColor,
    "--line-height": t.lineHeight,
    "--paragraph-spacing": t.paragraphTailSpacing,
    ...t.styles
  };
  t.caretColor && (n.caretColor = t.caretColor), t.textColor && (n.color = t.textColor);
  const e = {
    class: `${J} is-empty`,
    style: b(n)
  };
  return t.editable && (e.contenteditable = "true"), g("div", e, j);
}, S = (t, n = N) => {
  var m, C, _, f, a, h, u, l, v;
  if (!t)
    return null;
  const e = t.nodeName, s = n.toUpperCase();
  if (e === s)
    return t;
  const i = g(n), r = t.parentElement;
  let o;
  if (e === "LI" && w(r)) {
    if (i.innerHTML = y(t.outerHTML, e, s), o = i.firstChild, r.childElementCount > 1)
      if (r.firstElementChild === t)
        (m = r.parentElement) == null || m.insertBefore(o, r);
      else if (r.lastElementChild === t) {
        const c = (C = r.parentElement) == null ? void 0 : C.nextElementSibling;
        c ? (_ = c.parentElement) == null || _.insertBefore(o, c) : (f = r.parentElement) == null || f.append(o);
      } else {
        const c = T(r.children), d = g(r.nodeName);
        let p = c.shift();
        for (; p && p !== t; )
          d.append(p), p = c.shift();
        (a = r.parentElement) == null || a.insertBefore(d, r), (h = r.parentElement) == null || h.insertBefore(o, r), r.removeChild(t);
      }
    else
      (u = r.parentElement) == null || u.insertBefore(o, r), (l = r.parentElement) == null || l.removeChild(r);
    return o;
  }
  if (Z.includes(e)) {
    if (/UL|OL/.test(s)) {
      const c = t.previousElementSibling, d = t.nextElementSibling;
      if (c && w(c)) {
        if (i.innerHTML = y(t.outerHTML, e, "li"), o = i.firstChild, c.append(o), r == null || r.removeChild(t), d && d.nodeName === c.nodeName) {
          const p = T(d.children);
          c.append(...p), (v = d.parentElement) == null || v.removeChild(d);
        }
      } else
        d && w(d) ? (i.innerHTML = y(t.outerHTML, e, "li"), o = i.firstChild, d.insertBefore(o, d.firstElementChild), r == null || r.removeChild(t)) : (o = i, i.innerHTML = y(t.outerHTML, e, "li"), r == null || r.replaceChild(o, t));
    } else
      i.innerHTML = y(t.outerHTML, e, s), o = i.firstChild, r == null || r.replaceChild(o, t);
    return o;
  }
  return i.append(t.cloneNode(!0)), r == null || r.replaceChild(i, t), i;
}, A = (t) => {
  t.children.length <= 1 && H(t.children[0]) ? t.classList.add("is-empty") : t.classList.remove("is-empty");
};
function te(t, n, e = !1) {
  var s;
  for (; t && n !== t; ) {
    if (!e && t.nodeName === "LI" && ((s = t.parentElement) == null ? void 0 : s.parentElement) === n || t.parentElement === n)
      return t;
    t = t.parentElement;
  }
  return n.lastElementChild;
}
const re = {
  editable: !0,
  minHeight: "50vh",
  placeholder: "\u8BF7\u5728\u6B64\u8F93\u5165\u5185\u5BB9..",
  placeholderColor: "#999",
  lineHeight: 1.5,
  allowedNodeNames: B,
  paragraphTailSpacing: "10px",
  caretColor: "",
  textColor: "",
  customPasteHandler: void 0,
  insertTextToNewParagraph: !1
};
class se extends K {
  constructor(e) {
    super();
    E(this, "version");
    E(this, "options");
    E(this, "$editor");
    E(this, "_cursorElement", null);
    E(this, "_eventHandler");
    E(this, "allowedNodeNames");
    E(this, "_pasteHandler");
    const s = typeof e.container == "string" ? z(e.container) : e.container;
    if (!s)
      throw new Error(`Can't found '${e.container}' Node in document!`);
    this.version = "1.0.0", this.options = { ...re, ...e }, this.allowedNodeNames = (this.options.allowedNodeNames || B).map((i) => i.toUpperCase()), this.$editor = ee(this.options), s.append(this.$editor), this._eventHandler = (i) => {
      var o;
      const r = i.type;
      r === "blur" && (this._lastLine(), this.setCursorElement((o = window.getSelection()) == null ? void 0 : o.getRangeAt(0).endContainer)), this.emit(r === "input" ? "change" : r, i), A(this.$editor);
    }, this._pasteHandler = (i) => {
      var m;
      if (typeof this.options.customPasteHandler == "function")
        return this.options.customPasteHandler(i);
      i.stopPropagation();
      const r = (m = i.clipboardData) == null ? void 0 : m.getData("text"), o = window.getSelection();
      this._insertText(r, o);
    }, this._initEvents();
  }
  _initEvents() {
    this.$editor.addEventListener("focus", this._eventHandler), this.$editor.addEventListener("blur", this._eventHandler), this.$editor.addEventListener("input", this._eventHandler), this.$editor.addEventListener("click", this._eventHandler), this.$editor.addEventListener("paste", this._pasteHandler);
  }
  use(e, s) {
    typeof e.install == "function" && e.install(this, s);
  }
  setHtml(e) {
    this.$editor.innerHTML = j, this.insert(e, !0), this._lastLine(), A(this.$editor);
  }
  getHtml() {
    return this.$editor.innerHTML.replace(/<section><br><\/section>$/, "");
  }
  insert(e, s = !1) {
    if (e instanceof HTMLElement)
      this._insert(e);
    else {
      const i = g("div", {}, e), r = T(i.childNodes);
      if (!s && !this.options.insertTextToNewParagraph && r.every((o) => o.nodeType === Node.TEXT_NODE))
        return this._insertText(e);
      r.forEach((o) => {
        o.nodeType === Node.ELEMENT_NODE ? o.nodeName === X ? this._insert(g(N, {}, "<br/>")) : this._insert(o) : o.textContent && this._insert(g(N, {}, o.textContent));
      });
    }
    this._dispatchChange();
  }
  _insert(e) {
    const s = this.getCursorElement();
    H(s) ? this.$editor.insertBefore(e, s) : this.$editor.insertBefore(e, s.nextElementSibling), this.allowedNodeNames.includes(e.nodeName) || (e = S(e, N)), this.setCursorElement(e);
  }
  _insertText(e, s) {
    if (!!e) {
      if (s = s != null ? s : window.getSelection(), !(s != null && s.rangeCount))
        return this.insert(e, !0);
      s.deleteFromDocument(), s.getRangeAt(0).insertNode(G(e)), this.setCursorElement(s.getRangeAt(0).endContainer), this._dispatchChange();
    }
  }
  _lastLine() {
    H(this.$editor.lastElementChild) || this.$editor.appendChild(g("section", {}, "<br>"));
  }
  changeNodeName(e) {
    if (!this.allowedNodeNames.includes(e.toUpperCase()))
      return !1;
    const s = this.getCursorElement(), i = S(s, e);
    return console.log(i), i ? (this.setCursorElement(i), this._dispatchChange(), !0) : !1;
  }
  changeStyles(e, s) {
    const i = this.getCursorElement(!0);
    if (i) {
      const r = typeof e == "string" ? { [e]: s } : e;
      i.setAttribute("style", b($(i), r)), this._dispatchChange();
    }
  }
  _dispatchChange() {
    this.$editor.dispatchEvent(new InputEvent("input"));
  }
  getStyles() {
    return $(this.getCursorElement());
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
    return te(this._cursorElement, this.$editor, e);
  }
  destroy() {
    this.$editor.removeEventListener("focus", this._eventHandler), this.$editor.removeEventListener("blur", this._eventHandler), this.$editor.removeEventListener("input", this._eventHandler), this.$editor.removeEventListener("paste", this._pasteHandler), this.removeAllListeners();
  }
}
export {
  se as Editor
};
