/*!
 * @sp-editor/editor version 1.0.0
 * Author: Capricorncd
 * Released under the MIT License
 * Repository: https://github.com/capricorncd/sp-editor
 * Released on: 2022-09-01 21:16:14 (GMT+0900)
 * Copyright © 2018-present, Capricorncd
 */
var V = Object.defineProperty;
var W = (e, n, t) => n in e ? V(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t;
var E = (e, n, t) => (W(e, typeof n != "symbol" ? n + "" : n, t), t);
class G {
  constructor() {
    this._events = {};
  }
  on(n, t) {
    return !n || !t || typeof t != "function" ? this : (this._events[n] || (this._events[n] = []), this._events[n].push(t), this);
  }
  once(n, t) {
    const i = (...s) => {
      t.apply(this, s), this.off(n, i);
    };
    return this.on(n, i);
  }
  emit(n, ...t) {
    const i = this._events[n];
    if (!i)
      return this;
    for (let s = 0; s < i.length; s++)
      try {
        i[s].apply(this, t);
      } catch (r) {
        this.emit("error", r, "emit");
      }
    return this;
  }
  off(n, t) {
    if (!this._events[n])
      return this;
    const i = this._events[n];
    if (typeof t == "function") {
      const s = i.findIndex((r) => r === t);
      s >= 0 && i.splice(s, 1);
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
 * zx-sml version 0.5.1
 * Author: Capricorncd <capricorncd@qq.com>
 * Repository: https://github.com/capricorncd/zx-sml
 * Released on: 2022-08-14 09:57:06 (GMT+0900)
 */
var K = Object.defineProperty, b = Object.getOwnPropertySymbols, Y = Object.prototype.hasOwnProperty, q = Object.prototype.propertyIsEnumerable, $ = (e, n, t) => n in e ? K(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, H = (e, n) => {
  for (var t in n || (n = {}))
    Y.call(n, t) && $(e, t, n[t]);
  if (b)
    for (var t of b(n))
      q.call(n, t) && $(e, t, n[t]);
  return e;
};
function J(e) {
  return Array.isArray(e);
}
function A(e) {
  return e !== null && !J(e) && typeof e == "object";
}
var Q = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, T = { exports: {} };
/*! For license information please see date-utils-2020.js.LICENSE.txt */
(function(e, n) {
  (function(t, i) {
    e.exports = i();
  })(typeof self < "u" ? self : Q, function() {
    return (() => {
      var t = { 949: (s, r) => {
        Object.defineProperty(r, "__esModule", { value: !0 }), r.toTwoDigits = void 0, r.toTwoDigits = function(o) {
          return o[1] ? o : "0" + o;
        };
      }, 607: (s, r, o) => {
        Object.defineProperty(r, "__esModule", { value: !0 }), r.toTwoDigits = r.toDate = r.formatDate = void 0;
        var a = o(949);
        Object.defineProperty(r, "toTwoDigits", { enumerable: !0, get: function() {
          return a.toTwoDigits;
        } });
        var v = { weeks: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] };
        function N(u) {
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
          var f, c = N(u);
          if (!c || !l)
            return u + "";
          if (l === "timestamp")
            return c.getTime().toString();
          /(y+)/i.test(l) && (f = RegExp.$1, l = l.replace(f, (c.getFullYear() + "").substr(4 - f.length))), p && Array.isArray(p.weeks) || (p = v);
          var _ = { "M+": c.getMonth() + 1, "d+": c.getDate(), "h+": c.getHours(), "m+": c.getMinutes(), "s+": c.getSeconds(), "w+": c.getDay(), "W+": p.weeks[c.getDay()], "a+": c.getHours() < 12 ? "am" : "pm", "A+": c.getHours() < 12 ? "AM" : "PM" };
          for (var d in _)
            if (new RegExp("(" + d + ")").test(l)) {
              f = RegExp.$1;
              var h = _[d] + "";
              l = l.replace(f, f.length === 1 ? h : a.toTwoDigits(h));
            }
          if (/(g)/i.test(l)) {
            var g = c.toString().split(/\s+/).slice(5), F = l.includes("g");
            l = l.replace(/g/i, F ? g[0] : g.join(" "));
          }
          return l;
        }, r.toDate = N;
      } }, i = {};
      return function s(r) {
        if (i[r])
          return i[r].exports;
        var o = i[r] = { exports: {} };
        return t[r](o, o.exports, s), o.exports;
      }(607);
    })();
  });
})(T);
function P(e = "", n = "-") {
  return e.replace(/[A-Z]/g, (t, i) => `${i > 0 ? n : ""}${t.toLowerCase()}`);
}
function j(e = "", n = !1) {
  const t = e.replace(/[-_\s](\w)/g, (i, s) => s.toUpperCase());
  return n ? t.replace(/^\w/, (i) => i.toUpperCase()) : t;
}
function C(e, n = 0) {
  return Array.prototype.slice.call(e, n);
}
function B(e = {}, n = !1) {
  const t = n ? j : P, i = {};
  for (const [s, r] of Object.entries(e))
    i[t(s)] = A(r) ? B(r, n) : r;
  return i;
}
function X(e, n = document) {
  return e ? e instanceof HTMLElement ? e : n.querySelector(e) : null;
}
function m(e, n = {}, t) {
  const i = document.createElement(e);
  for (const [s, r] of Object.entries(n))
    i.setAttribute(P(s), s === "style" && A(r) ? L(r) : r);
  return t && (Array.isArray(t) || (t = [t]), t.forEach((s) => {
    if (typeof s == "string") {
      const r = m("div");
      r.innerHTML = s, i.append(...r.childNodes);
    } else
      i.append(s);
  })), i;
}
function L(...e) {
  const n = e.reduce((i, s) => H(H({}, i), B(s)), {}), t = [];
  for (const [i, s] of Object.entries(n))
    s === "" || typeof s > "u" || s === null || t.push(`${i}:${s}`);
  return t.join(";");
}
T.exports.formatDate;
T.exports.toDate;
T.exports.toTwoDigits;
const x = (e, n = "style") => e ? (e.getAttribute(n) || "").split(/\s?;\s?/).reduce((i, s) => {
  const [r, o] = s.split(/\s?:\s?/);
  return r && (i[j(r)] = o), i;
}, {}) : {}, Z = (e) => document.createTextNode(e), z = "sp-editor__editor", R = "SECTION", ee = "BR", k = [R, "H1", "H2", "H3", "H4", "H5", "BLOCKQUOTE", "UL", "OL"];
function y(e, n, t) {
  return e.replace(RegExp("(^<" + n + ")|(" + n + ">$)", "gi"), (i) => i.toUpperCase().replace(n, t.toLowerCase()));
}
function te(e) {
  return e.replace(/<li[^>]*>(.+)<\/li>/gi, "$1");
}
function w(e) {
  const n = typeof e == "string" ? e : e.nodeName;
  return /^UL|OL$/i.test(n);
}
function D(e) {
  if (!e)
    return !1;
  const n = C(e.childNodes);
  return n.length === 1 && n[0].nodeName === "BR";
}
function O(e) {
  return e instanceof Element && (e = e.outerHTML), /^<(\w+)[^>]*>.*<\/\1>$/.test(e);
}
function I(e) {
  return ["PICTURE", "VIDEO", "AUDIO", "CANVAS"].includes(e.nodeName);
}
function re(e) {
  return ["IMG"].includes(e.nodeName) || I(e);
}
function U(e) {
  if (re(e))
    return !0;
  for (let n = 0; n < e.children.length; n++)
    if (U(e.children[n]))
      return !0;
  return !1;
}
const ne = (e, n) => {
  const t = {
    minHeight: e.minHeight,
    "--placeholder": JSON.stringify(e.placeholder),
    "--placeholder-color": e.placeholderColor,
    "--line-height": e.lineHeight,
    "--paragraph-spacing": e.paragraphTailSpacing,
    "--padding-bottom": e.paddingBottom,
    ...e.styles
  };
  e.caretColor && (t.caretColor = e.caretColor), e.textColor && (t.color = e.textColor);
  const i = {
    class: `${z} is-empty`,
    style: L(t)
  };
  return e.editable && (i.contenteditable = "true"), m("div", i, n);
}, S = (e, n) => {
  var a, v, N, u, l, p, f, c, _;
  if (!e)
    return null;
  const t = e.nodeName, i = n.toUpperCase();
  if (t === i)
    return null;
  const s = m(n), r = e.parentElement;
  let o;
  if (t === "LI" && w(r)) {
    if (s.innerHTML = y(e.outerHTML, t, i), o = s.firstChild, r.childElementCount > 1)
      if (r.firstElementChild === e)
        (a = r.parentElement) == null || a.insertBefore(o, r);
      else if (r.lastElementChild === e) {
        const d = (v = r.parentElement) == null ? void 0 : v.nextElementSibling;
        d ? (N = d.parentElement) == null || N.insertBefore(o, d) : (u = r.parentElement) == null || u.append(o);
      } else {
        const d = C(r.children), h = m(r.nodeName);
        let g = d.shift();
        for (; g && g !== e; )
          h.append(g), g = d.shift();
        (l = r.parentElement) == null || l.insertBefore(h, r), (p = r.parentElement) == null || p.insertBefore(o, r), r.removeChild(e);
      }
    else
      (f = r.parentElement) == null || f.insertBefore(o, r), (c = r.parentElement) == null || c.removeChild(r);
    return o;
  }
  if (/UL|OL/.test(i)) {
    const d = e.previousElementSibling, h = e.nextElementSibling;
    if (d && w(d)) {
      if (s.innerHTML = y(e.outerHTML, t, "li"), o = s.firstChild, d.append(o), r == null || r.removeChild(e), h && h.nodeName === d.nodeName) {
        const g = C(h.children);
        d.append(...g), (_ = h.parentElement) == null || _.removeChild(h);
      }
    } else
      h && w(h) ? (s.innerHTML = y(e.outerHTML, t, "li"), o = s.firstChild, h.insertBefore(o, h.firstElementChild), r == null || r.removeChild(e)) : (o = s, s.innerHTML = y(e.outerHTML, t, "li"), r == null || r.replaceChild(o, e));
  } else
    s.innerHTML = te(y(e.outerHTML, t, i)), o = s.firstChild, r == null || r.replaceChild(o, e);
  return o;
}, M = (e) => {
  !e.innerText.trim() && !U(e) ? e.classList.add("is-empty") : e.classList.remove("is-empty");
};
function ie(e, n, t = !1) {
  var i;
  for (; e && n !== e; ) {
    if (!t && e.nodeName === "LI" && ((i = e.parentElement) == null ? void 0 : i.parentElement) === n || e.parentElement === n)
      return e;
    e = e.parentElement;
  }
  return n.lastElementChild;
}
const se = {
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
class le extends G {
  constructor(t) {
    super();
    E(this, "version");
    E(this, "options");
    E(this, "$editor");
    E(this, "_cursorElement", null);
    E(this, "_eventHandler");
    E(this, "allowedNodeNames");
    E(this, "blankLine");
    E(this, "_pasteHandler");
    const i = typeof t.container == "string" ? X(t.container) : t.container;
    if (!i)
      throw new Error(`Can't found '${t.container}' Node in document!`);
    this.version = "1.0.0", this.options = { ...se, ...t }, this.allowedNodeNames = (this.options.allowedNodeNames || k).map((r) => r.toUpperCase());
    const s = this.options.childNodeName.toUpperCase();
    this.options.childNodeName = s, this.blankLine = `<${s}><br></${s}>`, this.allowedNodeNames.includes(s) || this.allowedNodeNames.push(s), this.$editor = ne(this.options, this.blankLine), i.append(this.$editor), this._eventHandler = (r) => {
      const o = r.type;
      if (o === "blur" || o === "click") {
        const a = window.getSelection(), v = a && a.rangeCount ? a.getRangeAt(a.rangeCount - 1).endContainer : r.currentTarget;
        this.setCursorElement(v), o === "blur" && this._verifyChild();
      }
      this.emit(o === "input" ? "change" : o, r), M(this.$editor);
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
  use(t, i) {
    typeof t.install == "function" && t.install(this, i);
  }
  setHtml(t) {
    this.$editor.innerHTML = this.blankLine, this.insert(t, !0), this._verifyChild(), M(this.$editor);
  }
  getHtml(t) {
    const i = this.$editor.innerHTML;
    if (t)
      return i;
    const s = this.options.childNodeName;
    return i.replace(new RegExp(`(<${s}><br\\s?\\/?><\\/${s}>)+$`, "i"), "");
  }
  insert(t, i = !1) {
    if (t instanceof HTMLElement)
      this._insertEl(t);
    else {
      const s = m("div", {}, t), r = C(s.childNodes);
      if (!i && !this.options.insertTextToNewParagraph && r.every((o) => o.nodeType === Node.TEXT_NODE))
        return this._insertText(t);
      r.forEach((o) => {
        o.nodeType === Node.ELEMENT_NODE ? o.nodeName === ee ? this._insertEl(m(this.options.childNodeName, {}, "<br/>")) : this._insertEl(o) : o.textContent && this._insertEl(m(this.options.childNodeName, {}, o.textContent));
      });
    }
    this._dispatchChange(), this._verifyChild();
  }
  _insertEl(t) {
    const i = this.getCursorElement();
    D(i) ? O(t.outerHTML) ? this.$editor.insertBefore(t, i) : (i.innerHTML = "", i.append(t)) : this.$editor.insertBefore(t, i.nextElementSibling), this.setCursorElement(t);
  }
  _insertText(t) {
    if (!t)
      return;
    const i = window.getSelection(), s = i == null ? void 0 : i.rangeCount;
    if (!s)
      return this.insert(t, !0);
    i.deleteFromDocument(), i.getRangeAt(0).insertNode(Z(t)), this.setCursorElement(i.getRangeAt(s - 1).endContainer), i.collapseToEnd(), this._dispatchChange();
  }
  _verifyChild() {
    const t = this.getCursorElement(!0), i = this.options.childNodeName;
    let s, r = !1, o = 0;
    for (; o < this.$editor.childNodes.length; ) {
      if (s = this.$editor.childNodes[o++], s.nodeType === Node.ELEMENT_NODE) {
        if (O(s)) {
          if (this.allowedNodeNames.includes(s.nodeName))
            continue;
          if (r = t === s, !I(s)) {
            const a = S(s, i);
            r && a && this.setCursorElement(a);
            continue;
          }
        }
        s.replaceWith(m(i, {}, s.cloneNode(!0)));
      } else {
        const a = m(i, {}, s.cloneNode(!0));
        this.$editor.replaceChild(a, s);
      }
      console.log(o, s.nodeName, s.nodeType);
    }
    D(this.$editor.lastElementChild) || this.$editor.appendChild(m(i, {}, "<br>"));
  }
  changeNodeName(t) {
    if (t = (t || this.options.childNodeName).toUpperCase(), !this.allowedNodeNames.includes(t))
      return !1;
    const i = this.getCursorElement(), s = S(i, t);
    return s ? (this.setCursorElement(s), this._dispatchChange(), !0) : !1;
  }
  changeStyles(t, i) {
    const s = this.getCursorElement(!0);
    if (s) {
      const r = x(s);
      if (t) {
        const o = typeof t == "string" ? { [t]: i } : t;
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
    return x(this.getCursorElement());
  }
  setCursorElement(t) {
    if (t instanceof Node)
      for (; t; ) {
        if (t.nodeType === Node.ELEMENT_NODE) {
          this._cursorElement = t;
          break;
        }
        t = t.parentElement;
      }
    else
      t && (this._cursorElement = t);
  }
  getCursorElement(t = !1) {
    return ie(this._cursorElement, this.$editor, t);
  }
  destroy() {
    this.$editor.removeEventListener("focus", this._eventHandler), this.$editor.removeEventListener("blur", this._eventHandler), this.$editor.removeEventListener("input", this._eventHandler), this.$editor.removeEventListener("paste", this._pasteHandler), this.removeAllListeners();
  }
}
export {
  k as ALLOWED_NODE_NAMES,
  le as Editor
};
