/*!
 * zx-editor version 3.1.0
 * Author: capricorncd
 * Released under the MIT License
 * Repository: https://github.com/capricorncd/zx-editor
 * Released on: 2022-08-01 22:17:05 (GMT+0900)
 * Copyright © 2018-present, capricorncd
 */
var he = Object.defineProperty;
var ue = (t, e, r) => e in t ? he(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var g = (t, e, r) => (ue(t, typeof e != "symbol" ? e + "" : e, r), r);
class fe {
  constructor() {
    this._events = {};
  }
  on(e, r) {
    return !e || !r || typeof r != "function" ? this : (this._events[e] || (this._events[e] = []), this._events[e].push(r), this);
  }
  once(e, r) {
    const i = (...s) => {
      r.apply(this, s), this.off(e, i);
    };
    return this.on(e, i);
  }
  emit(e, ...r) {
    const i = this._events[e];
    if (!i)
      return this;
    for (let s = 0; s < i.length; s++)
      try {
        i[s].apply(this, r);
      } catch (n) {
        this.emit("error", n, "emit");
      }
    return this;
  }
  off(e, r) {
    if (!this._events[e])
      return this;
    const i = this._events[e];
    if (typeof r == "function") {
      const s = i.findIndex((n) => n === r);
      s >= 0 && i.splice(s, 1);
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
function ge() {
  return window.screen.height === 812 && window.screen.width === 375;
}
/*!
 * zx-sml version 0.2.1
 * Author: Capricorncd <capricorncd@qq.com>
 * Repository: https://github.com/capricorncd/zx-sml
 * Released on: 2022-07-24 15:34:05 (GMT+0900)
 */
var pe = Object.defineProperty, j = Object.getOwnPropertySymbols, we = Object.prototype.hasOwnProperty, ye = Object.prototype.propertyIsEnumerable, B = (t, e, r) => e in t ? pe(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, F = (t, e) => {
  for (var r in e || (e = {}))
    we.call(e, r) && B(t, r, e[r]);
  if (j)
    for (var r of j(e))
      ye.call(e, r) && B(t, r, e[r]);
  return t;
};
function me(t) {
  return Array.isArray(t);
}
function K(t) {
  return t !== null && !me(t) && typeof t == "object";
}
var _e = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, H = { exports: {} };
/*! For license information please see date-utils-2020.js.LICENSE.txt */
(function(t, e) {
  (function(r, i) {
    t.exports = i();
  })(typeof self < "u" ? self : _e, function() {
    return (() => {
      var r = { 949: (s, n) => {
        Object.defineProperty(n, "__esModule", { value: !0 }), n.toTwoDigits = void 0, n.toTwoDigits = function(o) {
          return o[1] ? o : "0" + o;
        };
      }, 607: (s, n, o) => {
        Object.defineProperty(n, "__esModule", { value: !0 }), n.toTwoDigits = n.toDate = n.formatDate = void 0;
        var c = o(949);
        Object.defineProperty(n, "toTwoDigits", { enumerable: !0, get: function() {
          return c.toTwoDigits;
        } });
        var u = { weeks: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] };
        function f(l) {
          if (l instanceof Date)
            return l;
          if (typeof l == "number")
            return new Date(l);
          if (typeof l == "string") {
            var a = l.trim();
            if (/^\d+$/.test(a)) {
              var h = a.length;
              return h === 8 ? new Date([a.substr(0, 4), a.substr(4, 2), a.substr(6, 2)].join("/")) : h === 6 ? new Date([a.substr(0, 4), a.substr(4, 2), "01"].join("/")) : h === 4 ? new Date(a + "/01/01") : new Date(parseInt(l));
            }
            if (a = a.replace(/[年月日]/g, function(d) {
              return d === "\u65E5" ? "" : "/";
            }).replace(/[(（（].*?[)））]/g, " ").replace(/\bam|pm\b/gi, " ").replace(/\s+/g, " "), /^(\d{4})[-/](\d{1,2})[-/](\d{1,2})$/.test(a))
              return new Date([RegExp.$1, RegExp.$2, RegExp.$3].join("/"));
            if (/^(\d{4})[-/](\d{1,2})$/.test(a))
              return new Date([RegExp.$1, RegExp.$2, "01"].join("/"));
            var p = new Date(a);
            return isNaN(p.getFullYear()) ? null : p;
          }
          return null;
        }
        n.formatDate = function(l, a, h) {
          var p, d = f(l);
          if (!d || !a)
            return l + "";
          if (a === "timestamp")
            return d.getTime().toString();
          /(y+)/i.test(a) && (p = RegExp.$1, a = a.replace(p, (d.getFullYear() + "").substr(4 - p.length))), h && Array.isArray(h.weeks) || (h = u);
          var E = { "M+": d.getMonth() + 1, "d+": d.getDate(), "h+": d.getHours(), "m+": d.getMinutes(), "s+": d.getSeconds(), "w+": d.getDay(), "W+": h.weeks[d.getDay()], "a+": d.getHours() < 12 ? "am" : "pm", "A+": d.getHours() < 12 ? "AM" : "PM" };
          for (var w in E)
            if (new RegExp("(" + w + ")").test(a)) {
              p = RegExp.$1;
              var y = E[w] + "";
              a = a.replace(p, p.length === 1 ? y : c.toTwoDigits(y));
            }
          if (/(g)/i.test(a)) {
            var _ = d.toString().split(/\s+/).slice(5), S = a.includes("g");
            a = a.replace(/g/i, S ? _[0] : _.join(" "));
          }
          return a;
        }, n.toDate = f;
      } }, i = {};
      return function s(n) {
        if (i[n])
          return i[n].exports;
        var o = i[n] = { exports: {} };
        return r[n](o, o.exports, s), o.exports;
      }(607);
    })();
  });
})(H);
function V(t = "", e = "-") {
  return t.replace(/[A-Z]/g, (r, i) => `${i > 0 ? e : ""}${r.toLowerCase()}`);
}
function Z(t = "", e = !1) {
  const r = t.replace(/[-_\s](\w)/g, (i, s) => s.toUpperCase());
  return e ? r.replace(/^\w/, (i) => i.toUpperCase()) : r;
}
function X(t) {
  return typeof t == "string" ? t : t === null || typeof t > "u" ? "" : Array.isArray(t) ? t.map(X).join(" ") : typeof t == "object" ? Object.keys(t).filter((e) => t[e]).join(" ") : String(t);
}
function Ee(...t) {
  return t.map(X).filter((e) => !!e).join(" ");
}
function b(t, e = 0) {
  return Array.prototype.slice.call(t, e);
}
function Q(t = {}, e = !1) {
  const r = e ? Z : V, i = {};
  for (const [s, n] of Object.entries(t))
    i[r(s)] = K(n) ? Q(n, e) : n;
  return i;
}
function x(t, e = document) {
  return t ? t instanceof HTMLElement ? t : e.querySelector(t) : null;
}
function C(t, e = document) {
  return b(e.querySelectorAll(t));
}
function m(t, e = {}, r) {
  const i = document.createElement(t);
  for (const [s, n] of Object.entries(e))
    i.setAttribute(V(s), s === "style" && K(n) ? R(n) : n);
  return r && (Array.isArray(r) || (r = [r]), r.forEach((s) => {
    if (typeof s == "string") {
      const n = m("div");
      n.innerHTML = s, i.append(...n.childNodes);
    } else
      i.append(s);
  })), i;
}
function R(...t) {
  const e = t.reduce((i, s) => F(F({}, i), Q(s)), {}), r = [];
  for (const [i, s] of Object.entries(e))
    s === "" || typeof s > "u" || s === null || r.push(`${i}:${s}`);
  return r.join(";");
}
H.exports.formatDate;
H.exports.toDate;
H.exports.toTwoDigits;
const N = (t, e = "style") => t ? (t.getAttribute(e) || "").split(/\s?;\s?/).reduce((i, s) => {
  const [n, o] = s.split(/\s?:\s?/);
  return n && (i[Z(n)] = o), i;
}, {}) : {}, A = (t) => document.createTextNode(t), J = (t) => {
  if (!t)
    return null;
  if (typeof t == "string")
    return A(t);
  const { tag: e, attrs: r, child: i } = t;
  if (!e && !r && !i)
    return null;
  const s = m(e || "div", r);
  if (Array.isArray(i) && i.length) {
    let n;
    i.forEach((o) => {
      n = J(o), n && s.appendChild(n);
    });
  } else
    i && typeof i == "string" && s.appendChild(A(i));
  return s;
}, ve = (t, e) => {
  t.classList.add(e);
}, be = (t, e) => {
  t.classList.remove(e);
}, xe = "zx-editor__editor", T = "SECTION", $e = "BR", ee = ["SECTION", "H1", "H2", "H3", "H4", "H5", "BLOCKQUOTE", "UL", "OL"], Ce = [
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
], te = "<section><br></section>";
function $(t, e, r) {
  return t.replace(RegExp("(^<" + e + ")|(" + e + ">$)", "gi"), (i) => i.toUpperCase().replace(e, r.toLowerCase()));
}
function D(t) {
  return /^UL|OL$/.test(t.nodeName);
}
function I(t) {
  if (!t)
    return !1;
  const e = b(t.childNodes);
  return e.length === 1 && e[0].nodeName === "BR";
}
const Te = (t) => {
  const e = {
    minHeight: t.minHeight,
    "--placeholder": JSON.stringify(t.placeholder),
    "--placeholder-color": t.placeholderColor,
    "--line-height": t.lineHeight,
    "--paragraph-spacing": t.paragraphTailSpacing,
    ...t.styles
  };
  t.caretColor && (e.caretColor = t.caretColor), t.textColor && (e.color = t.textColor);
  const r = {
    class: `${xe} is-empty`,
    style: R(e)
  };
  return t.editable && (r.contenteditable = "true"), m("div", r, te);
}, k = (t, e = T) => {
  var c, u, f, l, a, h, p, d, E;
  if (!t)
    return null;
  const r = t.nodeName, i = e.toUpperCase();
  if (r === i)
    return t;
  const s = m(e), n = t.parentElement;
  let o;
  if (r === "LI" && D(n)) {
    if (s.innerHTML = $(t.outerHTML, r, i), o = s.firstChild, n.childElementCount > 1)
      if (n.firstElementChild === t)
        (c = n.parentElement) == null || c.insertBefore(o, n);
      else if (n.lastElementChild === t) {
        const w = (u = n.parentElement) == null ? void 0 : u.nextElementSibling;
        w ? (f = w.parentElement) == null || f.insertBefore(o, w) : (l = n.parentElement) == null || l.append(o);
      } else {
        const w = b(n.children), y = m(n.nodeName);
        let _ = w.shift();
        for (; _ && _ !== t; )
          y.append(_), _ = w.shift();
        (a = n.parentElement) == null || a.insertBefore(y, n), (h = n.parentElement) == null || h.insertBefore(o, n), n.removeChild(t);
      }
    else
      (p = n.parentElement) == null || p.insertBefore(o, n), (d = n.parentElement) == null || d.removeChild(n);
    return o;
  }
  if (Ce.includes(r)) {
    if (/UL|OL/.test(i)) {
      const w = t.previousElementSibling, y = t.nextElementSibling;
      if (w && D(w)) {
        if (s.innerHTML = $(t.outerHTML, r, "li"), o = s.firstChild, w.append(o), n == null || n.removeChild(t), y && y.nodeName === w.nodeName) {
          const _ = b(y.children);
          w.append(..._), (E = y.parentElement) == null || E.removeChild(y);
        }
      } else
        y && D(y) ? (s.innerHTML = $(t.outerHTML, r, "li"), o = s.firstChild, y.insertBefore(o, y.firstElementChild), n == null || n.removeChild(t)) : (o = s, s.innerHTML = $(t.outerHTML, r, "li"), n == null || n.replaceChild(o, t));
    } else
      s.innerHTML = $(t.outerHTML, r, i), o = s.firstChild, n == null || n.replaceChild(o, t);
    return o;
  }
  return s.append(t.cloneNode(!0)), n == null || n.replaceChild(s, t), s;
}, U = (t) => {
  t.children.length <= 1 && I(t.children[0]) ? t.classList.add("is-empty") : t.classList.remove("is-empty");
};
function He(t, e, r = !1) {
  var i;
  for (; t && e !== t; ) {
    if (!r && t.nodeName === "LI" && ((i = t.parentElement) == null ? void 0 : i.parentElement) === e || t.parentElement === e)
      return t;
    t = t.parentElement;
  }
  return e.lastElementChild;
}
const Le = {
  editable: !0,
  minHeight: "50vh",
  placeholder: "\u8BF7\u5728\u6B64\u8F93\u5165\u5185\u5BB9..",
  placeholderColor: "#999",
  lineHeight: 1.5,
  allowedNodeNames: ee,
  paragraphTailSpacing: "10px",
  caretColor: "",
  textColor: "",
  customPasteHandler: void 0,
  insertTextToNewParagraph: !1
};
class Se extends fe {
  constructor(r) {
    super();
    g(this, "version");
    g(this, "options");
    g(this, "$editor");
    g(this, "_cursorElement", null);
    g(this, "_eventHandler");
    g(this, "allowedNodeNames");
    g(this, "_pasteHandler");
    const i = typeof r.container == "string" ? x(r.container) : r.container;
    if (!i)
      throw new Error(`Can't found '${r.container}' Node in document!`);
    this.version = "3.1.0", this.options = { ...Le, ...r }, this.allowedNodeNames = (this.options.allowedNodeNames || ee).map((s) => s.toUpperCase()), this.$editor = Te(this.options), i.append(this.$editor), this._eventHandler = (s) => {
      var o;
      const n = s.type;
      n === "blur" && (this._lastLine(), this.setCursorElement((o = window.getSelection()) == null ? void 0 : o.getRangeAt(0).endContainer)), this.emit(n === "input" ? "change" : n, s), U(this.$editor);
    }, this._pasteHandler = (s) => {
      var c;
      if (typeof this.options.customPasteHandler == "function")
        return this.options.customPasteHandler(s);
      s.stopPropagation();
      const n = (c = s.clipboardData) == null ? void 0 : c.getData("text"), o = window.getSelection();
      this._insertText(n, o);
    }, this._initEvents();
  }
  _initEvents() {
    this.$editor.addEventListener("focus", this._eventHandler), this.$editor.addEventListener("blur", this._eventHandler), this.$editor.addEventListener("input", this._eventHandler), this.$editor.addEventListener("click", this._eventHandler), this.$editor.addEventListener("paste", this._pasteHandler);
  }
  use(r, i) {
    typeof r.install == "function" && r.install(this, i);
  }
  setHtml(r) {
    this.$editor.innerHTML = te, this.insert(r, !0), this._lastLine(), U(this.$editor);
  }
  getHtml() {
    return this.$editor.innerHTML.replace(/<section><br><\/section>$/, "");
  }
  insert(r, i = !1) {
    if (r instanceof HTMLElement)
      this._insert(r);
    else {
      const s = m("div", {}, r), n = b(s.childNodes);
      if (!i && !this.options.insertTextToNewParagraph && n.every((o) => o.nodeType === Node.TEXT_NODE))
        return this._insertText(r);
      n.forEach((o) => {
        o.nodeType === Node.ELEMENT_NODE ? o.nodeName === $e ? this._insert(m(T, {}, "<br/>")) : this._insert(o) : o.textContent && this._insert(m(T, {}, o.textContent));
      });
    }
    this._dispatchChange();
  }
  _insert(r) {
    const i = this.getCursorElement();
    I(i) ? this.$editor.insertBefore(r, i) : this.$editor.insertBefore(r, i.nextElementSibling), this.allowedNodeNames.includes(r.nodeName) || (r = k(r, T)), this.setCursorElement(r);
  }
  _insertText(r, i) {
    if (!!r) {
      if (i = i != null ? i : window.getSelection(), !(i != null && i.rangeCount))
        return this.insert(r, !0);
      i.deleteFromDocument(), i.getRangeAt(0).insertNode(A(r)), this.setCursorElement(i.getRangeAt(0).endContainer), this._dispatchChange();
    }
  }
  _lastLine() {
    I(this.$editor.lastElementChild) || this.$editor.appendChild(m("section", {}, "<br>"));
  }
  changeNodeName(r) {
    if (!this.allowedNodeNames.includes(r.toUpperCase()))
      return !1;
    const i = this.getCursorElement(), s = k(i, r);
    return console.log(s), s ? (this.setCursorElement(s), this._dispatchChange(), !0) : !1;
  }
  changeStyles(r, i) {
    const s = this.getCursorElement(!0);
    if (s) {
      const n = typeof r == "string" ? { [r]: i } : r;
      s.setAttribute("style", R(N(s), n)), this._dispatchChange();
    }
  }
  _dispatchChange() {
    this.$editor.dispatchEvent(new InputEvent("input"));
  }
  getStyles() {
    return N(this.getCursorElement());
  }
  setCursorElement(r) {
    if (r instanceof Node)
      for (; r; ) {
        if (r.nodeType === Node.ELEMENT_NODE) {
          this._cursorElement = r;
          break;
        }
        r = r.parentElement;
      }
    else
      r && (this._cursorElement = r);
  }
  getCursorElement(r = !1) {
    return He(this._cursorElement, this.$editor, r);
  }
  destroy() {
    this.$editor.removeEventListener("focus", this._eventHandler), this.$editor.removeEventListener("blur", this._eventHandler), this.$editor.removeEventListener("input", this._eventHandler), this.$editor.removeEventListener("paste", this._pasteHandler), this.removeAllListeners();
  }
}
const De = {
  textStyleTitle: "Set Style",
  textStyleHeadLeftBtnText: "Clear style"
}, Oe = ["#333", "#d0d0d0", "#ff583d", "#fdaa25", "#44c67b", "#14b2e0", "#b065e2"], Ne = {
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
}, Ae = {
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
  return t.forEach((r, i) => {
    /^#\w{3,6}$/.test(r) && e.push({
      tag: "dd",
      attrs: {
        class: i === 0 ? "active" : "",
        "data-color": Pe(r.toLowerCase())
      },
      child: [
        {
          tag: "i",
          attrs: {
            style: `background:${r}`
          }
        }
      ]
    });
  }), e;
}, Pe = (t) => t.length === 7 ? t : `#${t[1]}${t[1]}${t[2]}${t[2]}${t[3]}${t[3]}`;
const v = "zx-editor-style-panel", O = `${v}__fade-in`;
class Re {
  constructor(e) {
    g(this, "editorInstance", null);
    g(this, "$el");
    g(this, "_headerSwitchHandler");
    g(this, "$elMap");
    g(this, "_styleHandler");
    g(this, "_colorHandler");
    g(this, "_tagHandler");
    const r = {
      ...De,
      ...e
    };
    this.$el = m("div", { class: `${v} border-top` });
    const i = m("div", { class: `${v}__header` }, r.textStyleTitle), s = m("div", { class: `${v}__header__left` }, r.textStyleHeadLeftBtnText), n = m("div", { class: `${v}__header__switch` });
    i.append(s, n);
    const o = [Ne], c = Array.isArray(r.textStyleColors) ? r.textStyleColors : Oe;
    if (c.length) {
      const f = {
        tag: "dl",
        attrs: {
          class: "__color-wrapper border-bottom"
        },
        child: Ie(c)
      };
      o.push(f);
    }
    o.push(Ae);
    const u = J({
      tag: "div",
      attrs: {
        class: `${v}__body`
      },
      child: o
    });
    this.$el.append(i, u), this.$elMap = /* @__PURE__ */ new Map([
      ["headerSwitch", n]
    ]), this._headerSwitchHandler = () => {
      this.$el.classList.contains(O) ? this.hide() : this.show();
    }, this._styleHandler = (f) => {
      const l = this.editorInstance, a = f.currentTarget, h = N(a, "data-style"), p = l.getStyles();
      Object.keys(h).forEach((d) => {
        p[d] && (h[d] = "");
      }), l.changeStyles(h);
    }, this._colorHandler = (f) => {
      const l = f.currentTarget;
      if (l.classList.contains("active"))
        return;
      x(".active", l.parentElement).classList.remove("active"), l.classList.add("active");
      const a = this.editorInstance, h = l.getAttribute("data-color");
      a.changeStyles({ color: h });
    }, this._tagHandler = (f) => {
      const l = f.currentTarget;
      if (l.classList.contains("active"))
        return;
      x(".active", l.parentElement).classList.remove("active"), l.classList.add("active");
      const a = this.editorInstance, h = l.getAttribute("data-tag");
      a.changeNodeName(h);
    }, n.addEventListener("click", this._headerSwitchHandler), C(".__style-wrapper dd", u).forEach((f) => {
      f.addEventListener("click", this._styleHandler);
    }), C(".__color-wrapper dd", u).forEach((f) => {
      f.addEventListener("click", this._colorHandler);
    }), C(".__tag-wrapper dd", u).forEach((f) => {
      f.addEventListener("click", this._tagHandler);
    });
  }
  install(e, r) {
    this.editorInstance = e, r && r.append(this.$el);
  }
  show() {
    this.$el.classList.add(O);
  }
  hide() {
    this.$el.classList.remove(O);
  }
  destroy() {
    var e;
    (e = this.$elMap.get("headerSwitch")) == null || e.removeEventListener("click", this._headerSwitchHandler);
  }
}
const Me = {
  toolbarBeenFixed: !0,
  toolbarHeight: 50,
  toolbarButtons: ["choose-picture", "text-style"]
}, je = 34;
class Be {
  constructor(e) {
    g(this, "editorInstance", null);
    g(this, "visible");
    g(this, "options");
    g(this, "$el");
    g(this, "_btnClickHandler");
    this.options = {
      ...Me,
      ...e
    }, this.visible = this.options.toolbarBeenFixed;
    const r = this.options.toolbarHeight;
    this.$el = m("div", {
      class: "zx-editor__toolbar border-top",
      style: {
        "--bar-height": r + "px",
        height: `${r + (ge() ? je : 0)}px`
      }
    }, '<dl class="inner-wrapper"></dl>'), this._btnClickHandler = (i) => {
      const s = i.currentTarget;
      this.editorInstance && s && this.editorInstance.emit("toolbarButtonClick", s.getAttribute("data-name"));
    }, this.options.toolbarButtons.forEach((i) => {
      this.addButton({ name: i });
    });
  }
  install(e, r) {
    this.editorInstance = e, r && r.append(this.$el), this.visible && this.show();
  }
  show() {
    ve(this.$el, "__fade-in"), this.visible = !0, this.editorInstance.emit("toolbarShow", !0, this);
  }
  hide() {
    be(this.$el, "__fade-in"), this.visible = !1, this.editorInstance.emit("toolbarShow", !1, this);
  }
  addButton(e, r) {
    const i = { ...e.style }, s = m("dd", {
      class: Ee("icon-item", e.className),
      dataName: e.name,
      style: i
    }, e.innerHtml), n = C("dd", this.$el), o = x("dl", this.$el);
    typeof r == "number" && r < n.length ? o.insertBefore(s, n[r]) : o.append(s), s.addEventListener("click", this._btnClickHandler);
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
var Fe = Object.defineProperty, z = Object.getOwnPropertySymbols, ke = Object.prototype.hasOwnProperty, Ue = Object.prototype.propertyIsEnumerable, W = (t, e, r) => e in t ? Fe(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, G = (t, e) => {
  for (var r in e || (e = {}))
    ke.call(e, r) && W(t, r, e[r]);
  if (z)
    for (var r of z(e))
      Ue.call(e, r) && W(t, r, e[r]);
  return t;
};
function ze(t) {
  return Array.isArray(t);
}
function re(t) {
  return t !== null && !ze(t) && typeof t == "object";
}
var We = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, L = { exports: {} };
/*! For license information please see date-utils-2020.js.LICENSE.txt */
(function(t, e) {
  (function(r, i) {
    t.exports = i();
  })(typeof self < "u" ? self : We, function() {
    return (() => {
      var r = { 949: (s, n) => {
        Object.defineProperty(n, "__esModule", { value: !0 }), n.toTwoDigits = void 0, n.toTwoDigits = function(o) {
          return o[1] ? o : "0" + o;
        };
      }, 607: (s, n, o) => {
        Object.defineProperty(n, "__esModule", { value: !0 }), n.toTwoDigits = n.toDate = n.formatDate = void 0;
        var c = o(949);
        Object.defineProperty(n, "toTwoDigits", { enumerable: !0, get: function() {
          return c.toTwoDigits;
        } });
        var u = { weeks: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] };
        function f(l) {
          if (l instanceof Date)
            return l;
          if (typeof l == "number")
            return new Date(l);
          if (typeof l == "string") {
            var a = l.trim();
            if (/^\d+$/.test(a)) {
              var h = a.length;
              return h === 8 ? new Date([a.substr(0, 4), a.substr(4, 2), a.substr(6, 2)].join("/")) : h === 6 ? new Date([a.substr(0, 4), a.substr(4, 2), "01"].join("/")) : h === 4 ? new Date(a + "/01/01") : new Date(parseInt(l));
            }
            if (a = a.replace(/[年月日]/g, function(d) {
              return d === "\u65E5" ? "" : "/";
            }).replace(/[(（（].*?[)））]/g, " ").replace(/\bam|pm\b/gi, " ").replace(/\s+/g, " "), /^(\d{4})[-/](\d{1,2})[-/](\d{1,2})$/.test(a))
              return new Date([RegExp.$1, RegExp.$2, RegExp.$3].join("/"));
            if (/^(\d{4})[-/](\d{1,2})$/.test(a))
              return new Date([RegExp.$1, RegExp.$2, "01"].join("/"));
            var p = new Date(a);
            return isNaN(p.getFullYear()) ? null : p;
          }
          return null;
        }
        n.formatDate = function(l, a, h) {
          var p, d = f(l);
          if (!d || !a)
            return l + "";
          if (a === "timestamp")
            return d.getTime().toString();
          /(y+)/i.test(a) && (p = RegExp.$1, a = a.replace(p, (d.getFullYear() + "").substr(4 - p.length))), h && Array.isArray(h.weeks) || (h = u);
          var E = { "M+": d.getMonth() + 1, "d+": d.getDate(), "h+": d.getHours(), "m+": d.getMinutes(), "s+": d.getSeconds(), "w+": d.getDay(), "W+": h.weeks[d.getDay()], "a+": d.getHours() < 12 ? "am" : "pm", "A+": d.getHours() < 12 ? "AM" : "PM" };
          for (var w in E)
            if (new RegExp("(" + w + ")").test(a)) {
              p = RegExp.$1;
              var y = E[w] + "";
              a = a.replace(p, p.length === 1 ? y : c.toTwoDigits(y));
            }
          if (/(g)/i.test(a)) {
            var _ = d.toString().split(/\s+/).slice(5), S = a.includes("g");
            a = a.replace(/g/i, S ? _[0] : _.join(" "));
          }
          return a;
        }, n.toDate = f;
      } }, i = {};
      return function s(n) {
        if (i[n])
          return i[n].exports;
        var o = i[n] = { exports: {} };
        return r[n](o, o.exports, s), o.exports;
      }(607);
    })();
  });
})(L);
function ie(t = "", e = "-") {
  return t.replace(/[A-Z]/g, (r, i) => `${i > 0 ? e : ""}${r.toLowerCase()}`);
}
function Ge(t = "", e = !1) {
  const r = t.replace(/[-_\s](\w)/g, (i, s) => s.toUpperCase());
  return e ? r.replace(/^\w/, (i) => i.toUpperCase()) : r;
}
function ne(t = {}, e = !1) {
  const r = e ? Ge : ie, i = {};
  for (const [s, n] of Object.entries(t))
    i[r(s)] = re(n) ? ne(n, e) : n;
  return i;
}
function se(t, e = !1, r = 2) {
  const i = ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"], s = e ? 1e3 : 1024;
  let n = String(t), o = "Byte";
  for (let c = 0, u = t / s; u > 1; u /= s, c++)
    n = u.toFixed(r), o = i[c];
  return e && (o = o.replace("i", "")), {
    text: n.replace(/\.0+$/, "") + o,
    value: +n,
    unit: o,
    bytes: t
  };
}
function Ye(t, e = {}, r) {
  const i = document.createElement(t);
  for (const [s, n] of Object.entries(e))
    i.setAttribute(ie(s), s === "style" && re(n) ? qe(n) : n);
  return r && (typeof r == "string" ? i.innerHTML = r : i.append(r)), i;
}
function qe(...t) {
  const e = t.reduce((i, s) => G(G({}, i), ne(s)), {}), r = [];
  for (const [i, s] of Object.entries(e))
    s === "" || typeof s > "u" || s === null || r.push(`${i}:${s}`);
  return r.join(";");
}
function Ke(t) {
  return new Promise((e, r) => {
    const i = new FileReader();
    i.onload = (s) => {
      var n;
      const o = (n = s.target) == null ? void 0 : n.result;
      o ? e(o) : r(new Error(`FileReader's result is null, ${s.target}`));
    }, i.onerror = r, i.readAsDataURL(t);
  });
}
function oe(t) {
  return (window.URL || window.webkitURL).createObjectURL(t);
}
function ae(t) {
  const e = t.split(",");
  let r = "";
  return /data:(\w+\/\w+);base64/.test(e[0]) && (r = RegExp.$1), {
    type: r,
    data: e[1]
  };
}
function le(t, e) {
  const r = ae(t), i = window.atob(r.data);
  e = e || r.type;
  const s = new Uint8Array(i.length);
  for (let n = 0; n < i.length; n++)
    s[n] = i.charCodeAt(n);
  return new Blob([s], { type: e });
}
L.exports.formatDate;
L.exports.toDate;
L.exports.toTwoDigits;
const Ve = {
  enableDevicePixelRatio: !1,
  isForce: !1,
  mimeType: "image/jpeg",
  perResize: 500,
  quality: 0.9,
  width: 0,
  height: 0,
  longestSide: 0
}, Ze = /^data:(.+?);base64/, Xe = /^image\/.+/;
function Qe(t, e) {
  return new Promise((r, i) => {
    const s = {
      ...Ve,
      ...e
    };
    typeof t == "string" && Ze.test(t) ? Y(t, s, r, i) : (t instanceof File || t instanceof Blob) && Xe.test(t.type) ? Ke(t).then((n) => {
      Y(n, s, r, i);
    }).catch(i) : i(new Error(`Invalid file, ${t}`));
  });
}
function Y(t, e, r, i) {
  const { type: s } = ae(t), n = le(t, s), o = new Image();
  o.onload = () => {
    const c = {
      element: o,
      blob: n,
      data: t,
      url: oe(n),
      width: o.naturalWidth || o.width,
      height: o.naturalHeight || o.height,
      type: s,
      size: se(n.size)
    };
    e.cropInfo && e.cropInfo.sw && e.cropInfo.sh ? q(c, e, r, i, {
      ...e.cropInfo,
      dx: 0,
      dy: 0,
      dw: e.cropInfo.sw,
      dh: e.cropInfo.sh
    }) : e.width > 0 && e.height > 0 ? q(c, e, r, i, et(c, e)) : e.width > 0 || e.height > 0 || e.longestSide > 0 ? Je(c, e, r, i) : P({ ...c, raw: c }, e, r);
  }, o.onerror = i, o.src = t;
}
function q(t, e, r, i, s) {
  try {
    Object.prototype.hasOwnProperty.call(s, "enableDevicePixelRatio") || (s.enableDevicePixelRatio = e.enableDevicePixelRatio);
    const n = M(t.element, {
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
    !e.width && !e.height ? e.longestSide ? s.sw > s.sh ? (e.width = e.longestSide, e.height = s.sh * e.width / s.sw) : (e.height = e.longestSide, e.width = s.sw * e.height / s.sh) : (e.width = s.sw, e.height = s.sh) : e.width ? e.height = s.sh * e.width / s.sw : e.width = s.sw * e.height / s.sh, ce(n, t, e, {
      ...s,
      sx: 0,
      sy: 0,
      sw: n.width,
      sh: n.height
    }, r);
  } catch (n) {
    i(n);
  }
}
function Je(t, e, r, i) {
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
        P({ ...t, raw: t }, e, r);
        return;
      }
      s.dh = t.height * e.width / t.width, e.height = s.dh;
    } else {
      if (t.height < e.height && !e.isForce) {
        P({ ...t, raw: t }, e, r);
        return;
      }
      s.dw = t.width * e.height / t.height, e.width = s.dw;
    }
    ce(t.element, t, e, s, r);
  } catch (s) {
    i(s);
  }
}
function P(t, e, r) {
  t.type !== e.mimeType ? (t.type = e.mimeType, de(t.element, t.raw, e, {
    enableDevicePixelRatio: e.enableDevicePixelRatio,
    sx: 0,
    sy: 0,
    sw: t.width,
    sh: t.height,
    dx: 0,
    dy: 0,
    dw: t.width,
    dh: t.height
  }, r)) : r(t);
}
function ce(t, e, r, i, s) {
  let n = e.width > e.height ? e.width - i.dw : e.height - i.dh;
  if (n > r.perResize) {
    const o = e.height / e.width;
    for (; n > r.perResize; )
      n -= r.perResize, i.sw = t.width, i.sh = t.height, i.dw = r.width + n, i.dh = i.dw * o, t = M(t, i);
  }
  i.sw = t.width, i.sh = t.height, i.dw = r.width, i.dh = r.height, de(t, e, r, i, s);
}
function de(t, e, r, i, s) {
  const n = M(t, i), o = /^\w+\/\*$/.test(r.mimeType) || !r.mimeType ? e.type : r.mimeType, c = n.toDataURL(o, r.quality), u = le(c, o);
  s({
    element: n,
    type: o,
    width: n.width,
    height: n.height,
    blob: u,
    data: c,
    url: oe(u),
    size: se(u.size),
    raw: e
  });
}
function et(t, e) {
  const { width: r, height: i } = t, { width: s, height: n } = e;
  let o;
  const c = i * s / n;
  if (r > c)
    o = {
      sx: (r - c) / 2,
      sy: 0,
      sw: c,
      sh: i
    };
  else {
    const u = r * n / s;
    o = {
      sx: 0,
      sy: (i - u) / 2,
      sw: r,
      sh: u
    };
  }
  return {
    ...o,
    dx: 0,
    dy: 0,
    dw: s,
    dh: n
  };
}
function M(t, e) {
  const r = e.enableDevicePixelRatio && window.devicePixelRatio || 1, i = Ye("canvas");
  i.width = e.dw * r, i.height = e.dh * r;
  const s = i.getContext("2d");
  return s.scale(r, r), s.drawImage(t, e.sx, e.sy, e.sw, e.sh, e.dx, e.dy, e.dw, e.dh), i;
}
const tt = {
  imageMaxWidth: 750,
  ignoreGif: !0,
  forceImageResize: !1,
  chooseFileMultiple: !0,
  chooseFileAccept: "image/*"
};
class it extends Se {
  constructor(r, i = {}) {
    let s = null;
    if (typeof r == "string" || r instanceof HTMLElement ? s = x(r) : (i = r || {}, typeof i.container == "string" && (s = x(i.container))), i = {
      ...tt,
      ...i
    }, !s)
      throw new Error(`Can't found '${r}' Node in document!`);
    const n = m("div", { class: "zx-editor" });
    super({
      ...i,
      container: n
    });
    g(this, "$el");
    g(this, "stylePanel");
    g(this, "toolbar");
    g(this, "fileInput", null);
    g(this, "_inputChangeHandler");
    s.append(n), this.$el = n, this.stylePanel = new Re(i), this.use(this.stylePanel, this.$el), this.toolbar = new Be(i), this.use(this.toolbar, this.$el), this._inputChangeHandler = (o) => {
      const c = o.currentTarget;
      this.handleImageFile(c.files).then((u) => {
        u.forEach((f) => {
          const l = /gif$/i.test(f.raw.type) && i.ignoreGif;
          this.insert(`<img src="${l ? f.raw.data : f.data}">`);
        });
      }).catch((u) => {
        this.emit("error", u);
      });
    }, this.on("toolbarButtonClick", (o) => {
      switch (o) {
        case "choose-picture":
          if (typeof i.customPictureHandler == "function")
            i.customPictureHandler();
          else if (this.fileInput)
            this.fileInput.click();
          else {
            const c = {
              type: "file",
              style: {
                display: "none"
              },
              accept: i.chooseFileAccept
            };
            i.chooseFileMultiple && (c.multiple = !0), this.fileInput = m("input", c), this.$el.append(this.fileInput), this.fileInput.addEventListener("change", this._inputChangeHandler), this.fileInput.click();
          }
          break;
        case "text-style":
          this.stylePanel.show();
          break;
      }
    });
  }
  handleImageFile(r) {
    return r ? new Promise((i, s) => {
      Promise.all(b(r).map(this._handleFile)).then((n) => {
        i(n.sort((o, c) => o.index - c.index).map((o) => o.data));
      }).catch(s);
    }) : Promise.resolve([]);
  }
  _handleFile(r, i) {
    return new Promise((s, n) => {
      Qe(r).then((o) => {
        s({
          data: o,
          index: i
        });
      }).catch(n);
    });
  }
  destroy() {
    var r;
    super.destroy(), this.stylePanel.destroy(), this.toolbar.destroy(), (r = this.fileInput) == null || r.removeEventListener("change", this._inputChangeHandler);
  }
}
export {
  it as ZxEditor
};
