/*!
 * sp-editor version 1.1.0
 * Author: capricorncd
 * Released under the MIT License
 * Repository: https://github.com/capricorncd/zx-editor
 * Copyright © 2018-present, capricorncd/ Xing Zhong.
 */
var fe = Object.defineProperty;
var ge = (t, e, i) => e in t ? fe(t, e, { enumerable: !0, configurable: !0, writable: !0, value: i }) : t[e] = i;
var h = (t, e, i) => (ge(t, typeof e != "symbol" ? e + "" : e, i), i);
class pe {
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
  on(e, i) {
    return !e || !i || typeof i != "function" ? this : (this._events[e] || (this._events[e] = []), this._events[e].push(i), this);
  }
  /**
   * @method once(eventName, fn)
   * `once` add a one-time listener.
   * @param eventName `string` custom event name.
   * @param fn `Function` callback function.
   * @returns `EventEmitter`
   */
  once(e, i) {
    const s = (...n) => {
      i.apply(this, n), this.off(e, s);
    };
    return this.on(e, s);
  }
  /**
   * @method emit(eventName, arg1, arg2, ..., argN)
   * `emit` is used to trigger an event.
   * @param eventName `string`
   * @param args `any`
   * @returns `EventEmitter`
   */
  emit(e, ...i) {
    const s = this._events[e];
    if (!s)
      return this;
    for (let n = 0; n < s.length; n++)
      try {
        s[n].apply(this, i);
      } catch (r) {
        this.emit("error", r, "emit");
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
  off(e, i) {
    if (!this._events[e])
      return this;
    const s = this._events[e];
    if (typeof i == "function") {
      const n = s.findIndex((r) => r === i);
      n >= 0 && s.splice(n, 1);
    } else
      this._events[e].length = 0;
    return this._removeEmpty(e), this;
  }
  /**
   * _removeEmpty(eventName)
   * remove empty event list
   * @param eventName `string`
   * @private
   * @returns `void`
   */
  _removeEmpty(e) {
    this._events[e].length || delete this._events[e];
  }
  /**
   * @method destroyEventEmitter()
   * remove all listeners for an event.
   * @returns `void`
   */
  removeAllListeners() {
    Object.keys(this._events).forEach((e) => this.off(e));
  }
}
/*!
 * zx-sml version 0.7.5
 * Author: Capricorncd <capricorncd@qq.com>
 * Repository: https://github.com/capricorncd/zx-sml
 * Released on: 2023-05-17 20:41:58 (GMT+0900)
 */
var me = Object.defineProperty, I = Object.getOwnPropertySymbols, ye = Object.prototype.hasOwnProperty, we = Object.prototype.propertyIsEnumerable, P = (t, e, i) => e in t ? me(t, e, { enumerable: !0, configurable: !0, writable: !0, value: i }) : t[e] = i, M = (t, e) => {
  for (var i in e || (e = {}))
    ye.call(e, i) && P(t, i, e[i]);
  if (I)
    for (var i of I(e))
      we.call(e, i) && P(t, i, e[i]);
  return t;
};
function Ee(t) {
  return Array.isArray(t);
}
function V(t) {
  return typeof t == "object" && t !== null && !Ee(t);
}
function W(t = "", e = "-") {
  return t.replace(/[A-Z]/g, (i, s) => `${s > 0 ? e : ""}${i.toLowerCase()}`);
}
function q(t = "", e = !1) {
  const i = t.replace(/[-_\s](\w)/g, (s, n) => n.toUpperCase());
  return e ? i.replace(/^\w/, (s) => s.toUpperCase()) : i;
}
function Y(t) {
  return t.replace(/^-?[1-9]\d{0,2}(,\d{3})+/, (e) => e.replace(/,/g, ""));
}
function K(t, e = !1) {
  if (typeof t == "number")
    return t;
  if (typeof t == "string") {
    if (!e && /^(-?\d+(?:\.\d+)?)\D*/.test(Y(t)))
      return K(RegExp.$1, !0);
    const i = Number(t);
    return isNaN(i) ? 0 : i;
  }
  return 0;
}
function _e(t) {
  if (typeof t == "number")
    return [t, ""];
  const e = Y(t).match(/^(-?\d+(?:\.\d+)?)(.*)$/);
  return e ? [K(e[1], !0), e[2]] : [0, ""];
}
function Z(t) {
  return typeof t == "string" ? t : t === null || typeof t > "u" ? "" : Array.isArray(t) ? t.map(Z).join(" ") : typeof t == "object" ? Object.keys(t).filter((e) => t[e]).join(" ") : String(t);
}
function be(...t) {
  return t.map(Z).filter((e) => !!e).join(" ");
}
function v(t, e = 0) {
  return Array.prototype.slice.call(t, e);
}
function J(t = {}, e = !1) {
  const i = e ? q : W, s = {};
  for (const [n, r] of Object.entries(t))
    s[i(n)] = V(r) ? J(r, e) : r;
  return s;
}
function b(t, e = document) {
  return t ? t instanceof HTMLElement ? t : e.querySelector(t) : null;
}
function C(t, e = document) {
  return v(e.querySelectorAll(t));
}
function g(t, e = {}, i) {
  const s = document.createElement(t);
  for (const [n, r] of Object.entries(e))
    s.setAttribute(W(n), n === "style" && V(r) ? A(r) : String(r));
  return i && (Array.isArray(i) || (i = [i]), i.forEach((n) => {
    if (typeof n == "string") {
      const r = g("div");
      r.innerHTML = n, s.append(...r.childNodes);
    } else
      s.append(n);
  })), s;
}
function A(...t) {
  const e = t.reduce((s, n) => M(M({}, s), J(n)), {}), i = [];
  for (const [s, n] of Object.entries(e))
    n === "" || typeof n > "u" || n === null || i.push(`${s}:${n}`);
  return i.join(";");
}
const H = (t, e = "style") => t ? (t.getAttribute(e) || "").split(/\s?;\s?/).reduce((s, n) => {
  const [r, o] = n.split(/\s?:\s?/);
  return r && (s[q(r)] = o), s;
}, {}) : {}, S = (t) => document.createTextNode(t), Q = (t) => {
  if (!t)
    return null;
  if (typeof t == "string")
    return S(t);
  const { tag: e, attrs: i, child: s } = t;
  if (!e && !i && !s)
    return null;
  const n = g(e || "div", i);
  if (Array.isArray(s) && s.length) {
    let r;
    s.forEach((o) => {
      r = Q(o), r && n.appendChild(r);
    });
  } else
    s && typeof s == "string" && n.appendChild(S(s));
  return n;
}, ve = (t, e) => {
  t.classList.add(e);
}, $e = (t, e) => {
  t.classList.remove(e);
}, Ce = "sp-editor__editor", X = "SECTION", Ne = "BR", ee = [X, "H1", "H2", "H3", "H4", "H5", "BLOCKQUOTE", "UL", "OL"];
function $(t, e, i) {
  return t.replace(
    RegExp("(^<" + e + ")|(" + e + ">$)", "gi"),
    (s) => s.toUpperCase().replace(e, i.toLowerCase())
  );
}
function xe(t) {
  return t.replace(/<li[^>]*>(.+)<\/li>/gi, "$1");
}
function L(t) {
  const e = typeof t == "string" ? t : t.nodeName;
  return /^UL|OL$/i.test(e);
}
function Le(t) {
  if (!t)
    return !1;
  const e = v(t.childNodes);
  return e.length === 1 && e[0].nodeName === "BR";
}
function R(t) {
  return t instanceof Element && (t = t.outerHTML), /^<(\w+)[^>]*>.*<\/\1>$/.test(t);
}
function Te(t) {
  return ["PICTURE", "VIDEO", "AUDIO", "CANVAS"].includes(t.nodeName);
}
function He(t) {
  return ["IMG"].includes(t.nodeName) || Te(t);
}
function te(t) {
  if (He(t))
    return !0;
  for (let e = 0; e < t.children.length; e++)
    if (te(t.children[e]))
      return !0;
  return !1;
}
const Se = (t, e) => {
  const i = {
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
  t.caretColor && (i.caretColor = t.caretColor), t.textColor && (i.color = t.textColor);
  const s = {
    class: `${Ce} is-empty`,
    style: A(i)
  };
  return t.editable && (s.contenteditable = "true"), g("div", s, e);
}, Oe = (t, e) => {
  var a, l, E, u, c, w, m, d, p;
  if (!t)
    return null;
  const i = t.nodeName, s = e.toUpperCase();
  if (i === s)
    return null;
  const n = g(e), r = t.parentElement;
  let o;
  if (i === "LI" && L(r)) {
    if (n.innerHTML = $(t.outerHTML, i, s), o = n.firstChild, r.childElementCount > 1)
      if (r.firstElementChild === t)
        (a = r.parentElement) == null || a.insertBefore(o, r);
      else if (r.lastElementChild === t) {
        const f = (l = r.parentElement) == null ? void 0 : l.nextElementSibling;
        f ? (E = f.parentElement) == null || E.insertBefore(o, f) : (u = r.parentElement) == null || u.append(o);
      } else {
        const f = v(r.children), y = g(r.nodeName);
        let _ = f.shift();
        for (; _ && _ !== t; )
          y.append(_), _ = f.shift();
        (c = r.parentElement) == null || c.insertBefore(y, r), (w = r.parentElement) == null || w.insertBefore(o, r), r.removeChild(t);
      }
    else
      (m = r.parentElement) == null || m.insertBefore(o, r), (d = r.parentElement) == null || d.removeChild(r);
    return o;
  }
  if (/UL|OL/.test(s)) {
    const f = t.previousElementSibling, y = t.nextElementSibling;
    if (f && L(f)) {
      if (n.innerHTML = $(t.outerHTML, i, "li"), o = n.firstChild, f.append(o), r == null || r.removeChild(t), y && y.nodeName === f.nodeName) {
        const _ = v(y.children);
        f.append(..._), (p = y.parentElement) == null || p.removeChild(y);
      }
    } else
      y && L(y) ? (n.innerHTML = $(t.outerHTML, i, "li"), o = n.firstChild, y.insertBefore(o, y.firstElementChild), r == null || r.removeChild(t)) : (o = n, n.innerHTML = $(t.outerHTML, i, "li"), r == null || r.replaceChild(o, t));
  } else
    n.innerHTML = xe($(t.outerHTML, i, s)), o = n.firstChild, r == null || r.replaceChild(o, t);
  return o;
}, B = (t) => {
  var e;
  !((e = t.innerText) != null && e.trim()) && !te(t) ? t.classList.add("is-empty") : t.classList.remove("is-empty");
};
function Ae(t, e, i = !1) {
  var s;
  for (; t && e !== t; ) {
    if (!i && t.nodeName === "LI" && ((s = t.parentElement) == null ? void 0 : s.parentElement) === e || t.parentElement === e)
      return t;
    t = t.parentElement;
  }
  return e.lastElementChild;
}
const De = {
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
  childNodeName: X,
  allowedNodeNames: ee,
  // paragraph tail spacing, default 10px
  paragraphTailSpacing: "10px",
  caretColor: "",
  textColor: "#333333",
  // 自定义粘贴处理函数
  customPasteHandler: void 0,
  insertTextToNewParagraph: !1
};
class Ie extends pe {
  constructor(i) {
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
    const s = typeof i.container == "string" ? b(i.container) : i.container;
    if (!s)
      throw new Error(`Can't found '${i.container}' Node in document!`);
    this.version = "1.1.0", this.options = { ...De, ...i }, this.allowedNodeNames = (this.options.allowedNodeNames || ee).map((r) => r.toUpperCase());
    const n = this.options.childNodeName.toUpperCase();
    this.options.childNodeName = n, this.blankLine = `<${n}><br></${n}>`, this.allowedNodeNames.includes(n) || this.allowedNodeNames.push(n), this.$editor = Se(this.options, this.blankLine), s.append(this.$editor), this._eventHandler = (r) => {
      const o = r.type;
      if (o === "blur" || o === "click") {
        const a = window.getSelection(), l = a && a.rangeCount ? a.getRangeAt(a.rangeCount - 1).endContainer : r.currentTarget;
        this.setCursorElement(l);
      }
      this.emit(o === "input" ? "change" : o, r), B(this.$editor);
    }, this._pasteHandler = (r) => {
      var a;
      if (typeof this.options.customPasteHandler == "function")
        return this.options.customPasteHandler(r);
      r.preventDefault();
      const o = (a = r.clipboardData) == null ? void 0 : a.getData("text");
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
  use(i, s) {
    typeof i.install == "function" && i.install(this, s);
  }
  /**
   * @method setHtml(html)
   * 设置编辑器内容，会覆盖之前内容
   * set html to the content element
   * @param html `string`
   */
  setHtml(i) {
    this.$editor.innerHTML = this.blankLine, this.insert(i, !0), B(this.$editor);
  }
  /**
   * @method getHtml(retainLastBlankLines)
   * 获取编辑器中的HTML代码，会自动去除结尾处的空行。
   * get html string from content element.
   * @param retainLastBlankLines? `boolean` Retain last blank lines, If `true` the last `<section><br></section>` not will be removed.
   * @return `string`
   */
  getHtml(i) {
    const s = this.$editor.innerHTML;
    if (i)
      return s;
    const n = this.options.childNodeName;
    return s.replace(new RegExp(`(<${n}><br\\s?\\/?><\\/${n}>)+$`, "i"), "");
  }
  /**
   * @method insert(input, toNewParagraph)
   * 向编辑器中插入内容/HTML代码/元素等
   * insert html or element to content element
   * @param input `string | HTMLElement`
   * @param toNewParagraph? `boolean` Insert `text` in a new paragraph, only `textNode` is valid. Defaults to `false`.
   */
  insert(i, s = !1) {
    const { childNodeName: n, insertTextToNewParagraph: r } = this.options;
    if (i instanceof HTMLElement)
      this._insertEl(i);
    else {
      const o = g("div", {}, i), a = v(o.childNodes);
      if (!s && !r && a.every((l) => l.nodeType === Node.TEXT_NODE))
        return this._insertText(i);
      a.forEach((l) => {
        l.nodeType === Node.ELEMENT_NODE ? l.nodeName === Ne ? this._insertEl(g(n, {}, "<br/>")) : this._insertEl(l) : l.textContent && this._insertEl(g(n, {}, l.textContent));
      });
    }
    this._dispatchChange();
  }
  /**
   * insert element to content element
   * @param input
   * @private
   */
  _insertEl(i) {
    const s = this.getCursorElement();
    Le(s) ? R(i.outerHTML) ? this.$editor.insertBefore(i, s) : s === this.$editor.children[this.$editor.children.length - 1] ? this.$editor.insertBefore(g(this.options.childNodeName, {}, i), s) : (s.innerHTML = "", s.append(i)) : (R(i.outerHTML) || (i = g(this.options.childNodeName, {}, i)), s.nextElementSibling ? this.$editor.insertBefore(i, s.nextElementSibling) : this.$editor.append(i)), this.setCursorElement(i);
  }
  /**
   * insert text into editor
   * @param input
   * @returns
   */
  _insertText(i) {
    if (!i)
      return;
    const s = window.getSelection(), n = s == null ? void 0 : s.rangeCount;
    if (!n)
      return this.insert(i, !0);
    s.deleteFromDocument(), s.getRangeAt(0).insertNode(S(i)), this.setCursorElement(s.getRangeAt(n - 1).endContainer), s.collapseToEnd(), this._dispatchChange();
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
  changeNodeName(i) {
    if (i = (i || this.options.childNodeName).toUpperCase(), !this.allowedNodeNames.includes(i))
      return !1;
    const s = this.getCursorElement(), n = Oe(s, i);
    return n ? (this.setCursorElement(n), this._dispatchChange(), !0) : !1;
  }
  /**
   * @method changeStyles(styles, value)
   * 修改光标所在元素的样式
   *  Change the style of the element where the cursor is located
   * @param styles? `CSSProperties | string` When it's `undefined` or null, all styles will be removed.
   * @param value? `any`
   */
  changeStyles(i, s) {
    const n = this.getCursorElement(!0);
    if (n) {
      const r = H(n);
      if (i) {
        const o = typeof i == "string" ? { [i]: s } : i;
        n.setAttribute("style", A(r, o));
      } else {
        if (!Object.keys(r).length)
          return;
        n.removeAttribute("style");
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
    return H(this.getCursorElement());
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
  /**
   * @method getCursorElement(isOnlyEditorChild)
   * 获取光标所在的元素
   * Get the element where the cursor is located
   * @param isOnlyEditorChild? `boolean` Must be a child element of editor `HTMLElement`. For example: when it is `false`, the `li` element is returned in `ul/ol`, and when it is `true`, the `ul/ol` element is returned.
   * @return `HTMLElement`
   */
  getCursorElement(i = !1) {
    return Ae(this._cursorElement, this.$editor, i);
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
const Pe = ["#333333", "#d0d0d0", "#ff583d", "#fdaa25", "#44c67b", "#14b2e0", "#b065e2"], Me = {
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
}, k = {
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
      child: ["大标题", { tag: "i" }]
    },
    {
      tag: "dd",
      attrs: {
        class: "__h4",
        "data-tag": "h4"
      },
      child: ["小标题", { tag: "i" }]
    },
    {
      tag: "dd",
      attrs: {
        class: "__section active",
        "data-tag": "section"
      },
      child: ["正文", { tag: "i" }]
    },
    {
      tag: "dd",
      attrs: {
        class: "__blockquote",
        "data-tag": "blockquote"
      },
      child: ["引用", { tag: "i" }]
    },
    {
      tag: "dd",
      attrs: {
        class: "__ul",
        "data-tag": "ul"
      },
      child: ["无序列表", { tag: "i" }]
    }
  ]
}, Re = (t) => {
  const e = [];
  return t.forEach((i, s) => {
    /^#\w{3,6}$/.test(i) && e.push({
      tag: "dd",
      attrs: {
        class: s === 0 ? "active" : "",
        "data-color": Be(i.toLowerCase())
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
}, Be = (t) => t.length === 7 ? t : `#${t[1]}${t[1]}${t[2]}${t[2]}${t[3]}${t[3]}`, ke = {
  textStyleColors: [...Pe],
  textStyleTitle: "Set Style",
  textStyleHeadLeftBtnText: "Clear"
};
const N = "style-panel", T = `${N}__fade-in`;
class je {
  constructor(e) {
    h(this, "editorInstance", null);
    h(this, "$el");
    h(this, "options");
    h(this, "_headerSwitchHandler");
    h(this, "_headerLeftHandler");
    h(this, "$elMap", /* @__PURE__ */ new Map());
    h(this, "_styleHandler");
    h(this, "_colorHandler");
    h(this, "_tagHandler");
    const i = {
      ...ke,
      ...e
    };
    this.options = i, this.$el = g("div", { class: `${N} border-top` }), this._styleHandler = (s) => {
      const n = this.editorInstance, r = s.currentTarget, o = H(r, "data-style"), a = n.getStyles();
      Object.keys(o).forEach((l) => {
        a[l] && (o[l] = "");
      }), n.changeStyles(o);
    }, this._colorHandler = (s) => {
      const n = s.currentTarget;
      if (this.updateActiveClassName(n)) {
        const r = this.editorInstance, o = n.getAttribute("data-color");
        r.changeStyles({ color: o });
      }
    }, this._tagHandler = (s) => {
      const n = s.currentTarget;
      if (this.updateActiveClassName(n)) {
        const r = this.editorInstance, o = n.getAttribute("data-tag");
        r.changeNodeName(o);
      }
    }, this._headerLeftHandler = () => {
      const s = this.editorInstance, { textColor: n, childNodeName: r } = s.options;
      s.changeStyles(), s.changeNodeName(), this.updateActiveClassName(b(`[data-color="${n}"]`, this.$el)), this.updateActiveClassName(b(`[data-tag="${r}"]`, this.$el));
    }, this._headerSwitchHandler = () => {
      this.$el.classList.contains(T) ? this.hide() : this.show();
    };
  }
  _initChildEl(e) {
    const { textColor: i, childNodeName: s } = e, { textStyleTitle: n, textStyleHeadLeftBtnText: r, textStyleColors: o } = this.options, a = g("div", { class: `${N}__header` }, n), l = g("div", { class: "__left" }, r), E = g("div", { class: "__switch" });
    a.append(l, E);
    const u = [Me], c = o;
    if (c.length) {
      i && !c.includes(i) && c.unshift(i);
      const p = {
        tag: "dl",
        attrs: {
          class: "__color-wrapper border-bottom"
        },
        child: Re(c)
      };
      u.push(p);
    }
    const w = {
      ...k,
      child: [...k.child]
    }, m = s.toLowerCase();
    w.child.forEach((p) => {
      const f = p.attrs["data-tag"];
      f === "section" && f !== m && (p.attrs["data-tag"] = m);
    }), u.push(w);
    const d = Q({
      tag: "div",
      attrs: {
        class: `${N}__body`
      },
      child: u
    });
    this.$el.append(a, d), C(".__style-wrapper dd", d).forEach((p) => {
      p.addEventListener("click", this._styleHandler);
    }), C(".__color-wrapper dd", d).forEach((p) => {
      p.addEventListener("click", this._colorHandler);
    }), C(".__tag-wrapper dd", d).forEach((p) => {
      p.addEventListener("click", this._tagHandler);
    }), l.addEventListener("click", this._headerLeftHandler), E.addEventListener("click", this._headerSwitchHandler), this.$elMap.set(l, this._headerLeftHandler), this.$elMap.set(E, this._headerSwitchHandler);
  }
  install(e, i) {
    this.editorInstance = e, i && i.append(this.$el), this._initChildEl(e.options), e.on("click", () => {
      const { textColor: s, childNodeName: n } = e.options, r = e.getStyles();
      this.updateActiveClassName(b(`[data-color="${r.color || s}"]`, this.$el));
      const o = e.getCursorElement(!0).nodeName.toLowerCase();
      this.updateActiveClassName(b(`[data-tag="${o || n}"]`, this.$el));
    });
  }
  show() {
    this.$el.classList.add(T);
  }
  hide() {
    this.$el.classList.remove(T);
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
const Fe = {
  toolbarBeenFixed: !0,
  toolbarHeight: "50px",
  // buttons name, and order
  toolbarButtons: ["choose-picture", "text-style"]
};
class Ue {
  constructor(e) {
    h(this, "editorInstance", null);
    h(this, "visible");
    h(this, "options");
    h(this, "$el");
    h(this, "_btnClickHandler");
    this.options = {
      ...Fe,
      ...e
    }, this.visible = this.options.toolbarBeenFixed;
    const [i, s] = _e(this.options.toolbarHeight);
    this.$el = g(
      "div",
      {
        class: "sp-editor__toolbar border-top",
        style: {
          "--bar-height": `${i}${s}`
        }
      },
      '<dl class="inner-wrapper"></dl>'
    ), this._btnClickHandler = (n) => {
      const r = n.currentTarget;
      this.editorInstance && r && this.editorInstance.emit("toolbarButtonOnClick", r.getAttribute("data-name"));
    }, this.options.toolbarButtons.forEach((n) => {
      this.addButton({ name: n });
    });
  }
  install(e, i) {
    this.editorInstance = e, i && i.append(this.$el), this.visible && this.show();
  }
  show() {
    ve(this.$el, "__fade-in"), this.visible = !0, this.editorInstance.emit("toolbarShow", !0, this);
  }
  hide() {
    $e(this.$el, "__fade-in"), this.visible = !1, this.editorInstance.emit("toolbarShow", !1, this);
  }
  /**
   * add button
   * @param params
   * @param index Insert index
   */
  addButton(e, i) {
    const s = { ...e.style }, n = g(
      "dd",
      {
        class: be("icon-item", e.className),
        dataName: e.name,
        style: s
      },
      e.innerHtml
    ), r = C("dd", this.$el), o = b("dl", this.$el);
    typeof i == "number" && i >= 0 && i < r.length ? o.insertBefore(n, r[i]) : o.append(n), n.addEventListener("click", this._btnClickHandler);
  }
  destroy() {
    C(".icon-item", this.$el).forEach((e) => {
      e.removeEventListener("click", this._btnClickHandler);
    });
  }
}
/*!
 * image-process version 4.3.1
 * Author: Xing Zhong <capricorncd@qq.com, zx198401@gmail.com>
 * Repository: https://github.com/capricorncd/image-process-tools
 * Released on: 2022-12-30 14:17:09 (GMT+0900)
 */
/*!
 * zx-sml version 0.6.0
 * Author: Xing Zhong<zx198401@gmail.com>
 * Repository: https://github.com/capricorncd/zx-sml
 * Released on: 2022-09-09 21:21:26 (GMT+0900)
 */
var ze = Object.defineProperty, j = Object.getOwnPropertySymbols, Ge = Object.prototype.hasOwnProperty, Ve = Object.prototype.propertyIsEnumerable, F = (t, e, i) => e in t ? ze(t, e, { enumerable: !0, configurable: !0, writable: !0, value: i }) : t[e] = i, U = (t, e) => {
  for (var i in e || (e = {}))
    Ge.call(e, i) && F(t, i, e[i]);
  if (j)
    for (var i of j(e))
      Ve.call(e, i) && F(t, i, e[i]);
  return t;
};
function We(t) {
  return Array.isArray(t);
}
function ie(t) {
  return t !== null && !We(t) && typeof t == "object";
}
var qe = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, x = { exports: {} };
/*! For license information please see date-utils-2020.js.LICENSE.txt */
(function(t, e) {
  (function(i, s) {
    t.exports = s();
  })(typeof self < "u" ? self : qe, function() {
    return (() => {
      var i = { 949: (n, r) => {
        Object.defineProperty(r, "__esModule", { value: !0 }), r.toTwoDigits = void 0, r.toTwoDigits = function(o) {
          return o[1] ? o : "0" + o;
        };
      }, 607: (n, r, o) => {
        Object.defineProperty(r, "__esModule", { value: !0 }), r.toTwoDigits = r.toDate = r.formatDate = void 0;
        var a = o(949);
        Object.defineProperty(r, "toTwoDigits", { enumerable: !0, get: function() {
          return a.toTwoDigits;
        } });
        var l = { weeks: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] };
        function E(u) {
          if (u instanceof Date)
            return u;
          if (typeof u == "number")
            return new Date(u);
          if (typeof u == "string") {
            var c = u.trim();
            if (/^\d+$/.test(c)) {
              var w = c.length;
              return w === 8 ? new Date([c.substr(0, 4), c.substr(4, 2), c.substr(6, 2)].join("/")) : w === 6 ? new Date([c.substr(0, 4), c.substr(4, 2), "01"].join("/")) : w === 4 ? /* @__PURE__ */ new Date(c + "/01/01") : new Date(parseInt(u));
            }
            if (c = c.replace(/[年月日]/g, function(d) {
              return d === "日" ? "" : "/";
            }).replace(/[(（（].*?[)））]/g, " ").replace(/\bam|pm\b/gi, " ").replace(/\s+/g, " "), /^(\d{4})[-/](\d{1,2})[-/](\d{1,2})$/.test(c))
              return new Date([RegExp.$1, RegExp.$2, RegExp.$3].join("/"));
            if (/^(\d{4})[-/](\d{1,2})$/.test(c))
              return new Date([RegExp.$1, RegExp.$2, "01"].join("/"));
            var m = new Date(c);
            return isNaN(m.getFullYear()) ? null : m;
          }
          return null;
        }
        r.formatDate = function(u, c, w) {
          var m, d = E(u);
          if (!d || !c)
            return u + "";
          if (c === "timestamp")
            return d.getTime().toString();
          /(y+)/i.test(c) && (m = RegExp.$1, c = c.replace(m, (d.getFullYear() + "").substr(4 - m.length))), w && Array.isArray(w.weeks) || (w = l);
          var p = { "M+": d.getMonth() + 1, "d+": d.getDate(), "h+": d.getHours(), "m+": d.getMinutes(), "s+": d.getSeconds(), "w+": d.getDay(), "W+": w.weeks[d.getDay()], "a+": d.getHours() < 12 ? "am" : "pm", "A+": d.getHours() < 12 ? "AM" : "PM" };
          for (var f in p)
            if (new RegExp("(" + f + ")").test(c)) {
              m = RegExp.$1;
              var y = p[f] + "";
              c = c.replace(m, m.length === 1 ? y : a.toTwoDigits(y));
            }
          if (/(g)/i.test(c)) {
            var _ = d.toString().split(/\s+/).slice(5), ue = c.includes("g");
            c = c.replace(/g/i, ue ? _[0] : _.join(" "));
          }
          return c;
        }, r.toDate = E;
      } }, s = {};
      return function n(r) {
        if (s[r])
          return s[r].exports;
        var o = s[r] = { exports: {} };
        return i[r](o, o.exports, n), o.exports;
      }(607);
    })();
  });
})(x);
function se(t = "", e = "-") {
  return t.replace(/[A-Z]/g, (i, s) => `${s > 0 ? e : ""}${i.toLowerCase()}`);
}
function Ye(t = "", e = !1) {
  const i = t.replace(/[-_\s](\w)/g, (s, n) => n.toUpperCase());
  return e ? i.replace(/^\w/, (s) => s.toUpperCase()) : i;
}
function ne(t = {}, e = !1) {
  const i = e ? Ye : se, s = {};
  for (const [n, r] of Object.entries(t))
    s[i(n)] = ie(r) ? ne(r, e) : r;
  return s;
}
function re(t, e = !1, i = 2) {
  const s = ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"], n = e ? 1e3 : 1024;
  let r = String(t), o = "Byte";
  for (let a = 0, l = t / n; l > 1; l /= n, a++)
    r = l.toFixed(i), o = s[a];
  return e && (o = o.replace("i", "")), {
    text: r.replace(/\.0+$/, "") + o,
    value: +r,
    unit: o,
    bytes: t
  };
}
function oe(t, e = {}, i) {
  const s = document.createElement(t);
  for (const [n, r] of Object.entries(e))
    s.setAttribute(se(n), n === "style" && ie(r) ? Ke(r) : r);
  return i && (Array.isArray(i) || (i = [i]), i.forEach((n) => {
    if (typeof n == "string") {
      const r = oe("div");
      r.innerHTML = n, s.append(...r.childNodes);
    } else
      s.append(n);
  })), s;
}
function Ke(...t) {
  const e = t.reduce((s, n) => U(U({}, s), ne(n)), {}), i = [];
  for (const [s, n] of Object.entries(e))
    n === "" || typeof n > "u" || n === null || i.push(`${s}:${n}`);
  return i.join(";");
}
function Ze(t) {
  return new Promise((e, i) => {
    const s = new FileReader();
    s.onload = (n) => {
      var r;
      const o = (r = n.target) == null ? void 0 : r.result;
      o ? e(o) : i(new Error(`FileReader's result is null, ${n.target}`));
    }, s.onerror = i, s.readAsDataURL(t);
  });
}
function ae(t) {
  return (window.URL || window.webkitURL).createObjectURL(t);
}
function le(t) {
  const e = t.split(",");
  let i = "";
  return /data:(\w+\/\w+);base64/.test(e[0]) && (i = RegExp.$1), {
    type: i,
    data: e[1]
  };
}
function ce(t, e) {
  const i = le(t), s = window.atob(i.data);
  e = e || i.type;
  const n = new Uint8Array(s.length);
  for (let r = 0; r < s.length; r++)
    n[r] = s.charCodeAt(r);
  return new Blob([n], { type: e });
}
x.exports.formatDate;
x.exports.toDate;
x.exports.toTwoDigits;
const Je = {
  enableDevicePixelRatio: !1,
  isForce: !1,
  mimeType: "image/jpeg",
  perResize: 500,
  quality: 0.9,
  width: 0,
  height: 0,
  longEdge: 0
}, Qe = /^data:(.+?);base64/, Xe = /^image\/.+/;
function et(t, e) {
  return new Promise((i, s) => {
    var n;
    const r = {
      ...Je,
      ...e,
      longEdge: (n = e == null ? void 0 : e.longEdge) != null ? n : e == null ? void 0 : e.longestSide
    };
    typeof t == "string" && Qe.test(t) ? z(t, r, i, s) : (t instanceof File || t instanceof Blob) && Xe.test(t.type) ? Ze(t).then((o) => {
      z(o, r, i, s);
    }).catch(s) : s(new Error(`Invalid file, ${t}`));
  });
}
function z(t, e, i, s) {
  const { type: n } = le(t), r = ce(t, n), o = new Image();
  o.onload = () => {
    const a = {
      element: o,
      blob: r,
      data: t,
      url: ae(r),
      width: o.naturalWidth || o.width,
      height: o.naturalHeight || o.height,
      type: n,
      size: re(r.size)
    };
    e.cropInfo && e.cropInfo.sw && e.cropInfo.sh ? G(a, e, i, s, {
      ...e.cropInfo,
      dx: 0,
      dy: 0,
      dw: e.cropInfo.sw,
      dh: e.cropInfo.sh
    }) : e.width && e.height ? G(a, e, i, s, it(a, e)) : e.width || e.height || e.longEdge ? tt(a, e, i, s) : O({ ...a, raw: a }, e, i);
  }, o.onerror = s, o.src = t;
}
function G(t, e, i, s, n) {
  try {
    Object.prototype.hasOwnProperty.call(n, "enableDevicePixelRatio") || (n.enableDevicePixelRatio = e.enableDevicePixelRatio);
    const r = D(t.element, {
      enableDevicePixelRatio: e.enableDevicePixelRatio,
      sx: n.sx,
      sy: n.sy,
      sw: n.sw,
      sh: n.sh,
      dx: 0,
      dy: 0,
      dw: n.sw,
      dh: n.sh
    });
    !e.width && !e.height ? e.longEdge ? n.sw > n.sh ? (e.width = e.longEdge, e.height = n.sh * e.width / n.sw) : (e.height = e.longEdge, e.width = n.sw * e.height / n.sh) : (e.width = n.sw, e.height = n.sh) : e.width ? e.height = n.sh * e.width / n.sw : e.width = n.sw * e.height / n.sh, he(
      r,
      t,
      e,
      {
        ...n,
        sx: 0,
        sy: 0,
        sw: r.width,
        sh: r.height
      },
      i
    );
  } catch (r) {
    s(r);
  }
}
function tt(t, e, i, s) {
  try {
    e.longEdge && !e.width && !e.height && (t.width >= t.height ? e.width = e.longEdge : e.height = e.longEdge);
    const n = {
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
    if (e.width) {
      if (t.width < e.width && !e.isForce) {
        O({ ...t, raw: t }, e, i);
        return;
      }
      n.dh = t.height * e.width / t.width, e.height = n.dh;
    } else {
      if (t.height < e.height && !e.isForce) {
        O({ ...t, raw: t }, e, i);
        return;
      }
      n.dw = t.width * e.height / t.height, e.width = n.dw;
    }
    he(t.element, t, e, n, i);
  } catch (n) {
    s(n);
  }
}
function O(t, e, i) {
  t.type !== e.mimeType ? (t.type = e.mimeType, de(
    t.element,
    t.raw,
    e,
    {
      enableDevicePixelRatio: e.enableDevicePixelRatio,
      sx: 0,
      sy: 0,
      sw: t.width,
      sh: t.height,
      dx: 0,
      dy: 0,
      dw: t.width,
      dh: t.height
    },
    i
  )) : i(t);
}
function he(t, e, i, s, n) {
  let r = e.width > e.height ? e.width - s.dw : e.height - s.dh;
  if (r > i.perResize) {
    const o = e.height / e.width;
    for (; r > i.perResize; )
      r -= i.perResize, s.sw = t.width, s.sh = t.height, s.dw = i.width + r, s.dh = s.dw * o, t = D(t, s);
  }
  s.sw = t.width, s.sh = t.height, s.dw = i.width, s.dh = i.height, de(t, e, i, s, n);
}
function de(t, e, i, s, n) {
  const r = D(t, s), o = /^\w+\/\*$/.test(i.mimeType) || !i.mimeType ? e.type : i.mimeType, a = r.toDataURL(o, i.quality), l = ce(a, o);
  n({
    element: r,
    type: o,
    width: r.width,
    height: r.height,
    blob: l,
    data: a,
    url: ae(l),
    size: re(l.size),
    raw: e
  });
}
function it(t, e) {
  const { width: i, height: s } = t, { width: n, height: r } = e;
  let o;
  const a = s * n / r;
  if (i > a)
    o = {
      sx: (i - a) / 2,
      sy: 0,
      sw: a,
      sh: s
    };
  else {
    const l = i * r / n;
    o = {
      sx: 0,
      sy: (s - l) / 2,
      sw: i,
      sh: l
    };
  }
  return {
    ...o,
    dx: 0,
    dy: 0,
    dw: n,
    dh: r
  };
}
function D(t, e) {
  const i = e.enableDevicePixelRatio && window.devicePixelRatio || 1, s = oe("canvas");
  s.width = e.dw * i, s.height = e.dh * i;
  const n = s.getContext("2d");
  return n.scale(i, i), n.drawImage(
    t,
    e.sx,
    e.sy,
    e.sw,
    e.sh,
    e.dx,
    e.dy,
    e.dw,
    e.dh
  ), s;
}
const st = {
  imageMaxWidth: 750,
  ignoreGif: !0,
  forceImageResize: !1,
  chooseFileMultiple: !0,
  chooseFileAccept: "image/*"
};
class rt extends Ie {
  constructor(i, s = {}) {
    let n = null;
    if (typeof i == "string" || i instanceof HTMLElement ? n = b(i) : (s = i || {}, typeof s.container == "string" && (n = b(s.container))), s = {
      ...st,
      ...s
    }, !n)
      throw new Error(`Can't found '${i}' Node in document!`);
    const r = g("div", { class: "sp-editor" });
    super({
      ...s,
      container: r
    });
    h(this, "$el");
    h(this, "stylePanel");
    h(this, "toolbar");
    h(this, "fileInput", null);
    h(this, "_inputChangeHandler");
    n.append(r), this.$el = r, this.stylePanel = new je(s), this.use(this.stylePanel, this.$el), this.toolbar = new Ue(s), this.use(this.toolbar, this.$el), this._inputChangeHandler = (o) => {
      const a = o.currentTarget;
      this.handleImageFile(a.files).then((l) => {
        l.forEach((E) => {
          const u = /gif$/i.test(E.raw.type) && s.ignoreGif;
          this.insert(`<img src="${u ? E.raw.data : E.data}">`);
        });
      }).catch((l) => {
        this.emit("error", l);
      });
    }, this.on("toolbarButtonOnClick", (o) => {
      switch (o) {
        case "choose-picture":
          if (typeof s.customPictureHandler == "function")
            s.customPictureHandler();
          else if (this.fileInput)
            this.fileInput.click();
          else {
            const a = {
              type: "file",
              style: {
                display: "none"
              },
              accept: s.chooseFileAccept
            };
            s.chooseFileMultiple && (a.multiple = !0), this.fileInput = g("input", a), this.$el.append(this.fileInput), this.fileInput.addEventListener("change", this._inputChangeHandler), this.fileInput.click();
          }
          break;
        case "text-style":
          this.stylePanel.show();
          break;
      }
    });
  }
  /**
   * @method handleImageFile(files)
   * Image files handler.
   * @param files `FileList | File[] | Blob[] | null` Image files.
   * @returns `Promise<MediaFileHandlerData[]` [MediaFileHandlerData](https://github.com/capricorncd/image-process-tools#returns)
   */
  handleImageFile(i) {
    return i ? new Promise((s, n) => {
      Promise.all(v(i).map(this._handleFile)).then((r) => {
        s(r.sort((o, a) => o.index - a.index).map((o) => o.data));
      }).catch(n);
    }) : Promise.resolve([]);
  }
  _handleFile(i, s) {
    return new Promise((n, r) => {
      et(i).then((o) => {
        n({
          data: o,
          index: s
        });
      }).catch(r);
    });
  }
  /**
   * @method addToolbarButton(params, index)
   * Add a custom button to `toolbar`.
   * @param params `ButtonOptions` [ButtonOptions](#ButtonOptions)
   * @param index? `number` New button insertion index.
   * ```js
   * // Add a button named 'custom-button-name' for toolbar.
   * editor.addToolbarButton({
   *   name: 'custom-button-name',
   * })
   *
   * // when the button is clicked
   * editor.on('toolbarButtonOnClick', (name) => {
   *   if (name === 'custom-button-name') {
   *     // do something ...
   *   }
   * })
   * ```
   */
  addToolbarButton(i, s) {
    this.toolbar.addButton(i, s);
  }
  /**
   * @method destroy()
   * destroy events
   */
  destroy() {
    var i;
    super.destroy(), this.stylePanel.destroy(), this.toolbar.destroy(), (i = this.fileInput) == null || i.removeEventListener("change", this._inputChangeHandler);
  }
}
export {
  ee as ALLOWED_NODE_NAMES,
  rt as SpEditor
};
