/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/05/05 10:29:43 (GMT+0900)
 */
import { $, createElement, slice, isBrSection, getStyles, createStyles } from './helpers'
import { CursorClass, EventEmitter, changeNodeName, initEditorDom, initContentDom } from './core'
import { DEF_OPTIONS, NODE_NAME_SECTION, NODE_NAME_BR, ALLOWED_NODE_NAMES } from './const'
import * as Types from './types'

export class ZxEditor extends EventEmitter {
  // 编辑器外部容器HTML元素
  private readonly $wrapper: HTMLElement
  // 版本
  public readonly version: string
  // 参数
  private readonly options: Types.Options
  // 编辑器HTML元素
  private readonly $editor: HTMLDivElement
  // 编辑器内容区域HTML元素
  private readonly $content: HTMLDivElement
  // 光标处理对象
  private readonly cursor: CursorClass
  // 内容元素事件处理函数
  private readonly _contentEvent: <T extends Event>(e: T) => void
  // 内容中允许使用的元素标签
  private allowedNodeNames: string[]

  constructor(selector: Types.Selector, options?: Types.Options) {
    super()

    if (!(this instanceof ZxEditor)) {
      throw new Error('ZxEditor is a constructor and should be called with the `new` keyword')
    }
    /**
     * ***************************************************
     * check selector
     * ***************************************************
     */
    const container: HTMLElement | null = $(selector)

    if (!container) {
      throw new Error(`Can't found '${selector}' Node in document!`)
    }

    this.$wrapper = container

    // version
    this.version = '__VERSION__'
    // options
    this.options = { ...DEF_OPTIONS, ...options }
    this.allowedNodeNames = (this.options.allowedNodeNames || ALLOWED_NODE_NAMES).map(item => item.toUpperCase())
    // elements
    this.$content = initContentDom(this.options)
    this.$editor = initEditorDom()
    this.$editor.append(this.$content)
    this.$wrapper.append(this.$editor)
    // cursor
    this.cursor = new CursorClass(this.$content)
    // content event handler
    this._contentEvent = (e) => {
      const type = e.type
      if (type === 'blur') this._lastLine()
      this.emit(type === 'input' ? 'change' : type, e)
    }

    this._initEvents()
  }

  /**
   * init events
   * @private
   */
  private _initEvents(): void {
    this.$content.addEventListener('focus', this._contentEvent)
    this.$content.addEventListener('blur', this._contentEvent)
    this.$content.addEventListener('input', this._contentEvent)
  }

  /**
   * 扩展插件
   * @param plugin
   */
  use(plugin: Types.Plugin): void {
    if (typeof plugin.install === 'function') {
      plugin.install(this)
    }
  }

  /**
   * plugin
   * @param fn
   */
  plugin(fn: () => void) {
    if (typeof fn === 'function') fn.call(this)
  }

  /**
   * 设置编辑器内容，会覆盖之前内容
   * set html to the content element
   * @param html
   */
  setHtml(html: string): void {
    this.$content.innerHTML = ''
    this.insert(html)
    this._lastLine()
  }

  /**
   * 获取编辑器中的HTML代码，会自动去除结尾处的空行
   * get html string from content element
   * remove last line that `<section><br></section>`
   * @return html string
   */
  getHtml(): string {
    return this.$content.innerHTML.replace(/<section><br><\/section>$/, '')
  }

  /**
   * 向编辑器中插入内容/HTML代码/元素等
   * insert html or element to content element
   * @param input
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
  }

  /**
   * insert element to content element
   * @param input
   * @private
   */
  private _insert(input: HTMLElement): void {
    const currentSection = this.cursor.getCurrentNode()
    if (currentSection) {
      if (isBrSection(currentSection)) {
        this.$content.insertBefore(input, currentSection)
      } else {
        this.$content.insertBefore(input, currentSection.nextElementSibling)
      }
    } else {
      this.$content.append(input)
    }
    if (!this.allowedNodeNames.includes(input.nodeName)) {
      input = changeNodeName(input, NODE_NAME_SECTION)
    }
    this.$content.dispatchEvent(new InputEvent('input'))
    // 设置光标元素对象
    this.cursor.setRange(input)
  }

  /**
   * 检查编辑器最后一段是否为空行，非空行则插入
   * append br section to content element when the lastElementChild is not a br section element
   * @private
   */
  private _lastLine(): void {
    if (!isBrSection(this.$content.lastElementChild)) {
      this.$content.appendChild(createElement('section', {}, '<br>'))
    }
  }

  /**
   * 修改光标所在元素的标签
   * @param nodeName
   */
  changeNodeName(nodeName: string): boolean {
    // 判断nodeName是否被允许设置
    if (!this.allowedNodeNames.includes(nodeName.toUpperCase())) return false
    const currentSection = this.cursor.getCurrentNode()
    return !!(currentSection && changeNodeName(currentSection, nodeName))
  }

  /**
   * 修改光标所在元素的样式
   * @param styles
   * @param value
   */
  changeStyles(styles: Types.CSSProperties | string, value?: unknown): void {
    const current = this.cursor.getCurrentNode(true)
    if (current) {
      const s: Types.CSSProperties = typeof styles === 'string' ? { [styles]: value } : styles
      current.setAttribute('style', createStyles(getStyles(current), s))
    }
  }

  /**
   * 销毁事件
   * destroy events
   */
  destroy(): void {
    this.$content.removeEventListener('focus', this._contentEvent)
    this.$content.removeEventListener('blur', this._contentEvent)
    this.$content.removeEventListener('input', this._contentEvent)
    this.destroyEventEmitter()
  }
}
