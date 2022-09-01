/*!
 * sp-editor version 1.0.2
 * Author: capricorncd
 * Released under the MIT License
 * Repository: https://github.com/capricorncd/zx-editor
 * Released on: 2022-09-01 21:16:15 (GMT+0900)
 * Copyright © 2018-present, capricorncd
 */
var me = Object.defineProperty;
var ye = (t, e, i) => e in t ? me(t, e, { enumerable: !0, configurable: !0, writable: !0, value: i }) : t[e] = i;
var u = (t, e, i) => (ye(t, typeof e != "symbol" ? e + "" : e, i), i);
class we {
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
function Ee() {
  return window.screen.height === 812 && window.screen.width === 375;
}
/*!
 * zx-sml version 0.5.1
 * Author: Capricorncd <capricorncd@qq.com>
 * Repository: https://github.com/capricorncd/zx-sml
 * Released on: 2022-08-14 09:57:06 (GMT+0900)
 */
var be = Object.defineProperty, M = Object.getOwnPropertySymbols, _e = Object.prototype.hasOwnProperty, ve = Object.prototype.propertyIsEnumerable, R = (t, e, i) => e in t ? be(t, e, { enumerable: !0, configurable: !0, writable: !0, value: i }) : t[e] = i, B = (t, e) => {
  for (var i in e || (e = {}))
    _e.call(e, i) && R(t, i, e[i]);
  if (M)
    for (var i of M(e))
      ve.call(e, i) && R(t, i, e[i]);
  return t;
};
function $e(t) {
  return Array.isArray(t);
}
function K(t) {
  return t !== null && !$e(t) && typeof t == "object";
}
var Ce = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, x = { exports: {} };
/*! For license information please see date-utils-2020.js.LICENSE.txt */
(function(t, e) {
  (function(i, n) {
    t.exports = n();
  })(typeof self < "u" ? self : Ce, function() {
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
              var w = m[g] + "";
              a = a.replace(f, f.length === 1 ? w : l.toTwoDigits(w));
            }
          if (/(g)/i.test(a)) {
            var b = c.toString().split(/\s+/).slice(5), L = a.includes("g");
            a = a.replace(/g/i, L ? b[0] : b.join(" "));
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
function X(t = "", e = "-") {
  return t.replace(/[A-Z]/g, (i, n) => `${n > 0 ? e : ""}${i.toLowerCase()}`);
}
function Z(t = "", e = !1) {
  const i = t.replace(/[-_\s](\w)/g, (n, r) => r.toUpperCase());
  return e ? i.replace(/^\w/, (n) => n.toUpperCase()) : i;
}
function J(t) {
  return t.replace(/^-?[1-9]\d{0,2}(,\d{3})+/, (e) => e.replace(/,/g, ""));
}
function Q(t, e = !1) {
  if (typeof t == "number")
    return t;
  if (typeof t == "string") {
    if (!e && /^(-?\d+(?:\.\d+)?)\D*/.test(J(t)))
      return Q(RegExp.$1, !0);
    const i = Number(t);
    return isNaN(i) ? 0 : i;
  }
  return 0;
}
function Ne(t) {
  if (typeof t == "number")
    return [t, ""];
  const e = J(t).match(/^(-?\d+(?:\.\d+)?)(.*)$/);
  return e ? [Q(e[1], !0), e[2]] : [0, ""];
}
function ee(t) {
  return typeof t == "string" ? t : t === null || typeof t > "u" ? "" : Array.isArray(t) ? t.map(ee).join(" ") : typeof t == "object" ? Object.keys(t).filter((e) => t[e]).join(" ") : String(t);
}
function xe(...t) {
  return t.map(ee).filter((e) => !!e).join(" ");
}
function v(t, e = 0) {
  return Array.prototype.slice.call(t, e);
}
function te(t = {}, e = !1) {
  const i = e ? Z : X, n = {};
  for (const [r, s] of Object.entries(t))
    n[i(r)] = K(s) ? te(s, e) : s;
  return n;
}
function _(t, e = document) {
  return t ? t instanceof HTMLElement ? t : e.querySelector(t) : null;
}
function C(t, e = document) {
  return v(e.querySelectorAll(t));
}
function y(t, e = {}, i) {
  const n = document.createElement(t);
  for (const [r, s] of Object.entries(e))
    n.setAttribute(X(r), r === "style" && K(s) ? P(s) : s);
  return i && (Array.isArray(i) || (i = [i]), i.forEach((r) => {
    if (typeof r == "string") {
      const s = y("div");
      s.innerHTML = r, n.append(...s.childNodes);
    } else
      n.append(r);
  })), n;
}
function P(...t) {
  const e = t.reduce((n, r) => B(B({}, n), te(r)), {}), i = [];
  for (const [n, r] of Object.entries(e))
    r === "" || typeof r > "u" || r === null || i.push(`${n}:${r}`);
  return i.join(";");
}
x.exports.formatDate;
x.exports.toDate;
x.exports.toTwoDigits;
const D = (t, e = "style") => t ? (t.getAttribute(e) || "").split(/\s?;\s?/).reduce((n, r) => {
  const [s, o] = r.split(/\s?:\s?/);
  return s && (n[Z(s)] = o), n;
}, {}) : {}, O = (t) => document.createTextNode(t), ie = (t) => {
  if (!t)
    return null;
  if (typeof t == "string")
    return O(t);
  const { tag: e, attrs: i, child: n } = t;
  if (!e && !i && !n)
    return null;
  const r = y(e || "div", i);
  if (Array.isArray(n) && n.length) {
    let s;
    n.forEach((o) => {
      s = ie(o), s && r.appendChild(s);
    });
  } else
    n && typeof n == "string" && r.appendChild(O(n));
  return r;
}, Te = (t, e) => {
  t.classList.add(e);
}, Le = (t, e) => {
  t.classList.remove(e);
}, He = "sp-editor__editor", ne = "SECTION", Se = "BR", re = [ne, "H1", "H2", "H3", "H4", "H5", "BLOCKQUOTE", "UL", "OL"];
function $(t, e, i) {
  return t.replace(RegExp("(^<" + e + ")|(" + e + ">$)", "gi"), (n) => n.toUpperCase().replace(e, i.toLowerCase()));
}
function De(t) {
  return t.replace(/<li[^>]*>(.+)<\/li>/gi, "$1");
}
function H(t) {
  const e = typeof t == "string" ? t : t.nodeName;
  return /^UL|OL$/i.test(e);
}
function j(t) {
  if (!t)
    return !1;
  const e = v(t.childNodes);
  return e.length === 1 && e[0].nodeName === "BR";
}
function k(t) {
  return t instanceof Element && (t = t.outerHTML), /^<(\w+)[^>]*>.*<\/\1>$/.test(t);
}
function se(t) {
  return ["PICTURE", "VIDEO", "AUDIO", "CANVAS"].includes(t.nodeName);
}
function Oe(t) {
  return ["IMG"].includes(t.nodeName) || se(t);
}
function oe(t) {
  if (Oe(t))
    return !0;
  for (let e = 0; e < t.children.length; e++)
    if (oe(t.children[e]))
      return !0;
  return !1;
}
const Ae = (t, e) => {
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
    class: `${He} is-empty`,
    style: P(i)
  };
  return t.editable && (n.contenteditable = "true"), y("div", n, e);
}, F = (t, e) => {
  var l, d, E, h, a, p, f, c, m;
  if (!t)
    return null;
  const i = t.nodeName, n = e.toUpperCase();
  if (i === n)
    return null;
  const r = y(e), s = t.parentElement;
  let o;
  if (i === "LI" && H(s)) {
    if (r.innerHTML = $(t.outerHTML, i, n), o = r.firstChild, s.childElementCount > 1)
      if (s.firstElementChild === t)
        (l = s.parentElement) == null || l.insertBefore(o, s);
      else if (s.lastElementChild === t) {
        const g = (d = s.parentElement) == null ? void 0 : d.nextElementSibling;
        g ? (E = g.parentElement) == null || E.insertBefore(o, g) : (h = s.parentElement) == null || h.append(o);
      } else {
        const g = v(s.children), w = y(s.nodeName);
        let b = g.shift();
        for (; b && b !== t; )
          w.append(b), b = g.shift();
        (a = s.parentElement) == null || a.insertBefore(w, s), (p = s.parentElement) == null || p.insertBefore(o, s), s.removeChild(t);
      }
    else
      (f = s.parentElement) == null || f.insertBefore(o, s), (c = s.parentElement) == null || c.removeChild(s);
    return o;
  }
  if (/UL|OL/.test(n)) {
    const g = t.previousElementSibling, w = t.nextElementSibling;
    if (g && H(g)) {
      if (r.innerHTML = $(t.outerHTML, i, "li"), o = r.firstChild, g.append(o), s == null || s.removeChild(t), w && w.nodeName === g.nodeName) {
        const b = v(w.children);
        g.append(...b), (m = w.parentElement) == null || m.removeChild(w);
      }
    } else
      w && H(w) ? (r.innerHTML = $(t.outerHTML, i, "li"), o = r.firstChild, w.insertBefore(o, w.firstElementChild), s == null || s.removeChild(t)) : (o = r, r.innerHTML = $(t.outerHTML, i, "li"), s == null || s.replaceChild(o, t));
  } else
    r.innerHTML = De($(t.outerHTML, i, n)), o = r.firstChild, s == null || s.replaceChild(o, t);
  return o;
}, U = (t) => {
  !t.innerText.trim() && !oe(t) ? t.classList.add("is-empty") : t.classList.remove("is-empty");
};
function Pe(t, e, i = !1) {
  var n;
  for (; t && e !== t; ) {
    if (!i && t.nodeName === "LI" && ((n = t.parentElement) == null ? void 0 : n.parentElement) === e || t.parentElement === e)
      return t;
    t = t.parentElement;
  }
  return e.lastElementChild;
}
const Ie = {
  editable: !0,
  minHeight: "50vh",
  paddingBottom: "50vh",
  placeholder: "\u8BF7\u5728\u6B64\u8F93\u5165\u5185\u5BB9..",
  placeholderColor: "#999",
  lineHeight: 1.5,
  childNodeName: ne,
  allowedNodeNames: re,
  paragraphTailSpacing: "10px",
  caretColor: "",
  textColor: "#333333",
  customPasteHandler: void 0,
  insertTextToNewParagraph: !1
};
class Me extends we {
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
    this.version = "1.0.2", this.options = { ...Ie, ...i }, this.allowedNodeNames = (this.options.allowedNodeNames || re).map((s) => s.toUpperCase());
    const r = this.options.childNodeName.toUpperCase();
    this.options.childNodeName = r, this.blankLine = `<${r}><br></${r}>`, this.allowedNodeNames.includes(r) || this.allowedNodeNames.push(r), this.$editor = Ae(this.options, this.blankLine), n.append(this.$editor), this._eventHandler = (s) => {
      const o = s.type;
      if (o === "blur" || o === "click") {
        const l = window.getSelection(), d = l && l.rangeCount ? l.getRangeAt(l.rangeCount - 1).endContainer : s.currentTarget;
        this.setCursorElement(d), o === "blur" && this._verifyChild();
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
    this.$editor.innerHTML = this.blankLine, this.insert(i, !0), this._verifyChild(), U(this.$editor);
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
      const r = y("div", {}, i), s = v(r.childNodes);
      if (!n && !this.options.insertTextToNewParagraph && s.every((o) => o.nodeType === Node.TEXT_NODE))
        return this._insertText(i);
      s.forEach((o) => {
        o.nodeType === Node.ELEMENT_NODE ? o.nodeName === Se ? this._insertEl(y(this.options.childNodeName, {}, "<br/>")) : this._insertEl(o) : o.textContent && this._insertEl(y(this.options.childNodeName, {}, o.textContent));
      });
    }
    this._dispatchChange(), this._verifyChild();
  }
  _insertEl(i) {
    const n = this.getCursorElement();
    j(n) ? k(i.outerHTML) ? this.$editor.insertBefore(i, n) : (n.innerHTML = "", n.append(i)) : this.$editor.insertBefore(i, n.nextElementSibling), this.setCursorElement(i);
  }
  _insertText(i) {
    if (!i)
      return;
    const n = window.getSelection(), r = n == null ? void 0 : n.rangeCount;
    if (!r)
      return this.insert(i, !0);
    n.deleteFromDocument(), n.getRangeAt(0).insertNode(O(i)), this.setCursorElement(n.getRangeAt(r - 1).endContainer), n.collapseToEnd(), this._dispatchChange();
  }
  _verifyChild() {
    const i = this.getCursorElement(!0), n = this.options.childNodeName;
    let r, s = !1, o = 0;
    for (; o < this.$editor.childNodes.length; ) {
      if (r = this.$editor.childNodes[o++], r.nodeType === Node.ELEMENT_NODE) {
        if (k(r)) {
          if (this.allowedNodeNames.includes(r.nodeName))
            continue;
          if (s = i === r, !se(r)) {
            const l = F(r, n);
            s && l && this.setCursorElement(l);
            continue;
          }
        }
        r.replaceWith(y(n, {}, r.cloneNode(!0)));
      } else {
        const l = y(n, {}, r.cloneNode(!0));
        this.$editor.replaceChild(l, r);
      }
      console.log(o, r.nodeName, r.nodeType);
    }
    j(this.$editor.lastElementChild) || this.$editor.appendChild(y(n, {}, "<br>"));
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
      const s = D(r);
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
    return D(this.getCursorElement());
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
    return Pe(this._cursorElement, this.$editor, i);
  }
  destroy() {
    this.$editor.removeEventListener("focus", this._eventHandler), this.$editor.removeEventListener("blur", this._eventHandler), this.$editor.removeEventListener("input", this._eventHandler), this.$editor.removeEventListener("paste", this._pasteHandler), this.removeAllListeners();
  }
}
const Re = ["#333333", "#d0d0d0", "#ff583d", "#fdaa25", "#44c67b", "#14b2e0", "#b065e2"], Be = {
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
}, W = {
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
}, je = (t) => {
  const e = [];
  return t.forEach((i, n) => {
    /^#\w{3,6}$/.test(i) && e.push({
      tag: "dd",
      attrs: {
        class: n === 0 ? "active" : "",
        "data-color": ke(i.toLowerCase())
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
}, ke = (t) => t.length === 7 ? t : `#${t[1]}${t[1]}${t[2]}${t[2]}${t[3]}${t[3]}`, Fe = {
  textStyleColors: [...Re],
  textStyleTitle: "Set Style",
  textStyleHeadLeftBtnText: "Clear"
};
const N = "style-panel", S = `${N}__fade-in`;
class Ue {
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
      ...Fe,
      ...e
    };
    this.options = i, this.$el = y("div", { class: `${N} border-top` }), this._styleHandler = (n) => {
      const r = this.editorInstance, s = n.currentTarget, o = D(s, "data-style"), l = r.getStyles();
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
      n.changeStyles(), n.changeNodeName(), this.updateActiveClassName(_(`[data-color="${r}"]`, this.$el)), this.updateActiveClassName(_(`[data-tag="${s}"]`, this.$el));
    }, this._headerSwitchHandler = () => {
      this.$el.classList.contains(S) ? this.hide() : this.show();
    };
  }
  _initChildEl(e) {
    const { textColor: i, childNodeName: n } = e, { textStyleTitle: r, textStyleHeadLeftBtnText: s, textStyleColors: o } = this.options, l = y("div", { class: `${N}__header` }, r), d = y("div", { class: "__left" }, s), E = y("div", { class: "__switch" });
    l.append(d, E);
    const h = [Be], a = o;
    if (a.length) {
      i && !a.includes(i) && a.unshift(i);
      const m = {
        tag: "dl",
        attrs: {
          class: "__color-wrapper border-bottom"
        },
        child: je(a)
      };
      h.push(m);
    }
    const p = {
      ...W,
      child: [...W.child]
    }, f = n.toLowerCase();
    p.child.forEach((m) => {
      const g = m.attrs["data-tag"];
      g === "section" && g !== f && (m.attrs["data-tag"] = f);
    }), h.push(p);
    const c = ie({
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
    }), d.addEventListener("click", this._headerLeftHandler), E.addEventListener("click", this._headerSwitchHandler), this.$elMap.set(d, this._headerLeftHandler), this.$elMap.set(E, this._headerSwitchHandler);
  }
  install(e, i) {
    this.editorInstance = e, i && i.append(this.$el), this._initChildEl(e.options), e.on("click", () => {
      const { textColor: n, childNodeName: r } = e.options, s = e.getStyles();
      this.updateActiveClassName(_(`[data-color="${s.color || n}"]`, this.$el));
      const o = e.getCursorElement(!0).nodeName.toLowerCase();
      this.updateActiveClassName(_(`[data-tag="${o || r}"]`, this.$el));
    });
  }
  show() {
    this.$el.classList.add(S);
  }
  hide() {
    this.$el.classList.remove(S);
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
const We = {
  toolbarBeenFixed: !0,
  toolbarHeight: "50px",
  toolbarButtons: ["choose-picture", "text-style"]
}, ze = 34;
class Ge {
  constructor(e) {
    u(this, "editorInstance", null);
    u(this, "visible");
    u(this, "options");
    u(this, "$el");
    u(this, "_btnClickHandler");
    this.options = {
      ...We,
      ...e
    }, this.visible = this.options.toolbarBeenFixed;
    const [i, n] = Ne(this.options.toolbarHeight);
    this.$el = y("div", {
      class: "sp-editor__toolbar border-top",
      style: {
        "--bar-height": `${i}${n}`,
        height: `${i + (Ee() ? ze : 0)}${n}`
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
    Te(this.$el, "__fade-in"), this.visible = !0, this.editorInstance.emit("toolbarShow", !0, this);
  }
  hide() {
    Le(this.$el, "__fade-in"), this.visible = !1, this.editorInstance.emit("toolbarShow", !1, this);
  }
  addButton(e, i) {
    const n = { ...e.style }, r = y("dd", {
      class: xe("icon-item", e.className),
      dataName: e.name,
      style: n
    }, e.innerHtml), s = C("dd", this.$el), o = _("dl", this.$el);
    typeof i == "number" && i >= 0 && i < s.length ? o.insertBefore(r, s[i]) : o.append(r), r.addEventListener("click", this._btnClickHandler);
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
var Ve = Object.defineProperty, z = Object.getOwnPropertySymbols, Ye = Object.prototype.hasOwnProperty, qe = Object.prototype.propertyIsEnumerable, G = (t, e, i) => e in t ? Ve(t, e, { enumerable: !0, configurable: !0, writable: !0, value: i }) : t[e] = i, V = (t, e) => {
  for (var i in e || (e = {}))
    Ye.call(e, i) && G(t, i, e[i]);
  if (z)
    for (var i of z(e))
      qe.call(e, i) && G(t, i, e[i]);
  return t;
};
function Ke(t) {
  return Array.isArray(t);
}
function ae(t) {
  return t !== null && !Ke(t) && typeof t == "object";
}
var Xe = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, T = { exports: {} };
/*! For license information please see date-utils-2020.js.LICENSE.txt */
(function(t, e) {
  (function(i, n) {
    t.exports = n();
  })(typeof self < "u" ? self : Xe, function() {
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
              var w = m[g] + "";
              a = a.replace(f, f.length === 1 ? w : l.toTwoDigits(w));
            }
          if (/(g)/i.test(a)) {
            var b = c.toString().split(/\s+/).slice(5), L = a.includes("g");
            a = a.replace(/g/i, L ? b[0] : b.join(" "));
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
function le(t = "", e = "-") {
  return t.replace(/[A-Z]/g, (i, n) => `${n > 0 ? e : ""}${i.toLowerCase()}`);
}
function Ze(t = "", e = !1) {
  const i = t.replace(/[-_\s](\w)/g, (n, r) => r.toUpperCase());
  return e ? i.replace(/^\w/, (n) => n.toUpperCase()) : i;
}
function ce(t = {}, e = !1) {
  const i = e ? Ze : le, n = {};
  for (const [r, s] of Object.entries(t))
    n[i(r)] = ae(s) ? ce(s, e) : s;
  return n;
}
function de(t, e = !1, i = 2) {
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
function Je(t, e = {}, i) {
  const n = document.createElement(t);
  for (const [r, s] of Object.entries(e))
    n.setAttribute(le(r), r === "style" && ae(s) ? Qe(s) : s);
  return i && (typeof i == "string" ? n.innerHTML = i : n.append(i)), n;
}
function Qe(...t) {
  const e = t.reduce((n, r) => V(V({}, n), ce(r)), {}), i = [];
  for (const [n, r] of Object.entries(e))
    r === "" || typeof r > "u" || r === null || i.push(`${n}:${r}`);
  return i.join(";");
}
function et(t) {
  return new Promise((e, i) => {
    const n = new FileReader();
    n.onload = (r) => {
      var s;
      const o = (s = r.target) == null ? void 0 : s.result;
      o ? e(o) : i(new Error(`FileReader's result is null, ${r.target}`));
    }, n.onerror = i, n.readAsDataURL(t);
  });
}
function he(t) {
  return (window.URL || window.webkitURL).createObjectURL(t);
}
function ue(t) {
  const e = t.split(",");
  let i = "";
  return /data:(\w+\/\w+);base64/.test(e[0]) && (i = RegExp.$1), {
    type: i,
    data: e[1]
  };
}
function fe(t, e) {
  const i = ue(t), n = window.atob(i.data);
  e = e || i.type;
  const r = new Uint8Array(n.length);
  for (let s = 0; s < n.length; s++)
    r[s] = n.charCodeAt(s);
  return new Blob([r], { type: e });
}
T.exports.formatDate;
T.exports.toDate;
T.exports.toTwoDigits;
const tt = {
  enableDevicePixelRatio: !1,
  isForce: !1,
  mimeType: "image/jpeg",
  perResize: 500,
  quality: 0.9,
  width: 0,
  height: 0,
  longestSide: 0
}, it = /^data:(.+?);base64/, nt = /^image\/.+/;
function rt(t, e) {
  return new Promise((i, n) => {
    const r = {
      ...tt,
      ...e
    };
    typeof t == "string" && it.test(t) ? Y(t, r, i, n) : (t instanceof File || t instanceof Blob) && nt.test(t.type) ? et(t).then((s) => {
      Y(s, r, i, n);
    }).catch(n) : n(new Error(`Invalid file, ${t}`));
  });
}
function Y(t, e, i, n) {
  const { type: r } = ue(t), s = fe(t, r), o = new Image();
  o.onload = () => {
    const l = {
      element: o,
      blob: s,
      data: t,
      url: he(s),
      width: o.naturalWidth || o.width,
      height: o.naturalHeight || o.height,
      type: r,
      size: de(s.size)
    };
    e.cropInfo && e.cropInfo.sw && e.cropInfo.sh ? q(l, e, i, n, {
      ...e.cropInfo,
      dx: 0,
      dy: 0,
      dw: e.cropInfo.sw,
      dh: e.cropInfo.sh
    }) : e.width > 0 && e.height > 0 ? q(l, e, i, n, ot(l, e)) : e.width > 0 || e.height > 0 || e.longestSide > 0 ? st(l, e, i, n) : A({ ...l, raw: l }, e, i);
  }, o.onerror = n, o.src = t;
}
function q(t, e, i, n, r) {
  try {
    Object.prototype.hasOwnProperty.call(r, "enableDevicePixelRatio") || (r.enableDevicePixelRatio = e.enableDevicePixelRatio);
    const s = I(t.element, {
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
    !e.width && !e.height ? e.longestSide ? r.sw > r.sh ? (e.width = e.longestSide, e.height = r.sh * e.width / r.sw) : (e.height = e.longestSide, e.width = r.sw * e.height / r.sh) : (e.width = r.sw, e.height = r.sh) : e.width ? e.height = r.sh * e.width / r.sw : e.width = r.sw * e.height / r.sh, pe(s, t, e, {
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
function st(t, e, i, n) {
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
        A({ ...t, raw: t }, e, i);
        return;
      }
      r.dh = t.height * e.width / t.width, e.height = r.dh;
    } else {
      if (t.height < e.height && !e.isForce) {
        A({ ...t, raw: t }, e, i);
        return;
      }
      r.dw = t.width * e.height / t.height, e.width = r.dw;
    }
    pe(t.element, t, e, r, i);
  } catch (r) {
    n(r);
  }
}
function A(t, e, i) {
  t.type !== e.mimeType ? (t.type = e.mimeType, ge(t.element, t.raw, e, {
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
function pe(t, e, i, n, r) {
  let s = e.width > e.height ? e.width - n.dw : e.height - n.dh;
  if (s > i.perResize) {
    const o = e.height / e.width;
    for (; s > i.perResize; )
      s -= i.perResize, n.sw = t.width, n.sh = t.height, n.dw = i.width + s, n.dh = n.dw * o, t = I(t, n);
  }
  n.sw = t.width, n.sh = t.height, n.dw = i.width, n.dh = i.height, ge(t, e, i, n, r);
}
function ge(t, e, i, n, r) {
  const s = I(t, n), o = /^\w+\/\*$/.test(i.mimeType) || !i.mimeType ? e.type : i.mimeType, l = s.toDataURL(o, i.quality), d = fe(l, o);
  r({
    element: s,
    type: o,
    width: s.width,
    height: s.height,
    blob: d,
    data: l,
    url: he(d),
    size: de(d.size),
    raw: e
  });
}
function ot(t, e) {
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
function I(t, e) {
  const i = e.enableDevicePixelRatio && window.devicePixelRatio || 1, n = Je("canvas");
  n.width = e.dw * i, n.height = e.dh * i;
  const r = n.getContext("2d");
  return r.scale(i, i), r.drawImage(t, e.sx, e.sy, e.sw, e.sh, e.dx, e.dy, e.dw, e.dh), n;
}
const at = {
  imageMaxWidth: 750,
  ignoreGif: !0,
  forceImageResize: !1,
  chooseFileMultiple: !0,
  chooseFileAccept: "image/*"
};
class ct extends Me {
  constructor(i, n = {}) {
    let r = null;
    if (typeof i == "string" || i instanceof HTMLElement ? r = _(i) : (n = i || {}, typeof n.container == "string" && (r = _(n.container))), n = {
      ...at,
      ...n
    }, !r)
      throw new Error(`Can't found '${i}' Node in document!`);
    const s = y("div", { class: "sp-editor" });
    super({
      ...n,
      container: s
    });
    u(this, "$el");
    u(this, "stylePanel");
    u(this, "toolbar");
    u(this, "fileInput", null);
    u(this, "_inputChangeHandler");
    r.append(s), this.$el = s, this.stylePanel = new Ue(n), this.use(this.stylePanel, this.$el), this.toolbar = new Ge(n), this.use(this.toolbar, this.$el), this._inputChangeHandler = (o) => {
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
            n.chooseFileMultiple && (l.multiple = !0), this.fileInput = y("input", l), this.$el.append(this.fileInput), this.fileInput.addEventListener("change", this._inputChangeHandler), this.fileInput.click();
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
      rt(i).then((o) => {
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
  re as ALLOWED_NODE_NAMES,
  ct as SpEditor
};
