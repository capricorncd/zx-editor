/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/05/05 10:29:43 (GMT+0900)
 */
import { EventEmitter } from '@zx-editor/event-emitter'
import { CSSProperties } from '@zx-editor/types'
import { $, createElement, slice, toStrStyles } from 'zx-sml'
import { NODE_NAME_SECTION, NODE_NAME_BR, ALLOWED_NODE_NAMES } from './const'
import { CursorClass } from './CursorClass'
import { changeNodeName, initContentDom, checkIsEmpty } from './dom'
import { isBrSection, getStyles } from './helpers'
import { DEF_OPTIONS, EditorOptions } from './options'
import './editor.scss'

/**
 * @type EditorPlugin
 */
export interface EditorPlugin {
  install: (e: Editor, parentElement?: HTMLElement) => void
}

/**
 * @document Editor
 * `class` Editor, extends [EventEmitter](./EventEmitter.md)
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
  // 光标处理对象
  private readonly cursor: CursorClass
  // 内容元素事件处理函数
  private readonly _eventHandler: <T extends Event>(e: T) => void
  // 内容中允许使用的元素标签
  private allowedNodeNames: string[]

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
    // cursor
    this.cursor = new CursorClass(this.$editor)
    // content event handler
    this._eventHandler = (e) => {
      const type = e.type
      if (type === 'blur') this._lastLine()
      this.emit(type === 'input' ? 'change' : type, e)
      checkIsEmpty(this.$editor)
      if (type === 'click') {
        this.cursor.setRange(e.target as HTMLElement)
      }
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
  }

  /**
   * @method use(plugin, parentElement?)
   * extension, 扩展插件
   * @param plugin `EditorPlugin`
   * @param parentElement `HTMLElement`
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
    this.$editor.innerHTML = ''
    this.insert(html)
    this._lastLine()
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
   * @method insert(input)
   * 向编辑器中插入内容/HTML代码/元素等
   * insert html or element to content element
   * @param input `string | HTMLElement`
   */
  insert(input: string | HTMLElement): void {
    // insert HTMLElement
    if (input instanceof HTMLElement) {
      this._insert(input)
    }
    // insert string
    else {
      const el = createElement<HTMLDivElement>('div')
      el.innerHTML = input
      slice<Node, NodeList>(el.childNodes).forEach((node) => {
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
    this._dispatchChange()
  }

  /**
   * insert element to content element
   * @param input
   * @private
   */
  private _insert(input: HTMLElement): void {
    const currentSection = this.getCurrentNode()
    if (currentSection) {
      if (isBrSection(currentSection)) {
        this.$editor.insertBefore(input, currentSection)
      } else {
        this.$editor.insertBefore(input, currentSection.nextElementSibling)
      }
    } else {
      this.$editor.append(input)
    }
    if (!this.allowedNodeNames.includes(input.nodeName)) {
      input = changeNodeName(input, NODE_NAME_SECTION)
    }
    // 设置光标元素对象
    this.cursor.setRange(input)
  }

  /**
   * 检查编辑器最后一段是否为空行，非空行则插入
   * append br section to content element when the lastElementChild is not a br section element
   * @private
   */
  private _lastLine(): void {
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
    const currentSection = this.getCurrentNode()
    const el = changeNodeName(currentSection, nodeName)
    if (el) {
      this.cursor.setRange(el)
      this._dispatchChange()
      return true
    }
    return false
  }

  /**
   * @method changeStyles(styles)
   * 修改光标所在元素的样式
   *  Change the style of the element where the cursor is located
   * @param styles `CSSProperties | string`
   * @param value `any`
   */
  changeStyles(styles: CSSProperties | string, value?: unknown): void {
    const current = this.getCurrentNode(true)
    if (current) {
      const s: CSSProperties = typeof styles === 'string' ? { [styles]: value } : styles
      current.setAttribute('style', toStrStyles(getStyles(current), s))
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
    return getStyles(this.getCurrentNode())
  }

  /**
   * @method getCurrentNode(isOnlyContentChild?)
   * 获取光标所在的元素
   * Get the element where the cursor is located
   * @param isOnlyContentChild `boolean` Must be a child element of editor content. For example: when it is `false`, the `li` element is returned in `ul/ol`, and when it is `true`, the `ul/ol` element is returned.
   * @return `HTMLElement | null`
   */
  getCurrentNode(isOnlyContentChild = false): HTMLElement | null {
    return this.cursor.getCurrentNode(isOnlyContentChild)
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
    this.removeAllListeners()
  }
}
