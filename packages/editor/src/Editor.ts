/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/05/05 10:29:43 (GMT+0900)
 */
import { EventEmitter } from '@zx-editor/event-emitter'
import { getStyles, createTextNode } from '@zx-editor/helpers'
import { CSSProperties } from '@zx-editor/types'
import { $, createElement, slice, toStrStyles } from 'zx-sml'
import { NODE_NAME_SECTION, NODE_NAME_BR, ALLOWED_NODE_NAMES, BLANK_LINE } from './const'
import { changeNodeName, initContentDom, checkIsEmpty, getCursorElement } from './dom'
import { isBrSection } from './helpers'
import { DEF_OPTIONS, EditorOptions } from './options'
import './style.scss'

/**
 * @type EditorPlugin
 */
export interface EditorPlugin {
  install: (e: Editor, parentElement?: HTMLElement) => void
}

/**
 * @document Editor
 *
 * Editor extends [EventEmitter](./EventEmitter.md). The parameter of `Editor` is [EditorOptions](#EditorOptions)
 *
 * instance `new Editor(EditorOptions)`
 *
 * For example:
 *
 * ```js
 * const editor = new Editor({
 *   container: `#container`
 * })
 * ```
 */
export class Editor extends EventEmitter {
  // 版本
  public readonly version: string
  // 参数
  private readonly options: EditorOptions
  // 编辑器内容区域HTML元素
  public readonly $editor: HTMLDivElement
  // current node
  private _cursorElement: HTMLElement | null = null
  // 内容元素事件处理函数
  private readonly _eventHandler: <T extends Event>(e: T) => void
  // 内容中允许使用的元素标签
  private allowedNodeNames: string[]

  private _pasteHandler: (e: ClipboardEvent) => void

  constructor(options: EditorOptions) {
    super()

    const container = typeof options.container === 'string' ? $(options.container) : options.container

    if (!container) {
      throw new Error(`Can't found '${options.container}' Node in document!`)
    }

    // version
    this.version = '__VERSION__'
    // options
    this.options = { ...DEF_OPTIONS, ...options }
    this.allowedNodeNames = (this.options.allowedNodeNames || ALLOWED_NODE_NAMES).map((item) => item.toUpperCase())
    // elements
    this.$editor = initContentDom(this.options)
    container.append(this.$editor)

    // content event handler
    this._eventHandler = (e: Event) => {
      const type = e.type
      if (type === 'blur' || type === 'click') {
        this._lastLine()
        this.setCursorElement(window.getSelection()?.getRangeAt(0).endContainer)
      }
      this.emit(type === 'input' ? 'change' : type, e)
      checkIsEmpty(this.$editor)
    }

    // paste handler
    this._pasteHandler = (e: ClipboardEvent) => {
      // use custom paste handler
      if (typeof this.options.customPasteHandler === 'function') {
        return this.options.customPasteHandler(e)
      }
      e.preventDefault()
      const paste = e.clipboardData?.getData('text')
      if (!paste) return
      const selection = window.getSelection()
      this._insertText(paste, selection)
    }

    this._initEvents()
  }

  /**
   * init events
   * @private
   */
  private _initEvents(): void {
    this.$editor.addEventListener('focus', this._eventHandler)
    this.$editor.addEventListener('blur', this._eventHandler)
    this.$editor.addEventListener('input', this._eventHandler)
    this.$editor.addEventListener('click', this._eventHandler)
    this.$editor.addEventListener('paste', this._pasteHandler)
  }

  /**
   * @method use(plugin, parentElement)
   * extension, 扩展插件
   * @param plugin `EditorPlugin`
   * @param parentElement? `HTMLElement`
   */
  use(plugin: EditorPlugin, parentElement?: HTMLElement): void {
    if (typeof plugin.install === 'function') {
      plugin.install(this, parentElement)
    }
  }

  /**
   * @method setHtml(html)
   * 设置编辑器内容，会覆盖之前内容
   * set html to the content element
   * @param html `string`
   */
  setHtml(html: string): void {
    this.$editor.innerHTML = BLANK_LINE
    this.insert(html, true)
    this._lastLine()
    checkIsEmpty(this.$editor)
  }

  /**
   * @method getHtml()
   * 获取编辑器中的HTML代码，会自动去除结尾处的空行
   * get html string from content element
   * remove last line that `<section><br></section>`
   * @return `string`
   */
  getHtml(): string {
    return this.$editor.innerHTML.replace(/<section><br><\/section>$/, '')
  }

  /**
   * @method insert(input, toNewParagraph)
   * 向编辑器中插入内容/HTML代码/元素等
   * insert html or element to content element
   * @param input `string | HTMLElement`
   * @param toNewParagraph? `boolean` Insert text to new paragraph, default `false`
   */
  insert(input: string | HTMLElement, toNewParagraph = false): void {
    // insert HTMLElement
    if (input instanceof HTMLElement) {
      this._insert(input)
    }
    // insert string
    else {
      const el = createElement<HTMLDivElement>('div', {}, input)
      const childNodes = slice<Node, NodeList>(el.childNodes)
      // Insert text content at the cursor position
      if (
        !toNewParagraph &&
        !this.options.insertTextToNewParagraph &&
        childNodes.every((node) => node.nodeType === Node.TEXT_NODE)
      ) {
        return this._insertText(input)
      }
      // Insert content into new paragraph
      else {
        childNodes.forEach((node) => {
          // element node
          if (node.nodeType === Node.ELEMENT_NODE) {
            // <br> element
            if (node.nodeName === NODE_NAME_BR) {
              this._insert(createElement(NODE_NAME_SECTION, {}, '<br/>'))
            } else {
              this._insert(node as HTMLElement)
            }
          }
          // text
          else if (node.textContent) {
            this._insert(createElement(NODE_NAME_SECTION, {}, node.textContent))
          }
        })
      }
    }
    this._dispatchChange()
  }

