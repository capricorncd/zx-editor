/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/05/14 23:21:21 (GMT+0900)
 */
import { Editor } from '@zx-editor/editor'
import { $, createElement } from '@zx-editor/helpers'
import { StylePanel } from '@zx-editor/style-panel'
import { Toolbar } from '@zx-editor/toolbar'
import { ZxEditorOptions } from './options'
import './zx-editor.scss'

export class ZxEditor extends Editor {
  private readonly $el: HTMLElement
  private readonly stylePanel: StylePanel
  private readonly toolbar: Toolbar

  constructor(selector: string | HTMLElement | ZxEditorOptions, options: ZxEditorOptions = {}) {
    // check selector
    if (typeof selector === 'string' || selector instanceof HTMLElement) {
      options.container = $(selector) as HTMLElement
    }
    if (!options.container) {
      throw new Error(`Can't found '${selector}' Node in document!`)
    }

    const container = options.container as HTMLElement
    const $el = createElement('div', { class: 'zx-editor' })
    super({
      ...options,
      container: $el,
    })

    container.append($el)
    this.$el = $el

    this.stylePanel = new StylePanel(options)
    this.use(this.stylePanel, this.$el)

    this.toolbar = new Toolbar(options)
    this.use(this.toolbar, this.$el)

    this.on('toolbarButtonClick', (name) => {
      console.log(name)
      if (name === 'text-style') {
        this.stylePanel.show()
      }
    })
  }

  destroy(): void {
    super.destroy()
    this.stylePanel.destroy()
    this.toolbar.destroy()
  }
}
