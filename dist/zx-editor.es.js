/*!
 * zx-editor version 3.1.0
 * Author: capricorncd
 * Released under the MIT License
 * Repository: https://github.com/capricorncd/zx-editor
 * Released on: 2022-08-13 12:23:13 (GMT+0900)
 * Copyright © 2018-present, capricorncd
 */
var he = Object.defineProperty;
var ue = (i, e, t) => e in i ? he(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[e] = t;
var u = (i, e, t) => (ue(i, typeof e != "symbol" ? e + "" : e, t), t);
class fe {
  constructor() {
    this._events = {};
  }
  on(e, t) {
    return !e || !t || typeof t != "function" ? this : (this._events[e] || (this._events[e] = []), this._events[e].push(t), this);
  }
  once(e, t) {
    const n = (...r) => {
      t.apply(this, r), this.off(e, n);
    };
    return this.on(e, n);
  }
  emit(e, ...t) {
    const n = this._events[e];
    if (!n)
      return this;
    for (let r = 0; r < n.length; r++)
      try {
        n[r].apply(this, t);
      } catch (s) {
        this.emit("error", s, "emit");
      }
    return this;
  }
  off(e, t) {
    if (!this._events[e])
      return this;
    const n = this._events[e];
    if (typeof t == "function") {
      const r = n.findIndex((s) => s === t);
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
function pe() {
  return window.screen.height === 812 && window.screen.width === 375;
}
/*!
 * zx-sml version 0.2.1
 * Author: Capricorncd <capricorncd@qq.com>
 * Repository: https://github.com/capricorncd/zx-sml
 * Released on: 2022-07-24 15:34:05 (GMT+0900)
 */
var ge = Object.defineProperty, j = Object.getOwnPropertySymbols, me = Object.prototype.hasOwnProperty, ye = Object.prototype.propertyIsEnumerable, k = (i, e, t) => e in i ? ge(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[e] = t, B = (i, e) => {
  for (var t in e || (e = {}))
    me.call(e, t) && k(i, t, e[t]);
  if (j)
    for (var t of j(e))
      ye.call(e, t) && k(i, t, e[t]);
  return i;
};
function we(i) {
  return Array.isArray(i);
}
function K(i) {
  return i !== null && !we(i) && typeof i == "object";
}
var Ee = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, N = { exports: {} };
/*! For license information please see date-utils-2020.js.LICENSE.txt */
(function(i, e) {
  (function(t, n) {
    i.exports = n();
  })(typeof self < "u" ? self : Ee, function() {
    return (() => {
      var t = { 949: (r, s) => {
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
        return t[s](o, o.exports, r), o.exports;
      }(607);
    })();
  });
})(N);
function Z(i = "", e = "-") {
  return i.replace(/[A-Z]/g, (t, n) => `${n > 0 ? e : ""}${t.toLowerCase()}`);
}
function X(i = "", e = !1) {
  const t = i.replace(/[-_\s](\w)/g, (n, r) => r.toUpperCase());
  return e ? t.replace(/^\w/, (n) => n.toUpperCase()) : t;
}
function Q(i) {
  return typeof i == "string" ? i : i === null || typeof i > "u" ? "" : Array.isArray(i) ? i.map(Q).join(" ") : typeof i == "object" ? Object.keys(i).filter((e) => i[e]).join(" ") : String(i);
}
function _e(...i) {
  return i.map(Q).filter((e) => !!e).join(" ");
}
function v(i, e = 0) {
  return Array.prototype.slice.call(i, e);
}
function J(i = {}, e = !1) {
  const t = e ? X : Z, n = {};
  for (const [r, s] of Object.entries(i))
    n[t(r)] = K(s) ? J(s, e) : s;
  return n;
}
function b(i, e = document) {
  return i ? i instanceof HTMLElement ? i : e.querySelector(i) : null;
}
function C(i, e = document) {
  return v(e.querySelectorAll(i));
}
function w(i, e = {}, t) {
  const n = document.createElement(i);
  for (const [r, s] of Object.entries(e))
    n.setAttribute(Z(r), r === "style" && K(s) ? P(s) : s);
  return t && (Array.isArray(t) || (t = [t]), t.forEach((r) => {
    if (typeof r == "string") {
      const s = w("div");
      s.innerHTML = r, n.append(...s.childNodes);
    } else
      n.append(r);
  })), n;
}
function P(...i) {
  const e = i.reduce((n, r) => B(B({}, n), J(r)), {}), t = [];
  for (const [n, r] of Object.entries(e))
    r === "" || typeof r > "u" || r === null || t.push(`${n}:${r}`);
  return t.join(";");
}
N.exports.formatDate;
N.exports.toDate;
N.exports.toTwoDigits;
const S = (i, e = "style") => i ? (i.getAttribute(e) || "").split(/\s?;\s?/).reduce((n, r) => {
  const [s, o] = r.split(/\s?:\s?/);
  return s && (n[X(s)] = o), n;
}, {}) : {}, O = (i) => document.createTextNode(i), ee = (i) => {
  if (!i)
    return null;
  if (typeof i == "string")
    return O(i);
  const { tag: e, attrs: t, child: n } = i;
  if (!e && !t && !n)
    return null;
  const r = w(e || "div", t);
  if (Array.isArray(n) && n.length) {
    let s;
    n.forEach((o) => {
      s = ee(o), s && r.appendChild(s);
    });
  } else
    n && typeof n == "string" && r.appendChild(O(n));
  return r;
}, be = (i, e) => {
  i.classList.add(e);
}, ve = (i, e) => {
  i.classList.remove(e);
}, $e = "zx-editor__editor", R = "SECTION", Ce = "BR", te = [R, "H1", "H2", "H3", "H4", "H5", "BLOCKQUOTE", "UL", "OL"], xe = [
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
function $(i, e, t) {
  return i.replace(RegExp("(^<" + e + ")|(" + e + ">$)", "gi"), (n) => n.toUpperCase().replace(e, t.toLowerCase()));
}
function H(i) {
  return /^UL|OL$/.test(i.nodeName);
}
function A(i) {
  if (!i)
    return !1;
  const e = v(i.childNodes);
  return e.length === 1 && e[0].nodeName === "BR";
}
const Ne = (i, e) => {
  const t = {
    minHeight: i.minHeight,
    "--placeholder": JSON.stringify(i.placeholder),
    "--placeholder-color": i.placeholderColor,
    "--line-height": i.lineHeight,
    "--paragraph-spacing": i.paragraphTailSpacing,
    "--padding-bottom": i.paddingBottom,
    ...i.styles
  };
  i.caretColor && (t.caretColor = i.caretColor), i.textColor && (t.color = i.textColor);
  const n = {
    class: `${$e} is-empty`,
    style: P(t)
  };
  return i.editable && (n.contenteditable = "true"), w("div", n, e);
}, F = (i, e) => {
  var l, d, E, h, a, p, f, c, m;
  if (!i)
    return null;
  const t = i.nodeName, n = e.toUpperCase();
  if (t === n)
    return null;
  const r = w(e), s = i.parentElement;
  let o;
  if (t === "LI" && H(s)) {
    if (r.innerHTML = $(i.outerHTML, t, n), o = r.firstChild, s.childElementCount > 1)
      if (s.firstElementChild === i)
        (l = s.parentElement) == null || l.insertBefore(o, s);
      else if (s.lastElementChild === i) {
        const g = (d = s.parentElement) == null ? void 0 : d.nextElementSibling;
        g ? (E = g.parentElement) == null || E.insertBefore(o, g) : (h = s.parentElement) == null || h.append(o);
      } else {
        const g = v(s.children), y = w(s.nodeName);
        let _ = g.shift();
        for (; _ && _ !== i; )
          y.append(_), _ = g.shift();
        (a = s.parentElement) == null || a.insertBefore(y, s), (p = s.parentElement) == null || p.insertBefore(o, s), s.removeChild(i);
      }
    else
      (f = s.parentElement) == null || f.insertBefore(o, s), (c = s.parentElement) == null || c.removeChild(s);
    return o;
  }
  if (xe.includes(t)) {
    if (/UL|OL/.test(n)) {
      const g = i.previousElementSibling, y = i.nextElementSibling;
      if (g && H(g)) {
        if (r.innerHTML = $(i.outerHTML, t, "li"), o = r.firstChild, g.append(o), s == null || s.removeChild(i), y && y.nodeName === g.nodeName) {
          const _ = v(y.children);
          g.append(..._), (m = y.parentElement) == null || m.removeChild(y);
        }
      } else
        y && H(y) ? (r.innerHTML = $(i.outerHTML, t, "li"), o = r.firstChild, y.insertBefore(o, y.firstElementChild), s == null || s.removeChild(i)) : (o = r, r.innerHTML = $(i.outerHTML, t, "li"), s == null || s.replaceChild(o, i));
    } else
      r.innerHTML = $(i.outerHTML, t, n), o = r.firstChild, s == null || s.replaceChild(o, i);
    return o;
  }
  return r.append(i.cloneNode(!0)), s == null || s.replaceChild(r, i), r;
}, U = (i) => {
  i.children.length <= 1 && A(i.children[0]) ? i.classList.add("is-empty") : i.classList.remove("is-empty");
};
function Te(i, e, t = !1) {
  var n;
  for (; i && e !== i; ) {
    if (!t && i.nodeName === "LI" && ((n = i.parentElement) == null ? void 0 : n.parentElement) === e || i.parentElement === e)
      return i;
    i = i.parentElement;
  }
  return e.lastElementChild;
}
const Le = {
  editable: !0,
  minHeight: "50vh",
  paddingBottom: "50vh",
  placeholder: "\u8BF7\u5728\u6B64\u8F93\u5165\u5185\u5BB9..",
  placeholderColor: "#999",
  lineHeight: 1.5,
  childNodeName: R,
  allowedNodeNames: te,
  paragraphTailSpacing: "10px",
  caretColor: "",
  textColor: "#333333",
  customPasteHandler: void 0,
  insertTextToNewParagraph: !1
};
class He extends fe {
  constructor(t) {
    super();
    u(this, "version");
    u(this, "options");
    u(this, "$editor");
    u(this, "_cursorElement", null);
    u(this, "_eventHandler");
    u(this, "allowedNodeNames");
    u(this, "blankLine");
    u(this, "_pasteHandler");
    const n = typeof t.container == "string" ? b(t.container) : t.container;
    if (!n)
      throw new Error(`Can't found '${t.container}' Node in document!`);
    this.version = "3.1.0", this.options = { ...Le, ...t }, this.allowedNodeNames = (this.options.allowedNodeNames || te).map((s) => s.toUpperCase());
    const r = this.options.childNodeName.toUpperCase();
    this.options.childNodeName = r, this.blankLine = `<${r}><br></${r}>`, this.allowedNodeNames.includes(r) || this.allowedNodeNames.push(r), this.$editor = Ne(this.options, this.blankLine), n.append(this.$editor), this._eventHandler = (s) => {
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
  use(t, n) {
    typeof t.install == "function" && t.install(this, n);
  }
  setHtml(t) {
    this.$editor.innerHTML = this.blankLine, this.insert(t, !0), this._lastLine(), U(this.$editor);
  }
  getHtml() {
    return this.$editor.innerHTML.replace(new RegExp(`${this.blankLine}$`, "i"), "");
  }
  insert(t, n = !1) {
    if (t instanceof HTMLElement)
      this._insertEl(t);
    else {
      const r = w("div", {}, t), s = v(r.childNodes);
      if (!n && !this.options.insertTextToNewParagraph && s.every((o) => o.nodeType === Node.TEXT_NODE))
        return this._insertText(t);
      s.forEach((o) => {
        o.nodeType === Node.ELEMENT_NODE ? o.nodeName === Ce ? this._insertEl(w(this.options.childNodeName, {}, "<br/>")) : this._insertEl(o) : o.textContent && this._insertEl(w(this.options.childNodeName, {}, o.textContent));
      });
    }
    this._dispatchChange();
  }
  _insertEl(t) {
    const n = this.getCursorElement();
    A(n) ? this.$editor.insertBefore(t, n) : this.$editor.insertBefore(t, n.nextElementSibling), this.allowedNodeNames.includes(t.nodeName) || (t = F(t, this.options.childNodeName)), this.setCursorElement(t);
  }
  _insertText(t) {
    if (!t)
      return;
    const n = window.getSelection(), r = n == null ? void 0 : n.rangeCount;
    if (!r)
      return this.insert(t, !0);
    n.deleteFromDocument(), n.getRangeAt(0).insertNode(O(t)), this.setCursorElement(n.getRangeAt(r - 1).endContainer), n.collapseToEnd(), this._dispatchChange();
  }
  _lastLine() {
    if (!A(this.$editor.lastElementChild)) {
      const t = this.options.childNodeName;
      this.$editor.appendChild(w(t, {}, "<br>"));
    }
  }
  changeNodeName(t) {
    if (t = (t || this.options.childNodeName).toUpperCase(), !this.allowedNodeNames.includes(t))
      return !1;
    const n = this.getCursorElement(), r = F(n, t);
    return r ? (this.setCursorElement(r), this._dispatchChange(), !0) : !1;
  }
  changeStyles(t, n) {
    const r = this.getCursorElement(!0);
    if (r) {
      const s = S(r);
      if (t) {
        const o = typeof t == "string" ? { [t]: n } : t;
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
    return Te(this._cursorElement, this.$editor, t);
  }
  destroy() {
    this.$editor.removeEventListener("focus", this._eventHandler), this.$editor.removeEventListener("blur", this._eventHandler), this.$editor.removeEventListener("input", this._eventHandler), this.$editor.removeEventListener("paste", this._pasteHandler), this.removeAllListeners();
  }
}
const De = {
  textStyleTitle: "Set Style",
  textStyleHeadLeftBtnText: "Clear style"
}, Se = ["#333333", "#d0d0d0", "#ff583d", "#fdaa25", "#44c67b", "#14b2e0", "#b065e2"], Oe = {
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
}, Ae = (i) => {
  const e = [];
  return i.forEach((t, n) => {
    /^#\w{3,6}$/.test(t) && e.push({
      tag: "dd",
      attrs: {
        class: n === 0 ? "active" : "",
        "data-color": Ie(t.toLowerCase())
      },
      child: [
        {
          tag: "i",
          attrs: {
            style: `background:${t}`
          }
        }
      ]
    });
  }), e;
}, Ie = (i) => i.length === 7 ? i : `#${i[1]}${i[1]}${i[2]}${i[2]}${i[3]}${i[3]}`;
const x = "style-panel", D = `${x}__fade-in`;
class Pe {
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
    const t = {
      ...De,
      ...e
    };
    this.options = t, this.$el = w("div", { class: `${x} border-top` }), this._styleHandler = (n) => {
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
    const { textColor: t, childNodeName: n } = e, { textStyleTitle: r, textStyleHeadLeftBtnText: s, textStyleColors: o } = this.options, l = w("div", { class: `${x}__header` }, r), d = w("div", { class: "__left" }, s), E = w("div", { class: "__switch" });
    l.append(d, E);
    const h = [Oe], a = Array.isArray(o) ? o : Se;
    if (a.length) {
      t && !a.includes(t) && a.unshift(t);
      const m = {
        tag: "dl",
        attrs: {
          class: "__color-wrapper border-bottom"
        },
        child: Ae(a)
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
    const c = ee({
      tag: "div",
      attrs: {
        class: `${x}__body`
      },
      child: h
    });
    this.$el.append(l, c), C(".__style-wrapper dd", c).forEach((m) => {
      m.addEventListener("click", this._styleHandler);
    }), C(".__color-wrapper dd", c).forEach((m) => {
      m.addEventListener("click", this._colorHandler);
    }), C(".__tag-wrapper dd", c).forEach((m) => {
      m.addEventListener("click", this._tagHandler);
    }), d.addEventListener("click", this._headerLeftHandler), E.addEventListener("click", this._headerSwitchHandler), this.$elMap.set(d, this._headerLeftHandler), this.$elMap.set(E, this._headerSwitchHandler);
  }
  install(e, t) {
    this.editorInstance = e, t && t.append(this.$el), this._initChildEl(e.options), e.on("click", () => {
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
    return console.log(e), e.classList.contains("active") ? !1 : (b(".active", e.parentElement).classList.remove("active"), e.classList.add("active"), !0);
  }
  destroy() {
    this.$elMap.forEach((e, t) => {
      t.removeEventListener("click", e);
    });
  }
}
const Re = {
  toolbarBeenFixed: !0,
  toolbarHeight: 50,
  toolbarButtons: ["choose-picture", "text-style"]
}, Me = 34;
class je {
  constructor(e) {
    u(this, "editorInstance", null);
    u(this, "visible");
    u(this, "options");
    u(this, "$el");
    u(this, "_btnClickHandler");
    this.options = {
      ...Re,
      ...e
    }, this.visible = this.options.toolbarBeenFixed;
    const t = this.options.toolbarHeight;
    this.$el = w("div", {
      class: "zx-editor__toolbar border-top",
      style: {
        "--bar-height": t + "px",
        height: `${t + (pe() ? Me : 0)}px`
      }
    }, '<dl class="inner-wrapper"></dl>'), this._btnClickHandler = (n) => {
      const r = n.currentTarget;
      this.editorInstance && r && this.editorInstance.emit("toolbarButtonClick", r.getAttribute("data-name"));
    }, this.options.toolbarButtons.forEach((n) => {
      this.addButton({ name: n });
    });
  }
  install(e, t) {
    this.editorInstance = e, t && t.append(this.$el), this.visible && this.show();
  }
  show() {
    be(this.$el, "__fade-in"), this.visible = !0, this.editorInstance.emit("toolbarShow", !0, this);
  }
  hide() {
    ve(this.$el, "__fade-in"), this.visible = !1, this.editorInstance.emit("toolbarShow", !1, this);
  }
  addButton(e, t) {
    const n = { ...e.style }, r = w("dd", {
      class: _e("icon-item", e.className),
      dataName: e.name,
      style: n
    }, e.innerHtml), s = C("dd", this.$el), o = b("dl", this.$el);
    typeof t == "number" && t < s.length ? o.insertBefore(r, s[t]) : o.append(r), r.addEventListener("click", this._btnClickHandler);
  }
  destroy() {
    C(".icon-item", this.$el).forEach((e) => {
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
var ke = Object.defineProperty, W = Object.getOwnPropertySymbols, Be = Object.prototype.hasOwnProperty, Fe = Object.prototype.propertyIsEnumerable, G = (i, e, t) => e in i ? ke(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[e] = t, Y = (i, e) => {
  for (var t in e || (e = {}))
    Be.call(e, t) && G(i, t, e[t]);
  if (W)
    for (var t of W(e))
      Fe.call(e, t) && G(i, t, e[t]);
  return i;
};
function Ue(i) {
  return Array.isArray(i);
}
function ie(i) {
  return i !== null && !Ue(i) && typeof i == "object";
}
var ze = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, T = { exports: {} };
/*! For license information please see date-utils-2020.js.LICENSE.txt */
(function(i, e) {
  (function(t, n) {
    i.exports = n();
  })(typeof self < "u" ? self : ze, function() {
    return (() => {
      var t = { 949: (r, s) => {
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
        return t[s](o, o.exports, r), o.exports;
      }(607);
    })();
  });
})(T);
function ne(i = "", e = "-") {
  return i.replace(/[A-Z]/g, (t, n) => `${n > 0 ? e : ""}${t.toLowerCase()}`);
}
function We(i = "", e = !1) {
  const t = i.replace(/[-_\s](\w)/g, (n, r) => r.toUpperCase());
  return e ? t.replace(/^\w/, (n) => n.toUpperCase()) : t;
}
function se(i = {}, e = !1) {
  const t = e ? We : ne, n = {};
  for (const [r, s] of Object.entries(i))
    n[t(r)] = ie(s) ? se(s, e) : s;
  return n;
}
function re(i, e = !1, t = 2) {
  const n = ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"], r = e ? 1e3 : 1024;
  let s = String(i), o = "Byte";
  for (let l = 0, d = i / r; d > 1; d /= r, l++)
    s = d.toFixed(t), o = n[l];
  return e && (o = o.replace("i", "")), {
    text: s.replace(/\.0+$/, "") + o,
    value: +s,
    unit: o,
    bytes: i
  };
}
function Ge(i, e = {}, t) {
  const n = document.createElement(i);
  for (const [r, s] of Object.entries(e))
    n.setAttribute(ne(r), r === "style" && ie(s) ? Ye(s) : s);
  return t && (typeof t == "string" ? n.innerHTML = t : n.append(t)), n;
}
function Ye(...i) {
  const e = i.reduce((n, r) => Y(Y({}, n), se(r)), {}), t = [];
  for (const [n, r] of Object.entries(e))
    r === "" || typeof r > "u" || r === null || t.push(`${n}:${r}`);
  return t.join(";");
}
function qe(i) {
  return new Promise((e, t) => {
    const n = new FileReader();
    n.onload = (r) => {
      var s;
      const o = (s = r.target) == null ? void 0 : s.result;
      o ? e(o) : t(new Error(`FileReader's result is null, ${r.target}`));
    }, n.onerror = t, n.readAsDataURL(i);
  });
}
function oe(i) {
  return (window.URL || window.webkitURL).createObjectURL(i);
}
function ae(i) {
  const e = i.split(",");
  let t = "";
  return /data:(\w+\/\w+);base64/.test(e[0]) && (t = RegExp.$1), {
    type: t,
    data: e[1]
  };
}
function le(i, e) {
  const t = ae(i), n = window.atob(t.data);
  e = e || t.type;
  const r = new Uint8Array(n.length);
  for (let s = 0; s < n.length; s++)
    r[s] = n.charCodeAt(s);
  return new Blob([r], { type: e });
}
T.exports.formatDate;
T.exports.toDate;
T.exports.toTwoDigits;
const Ve = {
  enableDevicePixelRatio: !1,
  isForce: !1,
  mimeType: "image/jpeg",
  perResize: 500,
  quality: 0.9,
  width: 0,
  height: 0,
  longestSide: 0
}, Ke = /^data:(.+?);base64/, Ze = /^image\/.+/;
function Xe(i, e) {
  return new Promise((t, n) => {
    const r = {
      ...Ve,
      ...e
    };
    typeof i == "string" && Ke.test(i) ? q(i, r, t, n) : (i instanceof File || i instanceof Blob) && Ze.test(i.type) ? qe(i).then((s) => {
      q(s, r, t, n);
    }).catch(n) : n(new Error(`Invalid file, ${i}`));
  });
}
function q(i, e, t, n) {
  const { type: r } = ae(i), s = le(i, r), o = new Image();
  o.onload = () => {
    const l = {
      element: o,
      blob: s,
      data: i,
      url: oe(s),
      width: o.naturalWidth || o.width,
      height: o.naturalHeight || o.height,
      type: r,
      size: re(s.size)
    };
    e.cropInfo && e.cropInfo.sw && e.cropInfo.sh ? V(l, e, t, n, {
      ...e.cropInfo,
      dx: 0,
      dy: 0,
      dw: e.cropInfo.sw,
      dh: e.cropInfo.sh
    }) : e.width > 0 && e.height > 0 ? V(l, e, t, n, Je(l, e)) : e.width > 0 || e.height > 0 || e.longestSide > 0 ? Qe(l, e, t, n) : I({ ...l, raw: l }, e, t);
  }, o.onerror = n, o.src = i;
}
function V(i, e, t, n, r) {
  try {
    Object.prototype.hasOwnProperty.call(r, "enableDevicePixelRatio") || (r.enableDevicePixelRatio = e.enableDevicePixelRatio);
    const s = M(i.element, {
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
    !e.width && !e.height ? e.longestSide ? r.sw > r.sh ? (e.width = e.longestSide, e.height = r.sh * e.width / r.sw) : (e.height = e.longestSide, e.width = r.sw * e.height / r.sh) : (e.width = r.sw, e.height = r.sh) : e.width ? e.height = r.sh * e.width / r.sw : e.width = r.sw * e.height / r.sh, ce(s, i, e, {
      ...r,
      sx: 0,
      sy: 0,
      sw: s.width,
      sh: s.height
    }, t);
  } catch (s) {
    n(s);
  }
}
function Qe(i, e, t, n) {
  try {
    e.longestSide > 0 && !e.width && !e.height && (i.width >= i.height ? e.width = e.longestSide : e.height = e.longestSide);
    const r = {
      enableDevicePixelRatio: e.enableDevicePixelRatio,
      sx: 0,
      sy: 0,
      sw: i.width,
      sh: i.height,
      dx: 0,
      dy: 0,
      dw: e.width,
      dh: e.height
    };
    if (e.width > 0) {
      if (i.width < e.width && !e.isForce) {
        I({ ...i, raw: i }, e, t);
        return;
      }
      r.dh = i.height * e.width / i.width, e.height = r.dh;
    } else {
      if (i.height < e.height && !e.isForce) {
        I({ ...i, raw: i }, e, t);
        return;
      }
      r.dw = i.width * e.height / i.height, e.width = r.dw;
    }
    ce(i.element, i, e, r, t);
  } catch (r) {
    n(r);
  }
}
function I(i, e, t) {
  i.type !== e.mimeType ? (i.type = e.mimeType, de(i.element, i.raw, e, {
    enableDevicePixelRatio: e.enableDevicePixelRatio,
    sx: 0,
    sy: 0,
    sw: i.width,
    sh: i.height,
    dx: 0,
    dy: 0,
    dw: i.width,
    dh: i.height
  }, t)) : t(i);
}
function ce(i, e, t, n, r) {
  let s = e.width > e.height ? e.width - n.dw : e.height - n.dh;
  if (s > t.perResize) {
    const o = e.height / e.width;
    for (; s > t.perResize; )
      s -= t.perResize, n.sw = i.width, n.sh = i.height, n.dw = t.width + s, n.dh = n.dw * o, i = M(i, n);
  }
  n.sw = i.width, n.sh = i.height, n.dw = t.width, n.dh = t.height, de(i, e, t, n, r);
}
function de(i, e, t, n, r) {
  const s = M(i, n), o = /^\w+\/\*$/.test(t.mimeType) || !t.mimeType ? e.type : t.mimeType, l = s.toDataURL(o, t.quality), d = le(l, o);
  r({
    element: s,
    type: o,
    width: s.width,
    height: s.height,
    blob: d,
    data: l,
    url: oe(d),
    size: re(d.size),
    raw: e
  });
}
function Je(i, e) {
  const { width: t, height: n } = i, { width: r, height: s } = e;
  let o;
  const l = n * r / s;
  if (t > l)
    o = {
      sx: (t - l) / 2,
      sy: 0,
      sw: l,
      sh: n
    };
  else {
    const d = t * s / r;
    o = {
      sx: 0,
      sy: (n - d) / 2,
      sw: t,
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
function M(i, e) {
  const t = e.enableDevicePixelRatio && window.devicePixelRatio || 1, n = Ge("canvas");
  n.width = e.dw * t, n.height = e.dh * t;
  const r = n.getContext("2d");
  return r.scale(t, t), r.drawImage(i, e.sx, e.sy, e.sw, e.sh, e.dx, e.dy, e.dw, e.dh), n;
}
const et = {
  imageMaxWidth: 750,
  ignoreGif: !0,
  forceImageResize: !1,
  chooseFileMultiple: !0,
  chooseFileAccept: "image/*"
};
class it extends He {
  constructor(t, n = {}) {
    let r = null;
    if (typeof t == "string" || t instanceof HTMLElement ? r = b(t) : (n = t || {}, typeof n.container == "string" && (r = b(n.container))), n = {
      ...et,
      ...n
    }, !r)
      throw new Error(`Can't found '${t}' Node in document!`);
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
    r.append(s), this.$el = s, this.stylePanel = new Pe(n), this.use(this.stylePanel, this.$el), this.toolbar = new je(n), this.use(this.toolbar, this.$el), this._inputChangeHandler = (o) => {
      const l = o.currentTarget;
      this.handleImageFile(l.files).then((d) => {
        d.forEach((E) => {
          const h = /gif$/i.test(E.raw.type) && n.ignoreGif;
          this.insert(`<img src="${h ? E.raw.data : E.data}">`);
        });
      }).catch((d) => {
        this.emit("error", d);
      });
    }, this.on("toolbarButtonClick", (o) => {
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
  handleImageFile(t) {
    return t ? new Promise((n, r) => {
      Promise.all(v(t).map(this._handleFile)).then((s) => {
        n(s.sort((o, l) => o.index - l.index).map((o) => o.data));
      }).catch(r);
    }) : Promise.resolve([]);
  }
  _handleFile(t, n) {
    return new Promise((r, s) => {
      Xe(t).then((o) => {
        r({
          data: o,
          index: n
        });
      }).catch(s);
    });
  }
  destroy() {
    var t;
    super.destroy(), this.stylePanel.destroy(), this.toolbar.destroy(), (t = this.fileInput) == null || t.removeEventListener("change", this._inputChangeHandler);
  }
}
export {
  te as ALLOWED_NODE_NAMES,
  it as ZxEditor
};
