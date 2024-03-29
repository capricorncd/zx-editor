/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/05/14 23:21:21 (GMT+0900)
 */
import { Editor, ALLOWED_NODE_NAMES } from '@sp-editor/editor'
import { StylePanel } from '@sp-editor/style-panel'
import { Toolbar, ButtonOptions } from '@sp-editor/toolbar'
import { AnyObject } from '@sp-editor/types'
import { handleImageFile, MediaFileHandlerData } from 'image-process'
import { $, createElement, slice } from 'zx-sml'
import { SpEditorOptions, DEF_OPTIONS } from './options'
import './style.scss'

/**
 * @document SpEditor
 * SpEditor is a HTML5 rich text editor in smartphone browsers, and it's extends [Editor](./Editor.md).
 *
 * ```js
 * import { SpEditor } from 'sp-editor'
 * import 'sp-editor/css'
 *
 * const spEditor = new SpEditor({
 *   // container: document.querySelector('#app'),
 *   // or
 *   container: '#app',
 * })
 * ```
 */
export class SpEditor extends Editor {
  private readonly $el: HTMLElement
  private readonly stylePanel: StylePanel
  private readonly toolbar: Toolbar
  private fileInput: HTMLInputElement | null = null
  private _inputChangeHandler: (e: Event) => void

  constructor(selector: string | HTMLElement | Partial<SpEditorOptions>, options: Partial<SpEditorOptions> = {}) {
    let container: HTMLElement | null = null
    // check selector
    if (typeof selector === 'string' || selector instanceof HTMLElement) {
      container = $(selector) as HTMLElement
    } else {
      options = selector || {}
      if (typeof options.container === 'string') container = $(options.container) as HTMLElement
    }

    options = {
      ...DEF_OPTIONS,
      ...options,
    }

    if (!container) {
      throw new Error(`Can't found '${selector}' Node in document!`)
    }

    const $el = createElement('div', { class: 'sp-editor' })
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

    // handle picture
    this._inputChangeHandler = (e: Event) => {
      const el = e.currentTarget as HTMLInputElement
      this.handleImageFile(el.files)
        .then((items) => {
          items.forEach((item) => {
            const ignoreGif = /gif$/i.test(item.raw.type) && options.ignoreGif
            this.insert(`<img src="${ignoreGif ? item.raw.data : item.data}">`)
          })
        })
        .catch((err) => {
          this.emit('error', err)
        })
    }

    this.on('toolbarButtonOnClick', (name) => {
      switch (name) {
        case 'choose-picture':
          if (typeof options.customPictureHandler === 'function') {
            options.customPictureHandler()
          } else {
            if (!this.fileInput) {
              const attrs: AnyObject = {
                type: 'file',
                style: {
                  display: 'none',
                },
                accept: options.chooseFileAccept,
              }
              if (options.chooseFileMultiple) attrs.multiple = true
              this.fileInput = createElement<HTMLInputElement>('input', attrs)
              this.$el.append(this.fileInput)
              this.fileInput.addEventListener('change', this._inputChangeHandler)
              this.fileInput.click()
            } else {
              this.fileInput.click()
            }
          }
          break
        case 'text-style':
          this.stylePanel.show()
          break
      }
    })
  }

  /**
   * @method handleImageFile(files)
   * Image files handler.
   * @param files `FileList | File[] | Blob[] | null` Image files.
   * @returns `Promise<MediaFileHandlerData[]` [MediaFileHandlerData](https://github.com/capricorncd/image-process-tools#returns)
   */
  handleImageFile(files: FileList | File[] | Blob[] | null): Promise<MediaFileHandlerData[]> {
    if (!files) return Promise.resolve([])
    return new Promise((resolve, reject) => {
      Promise.all(slice<File, FileList | File[] | Blob[]>(files).map(this._handleFile))
        .then((res) => {
          resolve(res.sort((a, b) => a.index - b.index).map((item) => item.data))
        })
        .catch(reject)
    })
  }

  private _handleFile(file: File | Blob, index: number): Promise<{ data: MediaFileHandlerData; index: number }> {
    return new Promise((resolve, reject) => {
      handleImageFile(file)
        .then((data) => {
          resolve({
            data,
            index,
          })
        })
        .catch(reject)
    })
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
  addToolbarButton(params: ButtonOptions, index?: number) {
    this.toolbar.addButton(params, index)
  }

  /**
   * @method destroy()
   * destroy events
   */
  destroy(): void {
    super.destroy()
    this.stylePanel.destroy()
    this.toolbar.destroy()
    this.fileInput?.removeEventListener('change', this._inputChangeHandler)
  }
}

export { ALLOWED_NODE_NAMES }
export type { SpEditorOptions }
