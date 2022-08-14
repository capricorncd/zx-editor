/*!
 * zx-editor version 3.1.0
 * Author: capricorncd
 * Released under the MIT License
 * Repository: https://github.com/capricorncd/zx-editor
 * Released on: 2022-08-14 11:54:41 (GMT+0900)
 * Copyright © 2018-present, capricorncd
 */
var fe = Object.defineProperty;
var pe = (t, e, i) => e in t ? fe(t, e, { enumerable: !0, configurable: !0, writable: !0, value: i }) : t[e] = i;
var u = (t, e, i) => (pe(t, typeof e != "symbol" ? e + "" : e, i), i);
class ge {
  constructor() {
    this._events = {};
  }
  on(e, i) {
    return !e || !i || typeof i != "function" ? this : (this._events[e] || (this._events[e] = []), this._events[e].push(i), this);
  }
  once(e, i) {
    const n = (...r) => {
      i.apply(this, r), this.off(e, n);
    };
    return this.on(e, n);
  }
  emit(e, ...i) {
    const n = this._events[e];
    if (!n)
      return this;
    for (let r = 0; r < n.length; r++)
      try {
        n[r].apply(this, i);
      } catch (s) {
        this.emit("error", s, "emit");
      }
    return this;
  }
  off(e, i) {
    if (!this._events[e])
      return this;
    const n = this._events[e];
    if (typeof i == "function") {
      const r = n.findIndex((s) => s === i);
      r >= 0 && n.splice(r, 1);
    } else
      this._events[e].length = 0;
    return this._removeEmpty(e), this;
  }
  _removeEmpty(e) {
    this._events[e].length || delete this._events[e];
  }
  removeAllListeners() {
    Object.keys(this._events).forEach((e) => this.off(e));
  }
}
function me() {
  return window.screen.height === 812 && window.screen.width === 375;
}
/*!
 * zx-sml version 0.2.1
 * Author: Capricorncd <capricorncd@qq.com>
 * Repository: https://github.com/capricorncd/zx-sml
 * Released on: 2022-07-24 15:34:05 (GMT+0900)
 */
