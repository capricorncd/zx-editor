/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/05/05 10:29:43 (GMT+0900)
 */
import { $, createElement, changeNodeName, slice, isBrSection } from './helpers'
import { CursorClass, EventEmitter } from './core'
import { DEF_OPTIONS, NODE_NAME_SECTION, NODE_NAME_BR } from './const'
import * as Types from './types'
import { initEditorDom, initContentDom } from './core'

export class ZxEditor extends EventEmitter {
  private readonly $wrapper: HTMLElement
  public readonly version: string
  private readonly options: Types.Options
  private readonly $editor: HTMLDivElement
  private readonly $content: HTMLDivElement
  private readonly cursor: CursorClass
  private readonly _contentEvent: <T extends Event>(e: T) => void

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

    this.options = {
      ...DEF_OPTIONS,
      ...options,
    }

    this.$content = initContentDom(this.options)

    this.$editor = initEditorDom()

    this.$editor.append(this.$content)
    this.$wrapper.append(this.$editor)

    this.$content.focus()

    this.cursor = new CursorClass(this.$content)

    this._contentEvent = (e) => {
      const type = e.type
      if (type === 'blur') this._lastLine()
      this.emit(type === 'input' ? 'change' : type, e)
    }

    this._initEvents()
  }

  private _initEvents(): void {
    this.$content.addEventListener('focus', this._contentEvent)

    this.$content.addEventListener('blur', this._contentEvent)

    this.$content.addEventListener('input', this._contentEvent)
  }

  /**
   * use
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

  setHtml(html: string): void {
    this.$content.innerHTML = ''
    this.insert(html)
    this._lastLine()
  }

  getHtml(): string {
    return this.$content.innerHTML.replace(/<section><br><\/section>$/, '')
  }

  /**
   * Node.nodeType
   * ELEMENT_NODE  1
   * ATTRIBUTE_NODE  2
   * TEXT_NODE  3
   * CDATA_SECTION_NODE  4
   * PROCESSING_INSTRUCTION_NODE  7
   * COMMENT_NODE  8
   * DOCUMENT_NODE  9
   * DOCUMENT_TYPE_NODE  10
   * DOCUMENT_FRAGMENT_NODE  11
   * @param input
   */
  insert(input: string | HTMLElement): void {
    if (input instanceof HTMLElement) {
      this._insert(input)
    } else {
      const el = createElement<HTMLDivElement>('div')
      el.innerHTML = input
      slice<Node, NodeList>(el.childNodes).forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          if (node.nodeName === NODE_NAME_BR) {
            this._insert(createElement(NODE_NAME_SECTION, {}, '<br/>'))
          } else {
            this._insert(node as HTMLElement)
          }
        } else if (node.textContent) {
          this._insert(createElement(NODE_NAME_SECTION, {}, node.textContent))
        }
      })
    }
  }

  private _insert(input: HTMLElement): void {
    console.log(input)
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

    changeNodeName(input, NODE_NAME_SECTION)
  }

  private _lastLine(): void {
    if (!isBrSection(this.$content.lastElementChild)) {
      this.$content.appendChild(createElement('section', {}, '<br>'))
    }
  }

  destroy(): void {
    this.$content.removeEventListener('focus', this._contentEvent)

    this.$content.removeEventListener('blur', this._contentEvent)

    this.$content.removeEventListener('input', this._contentEvent)

    this.destroyEventEmitter()
  }
}
