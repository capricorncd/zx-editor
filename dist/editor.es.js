/*!
 * @zx-editor/editor version 1.0.0
 * Author: Capricorncd
 * Released under the MIT License
 * Repository: https://github.com/capricorncd/zx-editor
 * Released on: 2022-07-30 16:59:22 (GMT+0900)
 * Copyright © 2018-present, Capricorncd
 */
var k = Object.defineProperty;
var F = (t, r, e) => r in t ? k(t, r, { enumerable: !0, configurable: !0, writable: !0, value: e }) : t[r] = e;
var p = (t, r, e) => (F(t, typeof r != "symbol" ? r + "" : r, e), e);
class V {
  constructor() {
    this._events = {};
  }
  on(r, e) {
    return !r || !e || typeof e != "function" ? this : (this._events[r] || (this._events[r] = []), this._events[r].push(e), this);
  }
  once(r, e) {
    const i = (...s) => {
      e.apply(this, s), this.off(r, i);
    };
    return this.on(r, i);
  }
  emit(r, ...e) {
    const i = this._events[r];
    if (!i)
      return this;
    for (let s = 0; s < i.length; s++)
      try {
        i[s].apply(this, e);
      } catch (n) {
        this.emit("error", n, "emit");
      }
    return this;
  }
  off(r, e) {
    if (!this._events[r])
      return this;
    const i = this._events[r];
    if (typeof e == "function") {
      const s = i.findIndex((n) => n === e);
      s >= 0 && i.splice(s, 1);
    } else
      this._events[r].length = 0;
    return this._removeEmpty(r), this;
  }
  _removeEmpty(r) {
    this._events[r].length || delete this._events[r];
  }
  removeAllListeners() {
    Object.keys(this._events).forEach((r) => this.off(r));
  }
}
/*!
 * zx-sml version 0.2.1
 * Author: Capricorncd <capricorncd@qq.com>
 * Repository: https://github.com/capricorncd/zx-sml
 * Released on: 2022-07-24 15:34:05 (GMT+0900)
 */