var ye = Object.defineProperty, B = Object.getOwnPropertySymbols, we = Object.prototype.hasOwnProperty, Ee = Object.prototype.propertyIsEnumerable, j = (t, e, i) => e in t ? ye(t, e, { enumerable: !0, configurable: !0, writable: !0, value: i }) : t[e] = i, k = (t, e) => {
  for (var i in e || (e = {}))
    we.call(e, i) && j(t, i, e[i]);
  if (B)
    for (var i of B(e))
      Ee.call(e, i) && j(t, i, e[i]);
  return t;
};
function _e(t) {
  return Array.isArray(t);
}
function K(t) {
  return t !== null && !_e(t) && typeof t == "object";
}
var be = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, x = { exports: {} };
/*! For license information please see date-utils-2020.js.LICENSE.txt */
(function(t, e) {
  (function(i, n) {
    t.exports = n();
  })(typeof self < "u" ? self : be, function() {
    return (() => {
      var i = { 949: (r, s) => {
        Object.defineProperty(s, "__esModule", { value: !0 }), s.toTwoDigits = void 0, s.toTwoDigits = function(o) {
          return o[1] ? o : "0" + o;
        };
      }, 607: (r, s, o) => {
        Object.defineProperty(s, "__esModule", { value: !0 }), s.toTwoDigits = s.toDate = s.formatDate = void 0;
        var l = o(949);
        Object.defineProperty(s, "toTwoDigits", { enumerable: !0, get: function() {
          return l.toTwoDigits;
        } });
        var d = { weeks: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] };
        function E(h) {
          if (h instanceof Date)
            return h;
          if (typeof h == "number")
            return new Date(h);
          if (typeof h == "string") {
            var a = h.trim();
            if (/^\d+$/.test(a)) {
              var p = a.length;
              return p === 8 ? new Date([a.substr(0, 4), a.substr(4, 2), a.substr(6, 2)].join("/")) : p === 6 ? new Date([a.substr(0, 4), a.substr(4, 2), "01"].join("/")) : p === 4 ? new Date(a + "/01/01") : new Date(parseInt(h));
            }
            if (a = a.replace(/[年月日]/g, function(c) {
              return c === "\u65E5" ? "" : "/";
            }).replace(/[(（（].*?[)））]/g, " ").replace(/\bam|pm\b/gi, " ").replace(/\s+/g, " "), /^(\d{4})[-/](\d{1,2})[-/](\d{1,2})$/.test(a))
              return new Date([RegExp.$1, RegExp.$2, RegExp.$3].join("/"));
            if (/^(\d{4})[-/](\d{1,2})$/.test(a))
              return new Date([RegExp.$1, RegExp.$2, "01"].join("/"));
            var f = new Date(a);
            return isNaN(f.getFullYear()) ? null : f;
          }
          return null;
        }
        s.formatDate = function(h, a, p) {
          var f, c = E(h);
          if (!c || !a)
            return h + "";
          if (a === "timestamp")
            return c.getTime().toString();
          /(y+)/i.test(a) && (f = RegExp.$1, a = a.replace(f, (c.getFullYear() + "").substr(4 - f.length))), p && Array.isArray(p.weeks) || (p = d);
          var m = { "M+": c.getMonth() + 1, "d+": c.getDate(), "h+": c.getHours(), "m+": c.getMinutes(), "s+": c.getSeconds(), "w+": c.getDay(), "W+": p.weeks[c.getDay()], "a+": c.getHours() < 12 ? "am" : "pm", "A+": c.getHours() < 12 ? "AM" : "PM" };
          for (var g in m)
            if (new RegExp("(" + g + ")").test(a)) {
              f = RegExp.$1;
              var y = m[g] + "";
              a = a.replace(f, f.length === 1 ? y : l.toTwoDigits(y));
            }
          if (/(g)/i.test(a)) {
            var _ = c.toString().split(/\s+/).slice(5), L = a.includes("g");
            a = a.replace(/g/i, L ? _[0] : _.join(" "));
          }
          return a;
        }, s.toDate = E;
      } }, n = {};
      return function r(s) {
        if (n[s])
          return n[s].exports;
        var o = n[s] = { exports: {} };
        return i[s](o, o.exports, r), o.exports;
      }(607);
    })();
  });
})(x);
function Z(t = "", e = "-") {
  return t.replace(/[A-Z]/g, (i, n) => `${n > 0 ? e : ""}${i.toLowerCase()}`);
}
function X(t = "", e = !1) {
  const i = t.replace(/[-_\s](\w)/g, (n, r) => r.toUpperCase());
  return e ? i.replace(/^\w/, (n) => n.toUpperCase()) : i;
}
function Q(t) {
  return t.replace(/^-?[1-9]\d{0,2}(,\d{3})+/, (e) => e.replace(/,/g, ""));
}
function J(t, e = !1) {
  if (typeof t == "number")
    return t;
  if (typeof t == "string") {
    if (!e && /^(-?\d+(?:\.\d+)?)\D*/.test(Q(t)))
      return J(RegExp.$1, !0);
    const i = Number(t);
    return isNaN(i) ? 0 : i;
  }
  return 0;
}
function ve(t) {
  if (typeof t == "number")
    return [t, ""];
  const e = Q(t).match(/^(-?\d+(?:\.\d+)?)(.*)$/);
  return e ? [J(e[1], !0), e[2]] : [0, ""];
}
function ee(t) {
  return typeof t == "string" ? t : t === null || typeof t > "u" ? "" : Array.isArray(t) ? t.map(ee).join(" ") : typeof t == "object" ? Object.keys(t).filter((e) => t[e]).join(" ") : String(t);
}
function $e(...t) {
  return t.map(ee).filter((e) => !!e).join(" ");
}
function v(t, e = 0) {
  return Array.prototype.slice.call(t, e);
}
function te(t = {}, e = !1) {
  const i = e ? X : Z, n = {};
  for (const [r, s] of Object.entries(t))
    n[i(r)] = K(s) ? te(s, e) : s;
  return n;
}
function b(t, e = document) {
  return t ? t instanceof HTMLElement ? t : e.querySelector(t) : null;
}
function N(t, e = document) {
  return v(e.querySelectorAll(t));
}
function w(t, e = {}, i) {
  const n = document.createElement(t);
  for (const [r, s] of Object.entries(e))
    n.setAttribute(Z(r), r === "style" && K(s) ? P(s) : s);
  return i && (Array.isArray(i) || (i = [i]), i.forEach((r) => {
    if (typeof r == "string") {
      const s = w("div");
      s.innerHTML = r, n.append(...s.childNodes);
    } else
      n.append(r);
  })), n;
}
function P(...t) {
  const e = t.reduce((n, r) => k(k({}, n), te(r)), {}), i = [];
  for (const [n, r] of Object.entries(e))
    r === "" || typeof r > "u" || r === null || i.push(`${n}:${r}`);
  return i.join(";");
}
x.exports.formatDate;
x.exports.toDate;
x.exports.toTwoDigits;
const S = (t, e = "style") => t ? (t.getAttribute(e) || "").split(/\s?;\s?/).reduce((n, r) => {
  const [s, o] = r.split(/\s?:\s?/);
  return s && (n[X(s)] = o), n;
}, {}) : {}, O = (t) => document.createTextNode(t), ie = (t) => {
  if (!t)
    return null;
  if (typeof t == "string")
    return O(t);
  const { tag: e, attrs: i, child: n } = t;
  if (!e && !i && !n)
    return null;
  const r = w(e || "div", i);
  if (Array.isArray(n) && n.length) {
    let s;
    n.forEach((o) => {
      s = ie(o), s && r.appendChild(s);
    });
  } else
    n && typeof n == "string" && r.appendChild(O(n));
  return r;
}, Ne = (t, e) => {
  t.classList.add(e);
}, Ce = (t, e) => {
  t.classList.remove(e);
}, xe = "zx-editor__editor", R = "SECTION", Te = "BR", ne = [R, "H1", "H2", "H3", "H4", "H5", "BLOCKQUOTE", "UL", "OL"], Le = [
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
  R,
  "H1",
  "H2",
  "H3",
  "H4",
  "H5",
  "H6",
  "BLOCKQUOTE"
];
function $(t, e, i) {
  return t.replace(RegExp("(^<" + e + ")|(" + e + ">$)", "gi"), (n) => n.toUpperCase().replace(e, i.toLowerCase()));
}
function H(t) {
  return /^UL|OL$/.test(t.nodeName);
}
function A(t) {
  if (!t)
    return !1;
  const e = v(t.childNodes);
  return e.length === 1 && e[0].nodeName === "BR";
}
const He = (t, e) => {
  const i = {
    minHeight: t.minHeight,
    "--placeholder": JSON.stringify(t.placeholder),
    "--placeholder-color": t.placeholderColor,
    "--line-height": t.lineHeight,
    "--paragraph-spacing": t.paragraphTailSpacing,
    "--padding-bottom": t.paddingBottom,
    ...t.styles
  };
  t.caretColor && (i.caretColor = t.caretColor), t.textColor && (i.color = t.textColor);
  const n = {
    class: `${xe} is-empty`,
    style: P(i)
  };
  return t.editable && (n.contenteditable = "true"), w("div", n, e);
}, F = (t, e) => {
  var l, d, E, h, a, p, f, c, m;
  if (!t)
    return null;
  const i = t.nodeName, n = e.toUpperCase();
  if (i === n)
    return null;
  const r = w(e), s = t.parentElement;
  let o;
  if (i === "LI" && H(s)) {
    if (r.innerHTML = $(t.outerHTML, i, n), o = r.firstChild, s.childElementCount > 1)
      if (s.firstElementChild === t)
        (l = s.parentElement) == null || l.insertBefore(o, s);
      else if (s.lastElementChild === t) {
        const g = (d = s.parentElement) == null ? void 0 : d.nextElementSibling;
        g ? (E = g.parentElement) == null || E.insertBefore(o, g) : (h = s.parentElement) == null || h.append(o);
      } else {
        const g = v(s.children), y = w(s.nodeName);
        let _ = g.shift();
        for (; _ && _ !== t; )
          y.append(_), _ = g.shift();
        (a = s.parentElement) == null || a.insertBefore(y, s), (p = s.parentElement) == null || p.insertBefore(o, s), s.removeChild(t);
      }
    else
      (f = s.parentElement) == null || f.insertBefore(o, s), (c = s.parentElement) == null || c.removeChild(s);
    return o;
  }
  if (Le.includes(i)) {
    if (/UL|OL/.test(n)) {
      const g = t.previousElementSibling, y = t.nextElementSibling;
      if (g && H(g)) {
        if (r.innerHTML = $(t.outerHTML, i, "li"), o = r.firstChild, g.append(o), s == null || s.removeChild(t), y && y.nodeName === g.nodeName) {
          const _ = v(y.children);
          g.append(..._), (m = y.parentElement) == null || m.removeChild(y);
        }
      } else
        y && H(y) ? (r.innerHTML = $(t.outerHTML, i, "li"), o = r.firstChild, y.insertBefore(o, y.firstElementChild), s == null || s.removeChild(t)) : (o = r, r.innerHTML = $(t.outerHTML, i, "li"), s == null || s.replaceChild(o, t));
    } else
      r.innerHTML = $(t.outerHTML, i, n), o = r.firstChild, s == null || s.replaceChild(o, t);
    return o;
  }
  return r.append(t.cloneNode(!0)), s == null || s.replaceChild(r, t), r;
}, U = (t) => {
  t.children.length <= 1 && A(t.children[0]) ? t.classList.add("is-empty") : t.classList.remove("is-empty");
};
function De(t, e, i = !1) {
  var n;
  for (; t && e !== t; ) {
    if (!i && t.nodeName === "LI" && ((n = t.parentElement) == null ? void 0 : n.parentElement) === e || t.parentElement === e)
      return t;
    t = t.parentElement;
  }
  return e.lastElementChild;
}
const Se = {
  editable: !0,
  minHeight: "50vh",
  paddingBottom: "50vh",
  placeholder: "\u8BF7\u5728\u6B64\u8F93\u5165\u5185\u5BB9..",
  placeholderColor: "#999",
  lineHeight: 1.5,
  childNodeName: R,
  allowedNodeNames: ne,
  paragraphTailSpacing: "10px",
  caretColor: "",
  textColor: "#333333",
  customPasteHandler: void 0,
  insertTextToNewParagraph: !1
};
class Oe extends ge {
  constructor(i) {
    super();
    u(this, "version");
    u(this, "options");
    u(this, "$editor");
    u(this, "_cursorElement", null);
    u(this, "_eventHandler");
    u(this, "allowedNodeNames");
    u(this, "blankLine");
    u(this, "_pasteHandler");
    const n = typeof i.container == "string" ? b(i.container) : i.container;
    if (!n)
      throw new Error(`Can't found '${i.container}' Node in document!`);
    this.version = "3.1.0", this.options = { ...Se, ...i }, this.allowedNodeNames = (this.options.allowedNodeNames || ne).map((s) => s.toUpperCase());
    const r = this.options.childNodeName.toUpperCase();
    this.options.childNodeName = r, this.blankLine = `<${r}><br></${r}>`, this.allowedNodeNames.includes(r) || this.allowedNodeNames.push(r), this.$editor = He(this.options, this.blankLine), n.append(this.$editor), this._eventHandler = (s) => {
      const o = s.type;
      if (o === "blur" || o === "click") {
        this._lastLine();
        const l = window.getSelection(), d = l && l.rangeCount ? l.getRangeAt(l.rangeCount - 1).endContainer : s.currentTarget;
        this.setCursorElement(d);
      }
      this.emit(o === "input" ? "change" : o, s), U(this.$editor);
    }, this._pasteHandler = (s) => {
      var l;
      if (typeof this.options.customPasteHandler == "function")
        return this.options.customPasteHandler(s);
      s.preventDefault();
      const o = (l = s.clipboardData) == null ? void 0 : l.getData("text");
      this._insertText(o);
    }, this._initEvents();
  }
  _initEvents() {
    this.$editor.addEventListener("focus", this._eventHandler), this.$editor.addEventListener("blur", this._eventHandler), this.$editor.addEventListener("input", this._eventHandler), this.$editor.addEventListener("click", this._eventHandler), this.$editor.addEventListener("paste", this._pasteHandler);
  }
  use(i, n) {
    typeof i.install == "function" && i.install(this, n);
  }
  setHtml(i) {
    this.$editor.innerHTML = this.blankLine, this.insert(i, !0), this._lastLine(), U(this.$editor);
  }
  getHtml(i) {
    const n = this.$editor.innerHTML;
    if (i)
      return n;
    const r = this.options.childNodeName;
    return n.replace(new RegExp(`(<${r}><br\\s?\\/?><\\/${r}>)+$`, "i"), "");
  }
  insert(i, n = !1) {
    if (i instanceof HTMLElement)
      this._insertEl(i);
    else {
      const r = w("div", {}, i), s = v(r.childNodes);
      if (!n && !this.options.insertTextToNewParagraph && s.every((o) => o.nodeType === Node.TEXT_NODE))
        return this._insertText(i);
      s.forEach((o) => {
        o.nodeType === Node.ELEMENT_NODE ? o.nodeName === Te ? this._insertEl(w(this.options.childNodeName, {}, "<br/>")) : this._insertEl(o) : o.textContent && this._insertEl(w(this.options.childNodeName, {}, o.textContent));
      });
    }
    this._dispatchChange();
  }
  _insertEl(i) {
    const n = this.getCursorElement();
    A(n) ? this.$editor.insertBefore(i, n) : this.$editor.insertBefore(i, n.nextElementSibling), this.allowedNodeNames.includes(i.nodeName) || (i = F(i, this.options.childNodeName)), this.setCursorElement(i);
  }
  _insertText(i) {
    if (!i)
      return;
    const n = window.getSelection(), r = n == null ? void 0 : n.rangeCount;
    if (!r)
      return this.insert(i, !0);
    n.deleteFromDocument(), n.getRangeAt(0).insertNode(O(i)), this.setCursorElement(n.getRangeAt(r - 1).endContainer), n.collapseToEnd(), this._dispatchChange();
  }
  _lastLine() {
    if (!A(this.$editor.lastElementChild)) {
      const i = this.options.childNodeName;
      this.$editor.appendChild(w(i, {}, "<br>"));
    }
  }
  changeNodeName(i) {
    if (i = (i || this.options.childNodeName).toUpperCase(), !this.allowedNodeNames.includes(i))
      return !1;
    const n = this.getCursorElement(), r = F(n, i);
    return r ? (this.setCursorElement(r), this._dispatchChange(), !0) : !1;
  }
  changeStyles(i, n) {
    const r = this.getCursorElement(!0);
    if (r) {
      const s = S(r);
      if (i) {
        const o = typeof i == "string" ? { [i]: n } : i;
        r.setAttribute("style", P(s, o));
      } else {
        if (!Object.keys(s).length)
          return;
        r.removeAttribute("style");
      }
      this._dispatchChange();
    }
  }
  _dispatchChange() {
    this.$editor.dispatchEvent(new InputEvent("input"));
  }
  getStyles() {
    return S(this.getCursorElement());
  }
  setCursorElement(i) {
    if (i instanceof Node)
      for (; i; ) {
        if (i.nodeType === Node.ELEMENT_NODE) {
          this._cursorElement = i;
          break;
        }
        i = i.parentElement;
      }
    else
      i && (this._cursorElement = i);
  }
  getCursorElement(i = !1) {
    return De(this._cursorElement, this.$editor, i);
  }
  destroy() {
    this.$editor.removeEventListener("focus", this._eventHandler), this.$editor.removeEventListener("blur", this._eventHandler), this.$editor.removeEventListener("input", this._eventHandler), this.$editor.removeEventListener("paste", this._pasteHandler), this.removeAllListeners();
  }
}
const Ae = ["#333333", "#d0d0d0", "#ff583d", "#fdaa25", "#44c67b", "#14b2e0", "#b065e2"], Ie = {
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
}, z = {
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
}, Pe = (t) => {
  const e = [];
  return t.forEach((i, n) => {
    /^#\w{3,6}$/.test(i) && e.push({
      tag: "dd",
      attrs: {
        class: n === 0 ? "active" : "",
        "data-color": Re(i.toLowerCase())
      },
      child: [
        {
          tag: "i",
          attrs: {
            style: `background:${i}`
          }
        }
      ]
    });
  }), e;
}, Re = (t) => t.length === 7 ? t : `#${t[1]}${t[1]}${t[2]}${t[2]}${t[3]}${t[3]}`, Me = {
  textStyleColors: [...Ae],
  textStyleTitle: "Set Style",
  textStyleHeadLeftBtnText: "Clear"
};
const C = "style-panel", D = `${C}__fade-in`;
class Be {
  constructor(e) {
    u(this, "editorInstance", null);
    u(this, "$el");
    u(this, "options");
    u(this, "_headerSwitchHandler");
    u(this, "_headerLeftHandler");
    u(this, "$elMap", /* @__PURE__ */ new Map());
    u(this, "_styleHandler");
    u(this, "_colorHandler");
    u(this, "_tagHandler");
    const i = {
      ...Me,
      ...e
    };
    this.options = i, this.$el = w("div", { class: `${C} border-top` }), this._styleHandler = (n) => {
      const r = this.editorInstance, s = n.currentTarget, o = S(s, "data-style"), l = r.getStyles();
      Object.keys(o).forEach((d) => {
        l[d] && (o[d] = "");
      }), r.changeStyles(o);
    }, this._colorHandler = (n) => {
      const r = n.currentTarget;
      if (this.updateActiveClassName(r)) {
        const s = this.editorInstance, o = r.getAttribute("data-color");
        s.changeStyles({ color: o });
      }
    }, this._tagHandler = (n) => {
      const r = n.currentTarget;
      if (this.updateActiveClassName(r)) {
        const s = this.editorInstance, o = r.getAttribute("data-tag");
        s.changeNodeName(o);
      }
    }, this._headerLeftHandler = () => {
      const n = this.editorInstance, { textColor: r, childNodeName: s } = n.options;
      n.changeStyles(), n.changeNodeName(), this.updateActiveClassName(b(`[data-color="${r}"]`, this.$el)), this.updateActiveClassName(b(`[data-tag="${s}"]`, this.$el));
    }, this._headerSwitchHandler = () => {
      this.$el.classList.contains(D) ? this.hide() : this.show();
    };
  }
  _initChildEl(e) {
    const { textColor: i, childNodeName: n } = e, { textStyleTitle: r, textStyleHeadLeftBtnText: s, textStyleColors: o } = this.options, l = w("div", { class: `${C}__header` }, r), d = w("div", { class: "__left" }, s), E = w("div", { class: "__switch" });
    l.append(d, E);
    const h = [Ie], a = o;
    if (a.length) {
      i && !a.includes(i) && a.unshift(i);
      const m = {
        tag: "dl",
        attrs: {
          class: "__color-wrapper border-bottom"
        },
        child: Pe(a)
      };
      h.push(m);
    }
    const p = {
      ...z,
      child: [...z.child]
    }, f = n.toLowerCase();
    p.child.forEach((m) => {
      const g = m.attrs["data-tag"];
      g === "section" && g !== f && (m.attrs["data-tag"] = f);
    }), h.push(p);
    const c = ie({
      tag: "div",
      attrs: {
        class: `${C}__body`
      },
      child: h
    });
    this.$el.append(l, c), N(".__style-wrapper dd", c).forEach((m) => {
      m.addEventListener("click", this._styleHandler);
    }), N(".__color-wrapper dd", c).forEach((m) => {
      m.addEventListener("click", this._colorHandler);
    }), N(".__tag-wrapper dd", c).forEach((m) => {
      m.addEventListener("click", this._tagHandler);
    }), d.addEventListener("click", this._headerLeftHandler), E.addEventListener("click", this._headerSwitchHandler), this.$elMap.set(d, this._headerLeftHandler), this.$elMap.set(E, this._headerSwitchHandler);
  }
  install(e, i) {
    this.editorInstance = e, i && i.append(this.$el), this._initChildEl(e.options), e.on("click", () => {
      const { textColor: n, childNodeName: r } = e.options, s = e.getStyles();
      this.updateActiveClassName(b(`[data-color="${s.color || n}"]`, this.$el));
      const o = e.getCursorElement(!0).nodeName.toLowerCase();
      this.updateActiveClassName(b(`[data-tag="${o || r}"]`, this.$el));
    });
  }
  show() {
    this.$el.classList.add(D);
  }
  hide() {
    this.$el.classList.remove(D);
  }
  updateActiveClassName(e) {
    return e.classList.contains("active") ? !1 : (b(".active", e.parentElement).classList.remove("active"), e.classList.add("active"), !0);
  }
  destroy() {
    this.$elMap.forEach((e, i) => {
      i.removeEventListener("click", e);
    });
  }
}
const je = {
  toolbarBeenFixed: !0,
  toolbarHeight: "50px",
  toolbarButtons: ["choose-picture", "text-style"]
}, ke = 34;
class Fe {
  constructor(e) {
    u(this, "editorInstance", null);
    u(this, "visible");
    u(this, "options");
    u(this, "$el");
    u(this, "_btnClickHandler");
    this.options = {
      ...je,
      ...e
    }, this.visible = this.options.toolbarBeenFixed;
    const [i, n] = ve(this.options.toolbarHeight);
    this.$el = w("div", {
      class: "zx-editor__toolbar border-top",
      style: {
        "--bar-height": `${i}${n}`,
        height: `${i + (me() ? ke : 0)}${n}`
      }
    }, '<dl class="inner-wrapper"></dl>'), this._btnClickHandler = (r) => {
      const s = r.currentTarget;
      this.editorInstance && s && this.editorInstance.emit("toolbarButtonOnClick", s.getAttribute("data-name"));
    }, this.options.toolbarButtons.forEach((r) => {
      this.addButton({ name: r });
    });
  }
  install(e, i) {
    this.editorInstance = e, i && i.append(this.$el), this.visible && this.show();
  }
  show() {
    Ne(this.$el, "__fade-in"), this.visible = !0, this.editorInstance.emit("toolbarShow", !0, this);
  }
  hide() {
    Ce(this.$el, "__fade-in"), this.visible = !1, this.editorInstance.emit("toolbarShow", !1, this);
  }
  addButton(e, i) {
    const n = { ...e.style }, r = w("dd", {
      class: $e("icon-item", e.className),
      dataName: e.name,
      style: n
    }, e.innerHtml), s = N("dd", this.$el), o = b("dl", this.$el);
    typeof i == "number" && i >= 0 && i < s.length ? o.insertBefore(r, s[i]) : o.append(r), r.addEventListener("click", this._btnClickHandler);
  }
  destroy() {
    N(".icon-item", this.$el).forEach((e) => {
      e.removeEventListener("click", this._btnClickHandler);
    });
  }
}
/*!
 * image-process version 4.2.1
 * Author: Capricorncd <capricorncd@qq.com>
 * Repository: https://github.com/capricorncd/image-process-tools
 * Released on: 2022-07-23 16:12:35 (GMT+0900)
 */
