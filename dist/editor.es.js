/*!
 * @sp-editor/editor version 1.0.0
 * Author: Capricorncd
 * Released under the MIT License
 * Repository: https://github.com/capricorncd/zx-editor
 * Copyright © 2018-present, Capricorncd/ Xing Zhong.
 */
var R = Object.defineProperty;
var j = (t, r, e) => r in t ? R(t, r, { enumerable: !0, configurable: !0, writable: !0, value: e }) : t[r] = e;
var f = (t, r, e) => (j(t, typeof r != "symbol" ? r + "" : r, e), e);
class V {
  constructor() {
    this._events = {};
  }
  /**
   * @method on(eventName, fn)
   * `on` is used to add a callback function that's going to be executed when the event is triggered.
   * @param eventName `string` custom event name.
   * @param fn `Function` callback function.
   * @returns `EventEmitter`
   */
  on(r, e) {
    return !r || !e || typeof e != "function" ? this : (this._events[r] || (this._events[r] = []), this._events[r].push(e), this);
  }
  /**
   * @method once(eventName, fn)
   * `once` add a one-time listener.
   * @param eventName `string` custom event name.
   * @param fn `Function` callback function.
   * @returns `EventEmitter`
   */
  once(r, e) {
    const n = (...i) => {
      e.apply(this, i), this.off(r, n);
    };
    return this.on(r, n);
  }
  /**
   * @method emit(eventName, arg1, arg2, ..., argN)
   * `emit` is used to trigger an event.
   * @param eventName `string`
   * @param args `any`
   * @returns `EventEmitter`
   */
  emit(r, ...e) {
    const n = this._events[r];
    if (!n)
      return this;
    for (let i = 0; i < n.length; i++)
      try {
        n[i].apply(this, e);
      } catch (s) {
        this.emit("error", s, "emit");
      }
    return this;
  }
  /**
   * @method off(eventName, fn)
   * remove an event listener from an event.
   * @param eventName `string` custom event name.
   * @param fn? `Function` callback function. When `fn` is not a function, all monitoring functions of `eventName` will be removed.
   * @returns `EventEmitter`
   */
  off(r, e) {
    if (!this._events[r])
      return this;
    const n = this._events[r];
    if (typeof e == "function") {
      const i = n.findIndex((s) => s === e);
      i >= 0 && n.splice(i, 1);
    } else
      this._events[r].length = 0;
    return this._removeEmpty(r), this;
  }
  /**
   * _removeEmpty(eventName)
   * remove empty event list
   * @param eventName `string`
   * @private
   * @returns `void`
   */
  _removeEmpty(r) {
    this._events[r].length || delete this._events[r];
  }
  /**
   * @method destroyEventEmitter()
   * remove all listeners for an event.
   * @returns `void`
   */
  removeAllListeners() {
    Object.keys(this._events).forEach((r) => this.off(r));
  }
}
/*!
 * zx-sml version 0.7.5
 * Author: Capricorncd <capricorncd@qq.com>
 * Repository: https://github.com/capricorncd/zx-sml
 * Released on: 2023-05-17 20:41:58 (GMT+0900)
 */
