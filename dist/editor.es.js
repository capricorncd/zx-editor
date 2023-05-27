/*!
 * @sp-editor/editor version 1.0.0
 * Author: Capricorncd
 * Released under the MIT License
 * Repository: https://github.com/capricorncd/zx-editor
 * Copyright © 2018-present, Capricorncd/ Xing Zhong.
 */
var k = Object.defineProperty;
var U = (e, n, t) => n in e ? k(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t;
var h = (e, n, t) => (U(e, typeof n != "symbol" ? n + "" : n, t), t);
class R {
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
  on(n, t) {
    return !n || !t || typeof t != "function" ? this : (this._events[n] || (this._events[n] = []), this._events[n].push(t), this);
  }
  /**
   * @method once(eventName, fn)
   * `once` add a one-time listener.
   * @param eventName `string` custom event name.
   * @param fn `Function` callback function.
   * @returns `EventEmitter`
   */
  once(n, t) {
    const r = (...s) => {
      t.apply(this, s), this.off(n, r);
    };
    return this.on(n, r);
  }
  /**
   * @method emit(eventName, arg1, arg2, ..., argN)
   * `emit` is used to trigger an event.
   * @param eventName `string`
   * @param args `any`
   * @returns `EventEmitter`
   */
  emit(n, ...t) {
    const r = this._events[n];
    if (!r)
      return this;
    for (let s = 0; s < r.length; s++)
      try {
        r[s].apply(this, t);
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
  off(n, t) {
    if (!this._events[n])
      return this;
    const r = this._events[n];
    if (typeof t == "function") {
      const s = r.findIndex((i) => i === t);
      s >= 0 && r.splice(s, 1);
    } else
      this._events[n].length = 0;
    return this._removeEmpty(n), this;
  }
  /**
   * _removeEmpty(eventName)
   * remove empty event list
   * @param eventName `string`
   * @private
   * @returns `void`
   */
  _removeEmpty(n) {
    this._events[n].length || delete this._events[n];
  }
  /**
   * @method destroyEventEmitter()
   * remove all listeners for an event.
   * @returns `void`
   */
  removeAllListeners() {
    Object.keys(this._events).forEach((n) => this.off(n));
  }
}
/*!
 * zx-sml version 0.7.5
 * Author: Capricorncd <capricorncd@qq.com>
 * Repository: https://github.com/capricorncd/zx-sml
 * Released on: 2023-05-17 20:41:58 (GMT+0900)
 */
var j = Object.defineProperty, H = Object.getOwnPropertySymbols, V = Object.prototype.hasOwnProperty, F = Object.prototype.propertyIsEnumerable, $ = (e, n, t) => n in e ? j(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, O = (e, n) => {
  for (var t in n || (n = {}))
    V.call(n, t) && $(e, t, n[t]);
  if (H)
    for (var t of H(n))
      F.call(n, t) && $(e, t, n[t]);
  return e;
};
function K(e) {
  return Array.isArray(e);
}
function x(e) {
  return typeof e == "object" && e !== null && !K(e);
}
function A(e = "", n = "-") {
  return e.replace(/[A-Z]/g, (t, r) => `${r > 0 ? n : ""}${t.toLowerCase()}`);
}
function M(e = "", n = !1) {
  const t = e.replace(/[-_\s](\w)/g, (r, s) => s.toUpperCase());
  return n ? t.replace(/^\w/, (r) => r.toUpperCase()) : t;
}
function p(e, n = 0) {
  return Array.prototype.slice.call(e, n);
}
function B(e = {}, n = !1) {
  const t = n ? M : A, r = {};
  for (const [s, i] of Object.entries(e))
    r[t(s)] = x(i) ? B(i, n) : i;
  return r;
}
function q(e, n = document) {
  return e ? e instanceof HTMLElement ? e : n.querySelector(e) : null;
}
function f(e, n = {}, t) {
  const r = document.createElement(e);
  for (const [s, i] of Object.entries(n))
    r.setAttribute(A(s), s === "style" && x(i) ? g(i) : String(i));
  return t && (Array.isArray(t) || (t = [t]), t.forEach((s) => {
    if (typeof s == "string") {
      const i = f("div");
      i.innerHTML = s, r.append(...i.childNodes);
    } else
      r.append(s);
  })), r;
}
function g(...e) {
  const n = e.reduce((r, s) => O(O({}, r), B(s)), {}), t = [];
  for (const [r, s] of Object.entries(n))
    s === "" || typeof s > "u" || s === null || t.push(`${r}:${s}`);
  return t.join(";");
}
const b = (e, n = "style") => e ? (e.getAttribute(n) || "").split(/\s?;\s?/).reduce((r, s) => {
  const [i, o] = s.split(/\s?:\s?/);
  return i && (r[M(i)] = o), r;
}, {}) : {}, G = (e) => document.createTextNode(e), J = "sp-editor__editor", I = "SECTION", Q = "BR", P = [I, "H1", "H2", "H3", "H4", "H5", "BLOCKQUOTE", "UL", "OL"];
function m(e, n, t) {
  return e.replace(
    RegExp("(^<" + n + ")|(" + n + ">$)", "gi"),
    (r) => r.toUpperCase().replace(n, t.toLowerCase())
  );
}
function W(e) {
  return e.replace(/<li[^>]*>(.+)<\/li>/gi, "$1");
}
function E(e) {
  const n = typeof e == "string" ? e : e.nodeName;
  return /^UL|OL$/i.test(n);
}
function X(e) {
  if (!e)
    return !1;
  const n = p(e.childNodes);
  return n.length === 1 && n[0].nodeName === "BR";
}
function S(e) {
  return e instanceof Element && (e = e.outerHTML), /^<(\w+)[^>]*>.*<\/\1>$/.test(e);
}
function Z(e) {
  return ["PICTURE", "VIDEO", "AUDIO", "CANVAS"].includes(e.nodeName);
}
function z(e) {
  return ["IMG"].includes(e.nodeName) || Z(e);
}
function D(e) {
  if (z(e))
    return !0;
  for (let n = 0; n < e.children.length; n++)
    if (D(e.children[n]))
      return !0;
  return !1;
}
const Y = (e, n) => {
  const t = {
    minHeight: e.minHeight,
    // placeholder
    "--placeholder": JSON.stringify(e.placeholder),
    "--placeholder-color": e.placeholderColor,
    "--line-height": e.lineHeight,
    // paragraphTailSpacing
    "--paragraph-spacing": e.paragraphTailSpacing,
    "--padding-bottom": `calc(${e.paddingBottom || "0px"} + env(safe-area-inset-bottom))`,
    // 用户自定义样式优先
    ...e.styles
  };
  e.caretColor && (t.caretColor = e.caretColor), e.textColor && (t.color = e.textColor);
  const r = {
    class: `${J} is-empty`,
    style: g(t)
  };
  return e.editable && (r.contenteditable = "true"), f("div", r, n);
}, ee = (e, n) => {
  var l, a, _, N, C, v, y, L, T;
  if (!e)
    return null;
  const t = e.nodeName, r = n.toUpperCase();
  if (t === r)
    return null;
  const s = f(n), i = e.parentElement;
  let o;
  if (t === "LI" && E(i)) {
    if (s.innerHTML = m(e.outerHTML, t, r), o = s.firstChild, i.childElementCount > 1)
      if (i.firstElementChild === e)
        (l = i.parentElement) == null || l.insertBefore(o, i);
      else if (i.lastElementChild === e) {
        const c = (a = i.parentElement) == null ? void 0 : a.nextElementSibling;
        c ? (_ = c.parentElement) == null || _.insertBefore(o, c) : (N = i.parentElement) == null || N.append(o);
      } else {
        const c = p(i.children), d = f(i.nodeName);
        let u = c.shift();
        for (; u && u !== e; )
          d.append(u), u = c.shift();
        (C = i.parentElement) == null || C.insertBefore(d, i), (v = i.parentElement) == null || v.insertBefore(o, i), i.removeChild(e);
      }
    else
      (y = i.parentElement) == null || y.insertBefore(o, i), (L = i.parentElement) == null || L.removeChild(i);
    return o;
  }
  if (/UL|OL/.test(r)) {
    const c = e.previousElementSibling, d = e.nextElementSibling;
    if (c && E(c)) {
      if (s.innerHTML = m(e.outerHTML, t, "li"), o = s.firstChild, c.append(o), i == null || i.removeChild(e), d && d.nodeName === c.nodeName) {
        const u = p(d.children);
        c.append(...u), (T = d.parentElement) == null || T.removeChild(d);
      }
    } else
      d && E(d) ? (s.innerHTML = m(e.outerHTML, t, "li"), o = s.firstChild, d.insertBefore(o, d.firstElementChild), i == null || i.removeChild(e)) : (o = s, s.innerHTML = m(e.outerHTML, t, "li"), i == null || i.replaceChild(o, e));
  } else
    s.innerHTML = W(m(e.outerHTML, t, r)), o = s.firstChild, i == null || i.replaceChild(o, e);
  return o;
}, w = (e) => {
  var n;
  !((n = e.innerText) != null && n.trim()) && !D(e) ? e.classList.add("is-empty") : e.classList.remove("is-empty");
};
function te(e, n, t = !1) {
  var r;
  for (; e && n !== e; ) {
    if (!t && e.nodeName === "LI" && ((r = e.parentElement) == null ? void 0 : r.parentElement) === n || e.parentElement === n)
      return e;
    e = e.parentElement;
  }
  return n.lastElementChild;
}
const ne = {
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
  childNodeName: I,
  allowedNodeNames: P,
  // paragraph tail spacing, default 10px
  paragraphTailSpacing: "10px",
  caretColor: "",
  textColor: "#333333",
  // 自定义粘贴处理函数
  customPasteHandler: void 0,
  insertTextToNewParagraph: !1
};
class ie extends R {
  constructor(t) {
    super();
    /**
     * @property version
     * 获取版本号
     * @returns `string`
     */
    h(this, "version");
    // 参数
    h(this, "options");
    // 编辑器内容区域HTML元素
    h(this, "$editor");
    // current node
    h(this, "_cursorElement", null);
    // 内容元素事件处理函数
    h(this, "_eventHandler");
    // 内容中允许使用的元素标签
    h(this, "allowedNodeNames");
    h(this, "blankLine");
    h(this, "_pasteHandler");
    const r = typeof t.container == "string" ? q(t.container) : t.container;
    if (!r)
      throw new Error(`Can't found '${t.container}' Node in document!`);
    this.version = "1.0.0", this.options = { ...ne, ...t }, this.allowedNodeNames = (this.options.allowedNodeNames || P).map((i) => i.toUpperCase());
    const s = this.options.childNodeName.toUpperCase();
    this.options.childNodeName = s, this.blankLine = `<${s}><br></${s}>`, this.allowedNodeNames.includes(s) || this.allowedNodeNames.push(s), this.$editor = Y(this.options, this.blankLine), r.append(this.$editor), this._eventHandler = (i) => {
      const o = i.type;
      if (o === "blur" || o === "click") {
        const l = window.getSelection(), a = l && l.rangeCount ? l.getRangeAt(l.rangeCount - 1).endContainer : i.currentTarget;
        this.setCursorElement(a);
      }
      this.emit(o === "input" ? "change" : o, i), w(this.$editor);
    }, this._pasteHandler = (i) => {
      var l;
      if (typeof this.options.customPasteHandler == "function")
        return this.options.customPasteHandler(i);
      i.preventDefault();
      const o = (l = i.clipboardData) == null ? void 0 : l.getData("text");
      this._insertText(o);
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
  use(t, r) {
    typeof t.install == "function" && t.install(this, r);
  }
  /**
   * @method setHtml(html)
   * 设置编辑器内容，会覆盖之前内容
   * set html to the content element
   * @param html `string`
   */
  setHtml(t) {
    this.$editor.innerHTML = this.blankLine, this.insert(t, !0), w(this.$editor);
  }
  /**
   * @method getHtml(retainLastBlankLines)
   * 获取编辑器中的HTML代码，会自动去除结尾处的空行。
   * get html string from content element.
   * @param retainLastBlankLines? `boolean` Retain last blank lines, If `true` the last `<section><br></section>` not will be removed.
   * @return `string`
   */
  getHtml(t) {
    const r = this.$editor.innerHTML;
    if (t)
      return r;
    const s = this.options.childNodeName;
    return r.replace(new RegExp(`(<${s}><br\\s?\\/?><\\/${s}>)+$`, "i"), "");
  }
  /**
   * @method insert(input, toNewParagraph)
   * 向编辑器中插入内容/HTML代码/元素等
   * insert html or element to content element
   * @param input `string | HTMLElement`
   * @param toNewParagraph? `boolean` Insert `text` in a new paragraph, only `textNode` is valid. Defaults to `false`.
   */
  insert(t, r = !1) {
    const { childNodeName: s, insertTextToNewParagraph: i } = this.options;
    if (t instanceof HTMLElement)
      this._insertEl(t);
    else {
      const o = f("div", {}, t), l = p(o.childNodes);
      if (!r && !i && l.every((a) => a.nodeType === Node.TEXT_NODE))
        return this._insertText(t);
      l.forEach((a) => {
        a.nodeType === Node.ELEMENT_NODE ? a.nodeName === Q ? this._insertEl(f(s, {}, "<br/>")) : this._insertEl(a) : a.textContent && this._insertEl(f(s, {}, a.textContent));
      });
    }
    this._dispatchChange();
  }
  /**
   * insert element to content element
   * @param input
   * @private
   */
  _insertEl(t) {
    const r = this.getCursorElement();
    X(r) ? S(t.outerHTML) ? this.$editor.insertBefore(t, r) : r === this.$editor.children[this.$editor.children.length - 1] ? this.$editor.insertBefore(f(this.options.childNodeName, {}, t), r) : (r.innerHTML = "", r.append(t)) : (S(t.outerHTML) || (t = f(this.options.childNodeName, {}, t)), r.nextElementSibling ? this.$editor.insertBefore(t, r.nextElementSibling) : this.$editor.append(t)), this.setCursorElement(t);
  }
  /**
   * insert text into editor
   * @param input
   * @returns
   */
  _insertText(t) {
    if (!t)
      return;
    const r = window.getSelection(), s = r == null ? void 0 : r.rangeCount;
    if (!s)
      return this.insert(t, !0);
    r.deleteFromDocument(), r.getRangeAt(0).insertNode(G(t)), this.setCursorElement(r.getRangeAt(s - 1).endContainer), r.collapseToEnd(), this._dispatchChange();
  }
  /**
   * 验证编辑器的子元素是否为允许使用的元素，并检查其最后一段是否为空行，非空行则插入。
   * Verify that the editor's child element is an allowed elements, and check if it's last child is a blank line, if not, insert a new blank line
   * @private
   */
  // private _verifyChild(): void {
  //   const currentChild = this.getCursorElement(true)
  //   const childNodeName = this.options.childNodeName!
  //   let tempNode: Node,
  //     isCurrentChild = false
  //   let count = 0
  //   while (count < this.$editor.childNodes.length) {
  //     tempNode = this.$editor.childNodes[count++]
  //     // Element
  //     if (tempNode.nodeType === Node.ELEMENT_NODE) {
  //       if (isPairedTags(tempNode as Element)) {
  //         if (this.allowedNodeNames.includes(tempNode.nodeName)) continue
  //         isCurrentChild = currentChild === tempNode
  //         if (!isSpecialPairedTags(tempNode as Element)) {
  //           // 将不合法标签元素替换为默认的元素
  //           const newChild = changeNodeName(tempNode as HTMLElement, childNodeName)
  //           if (isCurrentChild && newChild) {
  //             this.setCursorElement(newChild)
  //           }
  //           continue
  //         }
  //       }
  //       ;(tempNode as Element).replaceWith(createElement(childNodeName, {}, tempNode.cloneNode(true)))
  //     }
  //     // Node
  //     else {
  //       const newChild = createElement(childNodeName, {}, tempNode.cloneNode(true))
  //       this.$editor.replaceChild(newChild, tempNode)
  //     }
  //   }
  //   // check if it's last child is a blank line, if not, insert a new blank line
  //   if (!isOnlyBrInChildren(this.$editor.lastElementChild)) {
  //     this.$editor.appendChild(createElement(childNodeName, {}, '<br>'))
  //   }
  // }
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
    const r = this.getCursorElement(), s = ee(r, t);
    return s ? (this.setCursorElement(s), this._dispatchChange(), !0) : !1;
  }
  /**
   * @method changeStyles(styles, value)
   * 修改光标所在元素的样式
   *  Change the style of the element where the cursor is located
   * @param styles? `CSSProperties | string` When it's `undefined` or null, all styles will be removed.
   * @param value? `any`
   */
  changeStyles(t, r) {
    const s = this.getCursorElement(!0);
    if (s) {
      const i = b(s);
      if (t) {
        const o = typeof t == "string" ? { [t]: r } : t;
        s.setAttribute("style", g(i, o));
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
    return b(this.getCursorElement());
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
  /**
   * @method getCursorElement(isOnlyEditorChild)
   * 获取光标所在的元素
   * Get the element where the cursor is located
   * @param isOnlyEditorChild? `boolean` Must be a child element of editor `HTMLElement`. For example: when it is `false`, the `li` element is returned in `ul/ol`, and when it is `true`, the `ul/ol` element is returned.
   * @return `HTMLElement`
   */
  getCursorElement(t = !1) {
    return te(this._cursorElement, this.$editor, t);
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
  P as ALLOWED_NODE_NAMES,
  ie as Editor
};