/*!
 * zx-sml version 0.2.0
 * Author: Capricorncd <capricorncd@qq.com>
 * Repository: https://github.com/capricorncd/zx-sml
 * Released on: 2022-07-13 22:46:38 (GMT+0900)
 */
var Ue = Object.defineProperty, W = Object.getOwnPropertySymbols, ze = Object.prototype.hasOwnProperty, We = Object.prototype.propertyIsEnumerable, G = (t, e, i) => e in t ? Ue(t, e, { enumerable: !0, configurable: !0, writable: !0, value: i }) : t[e] = i, Y = (t, e) => {
  for (var i in e || (e = {}))
    ze.call(e, i) && G(t, i, e[i]);
  if (W)
    for (var i of W(e))
      We.call(e, i) && G(t, i, e[i]);
  return t;
};
function Ge(t) {
  return Array.isArray(t);
}
function re(t) {
  return t !== null && !Ge(t) && typeof t == "object";
}
var Ye = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, T = { exports: {} };
/*! For license information please see date-utils-2020.js.LICENSE.txt */
(function(t, e) {
  (function(i, n) {
    t.exports = n();
  })(typeof self < "u" ? self : Ye, function() {
    return (() => {
      var i = { 949: (r, s) => {
        Object.defineProperty(s, "__esModule", { value: !0 }), s.toTwoDigits = void 0, s.toTwoDigits = function(o) {
          return o[1] ? o : "0" + o;
        };
      }, 607: (r, s, o) => {
        Object.defineProperty(s, "__esModule", { value: !0 }), s.toTwoDigits = s.toDate = s.formatDate = void 0;
        var l = o(949);
        Object.defineProperty(s, "toTwoDigits", { enumerable: !0, get: function() {
          return l.toTwoDigits;
        } });
        var d = { weeks: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] };
        function E(h) {
          if (h instanceof Date)
            return h;
          if (typeof h == "number")
            return new Date(h);
          if (typeof h == "string") {
            var a = h.trim();
            if (/^\d+$/.test(a)) {
              var p = a.length;
              return p === 8 ? new Date([a.substr(0, 4), a.substr(4, 2), a.substr(6, 2)].join("/")) : p === 6 ? new Date([a.substr(0, 4), a.substr(4, 2), "01"].join("/")) : p === 4 ? new Date(a + "/01/01") : new Date(parseInt(h));
            }
            if (a = a.replace(/[年月日]/g, function(c) {
              return c === "\u65E5" ? "" : "/";
            }).replace(/[(（（].*?[)））]/g, " ").replace(/\bam|pm\b/gi, " ").replace(/\s+/g, " "), /^(\d{4})[-/](\d{1,2})[-/](\d{1,2})$/.test(a))
              return new Date([RegExp.$1, RegExp.$2, RegExp.$3].join("/"));
            if (/^(\d{4})[-/](\d{1,2})$/.test(a))
              return new Date([RegExp.$1, RegExp.$2, "01"].join("/"));
            var f = new Date(a);
            return isNaN(f.getFullYear()) ? null : f;
          }
          return null;
        }
        s.formatDate = function(h, a, p) {
          var f, c = E(h);
          if (!c || !a)
            return h + "";
          if (a === "timestamp")
            return c.getTime().toString();
          /(y+)/i.test(a) && (f = RegExp.$1, a = a.replace(f, (c.getFullYear() + "").substr(4 - f.length))), p && Array.isArray(p.weeks) || (p = d);
          var m = { "M+": c.getMonth() + 1, "d+": c.getDate(), "h+": c.getHours(), "m+": c.getMinutes(), "s+": c.getSeconds(), "w+": c.getDay(), "W+": p.weeks[c.getDay()], "a+": c.getHours() < 12 ? "am" : "pm", "A+": c.getHours() < 12 ? "AM" : "PM" };
          for (var g in m)
            if (new RegExp("(" + g + ")").test(a)) {
              f = RegExp.$1;
              var y = m[g] + "";
              a = a.replace(f, f.length === 1 ? y : l.toTwoDigits(y));
            }
          if (/(g)/i.test(a)) {
            var _ = c.toString().split(/\s+/).slice(5), L = a.includes("g");
            a = a.replace(/g/i, L ? _[0] : _.join(" "));
          }
          return a;
        }, s.toDate = E;
      } }, n = {};
      return function r(s) {
        if (n[s])
          return n[s].exports;
        var o = n[s] = { exports: {} };
        return i[s](o, o.exports, r), o.exports;
      }(607);
    })();
  });
})(T);
function se(t = "", e = "-") {
  return t.replace(/[A-Z]/g, (i, n) => `${n > 0 ? e : ""}${i.toLowerCase()}`);
}
function Ve(t = "", e = !1) {
  const i = t.replace(/[-_\s](\w)/g, (n, r) => r.toUpperCase());
  return e ? i.replace(/^\w/, (n) => n.toUpperCase()) : i;
}
function oe(t = {}, e = !1) {
  const i = e ? Ve : se, n = {};
  for (const [r, s] of Object.entries(t))
    n[i(r)] = re(s) ? oe(s, e) : s;
  return n;
}
function ae(t, e = !1, i = 2) {
  const n = ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"], r = e ? 1e3 : 1024;
  let s = String(t), o = "Byte";
  for (let l = 0, d = t / r; d > 1; d /= r, l++)
    s = d.toFixed(i), o = n[l];
  return e && (o = o.replace("i", "")), {
    text: s.replace(/\.0+$/, "") + o,
    value: +s,
    unit: o,
    bytes: t
  };
}
function qe(t, e = {}, i) {
  const n = document.createElement(t);
  for (const [r, s] of Object.entries(e))
    n.setAttribute(se(r), r === "style" && re(s) ? Ke(s) : s);
  return i && (typeof i == "string" ? n.innerHTML = i : n.append(i)), n;
}
function Ke(...t) {
  const e = t.reduce((n, r) => Y(Y({}, n), oe(r)), {}), i = [];
  for (const [n, r] of Object.entries(e))
    r === "" || typeof r > "u" || r === null || i.push(`${n}:${r}`);
  return i.join(";");
}
function Ze(t) {
  return new Promise((e, i) => {
    const n = new FileReader();
    n.onload = (r) => {
      var s;
      const o = (s = r.target) == null ? void 0 : s.result;
      o ? e(o) : i(new Error(`FileReader's result is null, ${r.target}`));
    }, n.onerror = i, n.readAsDataURL(t);
  });
}
function le(t) {
  return (window.URL || window.webkitURL).createObjectURL(t);
}
function ce(t) {
  const e = t.split(",");
  let i = "";
  return /data:(\w+\/\w+);base64/.test(e[0]) && (i = RegExp.$1), {
    type: i,
    data: e[1]
  };
}
function de(t, e) {
  const i = ce(t), n = window.atob(i.data);
  e = e || i.type;
  const r = new Uint8Array(n.length);
  for (let s = 0; s < n.length; s++)
    r[s] = n.charCodeAt(s);
  return new Blob([r], { type: e });
}
T.exports.formatDate;
T.exports.toDate;
T.exports.toTwoDigits;
const Xe = {
  enableDevicePixelRatio: !1,
  isForce: !1,
  mimeType: "image/jpeg",
  perResize: 500,
  quality: 0.9,
  width: 0,
  height: 0,
  longestSide: 0
}, Qe = /^data:(.+?);base64/, Je = /^image\/.+/;
function et(t, e) {
  return new Promise((i, n) => {
    const r = {
      ...Xe,
      ...e
    };
    typeof t == "string" && Qe.test(t) ? V(t, r, i, n) : (t instanceof File || t instanceof Blob) && Je.test(t.type) ? Ze(t).then((s) => {
      V(s, r, i, n);
    }).catch(n) : n(new Error(`Invalid file, ${t}`));
  });
}
function V(t, e, i, n) {
  const { type: r } = ce(t), s = de(t, r), o = new Image();
  o.onload = () => {
    const l = {
      element: o,
      blob: s,
      data: t,
      url: le(s),
      width: o.naturalWidth || o.width,
      height: o.naturalHeight || o.height,
      type: r,
      size: ae(s.size)
    };
    e.cropInfo && e.cropInfo.sw && e.cropInfo.sh ? q(l, e, i, n, {
      ...e.cropInfo,
      dx: 0,
      dy: 0,
      dw: e.cropInfo.sw,
      dh: e.cropInfo.sh
    }) : e.width > 0 && e.height > 0 ? q(l, e, i, n, it(l, e)) : e.width > 0 || e.height > 0 || e.longestSide > 0 ? tt(l, e, i, n) : I({ ...l, raw: l }, e, i);
  }, o.onerror = n, o.src = t;
}
function q(t, e, i, n, r) {
  try {
    Object.prototype.hasOwnProperty.call(r, "enableDevicePixelRatio") || (r.enableDevicePixelRatio = e.enableDevicePixelRatio);
    const s = M(t.element, {
      enableDevicePixelRatio: e.enableDevicePixelRatio,
      sx: r.sx,
      sy: r.sy,
      sw: r.sw,
      sh: r.sh,
      dx: 0,
      dy: 0,
      dw: r.sw,
      dh: r.sh
    });
    !e.width && !e.height ? e.longestSide ? r.sw > r.sh ? (e.width = e.longestSide, e.height = r.sh * e.width / r.sw) : (e.height = e.longestSide, e.width = r.sw * e.height / r.sh) : (e.width = r.sw, e.height = r.sh) : e.width ? e.height = r.sh * e.width / r.sw : e.width = r.sw * e.height / r.sh, he(s, t, e, {
      ...r,
      sx: 0,
      sy: 0,
      sw: s.width,
      sh: s.height
    }, i);
  } catch (s) {
    n(s);
  }
}
function tt(t, e, i, n) {
  try {
    e.longestSide > 0 && !e.width && !e.height && (t.width >= t.height ? e.width = e.longestSide : e.height = e.longestSide);
    const r = {
      enableDevicePixelRatio: e.enableDevicePixelRatio,
      sx: 0,
      sy: 0,
      sw: t.width,
      sh: t.height,
      dx: 0,
      dy: 0,
      dw: e.width,
      dh: e.height
    };
    if (e.width > 0) {
      if (t.width < e.width && !e.isForce) {
        I({ ...t, raw: t }, e, i);
        return;
      }
      r.dh = t.height * e.width / t.width, e.height = r.dh;
    } else {
      if (t.height < e.height && !e.isForce) {
        I({ ...t, raw: t }, e, i);
        return;
      }
      r.dw = t.width * e.height / t.height, e.width = r.dw;
    }
    he(t.element, t, e, r, i);
  } catch (r) {
    n(r);
  }
}
function I(t, e, i) {
  t.type !== e.mimeType ? (t.type = e.mimeType, ue(t.element, t.raw, e, {
    enableDevicePixelRatio: e.enableDevicePixelRatio,
    sx: 0,
    sy: 0,
    sw: t.width,
    sh: t.height,
    dx: 0,
    dy: 0,
    dw: t.width,
    dh: t.height
  }, i)) : i(t);
}
function he(t, e, i, n, r) {
  let s = e.width > e.height ? e.width - n.dw : e.height - n.dh;
  if (s > i.perResize) {
    const o = e.height / e.width;
    for (; s > i.perResize; )
      s -= i.perResize, n.sw = t.width, n.sh = t.height, n.dw = i.width + s, n.dh = n.dw * o, t = M(t, n);
  }
  n.sw = t.width, n.sh = t.height, n.dw = i.width, n.dh = i.height, ue(t, e, i, n, r);
}
function ue(t, e, i, n, r) {
  const s = M(t, n), o = /^\w+\/\*$/.test(i.mimeType) || !i.mimeType ? e.type : i.mimeType, l = s.toDataURL(o, i.quality), d = de(l, o);
  r({
    element: s,
    type: o,
    width: s.width,
    height: s.height,
    blob: d,
    data: l,
    url: le(d),
    size: ae(d.size),
    raw: e
  });
}
function it(t, e) {
  const { width: i, height: n } = t, { width: r, height: s } = e;
  let o;
  const l = n * r / s;
  if (i > l)
    o = {
      sx: (i - l) / 2,
      sy: 0,
      sw: l,
      sh: n
    };
  else {
    const d = i * s / r;
    o = {
      sx: 0,
      sy: (n - d) / 2,
      sw: i,
      sh: d
    };
  }
  return {
    ...o,
    dx: 0,
    dy: 0,
    dw: r,
    dh: s
  };
}
function M(t, e) {
  const i = e.enableDevicePixelRatio && window.devicePixelRatio || 1, n = qe("canvas");
  n.width = e.dw * i, n.height = e.dh * i;
  const r = n.getContext("2d");
  return r.scale(i, i), r.drawImage(t, e.sx, e.sy, e.sw, e.sh, e.dx, e.dy, e.dw, e.dh), n;
}
const nt = {
  imageMaxWidth: 750,
  ignoreGif: !0,
  forceImageResize: !1,
  chooseFileMultiple: !0,
  chooseFileAccept: "image/*"
};
class st extends Oe {
  constructor(i, n = {}) {
    let r = null;
    if (typeof i == "string" || i instanceof HTMLElement ? r = b(i) : (n = i || {}, typeof n.container == "string" && (r = b(n.container))), n = {
      ...nt,
      ...n
    }, !r)
      throw new Error(`Can't found '${i}' Node in document!`);
    const s = w("div", { class: "zx-editor" });
    super({
      ...n,
      container: s
    });
    u(this, "$el");
    u(this, "stylePanel");
    u(this, "toolbar");
    u(this, "fileInput", null);
    u(this, "_inputChangeHandler");
    r.append(s), this.$el = s, this.stylePanel = new Be(n), this.use(this.stylePanel, this.$el), this.toolbar = new Fe(n), this.use(this.toolbar, this.$el), this._inputChangeHandler = (o) => {
      const l = o.currentTarget;
      this.handleImageFile(l.files).then((d) => {
        d.forEach((E) => {
          const h = /gif$/i.test(E.raw.type) && n.ignoreGif;
          this.insert(`<img src="${h ? E.raw.data : E.data}">`);
        });
      }).catch((d) => {
        this.emit("error", d);
      });
    }, this.on("toolbarButtonOnClick", (o) => {
      switch (o) {
        case "choose-picture":
          if (typeof n.customPictureHandler == "function")
            n.customPictureHandler();
          else if (this.fileInput)
            this.fileInput.click();
          else {
            const l = {
              type: "file",
              style: {
                display: "none"
              },
              accept: n.chooseFileAccept
            };
            n.chooseFileMultiple && (l.multiple = !0), this.fileInput = w("input", l), this.$el.append(this.fileInput), this.fileInput.addEventListener("change", this._inputChangeHandler), this.fileInput.click();
          }
          break;
        case "text-style":
          this.stylePanel.show();
          break;
      }
    });
  }
  handleImageFile(i) {
    return i ? new Promise((n, r) => {
      Promise.all(v(i).map(this._handleFile)).then((s) => {
        n(s.sort((o, l) => o.index - l.index).map((o) => o.data));
      }).catch(r);
    }) : Promise.resolve([]);
  }
  _handleFile(i, n) {
    return new Promise((r, s) => {
      et(i).then((o) => {
        r({
          data: o,
          index: n
        });
      }).catch(s);
    });
  }
  addToolbarButton(i, n) {
    this.toolbar.addButton(i, n);
  }
  destroy() {
    var i;
    super.destroy(), this.stylePanel.destroy(), this.toolbar.destroy(), (i = this.fileInput) == null || i.removeEventListener("change", this._inputChangeHandler);
  }
}
export {
  ne as ALLOWED_NODE_NAMES,
  st as ZxEditor
};
