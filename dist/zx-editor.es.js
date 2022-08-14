/*!
 * zx-editor version 3.1.0
 * Author: capricorncd
 * Released under the MIT License
 * Repository: https://github.com/capricorncd/zx-editor
 * Released on: 2022-08-14 23:43:55 (GMT+0900)
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
    const n = (...s) => {
      i.apply(this, s), this.off(e, n);
    };
    return this.on(e, n);
  }
  emit(e, ...i) {
    const n = this._events[e];
    if (!n)
      return this;
    for (let s = 0; s < n.length; s++)
      try {
        n[s].apply(this, i);
      } catch (r) {
        this.emit("error", r, "emit");
      }
    return this;
  }
  off(e, i) {
    if (!this._events[e])
      return this;
    const n = this._events[e];
    if (typeof i == "function") {
      const s = n.findIndex((r) => r === i);
      s >= 0 && n.splice(s, 1);
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
 * zx-sml version 0.5.1
 * Author: Capricorncd <capricorncd@qq.com>
 * Repository: https://github.com/capricorncd/zx-sml
 * Released on: 2022-08-14 09:57:06 (GMT+0900)
 */
var ye = Object.defineProperty, R = Object.getOwnPropertySymbols, we = Object.prototype.hasOwnProperty, be = Object.prototype.propertyIsEnumerable, B = (t, e, i) => e in t ? ye(t, e, { enumerable: !0, configurable: !0, writable: !0, value: i }) : t[e] = i, j = (t, e) => {
  for (var i in e || (e = {}))
    we.call(e, i) && B(t, i, e[i]);
  if (R)
    for (var i of R(e))
      be.call(e, i) && B(t, i, e[i]);
  return t;
};
function Ee(t) {
  return Array.isArray(t);
}
function V(t) {
  return t !== null && !Ee(t) && typeof t == "object";
}
var _e = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, x = { exports: {} };
/*! For license information please see date-utils-2020.js.LICENSE.txt */
(function(t, e) {
  (function(i, n) {
    t.exports = n();
  })(typeof self < "u" ? self : _e, function() {
    return (() => {
      var i = { 949: (s, r) => {
        Object.defineProperty(r, "__esModule", { value: !0 }), r.toTwoDigits = void 0, r.toTwoDigits = function(o) {
          return o[1] ? o : "0" + o;
        };
      }, 607: (s, r, o) => {
        Object.defineProperty(r, "__esModule", { value: !0 }), r.toTwoDigits = r.toDate = r.formatDate = void 0;
        var l = o(949);
        Object.defineProperty(r, "toTwoDigits", { enumerable: !0, get: function() {
          return l.toTwoDigits;
        } });
        var d = { weeks: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] };
        function b(h) {
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
        r.formatDate = function(h, a, p) {
          var f, c = b(h);
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
            var E = c.toString().split(/\s+/).slice(5), L = a.includes("g");
            a = a.replace(/g/i, L ? E[0] : E.join(" "));
          }
          return a;
        }, r.toDate = b;
      } }, n = {};
      return function s(r) {
        if (n[r])
          return n[r].exports;
        var o = n[r] = { exports: {} };
        return i[r](o, o.exports, s), o.exports;
      }(607);
    })();
  });
})(x);
function Z(t = "", e = "-") {
  return t.replace(/[A-Z]/g, (i, n) => `${n > 0 ? e : ""}${i.toLowerCase()}`);
}
function K(t = "", e = !1) {
  const i = t.replace(/[-_\s](\w)/g, (n, s) => s.toUpperCase());
  return e ? i.replace(/^\w/, (n) => n.toUpperCase()) : i;
}
function X(t) {
  return t.replace(/^-?[1-9]\d{0,2}(,\d{3})+/, (e) => e.replace(/,/g, ""));
}
function J(t, e = !1) {
  if (typeof t == "number")
    return t;
  if (typeof t == "string") {
    if (!e && /^(-?\d+(?:\.\d+)?)\D*/.test(X(t)))
      return J(RegExp.$1, !0);
    const i = Number(t);
    return isNaN(i) ? 0 : i;
  }
  return 0;
}
function ve(t) {
  if (typeof t == "number")
    return [t, ""];
  const e = X(t).match(/^(-?\d+(?:\.\d+)?)(.*)$/);
  return e ? [J(e[1], !0), e[2]] : [0, ""];
}
function Q(t) {
  return typeof t == "string" ? t : t === null || typeof t > "u" ? "" : Array.isArray(t) ? t.map(Q).join(" ") : typeof t == "object" ? Object.keys(t).filter((e) => t[e]).join(" ") : String(t);
}
function $e(...t) {
  return t.map(Q).filter((e) => !!e).join(" ");
}
function v(t, e = 0) {
  return Array.prototype.slice.call(t, e);
}
function ee(t = {}, e = !1) {
  const i = e ? K : Z, n = {};
  for (const [s, r] of Object.entries(t))
    n[i(s)] = V(r) ? ee(r, e) : r;
  return n;
}
function _(t, e = document) {
  return t ? t instanceof HTMLElement ? t : e.querySelector(t) : null;
}
function C(t, e = document) {
  return v(e.querySelectorAll(t));
}
function w(t, e = {}, i) {
  const n = document.createElement(t);
  for (const [s, r] of Object.entries(e))
    n.setAttribute(Z(s), s === "style" && V(r) ? I(r) : r);
  return i && (Array.isArray(i) || (i = [i]), i.forEach((s) => {
    if (typeof s == "string") {
      const r = w("div");
      r.innerHTML = s, n.append(...r.childNodes);
    } else
      n.append(s);
  })), n;
}
function I(...t) {
  const e = t.reduce((n, s) => j(j({}, n), ee(s)), {}), i = [];
  for (const [n, s] of Object.entries(e))
    s === "" || typeof s > "u" || s === null || i.push(`${n}:${s}`);
  return i.join(";");
}
x.exports.formatDate;
x.exports.toDate;
x.exports.toTwoDigits;
const S = (t, e = "style") => t ? (t.getAttribute(e) || "").split(/\s?;\s?/).reduce((n, s) => {
  const [r, o] = s.split(/\s?:\s?/);
  return r && (n[K(r)] = o), n;
}, {}) : {}, O = (t) => document.createTextNode(t), te = (t) => {
  if (!t)
    return null;
  if (typeof t == "string")
    return O(t);
  const { tag: e, attrs: i, child: n } = t;
  if (!e && !i && !n)
    return null;
  const s = w(e || "div", i);
  if (Array.isArray(n) && n.length) {
    let r;
    n.forEach((o) => {
      r = te(o), r && s.appendChild(r);
    });
  } else
    n && typeof n == "string" && s.appendChild(O(n));
  return s;
}, Ce = (t, e) => {
  t.classList.add(e);
}, Ne = (t, e) => {
  t.classList.remove(e);
}, xe = "zx-editor__editor", ie = "SECTION", Te = "BR", ne = [ie, "H1", "H2", "H3", "H4", "H5", "BLOCKQUOTE", "UL", "OL"];
function $(t, e, i) {
  return t.replace(RegExp("(^<" + e + ")|(" + e + ">$)", "gi"), (n) => n.toUpperCase().replace(e, i.toLowerCase()));
}
function Le(t) {
  return t.replace(/<li[^>]*>(.+)<\/li>/gi, "$1");
}
function H(t) {
  const e = typeof t == "string" ? t : t.nodeName;
  return /^UL|OL$/i.test(e);
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
    style: I(i)
  };
  return t.editable && (n.contenteditable = "true"), w("div", n, e);
}, k = (t, e) => {
  var l, d, b, h, a, p, f, c, m;
  if (!t)
    return null;
  const i = t.nodeName, n = e.toUpperCase();
  if (i === n)
    return null;
  const s = w(e), r = t.parentElement;
  let o;
  if (i === "LI" && H(r)) {
    if (s.innerHTML = $(t.outerHTML, i, n), o = s.firstChild, r.childElementCount > 1)
      if (r.firstElementChild === t)
        (l = r.parentElement) == null || l.insertBefore(o, r);
      else if (r.lastElementChild === t) {
        const g = (d = r.parentElement) == null ? void 0 : d.nextElementSibling;
        g ? (b = g.parentElement) == null || b.insertBefore(o, g) : (h = r.parentElement) == null || h.append(o);
      } else {
        const g = v(r.children), y = w(r.nodeName);
        let E = g.shift();
        for (; E && E !== t; )
          y.append(E), E = g.shift();
        (a = r.parentElement) == null || a.insertBefore(y, r), (p = r.parentElement) == null || p.insertBefore(o, r), r.removeChild(t);
      }
    else
      (f = r.parentElement) == null || f.insertBefore(o, r), (c = r.parentElement) == null || c.removeChild(r);
    return o;
  }
  if (/UL|OL/.test(n)) {
    const g = t.previousElementSibling, y = t.nextElementSibling;
    if (g && H(g)) {
      if (s.innerHTML = $(t.outerHTML, i, "li"), o = s.firstChild, g.append(o), r == null || r.removeChild(t), y && y.nodeName === g.nodeName) {
        const E = v(y.children);
        g.append(...E), (m = y.parentElement) == null || m.removeChild(y);
      }
    } else
      y && H(y) ? (s.innerHTML = $(t.outerHTML, i, "li"), o = s.firstChild, y.insertBefore(o, y.firstElementChild), r == null || r.removeChild(t)) : (o = s, s.innerHTML = $(t.outerHTML, i, "li"), r == null || r.replaceChild(o, t));
  } else
    s.innerHTML = Le($(t.outerHTML, i, n)), o = s.firstChild, r == null || r.replaceChild(o, t);
  return o;
}, F = (t) => {
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
  childNodeName: ie,
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
    const n = typeof i.container == "string" ? _(i.container) : i.container;
    if (!n)
      throw new Error(`Can't found '${i.container}' Node in document!`);
    this.version = "3.1.0", this.options = { ...Se, ...i }, this.allowedNodeNames = (this.options.allowedNodeNames || ne).map((r) => r.toUpperCase());
    const s = this.options.childNodeName.toUpperCase();
    this.options.childNodeName = s, this.blankLine = `<${s}><br></${s}>`, this.allowedNodeNames.includes(s) || this.allowedNodeNames.push(s), this.$editor = He(this.options, this.blankLine), n.append(this.$editor), this._eventHandler = (r) => {
      const o = r.type;
      if (o === "blur" || o === "click") {
        const l = window.getSelection(), d = l && l.rangeCount ? l.getRangeAt(l.rangeCount - 1).endContainer : r.currentTarget;
        this.setCursorElement(d), this._verifyChild();
      }
      this.emit(o === "input" ? "change" : o, r), F(this.$editor);
    }, this._pasteHandler = (r) => {
      var l;
      if (typeof this.options.customPasteHandler == "function")
        return this.options.customPasteHandler(r);
      r.preventDefault();
      const o = (l = r.clipboardData) == null ? void 0 : l.getData("text");
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
    this.$editor.innerHTML = this.blankLine, this.insert(i, !0), this._verifyChild(), F(this.$editor);
  }
  getHtml(i) {
    const n = this.$editor.innerHTML;
    if (i)
      return n;
    const s = this.options.childNodeName;
    return n.replace(new RegExp(`(<${s}><br\\s?\\/?><\\/${s}>)+$`, "i"), "");
  }
  insert(i, n = !1) {
    if (i instanceof HTMLElement)
      this._insertEl(i);
    else {
      const s = w("div", {}, i), r = v(s.childNodes);
      if (!n && !this.options.insertTextToNewParagraph && r.every((o) => o.nodeType === Node.TEXT_NODE))
        return this._insertText(i);
      r.forEach((o) => {
        o.nodeType === Node.ELEMENT_NODE ? o.nodeName === Te ? this._insertEl(w(this.options.childNodeName, {}, "<br/>")) : this._insertEl(o) : o.textContent && this._insertEl(w(this.options.childNodeName, {}, o.textContent));
      });
    }
    this._dispatchChange();
  }
  _insertEl(i) {
    const n = this.getCursorElement();
    A(n) ? /<(\w+)[^>]*>.*<\/\1>/.test(i.outerHTML) ? this.$editor.insertBefore(i, n) : (n.innerHTML = "", n.append(i)) : this.$editor.insertBefore(i, n.nextElementSibling), this.setCursorElement(i);
  }
  _insertText(i) {
    if (!i)
      return;
    const n = window.getSelection(), s = n == null ? void 0 : n.rangeCount;
    if (!s)
      return this.insert(i, !0);
    n.deleteFromDocument(), n.getRangeAt(0).insertNode(O(i)), this.setCursorElement(n.getRangeAt(s - 1).endContainer), n.collapseToEnd(), this._dispatchChange();
  }
  _verifyChild() {
    const i = this.getCursorElement(!0), n = this.options.childNodeName, s = this.$editor.children;
    let r, o = !1;
    for (let l = 0; l < s.length; l++) {
      if (r = s[l], this.allowedNodeNames.includes(r.nodeName))
        continue;
      o = i === r;
      const d = k(r, n);
      o && d && this.setCursorElement(d);
    }
    if (!A(this.$editor.lastElementChild)) {
      const l = this.options.childNodeName;
      this.$editor.appendChild(w(l, {}, "<br>"));
    }
  }
  changeNodeName(i) {
    if (i = (i || this.options.childNodeName).toUpperCase(), !this.allowedNodeNames.includes(i))
      return !1;
    const n = this.getCursorElement(), s = k(n, i);
    return s ? (this.setCursorElement(s), this._dispatchChange(), !0) : !1;
  }
  changeStyles(i, n) {
    const s = this.getCursorElement(!0);
    if (s) {
      const r = S(s);
      if (i) {
        const o = typeof i == "string" ? { [i]: n } : i;
        s.setAttribute("style", I(r, o));
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
const Ae = ["#333333", "#d0d0d0", "#ff583d", "#fdaa25", "#44c67b", "#14b2e0", "#b065e2"], Pe = {
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
}, U = {
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
}, Ie = (t) => {
  const e = [];
  return t.forEach((i, n) => {
    /^#\w{3,6}$/.test(i) && e.push({
      tag: "dd",
      attrs: {
        class: n === 0 ? "active" : "",
        "data-color": Me(i.toLowerCase())
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
}, Me = (t) => t.length === 7 ? t : `#${t[1]}${t[1]}${t[2]}${t[2]}${t[3]}${t[3]}`, Re = {
  textStyleColors: [...Ae],
  textStyleTitle: "Set Style",
  textStyleHeadLeftBtnText: "Clear"
};
const N = "style-panel", D = `${N}__fade-in`;
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
      ...Re,
      ...e
    };
    this.options = i, this.$el = w("div", { class: `${N} border-top` }), this._styleHandler = (n) => {
      const s = this.editorInstance, r = n.currentTarget, o = S(r, "data-style"), l = s.getStyles();
      Object.keys(o).forEach((d) => {
        l[d] && (o[d] = "");
      }), s.changeStyles(o);
    }, this._colorHandler = (n) => {
      const s = n.currentTarget;
      if (this.updateActiveClassName(s)) {
        const r = this.editorInstance, o = s.getAttribute("data-color");
        r.changeStyles({ color: o });
      }
    }, this._tagHandler = (n) => {
      const s = n.currentTarget;
      if (this.updateActiveClassName(s)) {
        const r = this.editorInstance, o = s.getAttribute("data-tag");
        r.changeNodeName(o);
      }
    }, this._headerLeftHandler = () => {
      const n = this.editorInstance, { textColor: s, childNodeName: r } = n.options;
      n.changeStyles(), n.changeNodeName(), this.updateActiveClassName(_(`[data-color="${s}"]`, this.$el)), this.updateActiveClassName(_(`[data-tag="${r}"]`, this.$el));
    }, this._headerSwitchHandler = () => {
      this.$el.classList.contains(D) ? this.hide() : this.show();
    };
  }
  _initChildEl(e) {
    const { textColor: i, childNodeName: n } = e, { textStyleTitle: s, textStyleHeadLeftBtnText: r, textStyleColors: o } = this.options, l = w("div", { class: `${N}__header` }, s), d = w("div", { class: "__left" }, r), b = w("div", { class: "__switch" });
    l.append(d, b);
    const h = [Pe], a = o;
    if (a.length) {
      i && !a.includes(i) && a.unshift(i);
      const m = {
        tag: "dl",
        attrs: {
          class: "__color-wrapper border-bottom"
        },
        child: Ie(a)
      };
      h.push(m);
    }
    const p = {
      ...U,
      child: [...U.child]
    }, f = n.toLowerCase();
    p.child.forEach((m) => {
      const g = m.attrs["data-tag"];
      g === "section" && g !== f && (m.attrs["data-tag"] = f);
    }), h.push(p);
    const c = te({
      tag: "div",
      attrs: {
        class: `${N}__body`
      },
      child: h
    });
    this.$el.append(l, c), C(".__style-wrapper dd", c).forEach((m) => {
      m.addEventListener("click", this._styleHandler);
    }), C(".__color-wrapper dd", c).forEach((m) => {
      m.addEventListener("click", this._colorHandler);
    }), C(".__tag-wrapper dd", c).forEach((m) => {
      m.addEventListener("click", this._tagHandler);
    }), d.addEventListener("click", this._headerLeftHandler), b.addEventListener("click", this._headerSwitchHandler), this.$elMap.set(d, this._headerLeftHandler), this.$elMap.set(b, this._headerSwitchHandler);
  }
  install(e, i) {
    this.editorInstance = e, i && i.append(this.$el), this._initChildEl(e.options), e.on("click", () => {
      const { textColor: n, childNodeName: s } = e.options, r = e.getStyles();
      this.updateActiveClassName(_(`[data-color="${r.color || n}"]`, this.$el));
      const o = e.getCursorElement(!0).nodeName.toLowerCase();
      this.updateActiveClassName(_(`[data-tag="${o || s}"]`, this.$el));
    });
  }
  show() {
    this.$el.classList.add(D);
  }
  hide() {
    this.$el.classList.remove(D);
  }
  updateActiveClassName(e) {
    return e.classList.contains("active") ? !1 : (_(".active", e.parentElement).classList.remove("active"), e.classList.add("active"), !0);
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
    }, '<dl class="inner-wrapper"></dl>'), this._btnClickHandler = (s) => {
      const r = s.currentTarget;
      this.editorInstance && r && this.editorInstance.emit("toolbarButtonOnClick", r.getAttribute("data-name"));
    }, this.options.toolbarButtons.forEach((s) => {
      this.addButton({ name: s });
    });
  }
  install(e, i) {
    this.editorInstance = e, i && i.append(this.$el), this.visible && this.show();
  }
  show() {
    Ce(this.$el, "__fade-in"), this.visible = !0, this.editorInstance.emit("toolbarShow", !0, this);
  }
  hide() {
    Ne(this.$el, "__fade-in"), this.visible = !1, this.editorInstance.emit("toolbarShow", !1, this);
  }
  addButton(e, i) {
    const n = { ...e.style }, s = w("dd", {
      class: $e("icon-item", e.className),
      dataName: e.name,
      style: n
    }, e.innerHtml), r = C("dd", this.$el), o = _("dl", this.$el);
    typeof i == "number" && i >= 0 && i < r.length ? o.insertBefore(s, r[i]) : o.append(s), s.addEventListener("click", this._btnClickHandler);
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
var Ue = Object.defineProperty, z = Object.getOwnPropertySymbols, ze = Object.prototype.hasOwnProperty, We = Object.prototype.propertyIsEnumerable, W = (t, e, i) => e in t ? Ue(t, e, { enumerable: !0, configurable: !0, writable: !0, value: i }) : t[e] = i, G = (t, e) => {
  for (var i in e || (e = {}))
    ze.call(e, i) && W(t, i, e[i]);
  if (z)
    for (var i of z(e))
      We.call(e, i) && W(t, i, e[i]);
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
      var i = { 949: (s, r) => {
        Object.defineProperty(r, "__esModule", { value: !0 }), r.toTwoDigits = void 0, r.toTwoDigits = function(o) {
          return o[1] ? o : "0" + o;
        };
      }, 607: (s, r, o) => {
        Object.defineProperty(r, "__esModule", { value: !0 }), r.toTwoDigits = r.toDate = r.formatDate = void 0;
        var l = o(949);
        Object.defineProperty(r, "toTwoDigits", { enumerable: !0, get: function() {
          return l.toTwoDigits;
        } });
        var d = { weeks: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] };
        function b(h) {
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
        r.formatDate = function(h, a, p) {
          var f, c = b(h);
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
            var E = c.toString().split(/\s+/).slice(5), L = a.includes("g");
            a = a.replace(/g/i, L ? E[0] : E.join(" "));
          }
          return a;
        }, r.toDate = b;
      } }, n = {};
      return function s(r) {
        if (n[r])
          return n[r].exports;
        var o = n[r] = { exports: {} };
        return i[r](o, o.exports, s), o.exports;
      }(607);
    })();
  });
})(T);
function se(t = "", e = "-") {
  return t.replace(/[A-Z]/g, (i, n) => `${n > 0 ? e : ""}${i.toLowerCase()}`);
}
function qe(t = "", e = !1) {
  const i = t.replace(/[-_\s](\w)/g, (n, s) => s.toUpperCase());
  return e ? i.replace(/^\w/, (n) => n.toUpperCase()) : i;
}
function oe(t = {}, e = !1) {
  const i = e ? qe : se, n = {};
  for (const [s, r] of Object.entries(t))
    n[i(s)] = re(r) ? oe(r, e) : r;
  return n;
}
function ae(t, e = !1, i = 2) {
  const n = ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"], s = e ? 1e3 : 1024;
  let r = String(t), o = "Byte";
  for (let l = 0, d = t / s; d > 1; d /= s, l++)
    r = d.toFixed(i), o = n[l];
  return e && (o = o.replace("i", "")), {
    text: r.replace(/\.0+$/, "") + o,
    value: +r,
    unit: o,
    bytes: t
  };
}
function Ve(t, e = {}, i) {
  const n = document.createElement(t);
  for (const [s, r] of Object.entries(e))
    n.setAttribute(se(s), s === "style" && re(r) ? Ze(r) : r);
  return i && (typeof i == "string" ? n.innerHTML = i : n.append(i)), n;
}
function Ze(...t) {
  const e = t.reduce((n, s) => G(G({}, n), oe(s)), {}), i = [];
  for (const [n, s] of Object.entries(e))
    s === "" || typeof s > "u" || s === null || i.push(`${n}:${s}`);
  return i.join(";");
}
function Ke(t) {
  return new Promise((e, i) => {
    const n = new FileReader();
    n.onload = (s) => {
      var r;
      const o = (r = s.target) == null ? void 0 : r.result;
      o ? e(o) : i(new Error(`FileReader's result is null, ${s.target}`));
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
  const s = new Uint8Array(n.length);
  for (let r = 0; r < n.length; r++)
    s[r] = n.charCodeAt(r);
  return new Blob([s], { type: e });
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
}, Je = /^data:(.+?);base64/, Qe = /^image\/.+/;
function et(t, e) {
  return new Promise((i, n) => {
    const s = {
      ...Xe,
      ...e
    };
    typeof t == "string" && Je.test(t) ? Y(t, s, i, n) : (t instanceof File || t instanceof Blob) && Qe.test(t.type) ? Ke(t).then((r) => {
      Y(r, s, i, n);
    }).catch(n) : n(new Error(`Invalid file, ${t}`));
  });
}
function Y(t, e, i, n) {
  const { type: s } = ce(t), r = de(t, s), o = new Image();
  o.onload = () => {
    const l = {
      element: o,
      blob: r,
      data: t,
      url: le(r),
      width: o.naturalWidth || o.width,
      height: o.naturalHeight || o.height,
      type: s,
      size: ae(r.size)
    };
    e.cropInfo && e.cropInfo.sw && e.cropInfo.sh ? q(l, e, i, n, {
      ...e.cropInfo,
      dx: 0,
      dy: 0,
      dw: e.cropInfo.sw,
      dh: e.cropInfo.sh
    }) : e.width > 0 && e.height > 0 ? q(l, e, i, n, it(l, e)) : e.width > 0 || e.height > 0 || e.longestSide > 0 ? tt(l, e, i, n) : P({ ...l, raw: l }, e, i);
  }, o.onerror = n, o.src = t;
}
function q(t, e, i, n, s) {
  try {
    Object.prototype.hasOwnProperty.call(s, "enableDevicePixelRatio") || (s.enableDevicePixelRatio = e.enableDevicePixelRatio);
    const r = M(t.element, {
      enableDevicePixelRatio: e.enableDevicePixelRatio,
      sx: s.sx,
      sy: s.sy,
      sw: s.sw,
      sh: s.sh,
      dx: 0,
      dy: 0,
      dw: s.sw,
      dh: s.sh
    });
    !e.width && !e.height ? e.longestSide ? s.sw > s.sh ? (e.width = e.longestSide, e.height = s.sh * e.width / s.sw) : (e.height = e.longestSide, e.width = s.sw * e.height / s.sh) : (e.width = s.sw, e.height = s.sh) : e.width ? e.height = s.sh * e.width / s.sw : e.width = s.sw * e.height / s.sh, he(r, t, e, {
      ...s,
      sx: 0,
      sy: 0,
      sw: r.width,
      sh: r.height
    }, i);
  } catch (r) {
    n(r);
  }
}
function tt(t, e, i, n) {
  try {
    e.longestSide > 0 && !e.width && !e.height && (t.width >= t.height ? e.width = e.longestSide : e.height = e.longestSide);
    const s = {
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
        P({ ...t, raw: t }, e, i);
        return;
      }
      s.dh = t.height * e.width / t.width, e.height = s.dh;
    } else {
      if (t.height < e.height && !e.isForce) {
        P({ ...t, raw: t }, e, i);
        return;
      }
      s.dw = t.width * e.height / t.height, e.width = s.dw;
    }
    he(t.element, t, e, s, i);
  } catch (s) {
    n(s);
  }
}
function P(t, e, i) {
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
function he(t, e, i, n, s) {
  let r = e.width > e.height ? e.width - n.dw : e.height - n.dh;
  if (r > i.perResize) {
    const o = e.height / e.width;
    for (; r > i.perResize; )
      r -= i.perResize, n.sw = t.width, n.sh = t.height, n.dw = i.width + r, n.dh = n.dw * o, t = M(t, n);
  }
  n.sw = t.width, n.sh = t.height, n.dw = i.width, n.dh = i.height, ue(t, e, i, n, s);
}
function ue(t, e, i, n, s) {
  const r = M(t, n), o = /^\w+\/\*$/.test(i.mimeType) || !i.mimeType ? e.type : i.mimeType, l = r.toDataURL(o, i.quality), d = de(l, o);
  s({
    element: r,
    type: o,
    width: r.width,
    height: r.height,
    blob: d,
    data: l,
    url: le(d),
    size: ae(d.size),
    raw: e
  });
}
function it(t, e) {
  const { width: i, height: n } = t, { width: s, height: r } = e;
  let o;
  const l = n * s / r;
  if (i > l)
    o = {
      sx: (i - l) / 2,
      sy: 0,
      sw: l,
      sh: n
    };
  else {
    const d = i * r / s;
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
    dw: s,
    dh: r
  };
}
function M(t, e) {
  const i = e.enableDevicePixelRatio && window.devicePixelRatio || 1, n = Ve("canvas");
  n.width = e.dw * i, n.height = e.dh * i;
  const s = n.getContext("2d");
  return s.scale(i, i), s.drawImage(t, e.sx, e.sy, e.sw, e.sh, e.dx, e.dy, e.dw, e.dh), n;
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
    let s = null;
    if (typeof i == "string" || i instanceof HTMLElement ? s = _(i) : (n = i || {}, typeof n.container == "string" && (s = _(n.container))), n = {
      ...nt,
      ...n
    }, !s)
      throw new Error(`Can't found '${i}' Node in document!`);
    const r = w("div", { class: "zx-editor" });
    super({
      ...n,
      container: r
    });
    u(this, "$el");
    u(this, "stylePanel");
    u(this, "toolbar");
    u(this, "fileInput", null);
    u(this, "_inputChangeHandler");
    s.append(r), this.$el = r, this.stylePanel = new Be(n), this.use(this.stylePanel, this.$el), this.toolbar = new Fe(n), this.use(this.toolbar, this.$el), this._inputChangeHandler = (o) => {
      const l = o.currentTarget;
      this.handleImageFile(l.files).then((d) => {
        d.forEach((b) => {
          const h = /gif$/i.test(b.raw.type) && n.ignoreGif;
          this.insert(`<img src="${h ? b.raw.data : b.data}">`);
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
    return i ? new Promise((n, s) => {
      Promise.all(v(i).map(this._handleFile)).then((r) => {
        n(r.sort((o, l) => o.index - l.index).map((o) => o.data));
      }).catch(s);
    }) : Promise.resolve([]);
  }
  _handleFile(i, n) {
    return new Promise((s, r) => {
      et(i).then((o) => {
        s({
          data: o,
          index: n
        });
      }).catch(r);
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
