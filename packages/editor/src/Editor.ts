/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/05/05 10:29:43 (GMT+0900)
 */
import { EventEmitter } from '@zx-editor/event-emitter'
import { getStyles, createTextNode } from '@zx-editor/helpers'
import { CSSProperties } from '@zx-editor/types'
import { $, createElement, slice, toStrStyles } from 'zx-sml'
import { NODE_NAME_BR, ALLOWED_NODE_NAMES } from './const'
import { changeNodeName, initContentDom, checkIsEmpty, getCursorElement } from './dom'
import { isOnlyBrInChildren } from './helpers'
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
  public readonly options: EditorOptions
  // 编辑器内容区域HTML元素
  public readonly $editor: HTMLDivElement
  // current node
  private _cursorElement: HTMLElement | null = null
  // 内容元素事件处理函数
  private readonly _eventHandler: <T extends Event>(e: T) => void
  // 内容中允许使用的元素标签
  private allowedNodeNames: string[]
  private blankLine: string

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

    // childNodeName toUpperCase
    const childNodeName = this.options.childNodeName!.toUpperCase()
    this.options.childNodeName = childNodeName

    this.blankLine = `<${childNodeName}><br></${childNodeName}>`

    // Whether the `childNodeName` is in the `allowedNodeNames`
    if (!this.allowedNodeNames.includes(childNodeName!)) {
      this.allowedNodeNames.push(childNodeName!)
    }
    // elements
    this.$editor = initContentDom(this.options, this.blankLine)
    container.append(this.$editor)

    // content event handler
    this._eventHandler = (e: Event) => {
      const type = e.type
      if (type === 'blur' || type === 'click') {
        this._lastLine()
        const sel = window.getSelection()
        const node =
          sel && sel.rangeCount ? sel.getRangeAt(sel.rangeCount - 1).endContainer : (e.currentTarget as HTMLElement)
        this.setCursorElement(node)
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
      this._insertText(paste)
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
    this.$editor.innerHTML = this.blankLine
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
    const childNodeName = this.options.childNodeName
    return this.$editor.innerHTML.replace(new RegExp(`<${childNodeName}><br\s?\/?><\/${childNodeName}>$`, 'i'), '')
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
      this._insertEl(input)
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
              this._insertEl(createElement(this.options.childNodeName!, {}, '<br/>'))
            } else {
              this._insertEl(node as HTMLElement)
            }
          }
          // text
          else if (node.textContent) {
            this._insertEl(createElement(this.options.childNodeName!, {}, node.textContent))
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
  private _insertEl(input: HTMLElement): void {
    const currentSection = this.getCursorElement()
    if (isOnlyBrInChildren(currentSection)) {
      this.$editor.insertBefore(input, currentSection)
    } else {
      this.$editor.insertBefore(input, currentSection.nextElementSibling)
    }

    if (!this.allowedNodeNames.includes(input.nodeName)) {
      input = changeNodeName(input, this.options.childNodeName!)!
    }
    // 设置光标元素对象
    this.setCursorElement(input)
  }

  /**
   * insert text into editor
   * @param input
   * @returns
   */
  private _insertText(input?: string): void {
    if (!input) return
    const sel = window.getSelection()
    const rangeCount = sel?.rangeCount
    // 编辑器未触发focus
    // When the editor does not triggered focus
    if (!rangeCount) {
      return this.insert(input, true)
    }
    // 正常操作：光标在编辑器中，将文本插入至光标处
    // Normal operate: cursor in editor, insert text at cursor
    sel.deleteFromDocument()
    sel.getRangeAt(0).insertNode(createTextNode(input))

    this.setCursorElement(sel.getRangeAt(rangeCount - 1).endContainer)
    // collapses the selection to the end of the last range in the selection.
    sel.collapseToEnd()

    this._dispatchChange()
  }

  /**
   * 检查编辑器最后一段是否为空行，非空行则插入
   * append br section to content element when the lastElementChild is not a br section element
   * @private
   */
  private _lastLine(): void {
    if (!isOnlyBrInChildren(this.$editor.lastElementChild)) {
      const childNodeName = this.options.childNodeName!
      this.$editor.appendChild(createElement(childNodeName, {}, '<br>'))
    }
  }

  /**
   * @method changeNodeName(nodeName)
   * 修改光标所在元素的标签
   * Replace the tag of the element under the cursor
   * @param nodeName? `string` allowed element names, `UL`, `SECTION` etc. If `undefined`, use the default `options.childNodeName`.
   * @return `boolean`
   */
  changeNodeName(nodeName?: string): boolean {
    nodeName = (nodeName || this.options.childNodeName!).toUpperCase()
    // 判断nodeName是否被允许设置
    if (!this.allowedNodeNames.includes(nodeName)) return false
    const currentSection = this.getCursorElement()
    const el = changeNodeName(currentSection, nodeName)

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
      } else {
        const s: CSSProperties = typeof styles === 'string' ? { [styles]: value } : styles
        current.setAttribute('style', toStrStyles(currentStyles, s))
      }
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
