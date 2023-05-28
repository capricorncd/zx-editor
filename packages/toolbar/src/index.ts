/**!
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/06/18 16:39:57 (GMT+0900)
 */
import './toolbar.scss'
import { Editor, EditorPlugin } from '@sp-editor/editor'
import { addClass, removeClass } from '@sp-editor/helpers'
import { CSSProperties } from '@sp-editor/types'
import { createElement, classNames, $$, $, splitValue } from 'zx-sml'
import { ButtonOptions, ToolbarOptions, DEF_OPTIONS } from './options'

export const IPHONEX_BOTTOM_OFFSET_HEIGHT = 34

export type { ButtonOptions, ToolbarOptions }

export class Toolbar implements EditorPlugin {
  private editorInstance: Editor | null = null
  public visible: boolean
  private readonly options: ToolbarOptions
  private readonly $el: HTMLDivElement
  private readonly _btnClickHandler: (e: MouseEvent) => void

  constructor(options: Partial<ToolbarOptions>) {
    // options
    this.options = {
      ...DEF_OPTIONS,
      ...options,
    }

    // visible
    this.visible = this.options.toolbarBeenFixed!

    // create element
    const [height, unit] = splitValue(this.options.toolbarHeight || '')
    this.$el = createElement(
      'div',
      {
        class: 'sp-editor__toolbar border-top',
        style: {
          '--bar-height': height ? `${height}${unit}` : null,
        },
      },
      '<dl class="inner-wrapper"></dl>',
    )

    this._btnClickHandler = (e: MouseEvent) => {
      const el = e.currentTarget as HTMLElement
      if (this.editorInstance && el) {
        this.editorInstance.emit('toolbarButtonOnClick', el.getAttribute('data-name'))
      }
    }
    this.options.toolbarButtons!.forEach((btn) => {
      this.addButton({ name: btn })
    })
  }

  install(editor: Editor, parentElement?: HTMLElement): void {
    this.editorInstance = editor
    if (parentElement) parentElement.append(this.$el)

    if (this.visible) {
      this.show()
    }
  }

  show() {
    addClass(this.$el, '__fade-in')
    this.visible = true
    this.editorInstance!.emit('toolbarShow', true, this)
  }

  hide() {
    removeClass(this.$el, '__fade-in')
    this.visible = false
    this.editorInstance!.emit('toolbarShow', false, this)
  }

  /**
   * add button
   * @param params
   * @param index Insert index
   */
  addButton(params: ButtonOptions, index?: number) {
    // create $node
    const styles: CSSProperties = { ...params.style }
    const btn = createElement(
      'dd',
      {
        class: classNames('icon-item', params.className),
        dataName: params.name,
        style: styles,
      },
      params.innerHtml,
    )

    // insert to document
    const buttons = $$('dd', this.$el)
    const btnContainer = $('dl', this.$el) as HTMLDListElement

    if (typeof index === 'number' && index >= 0 && index < buttons.length) {
      btnContainer.insertBefore(btn, buttons[index])
    } else {
      btnContainer.append(btn)
    }
    btn.addEventListener('click', this._btnClickHandler)
  }

  destroy() {
    $$('.icon-item', this.$el).forEach((el) => {
      el.removeEventListener('click', this._btnClickHandler)
    })
  }
}