  /**
   * insert element to content element
   * @param input
   * @private
   */
  private _insert(input: HTMLElement): void {
    const currentSection = this.getCursorElement()
    if (isBrSection(currentSection)) {
      this.$editor.insertBefore(input, currentSection)
    } else {
      this.$editor.insertBefore(input, currentSection.nextElementSibling)
    }

    if (!this.allowedNodeNames.includes(input.nodeName)) {
      input = changeNodeName(input, NODE_NAME_SECTION)!
    }
    // 设置光标元素对象
    this.setCursorElement(input)
  }

  private _insertText(input?: string, selection?: Selection | null): void {
    if (!input) return
    selection = selection ?? window.getSelection()
    // 编辑器未出发focus时，直接使用`insert(string)`时
    // When the editor does not start focus, when using `insert(string)` directly
    if (!selection?.rangeCount) {
      return this.insert(input, true)
    }
    // 正常操作：光标在编辑器中，将文本插入至光标处
    // Normal operate: cursor in editor, insert text at cursor
    selection.deleteFromDocument()
    selection.getRangeAt(0).insertNode(createTextNode(input))
    this.setCursorElement(selection.getRangeAt(0).endContainer)
    this._dispatchChange()
  }

  /**
   * 检查编辑器最后一段是否为空行，非空行则插入
   * append br section to content element when the lastElementChild is not a br section element
   * @private
   */
  private _lastLine(): void {
    // if (e) {}
    if (!isBrSection(this.$editor.lastElementChild)) {
      this.$editor.appendChild(createElement('section', {}, '<br>'))
    }
  }

  /**
   * @method changeNodeName(nodeName)
   * 修改光标所在元素的标签
   * Replace the tag of the element under the cursor
   * @param nodeName `string` For example: `UL`, `SECTION` ...
   * @return `boolean`
   */
  changeNodeName(nodeName: string): boolean {
    // 判断nodeName是否被允许设置
    if (!this.allowedNodeNames.includes(nodeName.toUpperCase())) return false
    const currentSection = this.getCursorElement()
    const el = changeNodeName(currentSection, nodeName)
    console.log(el)
    if (el) {
      this.setCursorElement(el)
      this._dispatchChange()
      return true
    }
    return false
  }

  /**
   * @method changeStyles(styles, value)
   * 修改光标所在元素的样式
   *  Change the style of the element where the cursor is located
   * @param styles? `CSSProperties | string` When it's `undefined` or null, all styles will be removed.
   * @param value? `any`
   */
  changeStyles(styles?: CSSProperties | string, value?: unknown): void {
    const current = this.getCursorElement(true)
    if (current) {
      const currentStyles = getStyles(current)
      // remove all styles
      if (!styles) {
        // The current element does not have any styles
        if (!Object.keys(currentStyles).length) return
        current.removeAttribute('style')
        this._dispatchChange()
        return
      }
      const s: CSSProperties = typeof styles === 'string' ? { [styles]: value } : styles
      current.setAttribute('style', toStrStyles(currentStyles, s))
      this._dispatchChange()
    }
  }

  /**
   * 分派事件
   */
  _dispatchChange(): void {
    this.$editor.dispatchEvent(new InputEvent('input'))
  }

  /**
   * @method getStyles()
   * 获取光标所在的元素的`style`对象
   * Get the `style` object of the element where the cursor is located
   * @return `CSSProperties`
   */
  getStyles(): CSSProperties {
    return getStyles(this.getCursorElement())
  }

  setCursorElement(el?: Node | HTMLElement | null): void {
    if (el instanceof Node) {
      while (el) {
        if (el.nodeType === Node.ELEMENT_NODE) {
          this._cursorElement = el as HTMLElement
          break
        }
        el = el.parentElement
      }
    } else if (el) {
      this._cursorElement = el
    }
  }

  /**
   * @method getCursorElement(isOnlyEditorChild)
   * 获取光标所在的元素
   * Get the element where the cursor is located
   * @param isOnlyEditorChild? `boolean` Must be a child element of editor `HTMLElement`. For example: when it is `false`, the `li` element is returned in `ul/ol`, and when it is `true`, the `ul/ol` element is returned.
   * @return `HTMLElement`
   */
  getCursorElement(isOnlyEditorChild = false): HTMLElement {
    return getCursorElement(this._cursorElement, this.$editor, isOnlyEditorChild)
  }

  /**
   * @method destroy()
   * 销毁事件
   * destroy events
   */
  destroy(): void {
    this.$editor.removeEventListener('focus', this._eventHandler)
    this.$editor.removeEventListener('blur', this._eventHandler)
    this.$editor.removeEventListener('input', this._eventHandler)
    this.$editor.removeEventListener('paste', this._pasteHandler)
    this.removeAllListeners()
  }
}
