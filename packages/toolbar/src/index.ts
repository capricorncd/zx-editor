/**!
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/06/18 16:39:57 (GMT+0900)
 */
import './toolbar.scss'
import { Editor, EditorPlugin } from '@zx-editor/editor'
import { isIPhoneX, addClass, removeClass } from '@zx-editor/helpers'
import { CSSProperties } from '@zx-editor/types'
import { createElement, classNames, $$, $ } from 'zx-sml'
import { DEF_OPTIONS, IPHONEX_BOTTOM_OFFSET_HEIGHT } from './const'
import { ButtonOptions, ToolbarOptions } from './types'

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
    this.visible = this.options.toolbarBeenFixed

    // create element
    const height = this.options.toolbarHeight
    this.$el = createElement(
      'div',
      {
        class: 'zx-editor__toolbar border-top',
        style: {
          '--bar-height': height + 'px',
          height: `${height + (isIPhoneX() ? IPHONEX_BOTTOM_OFFSET_HEIGHT : 0)}px`,
        },
      },
      '<dl class="inner-wrapper"></dl>',
    )

    this._btnClickHandler = (e: MouseEvent) => {
      const el = e.currentTarget as HTMLElement
      if (this.editorInstance && el) {
        this.editorInstance.emit('toolbarButtonClick', el.getAttribute('data-name'))
      }
    }
    this.options.toolbarButtons.forEach((btn) => {
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

    if (typeof index === 'number' && index < buttons.length) {
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