var F = Object.defineProperty, $ = Object.getOwnPropertySymbols, K = Object.prototype.hasOwnProperty, q = Object.prototype.propertyIsEnumerable, b = (t, r, e) => r in t ? F(t, r, { enumerable: !0, configurable: !0, writable: !0, value: e }) : t[r] = e, O = (t, r) => {
  for (var e in r || (r = {}))
    K.call(r, e) && b(t, e, r[e]);
  if ($)
    for (var e of $(r))
      q.call(r, e) && b(t, e, r[e]);
  return t;
};
function G(t) {
  return Array.isArray(t);
}
function A(t) {
  return typeof t == "object" && t !== null && !G(t);
}
function B(t = "", r = "-") {
  return t.replace(/[A-Z]/g, (e, n) => `${n > 0 ? r : ""}${e.toLowerCase()}`);
}
function D(t = "", r = !1) {
  const e = t.replace(/[-_\s](\w)/g, (n, i) => i.toUpperCase());
  return r ? e.replace(/^\w/, (n) => n.toUpperCase()) : e;
}
function p(t, r = 0) {
  return Array.prototype.slice.call(t, r);
}
function I(t = {}, r = !1) {
  const e = r ? D : B, n = {};
  for (const [i, s] of Object.entries(t))
    n[e(i)] = A(s) ? I(s, r) : s;
  return n;
}
function J(t, r = document) {
  return t ? t instanceof HTMLElement ? t : r.querySelector(t) : null;
}
function h(t, r = {}, e) {
  const n = document.createElement(t);
  for (const [i, s] of Object.entries(r))
    n.setAttribute(B(i), i === "style" && A(s) ? g(s) : String(s));
  return e && (Array.isArray(e) || (e = [e]), e.forEach((i) => {
    if (typeof i == "string") {
      const s = h("div");
      s.innerHTML = i, n.append(...s.childNodes);
    } else
      n.append(i);
  })), n;
}
function g(...t) {
  const r = t.reduce((n, i) => O(O({}, n), I(i)), {}), e = [];
  for (const [n, i] of Object.entries(r))
    i === "" || typeof i > "u" || i === null || e.push(`${n}:${i}`);
  return e.join(";");
}
const S = (t, r = "style") => t ? (t.getAttribute(r) || "").split(/\s?;\s?/).reduce((n, i) => {
  const [s, o] = i.split(/\s?:\s?/);
  return s && (n[D(s)] = o), n;
}, {}) : {}, Q = (t) => document.createTextNode(t), W = "sp-editor__editor", P = "SECTION", X = "BR", k = [P, "H1", "H2", "H3", "H4", "H5", "BLOCKQUOTE", "UL", "OL"];
function m(t, r, e) {
  return t.replace(
    RegExp("(^<" + r + ")|(" + r + ">$)", "gi"),
    (n) => n.toUpperCase().replace(r, e.toLowerCase())
  );
}
function Z(t) {
  return t.replace(/<li[^>]*>(.+)<\/li>/gi, "$1");
}
function E(t) {
  const r = typeof t == "string" ? t : t.nodeName;
  return /^UL|OL$/i.test(r);
}
function w(t) {
  if (!t)
    return !1;
  const r = p(t.childNodes);
  return r.length === 1 && r[0].nodeName === "BR";
}
function N(t) {
  return t instanceof Element && (t = t.outerHTML), /^<(\w+)[^>]*>.*<\/\1>$/.test(t);
}
function z(t) {
  return ["PICTURE", "VIDEO", "AUDIO", "CANVAS"].includes(t.nodeName);
}
function Y(t) {
  return ["IMG"].includes(t.nodeName) || z(t);
}
function U(t) {
  if (Y(t))
    return !0;
  for (let r = 0; r < t.children.length; r++)
    if (U(t.children[r]))
      return !0;
  return !1;
}
const ee = (t, r) => {
  const e = {
    minHeight: t.minHeight,
    // placeholder
    "--placeholder": JSON.stringify(t.placeholder),
    "--placeholder-color": t.placeholderColor,
    "--line-height": t.lineHeight,
    // paragraphTailSpacing
    "--paragraph-spacing": t.paragraphTailSpacing,
    "--padding-bottom": `calc(${t.paddingBottom || "0px"} + env(safe-area-inset-bottom))`,
    // 用户自定义样式优先
    ...t.styles
  };
  t.caretColor && (e.caretColor = t.caretColor), t.textColor && (e.color = t.textColor);
  const n = {
    class: `${W} is-empty`,
    style: g(e)
  };
  return t.editable && (n.contenteditable = "true"), h("div", n, r);
}, x = (t, r) => {
  var l, a, _, C, v, y, L, T, H;
  if (!t)
    return null;
  const e = t.nodeName, n = r.toUpperCase();
  if (e === n)
    return null;
  const i = h(r), s = t.parentElement;
  let o;
  if (e === "LI" && E(s)) {
    if (i.innerHTML = m(t.outerHTML, e, n), o = i.firstChild, s.childElementCount > 1)
      if (s.firstElementChild === t)
        (l = s.parentElement) == null || l.insertBefore(o, s);
      else if (s.lastElementChild === t) {
        const c = (a = s.parentElement) == null ? void 0 : a.nextElementSibling;
        c ? (_ = c.parentElement) == null || _.insertBefore(o, c) : (C = s.parentElement) == null || C.append(o);
      } else {
        const c = p(s.children), d = h(s.nodeName);
        let u = c.shift();
        for (; u && u !== t; )
          d.append(u), u = c.shift();
        (v = s.parentElement) == null || v.insertBefore(d, s), (y = s.parentElement) == null || y.insertBefore(o, s), s.removeChild(t);
      }
    else
      (L = s.parentElement) == null || L.insertBefore(o, s), (T = s.parentElement) == null || T.removeChild(s);
    return o;
  }
  if (/UL|OL/.test(n)) {
    const c = t.previousElementSibling, d = t.nextElementSibling;
    if (c && E(c)) {
      if (i.innerHTML = m(t.outerHTML, e, "li"), o = i.firstChild, c.append(o), s == null || s.removeChild(t), d && d.nodeName === c.nodeName) {
        const u = p(d.children);
        c.append(...u), (H = d.parentElement) == null || H.removeChild(d);
      }
    } else
      d && E(d) ? (i.innerHTML = m(t.outerHTML, e, "li"), o = i.firstChild, d.insertBefore(o, d.firstElementChild), s == null || s.removeChild(t)) : (o = i, i.innerHTML = m(t.outerHTML, e, "li"), s == null || s.replaceChild(o, t));
  } else
    i.innerHTML = Z(m(t.outerHTML, e, n)), o = i.firstChild, s == null || s.replaceChild(o, t);
  return o;
}, M = (t) => {
  var r;
  !((r = t.innerText) != null && r.trim()) && !U(t) ? t.classList.add("is-empty") : t.classList.remove("is-empty");
};
function te(t, r, e = !1) {
  var n;
  for (; t && r !== t; ) {
    if (!e && t.nodeName === "LI" && ((n = t.parentElement) == null ? void 0 : n.parentElement) === r || t.parentElement === r)
      return t;
    t = t.parentElement;
  }
  return r.lastElementChild;
}
const re = {
  // 内容是否可以被编辑
  editable: !0,
  // 编辑器输入内容绝对定位
  // editor min height
  minHeight: "50vh",
  paddingBottom: "50vh",
  // style
  placeholder: "请在此输入内容..",
  placeholderColor: "#999",
  lineHeight: 1.5,
  childNodeName: P,
  allowedNodeNames: k,
  // paragraph tail spacing, default 10px
  paragraphTailSpacing: "10px",
  caretColor: "",
  textColor: "#333333",
  // 自定义粘贴处理函数
  customPasteHandler: void 0,
  insertTextToNewParagraph: !1
};
class ie extends V {
  constructor(e) {
    super();
    /**
     * @property version
     * 获取版本号
     * @returns `string`
     */
    f(this, "version");
    // 参数
    f(this, "options");
    // 编辑器内容区域HTML元素
    f(this, "$editor");
    // current node
    f(this, "_cursorElement", null);
    // 内容元素事件处理函数
    f(this, "_eventHandler");
    // 内容中允许使用的元素标签
    f(this, "allowedNodeNames");
    f(this, "blankLine");
    f(this, "_pasteHandler");
    const n = typeof e.container == "string" ? J(e.container) : e.container;
    if (!n)
      throw new Error(`Can't found '${e.container}' Node in document!`);
    this.version = "1.0.0", this.options = { ...re, ...e }, this.allowedNodeNames = (this.options.allowedNodeNames || k).map((s) => s.toUpperCase());
    const i = this.options.childNodeName.toUpperCase();
    this.options.childNodeName = i, this.blankLine = `<${i}><br></${i}>`, this.allowedNodeNames.includes(i) || this.allowedNodeNames.push(i), this.$editor = ee(this.options, this.blankLine), n.append(this.$editor), this._eventHandler = (s) => {
      const o = s.type;
      if (o === "blur" || o === "click") {
        const l = window.getSelection(), a = l && l.rangeCount ? l.getRangeAt(l.rangeCount - 1).endContainer : s.currentTarget;
        this.setCursorElement(a), o === "blur" && this._verifyChild();
      }
      this.emit(o === "input" ? "change" : o, s), M(this.$editor);
    }, this._pasteHandler = (s) => {
      var l;
      if (typeof this.options.customPasteHandler == "function")
        return this.options.customPasteHandler(s);
      s.preventDefault();
      const o = (l = s.clipboardData) == null ? void 0 : l.getData("text");
      this.insert(o);
    }, this._initEvents();
  }
  /**
   * init events
   * @private
   */
  _initEvents() {
    this.$editor.addEventListener("focus", this._eventHandler), this.$editor.addEventListener("blur", this._eventHandler), this.$editor.addEventListener("input", this._eventHandler), this.$editor.addEventListener("click", this._eventHandler), this.$editor.addEventListener("paste", this._pasteHandler);
  }
  /**
   * @method use(plugin, parentElement)
   * extension, 扩展插件
   * @param plugin `EditorPlugin`
   * @param parentElement? `HTMLElement`
   */
  use(e, n) {
    typeof e.install == "function" && e.install(this, n);
  }
  /**
   * @method setHtml(html)
   * 设置编辑器内容，会覆盖之前内容
   * set html to the content element
   * @param html `string`
   */
  setHtml(e) {
    this.$editor.innerHTML = this.blankLine, this.insert(e, !0), M(this.$editor);
  }
  /**
   * @method getHtml(retainLastBlankLines)
   * 获取编辑器中的HTML代码，会自动去除结尾处的空行。
   * get html string from content element.
   * @param retainLastBlankLines? `boolean` Retain last blank lines, If `true` the last `<section><br></section>` not will be removed.
   * @return `string`
   */
  getHtml(e) {
    const n = this.$editor.innerHTML;
    if (e)
      return n;
    const i = this.options.childNodeName;
    return n.replace(new RegExp(`(<${i}><br\\s?\\/?><\\/${i}>)+$`, "i"), "");
  }
  /**
   * @method insert(input, toNewParagraph)
   * 向编辑器中插入内容/HTML代码/元素等
   * insert html or element to content element
   * @param input `string | HTMLElement`
   * @param toNewParagraph? `boolean` Insert `text` in a new paragraph, only `textNode` is valid. Defaults to `false`.
   */
  insert(e, n = !1) {
    if (!e)
      return;
    const { childNodeName: i, insertTextToNewParagraph: s } = this.options;
    if (e instanceof HTMLElement)
      this._insertEl(e);
    else {
      const o = h("div", {}, e), l = p(o.childNodes);
      if (!n && !s && l.every((a) => a.nodeType === Node.TEXT_NODE))
        return this._insertText(e);
      l.forEach((a) => {
        a.nodeType === Node.ELEMENT_NODE ? a.nodeName === X ? this._insertEl(h(i, {}, "<br/>")) : this._insertEl(a) : a.textContent && this._insertEl(h(i, {}, a.textContent));
      });
    }
    this._verifyChild(), this._dispatchChange();
  }
  /**
   * insert element to content element
   * @param input
   * @private
   */
  _insertEl(e) {
    const n = this.getCursorElement();
    w(n) ? N(e.outerHTML) ? this.$editor.insertBefore(e, n) : n === this.$editor.children[this.$editor.children.length - 1] ? this.$editor.insertBefore(h(this.options.childNodeName, {}, e), n) : (n.innerHTML = "", n.append(e)) : (N(e.outerHTML) || (e = h(this.options.childNodeName, {}, e)), n.nextElementSibling ? this.$editor.insertBefore(e, n.nextElementSibling) : this.$editor.append(e)), this.setCursorElement(e);
  }
  /**
   * insert text into editor
   * @param input
   * @returns
   */
  _insertText(e) {
    if (!e)
      return;
    const n = window.getSelection(), i = n == null ? void 0 : n.rangeCount;
    if (!i)
      return this.insert(e, !0);
    n.deleteFromDocument(), n.getRangeAt(0).insertNode(Q(e)), this.setCursorElement(n.getRangeAt(i - 1).endContainer), n.collapseToEnd();
  }
  /**
   * 验证编辑器的子元素是否为允许使用的元素，并检查其最后一段是否为空行，非空行则插入。
   * Verify that the editor's child element is an allowed elements, and check if it's last child is a blank line, if not, insert a new blank line
   * @private
   */
  _verifyChild() {
    const e = this.getCursorElement(!0), n = this.options.childNodeName;
    let i, s, o = !1;
    const l = this.$editor.childNodes;
    for (let a = 0; a < l.length; a++) {
      if (i = l[a], o = i === e, i.nodeType === Node.ELEMENT_NODE && N(i)) {
        if (this.allowedNodeNames.includes(i.nodeName))
          continue;
        s = x(i, n);
      } else
        s = h(n, {}, i.cloneNode(!0)), this.$editor.replaceChild(s, i);
      o && s && this.setCursorElement(s), s = null;
    }
    w(this.$editor.lastElementChild) || this.$editor.append(h(n, {}, "<br>"));
  }
  /**
   * @method changeNodeName(nodeName)
   * 修改光标所在元素的标签
   * Replace the tag of the element under the cursor
   * @param nodeName? `string` allowed element names, `UL`, `SECTION` etc. If `undefined`, use the default `options.childNodeName`.
   * @return `boolean`
   */
  changeNodeName(e) {
    if (e = (e || this.options.childNodeName).toUpperCase(), !this.allowedNodeNames.includes(e))
      return !1;
    const n = this.getCursorElement(), i = x(n, e);
    return i ? (this.setCursorElement(i), this._dispatchChange(), !0) : !1;
  }
  /**
   * @method changeStyles(styles, value)
   * 修改光标所在元素的样式
   *  Change the style of the element where the cursor is located
   * @param styles? `CSSProperties | string` When it's `undefined` or null, all styles will be removed.
   * @param value? `any`
   */
  changeStyles(e, n) {
    const i = this.getCursorElement(!0);
    if (i) {
      const s = S(i);
      if (e) {
        const o = typeof e == "string" ? { [e]: n } : e;
        i.setAttribute("style", g(s, o));
      } else {
        if (!Object.keys(s).length)
          return;
        i.removeAttribute("style");
      }
      this._dispatchChange();
    }
  }
  /**
   * 分派事件
   */
  _dispatchChange() {
    this.$editor.dispatchEvent(new InputEvent("input"));
  }
  /**
   * @method getStyles()
   * 获取光标所在的元素的`style`对象
   * Get the `style` object of the element where the cursor is located
   * @return `CSSProperties`
   */
  getStyles() {
    return S(this.getCursorElement());
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
  /**
   * @method getCursorElement(isOnlyEditorChild)
   * 获取光标所在的元素
   * Get the element where the cursor is located
   * @param isOnlyEditorChild? `boolean` Must be a child element of editor `HTMLElement`. For example: when it is `false`, the `li` element is returned in `ul/ol`, and when it is `true`, the `ul/ol` element is returned.
   * @return `HTMLElement`
   */
  getCursorElement(e = !1) {
    return te(this._cursorElement, this.$editor, e);
  }
  /**
   * @method destroy()
   * 销毁事件
   * destroy events
   */
  destroy() {
    this.$editor.removeEventListener("focus", this._eventHandler), this.$editor.removeEventListener("blur", this._eventHandler), this.$editor.removeEventListener("input", this._eventHandler), this.$editor.removeEventListener("paste", this._pasteHandler), this.removeAllListeners();
  }
}
export {
  k as ALLOWED_NODE_NAMES,
  ie as Editor
};