var Y = Object.defineProperty, O = Object.getOwnPropertySymbols, K = Object.prototype.hasOwnProperty, W = Object.prototype.propertyIsEnumerable, $ = (t, r, e) => r in t ? Y(t, r, { enumerable: !0, configurable: !0, writable: !0, value: e }) : t[r] = e, S = (t, r) => {
  for (var e in r || (r = {}))
    K.call(r, e) && $(t, e, r[e]);
  if (O)
    for (var e of O(r))
      W.call(r, e) && $(t, e, r[e]);
  return t;
};
function Q(t) {
  return Array.isArray(t);
}
function A(t) {
  return t !== null && !Q(t) && typeof t == "object";
}
var q = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, N = { exports: {} };
/*! For license information please see date-utils-2020.js.LICENSE.txt */
(function(t, r) {
  (function(e, i) {
    t.exports = i();
  })(typeof self < "u" ? self : q, function() {
    return (() => {
      var e = { 949: (s, n) => {
        Object.defineProperty(n, "__esModule", { value: !0 }), n.toTwoDigits = void 0, n.toTwoDigits = function(o) {
          return o[1] ? o : "0" + o;
        };
      }, 607: (s, n, o) => {
        Object.defineProperty(n, "__esModule", { value: !0 }), n.toTwoDigits = n.toDate = n.formatDate = void 0;
        var g = o(949);
        Object.defineProperty(n, "toTwoDigits", { enumerable: !0, get: function() {
          return g.toTwoDigits;
        } });
        var C = { weeks: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] };
        function v(h) {
          if (h instanceof Date)
            return h;
          if (typeof h == "number")
            return new Date(h);
          if (typeof h == "string") {
            var l = h.trim();
            if (/^\d+$/.test(l)) {
              var f = l.length;
              return f === 8 ? new Date([l.substr(0, 4), l.substr(4, 2), l.substr(6, 2)].join("/")) : f === 6 ? new Date([l.substr(0, 4), l.substr(4, 2), "01"].join("/")) : f === 4 ? new Date(l + "/01/01") : new Date(parseInt(h));
            }
            if (l = l.replace(/[年月日]/g, function(a) {
              return a === "\u65E5" ? "" : "/";
            }).replace(/[(（（].*?[)））]/g, " ").replace(/\bam|pm\b/gi, " ").replace(/\s+/g, " "), /^(\d{4})[-/](\d{1,2})[-/](\d{1,2})$/.test(l))
              return new Date([RegExp.$1, RegExp.$2, RegExp.$3].join("/"));
            if (/^(\d{4})[-/](\d{1,2})$/.test(l))
              return new Date([RegExp.$1, RegExp.$2, "01"].join("/"));
            var u = new Date(l);
            return isNaN(u.getFullYear()) ? null : u;
          }
          return null;
        }
        n.formatDate = function(h, l, f) {
          var u, a = v(h);
          if (!a || !l)
            return h + "";
          if (l === "timestamp")
            return a.getTime().toString();
          /(y+)/i.test(l) && (u = RegExp.$1, l = l.replace(u, (a.getFullYear() + "").substr(4 - u.length))), f && Array.isArray(f.weeks) || (f = C);
          var _ = { "M+": a.getMonth() + 1, "d+": a.getDate(), "h+": a.getHours(), "m+": a.getMinutes(), "s+": a.getSeconds(), "w+": a.getDay(), "W+": f.weeks[a.getDay()], "a+": a.getHours() < 12 ? "am" : "pm", "A+": a.getHours() < 12 ? "AM" : "PM" };
          for (var c in _)
            if (new RegExp("(" + c + ")").test(l)) {
              u = RegExp.$1;
              var d = _[c] + "";
              l = l.replace(u, u.length === 1 ? d : g.toTwoDigits(d));
            }
          if (/(g)/i.test(l)) {
            var m = a.toString().split(/\s+/).slice(5), U = l.includes("g");
            l = l.replace(/g/i, U ? m[0] : m.join(" "));
          }
          return l;
        }, n.toDate = v;
      } }, i = {};
      return function s(n) {
        if (i[n])
          return i[n].exports;
        var o = i[n] = { exports: {} };
        return e[n](o, o.exports, s), o.exports;
      }(607);
    })();
  });
})(N);
function M(t = "", r = "-") {
  return t.replace(/[A-Z]/g, (e, i) => `${i > 0 ? r : ""}${e.toLowerCase()}`);
}
function R(t = "", r = !1) {
  const e = t.replace(/[-_\s](\w)/g, (i, s) => s.toUpperCase());
  return r ? e.replace(/^\w/, (i) => i.toUpperCase()) : e;
}
function L(t, r = 0) {
  return Array.prototype.slice.call(t, r);
}
function I(t = {}, r = !1) {
  const e = r ? R : M, i = {};
  for (const [s, n] of Object.entries(t))
    i[e(s)] = A(n) ? I(n, r) : n;
  return i;
}
function B(t, r = document) {
  return t ? t instanceof HTMLElement ? t : r.querySelector(t) : null;
}
function E(t, r = {}, e) {
  const i = document.createElement(t);
  for (const [s, n] of Object.entries(r))
    i.setAttribute(M(s), s === "style" && A(n) ? b(n) : n);
  return e && (Array.isArray(e) || (e = [e]), e.forEach((s) => {
    if (typeof s == "string") {
      const n = E("div");
      n.innerHTML = s, i.append(...n.childNodes);
    } else
      i.append(s);
  })), i;
}
function b(...t) {
  const r = t.reduce((i, s) => S(S({}, i), I(s)), {}), e = [];
  for (const [i, s] of Object.entries(r))
    s === "" || typeof s > "u" || s === null || e.push(`${i}:${s}`);
  return e.join(";");
}
N.exports.formatDate;
N.exports.toDate;
N.exports.toTwoDigits;
const j = "zx-editor__editor", w = "SECTION", z = "BR", P = ["SECTION", "H1", "H2", "H3", "H4", "H5", "BLOCKQUOTE", "UL", "OL"], G = [
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
class Z {
  constructor(r) {
    p(this, "rootElement");
    p(this, "timer");
    p(this, "selection");
    p(this, "range", new Range());
    var i;
    this.rootElement = r, this.timer = null, this.selection = window.getSelection();
    const e = r.lastElementChild;
    e && this.setRange(e, (i = e.textContent) == null ? void 0 : i.length);
  }
  _getLastNode(r) {
    let e = r;
    for (; e.lastChild; )
      e = e.lastChild;
    return e;
  }
  setRange(r, e) {
    var s, n, o;
    if (this.selection)
      this.selection.removeAllRanges();
    else {
      this.selection = window.getSelection();
      try {
        this.range = (s = this.selection) == null ? void 0 : s.getRangeAt(0);
      } catch {
        this.range = new Range();
      }
    }
    let i;
    r ? i = this._getLastNode(r) : i = this.range.endContainer, console.log(i), typeof e > "u" && (e = (o = (n = i.textContent) == null ? void 0 : n.length) != null ? o : 0), this.range.setStart(i, e), this.range.collapse(!0), this._clearTimeout(), this.timer = setTimeout(() => {
      var g;
      (g = this.selection) == null || g.addRange(this.range);
    }, 100);
  }
  _clearTimeout() {
    this.timer && (clearTimeout(this.timer), this.timer = null);
  }
  getCurrentNode(r = !1) {
    var i;
    let e = this.range.endContainer;
    for (; e && this.rootElement !== e; ) {
      if (!r && e.nodeName === "LI" && ((i = e.parentElement) == null ? void 0 : i.parentElement) === this.rootElement || e.parentElement === this.rootElement)
        return e;
      e = e.parentNode;
    }
    return this.rootElement.lastElementChild;
  }
}
function y(t, r, e) {
  return t.replace(RegExp("(^<" + r + ")|(" + r + ">$)", "gi"), (i) => i.toUpperCase().replace(r, e.toLowerCase()));
}
function H(t) {
  return /UL|OL/.test(t.nodeName);
}
function T(t) {
  if (!t)
    return !1;
  const r = L(t.childNodes);
  return r.length === 1 && r[0].nodeName === "BR";
}
function x(t, r = "style") {
  return t ? (t.getAttribute(r) || "").split(/\s?;\s?/).reduce((i, s) => {
    const [n, o] = s.split(/\s?:\s?/);
    return n && (i[R(n)] = o), i;
  }, {}) : {};
}
const J = (t) => {
  var i;
  const r = `.${j}.is-empty:before{content:'${t}' !important;`, e = E("style", { type: "text/css" }, r);
  (i = B("head")) == null || i.append(e);
}, X = (t) => {
  const r = {
    lineHeight: t.lineHeight,
    minHeight: t.minHeight,
    position: "relative",
    overflowY: "scroll",
    outline: "none",
    ...t.styles,
    "--placeholder-color": t.placeholderColor,
    "--line-height": t.lineHeight
  };
  J(t.placeholder), t.caretColor && (r.caretColor = t.caretColor), t.textColor && (r.color = t.textColor);
  const e = {
    class: `${j} is-empty`,
    style: b(r)
  };
  t.editable && (e.contenteditable = "true");
  const i = E("div", e);
  return i.innerHTML = "<section><br></section>", i;
}, D = (t, r = w) => {
  var g, C, v, h, l, f, u, a, _;
  if (!t)
    return null;
  const e = t.nodeName, i = r.toUpperCase();
  if (e === i)
    return t;
  const s = E(r), n = t.parentElement;
  let o;
  if (e === "LI" && H(n)) {
    if (s.innerHTML = y(t.outerHTML, e, i), o = s.firstChild, n.childElementCount > 1)
      if (n.firstElementChild === t)
        (g = n.parentElement) == null || g.insertBefore(o, n);
      else if (n.lastElementChild === t) {
        const c = (C = n.parentElement) == null ? void 0 : C.nextElementSibling;
        c ? (v = c.parentElement) == null || v.insertBefore(o, c) : (h = n.parentElement) == null || h.append(o);
      } else {
        const c = L(n.children), d = E(n.nodeName);
        let m = c.shift();
        for (; m && m !== t; )
          d.append(m), m = c.shift();
        (l = n.parentElement) == null || l.insertBefore(d, n), (f = n.parentElement) == null || f.insertBefore(o, n), n.removeChild(t);
      }
    else
      (u = n.parentElement) == null || u.insertBefore(o, n), (a = n.parentElement) == null || a.removeChild(n);
    return o;
  }
  if (G.includes(e)) {
    if (/UL|OL/.test(i)) {
      const c = t.previousElementSibling, d = t.nextElementSibling;
      if (c && H(c)) {
        if (s.innerHTML = y(t.outerHTML, e, "li"), o = s.firstChild, c.append(o), n == null || n.removeChild(t), d && d.nodeName === c.nodeName) {
          const m = L(d.children);
          c.append(...m), (_ = d.parentElement) == null || _.removeChild(d);
        }
      } else
        d && H(d) ? (s.innerHTML = y(t.outerHTML, e, "li"), o = s.firstChild, d.insertBefore(o, d.firstElementChild), n == null || n.removeChild(t)) : (o = s, s.innerHTML = y(t.outerHTML, e, "li"), n == null || n.replaceChild(o, t));
    } else
      s.innerHTML = y(t.outerHTML, e, i), o = s.firstChild, n == null || n.replaceChild(o, t);
    return o;
  }
  return s.append(t.cloneNode(!0)), n == null || n.replaceChild(s, t), s;
}, ee = (t) => {
  t.children.length <= 1 && T(t.children[0]) ? t.classList.add("is-empty") : t.classList.remove("is-empty");
}, te = {
  editable: !0,
  minHeight: "50vh",
  placeholder: "\u8BF7\u5728\u6B64\u8F93\u5165\u5185\u5BB9..",
  placeholderColor: "#999",
  lineHeight: 1.5,
  allowedNodeNames: P,
  paragraphTailSpacing: "10px",
  caretColor: "",
  textColor: "",
  customPasteHandler: void 0
};
class ne extends V {
  constructor(e) {
    super();
    p(this, "version");
    p(this, "options");
    p(this, "$editor");
    p(this, "cursor");
    p(this, "_eventHandler");
    p(this, "allowedNodeNames");
    const i = typeof e.container == "string" ? B(e.container) : e.container;
    if (!i)
      throw new Error(`Can't found '${e.container}' Node in document!`);
    this.version = "1.0.0", this.options = { ...te, ...e }, this.allowedNodeNames = (this.options.allowedNodeNames || P).map((s) => s.toUpperCase()), this.$editor = X(this.options), i.append(this.$editor), this.cursor = new Z(this.$editor), this._eventHandler = (s) => {
      const n = s.type;
      n === "blur" && this._lastLine(), this.emit(n === "input" ? "change" : n, s), ee(this.$editor), n === "click" && this.cursor.setRange(s.target);
    }, this._initEvents();
  }
  _initEvents() {
    this.$editor.addEventListener("focus", this._eventHandler), this.$editor.addEventListener("blur", this._eventHandler), this.$editor.addEventListener("input", this._eventHandler), this.$editor.addEventListener("click", this._eventHandler);
  }
  use(e, i) {
    typeof e.install == "function" && e.install(this, i);
  }
  setHtml(e) {
    this.$editor.innerHTML = "", this.insert(e), this._lastLine();
  }
  getHtml() {
    return this.$editor.innerHTML.replace(/<section><br><\/section>$/, "");
  }
  insert(e) {
    if (e instanceof HTMLElement)
      this._insert(e);
    else {
      const i = E("div");
      i.innerHTML = e, L(i.childNodes).forEach((s) => {
        s.nodeType === Node.ELEMENT_NODE ? s.nodeName === z ? this._insert(E(w, {}, "<br/>")) : this._insert(s) : s.textContent && this._insert(E(w, {}, s.textContent));
      });
    }
    this._dispatchChange();
  }
  _insert(e) {
    const i = this.getCurrentNode();
    i ? T(i) ? this.$editor.insertBefore(e, i) : this.$editor.insertBefore(e, i.nextElementSibling) : this.$editor.append(e), this.allowedNodeNames.includes(e.nodeName) || (e = D(e, w)), this.cursor.setRange(e);
  }
  _lastLine() {
    T(this.$editor.lastElementChild) || this.$editor.appendChild(E("section", {}, "<br>"));
  }
  changeNodeName(e) {
    if (!this.allowedNodeNames.includes(e.toUpperCase()))
      return !1;
    const i = this.getCurrentNode(), s = D(i, e);
    return s ? (this.cursor.setRange(s), this._dispatchChange(), !0) : !1;
  }
  changeStyles(e, i) {
    const s = this.getCurrentNode(!0);
    if (s) {
      const n = typeof e == "string" ? { [e]: i } : e;
      s.setAttribute("style", b(x(s), n)), this._dispatchChange();
    }
  }
  _dispatchChange() {
    this.$editor.dispatchEvent(new InputEvent("input"));
  }
  getStyles() {
    return x(this.getCurrentNode());
  }
  getCurrentNode(e = !1) {
    return this.cursor.getCurrentNode(e);
  }
  destroy() {
    this.$editor.removeEventListener("focus", this._eventHandler), this.$editor.removeEventListener("blur", this._eventHandler), this.$editor.removeEventListener("input", this._eventHandler), this.removeAllListeners();
  }
}
export {
  ne as Editor
};
