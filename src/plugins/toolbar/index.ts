/**!
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/06/18 16:39:57 (GMT+0900)
 */
import './toolbar.scss'
import { Editor } from '@/editor'
import { DEF_OPTIONS } from './const'
import { createElement } from 'zx-sml'
import { AddButtonOptions, CSSProperties, EditorPlugin, ToolbarOptions } from '@/types'
import { isIPhoneX, addClass, removeClass, classNames, $$, $ } from '@/helpers'
import { IPHONEX_BOTTOM_OFFSET_HEIGHT } from '@/const'

export class Toolbar implements EditorPlugin {
  private editorInstance: Editor | null = null
  public visible: boolean
  private readonly options: ToolbarOptions
  private readonly height: number
  private readonly $el: HTMLDivElement
  private readonly _btnClickHandler: (e: MouseEvent) => void

  constructor(options: ToolbarOptions) {
    // options
    this.options = {
      ...DEF_OPTIONS,
      ...options,
    }

    // visible
    this.visible = this.options.toolbarBeenFixed as boolean

    // create element
    this.height = this.options.toolbarHeight as number
    this.$el = createElement(
      'div',
      {
        class: 'zx-editor-toolbar border-top',
        style: { height: `${this.height + (isIPhoneX() ? IPHONEX_BOTTOM_OFFSET_HEIGHT : 0)}px` },
      },
      `<dl class="inner-wrapper" style="height:${this.height}px;"></dl>`
    )

    this._btnClickHandler = (e: MouseEvent) => {
      const el = e.currentTarget as HTMLElement
      if (this.editorInstance && el) {
        this.editorInstance.emit('toolbarButtonClick', el.getAttribute('data-name'))
      }
    }
    ;(this.options.toolbarButtons || []).forEach((btn) => {
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
  addButton(params: AddButtonOptions, index?: number) {
    // create $node
    const styles: CSSProperties = { ...params.style }
    if (this.options.toolbarHeight) {
      styles.width = styles.height = this.options.toolbarHeight + 'px'
    }
    const btn = createElement(
      'dd',
      {
        class: classNames('icon-item', params.className),
        dataName: params.name,
        style: styles,
      },
      params.innerHtml
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
