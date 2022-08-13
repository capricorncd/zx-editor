/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/05/14 23:21:21 (GMT+0900)
 */
import { Editor, ALLOWED_NODE_NAMES } from '@zx-editor/editor'
import { StylePanel } from '@zx-editor/style-panel'
import { Toolbar, ButtonOptions } from '@zx-editor/toolbar'
import { AnyObject } from '@zx-editor/types'
import { handleImageFile, MediaFileHandlerData } from 'image-process'
import { $, createElement, slice } from 'zx-sml'
import { ZxEditorOptions, DEF_OPTIONS } from './options'
import './style.scss'

/**
 * @document ZxEditor
 * extends [Editor](./Editor.md)
 */
export class ZxEditor extends Editor {
  private readonly $el: HTMLElement
  private readonly stylePanel: StylePanel
  private readonly toolbar: Toolbar
  private fileInput: HTMLInputElement | null = null
  private _inputChangeHandler: (e: Event) => void

  constructor(selector: string | HTMLElement | Partial<ZxEditorOptions>, options: Partial<ZxEditorOptions> = {}) {
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

  handleImageFile(files?: FileList | File[] | Blob[] | null): Promise<MediaFileHandlerData[]> {
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
   *
   * @param params
   * @param index
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
