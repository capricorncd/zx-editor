/*!
 * @sp-editor/editor version 1.0.0
 * Author: Capricorncd
 * Released under the MIT License
 * Repository: https://github.com/capricorncd/zx-editor
 * Copyright © 2018-present, Capricorncd/ Xing Zhong.
 */
var W = Object.defineProperty;
var V = (e, r, t) => r in e ? W(e, r, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[r] = t;
var f = (e, r, t) => (V(e, typeof r != "symbol" ? r + "" : r, t), t);
class F {
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
  on(r, t) {
    return !r || !t || typeof t != "function" ? this : (this._events[r] || (this._events[r] = []), this._events[r].push(t), this);
  }
  /**
   * @method once(eventName, fn)
   * `once` add a one-time listener.
   * @param eventName `string` custom event name.
   * @param fn `Function` callback function.
   * @returns `EventEmitter`
   */
  once(r, t) {
    const n = (...s) => {
      t.apply(this, s), this.off(r, n);
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
  emit(r, ...t) {
    const n = this._events[r];
    if (!n)
      return this;
    for (let s = 0; s < n.length; s++)
      try {
        n[s].apply(this, t);
      } catch (i) {
        this.emit("error", i, "emit");
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
  off(r, t) {
    if (!this._events[r])
      return this;
    const n = this._events[r];
    if (typeof t == "function") {
      const s = n.findIndex((i) => i === t);
      s >= 0 && n.splice(s, 1);
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
var K = Object.defineProperty, w = Object.getOwnPropertySymbols, q = Object.prototype.hasOwnProperty, G = Object.prototype.propertyIsEnumerable, O = (e, r, t) => r in e ? K(e, r, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[r] = t, b = (e, r) => {
  for (var t in r || (r = {}))
    q.call(r, t) && O(e, t, r[t]);
  if (w)
    for (var t of w(r))
      G.call(r, t) && O(e, t, r[t]);
  return e;
};
function J(e) {
  return Array.isArray(e);
}
function P(e) {
  return typeof e == "object" && e !== null && !J(e);
}
function R(e = "", r = "-") {
  return e.replace(/[A-Z]/g, (t, n) => `${n > 0 ? r : ""}${t.toLowerCase()}`);
}
function I(e = "", r = !1) {
  const t = e.replace(/[-_\s](\w)/g, (n, s) => s.toUpperCase());
  return r ? t.replace(/^\w/, (n) => n.toUpperCase()) : t;
}
function p(e, r = 0) {
  return Array.prototype.slice.call(e, r);
}
function B(e = {}, r = !1) {
  const t = r ? I : R, n = {};
  for (const [s, i] of Object.entries(e))
    n[t(s)] = P(i) ? B(i, r) : i;
  return n;
}
function Q(e, r = document) {
  return e ? e instanceof HTMLElement ? e : r.querySelector(e) : null;
}
function h(e, r = {}, t) {
  const n = document.createElement(e);
  for (const [s, i] of Object.entries(r))
    n.setAttribute(R(s), s === "style" && P(i) ? v(i) : String(i));
  return t && (Array.isArray(t) || (t = [t]), t.forEach((s) => {
    if (typeof s == "string") {
      const i = h("div");
      i.innerHTML = s, n.append(...i.childNodes);
    } else
      n.append(s);
  })), n;
}
function v(...e) {
  const r = e.reduce((n, s) => b(b({}, n), B(s)), {}), t = [];
  for (const [n, s] of Object.entries(r))
    s === "" || typeof s > "u" || s === null || t.push(`${n}:${s}`);
  return t.join(";");
}
const A = (e, r = "style") => e ? (e.getAttribute(r) || "").split(/\s?;\s?/).reduce((n, s) => {
  const [i, o] = s.split(/\s?:\s?/);
  return i && (n[I(i)] = o), n;
}, {}) : {}, X = (e) => document.createTextNode(e), Y = "sp-editor__editor", _ = "is-empty", D = "SECTION", Z = "BR", U = [D, "H1", "H2", "H3", "H4", "H5", "BLOCKQUOTE", "UL", "OL"];
function m(e, r, t) {
  return e.replace(
    new RegExp("(^<" + r + ")|(" + r + ">$)", "gi"),
    (n) => n.replace(new RegExp(r, "i"), t.toLowerCase())
  );
}
function z(e) {
  return e.replace(/<li[^>]*>(.+)<\/li>/gi, "$1");
}
function g(e) {
  const r = typeof e == "string" ? e : e.nodeName;
  return /^UL|OL$/i.test(r);
}
function x(e) {
  if (!e)
    return !1;
  const r = p(e.childNodes);
  return r.length > 0 && r.every((t) => t.nodeName === "BR");
}
function E(e) {
  return typeof e != "string" && e.nodeName && (e = e.outerHTML), typeof e == "string" && /^<(\w+)[^>]*>.*<\/\1>$/.test(e.replace(/\n/g, ""));
}
function k(e) {
  return ["PICTURE", "VIDEO", "AUDIO", "CANVAS"].includes(e.nodeName);
}
function ee(e) {
  return ["IMG"].includes(e.nodeName) || k(e);
}
function j(e) {
  if (ee(e))
    return !0;
  for (let r = 0; r < e.children.length; r++)
    if (j(e.children[r]))
      return !0;
  return !1;
}
const te = (e, r) => {
  const t = {
    minHeight: e.minHeight,
    // placeholder
    "--placeholder": JSON.stringify(e.placeholder),
    "--placeholder-color": e.placeholderColor,
    "--line-height": e.lineHeight,
    // paragraphTailSpacing
    "--paragraph-spacing": e.paragraphTailSpacing,
    "--padding-bottom": e.paddingBottom,
    // 用户自定义样式优先
    ...e.styles
  };
  e.caretColor && (t.caretColor = e.caretColor), e.textColor && (t.color = e.textColor);
  const n = {
    class: `${Y} ${_}`,
    style: v(t)
  };
  return e.editable && (n.contenteditable = "true"), h("div", n, r);
}, M = (e, r) => {
  var l, a, C, y, L, T, $, H, S;
  if (!e)
    return null;
  const t = e.nodeName, n = r.toUpperCase();
  if (t === n)
    return null;
  const s = h(r), i = e.parentElement;
  let o;
  if (t === "LI" && g(i)) {
    if (s.innerHTML = m(e.outerHTML, t, n), o = s.firstChild, i.childElementCount > 1)
      if (i.firstElementChild === e)
        (l = i.parentElement) == null || l.insertBefore(o, i);
      else if (i.lastElementChild === e) {
        const d = (a = i.parentElement) == null ? void 0 : a.nextElementSibling;
        d ? (C = d.parentElement) == null || C.insertBefore(o, d) : (y = i.parentElement) == null || y.append(o);
      } else {
        const d = p(i.children), c = h(i.nodeName);
        let u = d.shift();
        for (; u && u !== e; )
          c.append(u), u = d.shift();
        (L = i.parentElement) == null || L.insertBefore(c, i), (T = i.parentElement) == null || T.insertBefore(o, i), i.removeChild(e);
      }
    else
      ($ = i.parentElement) == null || $.insertBefore(o, i), (H = i.parentElement) == null || H.removeChild(i);
    return o;
  }
  if (/UL|OL/.test(n)) {
    const d = e.previousElementSibling, c = e.nextElementSibling;
    if (d && g(d)) {
      if (s.innerHTML = m(e.outerHTML, t, "li"), o = s.firstChild, d.append(o), i == null || i.removeChild(e), c && c.nodeName === d.nodeName) {
        const u = p(c.children);
        d.append(...u), (S = c.parentElement) == null || S.removeChild(c);
      }
    } else
      c && g(c) ? (s.innerHTML = m(e.outerHTML, t, "li"), o = s.firstChild, c.insertBefore(o, c.firstElementChild), i == null || i.removeChild(e)) : (o = s, s.innerHTML = m(e.outerHTML, t, "li"), i == null || i.replaceChild(o, e));
  } else
    s.innerHTML = z(m(e.outerHTML, t, n)), o = s.firstChild, i == null || i.replaceChild(o, e);
  return o;
}, N = (e) => {
  var r;
  !((r = e.innerText) != null && r.trim()) && !j(e) ? e.classList.add(_) : e.classList.remove(_);
};
function ne(e, r, t = !1) {
  var n;
  for (; e && r !== e; ) {
    if (!t && e.nodeName === "LI" && ((n = e.parentElement) == null ? void 0 : n.parentElement) === r || e.parentElement === r)
      return e;
    e = e.parentElement;
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
  childNodeName: D,
  allowedNodeNames: U,
  // paragraph tail spacing, default 10px
  paragraphTailSpacing: "10px",
  caretColor: "",
  textColor: "#333333",
  // 自定义粘贴处理函数
  customPasteHandler: void 0,
  insertTextToNewParagraph: !1
};
class se extends F {
  constructor(t) {
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
    // 内容元素事件处理函数
    f(this, "_eventHandler");
    // 内容中允许使用的元素标签
    f(this, "allowedNodeNames");
    f(this, "blankLine");
    f(this, "range");
    f(this, "_pasteHandler");
    const n = typeof t.container == "string" ? Q(t.container) : t.container;
    if (!n)
      throw new Error(`Can't found '${t.container}' Node in document!`);
    this.version = "1.0.0", this.options = { ...re, ...t }, this.allowedNodeNames = (this.options.allowedNodeNames || U).map((i) => i.toUpperCase());
    const s = this.options.childNodeName.toUpperCase();
    this.options.childNodeName = s, this.blankLine = `<${s}><br></${s}>`, this.allowedNodeNames.includes(s) || this.allowedNodeNames.push(s), this.$editor = te(this.options, this.blankLine), n.append(this.$editor), this.range = new Range(), this.range.setStart(this.$editor.children[0], 0), this._eventHandler = (i) => {
      var l;
      const o = i.type;
      if (o === "click") {
        const a = (l = window.getSelection()) == null ? void 0 : l.getRangeAt(0);
        a && (this.range = a);
      } else
        o === "blur" && this._verifyChild();
      this.emit(o === "input" ? "change" : o, i), N(this.$editor);
    }, this._pasteHandler = (i) => {
      var l;
      if (typeof this.options.customPasteHandler == "function")
        return this.options.customPasteHandler(i);
      i.preventDefault();
      const o = (l = i.clipboardData) == null ? void 0 : l.getData("text");
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
  setRangeWithNode(t) {
    const n = new Range();
    return n.setStart(t === this.$editor ? this.$editor.childNodes[this.$editor.childNodes.length - 1] : t, 0), this.range = n, n;
  }
  /**
   * @method use(plugin, parentElement)
   * extension, 扩展插件
   * @param plugin `EditorPlugin`
   * @param parentElement? `HTMLElement`
   */
  use(t, n) {
    typeof t.install == "function" && t.install(this, n);
  }
  /**
   * @method setHtml(html)
   * 设置编辑器内容，会覆盖之前内容
   * set html to the content element
   * @param html `string`
   */
  setHtml(t) {
    this.$editor.innerHTML = this.blankLine, this.insert(t, !0), N(this.$editor);
  }
  /**
   * @method getHtml(retainLastBlankLines)
   * 获取编辑器中的HTML代码，会自动去除结尾处的空行。
   * get html string from content element.
   * @param retainLastBlankLines? `boolean` Retain last blank lines, If `true` the last `<section><br></section>` not will be removed.
   * @return `string`
   */
  getHtml(t) {
    const n = this.$editor.innerHTML;
    if (t)
      return n;
    const s = this.options.childNodeName;
    return n.replace(new RegExp(`(<${s}><br\\s?\\/?><\\/${s}>)+$`, "i"), "");
  }
  /**
   * @method insert(input, toNewParagraph)
   * 向编辑器中插入内容/HTML代码/元素等
   * insert html or element to content element
   * @param input `string | HTMLElement`
   * @param toNewParagraph? `boolean` Insert `text` in a new paragraph, only `textNode` is valid. Defaults to `false`.
   */
  insert(t, n = !1) {
    if (!t)
      return;
    const { childNodeName: s, insertTextToNewParagraph: i } = this.options;
    if (t instanceof HTMLElement)
      this._insertEl(t);
    else {
      const o = h("div", {}, t), l = p(o.childNodes);
      if (!n && !i && l.every((a) => a.nodeType === Node.TEXT_NODE))
        return this._insertText(t);
      l.forEach((a) => {
        a.nodeType === Node.ELEMENT_NODE ? a.nodeName === Z ? this._insertEl(h(s, {}, "<br/>")) : this._insertEl(a) : a.textContent && this._insertEl(h(s, {}, a.textContent));
      });
    }
    this._verifyChild(), this._dispatchChange(), N(this.$editor);
  }
  /**
   * insert element to content element
   * @param input
   * @private
   */
  _insertEl(t) {
    const n = this.getCursorElement();
    x(n) ? E(t.outerHTML) ? this.$editor.insertBefore(t, n) : n === this.$editor.children[this.$editor.children.length - 1] ? this.$editor.insertBefore(h(this.options.childNodeName, {}, t), n) : (n.innerHTML = "", n.append(t)) : (E(t.outerHTML) || (t = h(this.options.childNodeName, {}, t)), n.nextElementSibling ? this.$editor.insertBefore(t, n.nextElementSibling) : this.$editor.append(t)), this.setRangeWithNode(t);
  }
  /**
   * insert text into editor
   * @param input
   * @returns
   */
  _insertText(t) {
    if (!t)
      return;
    const n = window.getSelection();
    if (!(n == null ? void 0 : n.rangeCount))
      return this.insert(t, !0);
    n.deleteFromDocument();
    const i = X(t);
    n.getRangeAt(0).insertNode(i), n.setPosition(i, t.length), this.range = n.getRangeAt(0), n.collapseToEnd();
  }
  /**
   * 验证编辑器的子元素是否为允许使用的元素，并检查其最后一段是否为空行，非空行则插入。
   * Verify that the editor's child element is an allowed elements, and check if it's last child is a blank line, if not, insert a new blank line
   * @private
   */
  _verifyChild() {
    const t = this.options.childNodeName;
    let n, s, i = !1;
    const o = this.$editor.childNodes;
    for (let l = 0; l < o.length; l++)
      s = null, n = o[l], i = n === this.range.commonAncestorContainer, n.nodeType === Node.ELEMENT_NODE && E(n) && !k(n) ? this.allowedNodeNames.includes(n.nodeName) || (s = M(n, t)) : (s = h(t, {}, n.cloneNode(!0)), this.$editor.replaceChild(s, n)), i && s && this.setRangeWithNode(s);
    x(this.$editor.lastElementChild) || this.$editor.append(h(t, {}, "<br>"));
  }
  /**
   * @method changeNodeName(nodeName)
   * 修改光标所在元素的标签
   * Replace the tag of the element under the cursor
   * @param nodeName? `string` allowed element names, `UL`, `SECTION` etc. If `undefined`, use the default `options.childNodeName`.
   * @return `boolean`
   */
  changeNodeName(t) {
    if (t = (t || this.options.childNodeName).toUpperCase(), !this.allowedNodeNames.includes(t))
      return !1;
    const n = this.getCursorElement(), s = M(n, t);
    return s ? (this.setRangeWithNode(s), this._dispatchChange(), !0) : !1;
  }
  /**
   * @method changeStyles(styles, value)
   * 修改光标所在元素的样式
   *  Change the style of the element where the cursor is located
   * @param styles? `CSSProperties | string` When it's `undefined` or null, all styles will be removed.
   * @param value? `any`
   */
  changeStyles(t, n) {
    const s = this.getCursorElement(!0);
    if (s) {
      const i = A(s);
      if (t) {
        const o = typeof t == "string" ? { [t]: n } : t;
        s.setAttribute("style", v(i, o));
      } else {
        if (!Object.keys(i).length)
          return;
        s.removeAttribute("style");
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
    return A(this.getCursorElement());
  }
  /**
   * @method getCursorElement(isOnlyEditorChild)
   * 获取光标所在的元素
   * Get the element where the cursor is located
   * @param isOnlyEditorChild? `boolean` Must be a child element of editor `HTMLElement`. For example: when it is `false`, the `li` element is returned in `ul/ol`, and when it is `true`, the `ul/ol` element is returned.
   * @return `HTMLElement`
   */
  getCursorElement(t = !1) {
    return ne(this.range.commonAncestorContainer, this.$editor, t);
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
  U as ALLOWED_NODE_NAMES,
  se as Editor
};
