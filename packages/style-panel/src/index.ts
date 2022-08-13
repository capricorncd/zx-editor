/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/05/14 23:09:20 (GMT+0900)
 */
import { Editor, EditorPlugin, EditorOptions } from '@zx-editor/editor'
import { createNode, getStyles } from '@zx-editor/helpers'
import { VirtualNode } from '@zx-editor/types'
import { $, $$, createElement } from 'zx-sml'
import { DEF_COLORS, DEF_OPTIONS, STYLE_NODE_DATA, TAG_NODE_DATA } from './const'
import { createColorVNode } from './helpers'
import { StylePanelOptions } from './options'
import './style-panel.scss'

export type { StylePanelOptions }

const rootClassName = 'style-panel'
const classNameFadeIn = `${rootClassName}__fade-in`

export class StylePanel implements EditorPlugin {
  private editorInstance: Editor | null = null
  private $el: HTMLElement
  private readonly options: StylePanelOptions
  private readonly _headerSwitchHandler: () => void
  private readonly _headerLeftHandler: () => void
  private $elMap: Map<HTMLElement, () => void> = new Map()
  private readonly _styleHandler: (e: MouseEvent) => void
  private readonly _colorHandler: (e: MouseEvent) => void
  private readonly _tagHandler: (e: MouseEvent) => void

  constructor(_options: StylePanelOptions) {
    const options = {
      ...DEF_OPTIONS,
      ..._options,
    }
    this.options = options
    // ...'
    this.$el = createElement('div', { class: `${rootClassName} border-top` })

    // events of style-panel
    this._styleHandler = (e: MouseEvent): void => {
      const editor = this.editorInstance as Editor
      const el = e.currentTarget as HTMLElement
      const newStyle = getStyles(el, 'data-style')
      const oldStyle = editor.getStyles()
      Object.keys(newStyle).forEach((k) => {
        // 如果样式已被设置，则删除该样式
        if (oldStyle[k]) newStyle[k] = ''
      })
      editor.changeStyles(newStyle)
    }

    this._colorHandler = (e: MouseEvent): void => {
      const el = e.currentTarget as HTMLElement
      if (this.updateActiveClassName(el)) {
        const editor = this.editorInstance as Editor
        const color = el.getAttribute('data-color')
        editor.changeStyles({ color })
      }
    }

    this._tagHandler = (e: MouseEvent): void => {
      const el = e.currentTarget as HTMLElement
      if (this.updateActiveClassName(el)) {
        const editor = this.editorInstance as Editor
        const tag = el.getAttribute('data-tag') as string
        editor.changeNodeName(tag)
      }
    }

    // clear styles
    this._headerLeftHandler = (): void => {
      const editor = this.editorInstance as Editor
      const { textColor, childNodeName } = editor.options
      // remove all styles
      editor.changeStyles()
      // change node name with default `options.childNodeName` of the `editor`
      editor.changeNodeName()
      // reset active of the style
      this.updateActiveClassName($(`[data-color="${textColor}"]`, this.$el) as HTMLElement)
      // reset active of the node name
      this.updateActiveClassName($(`[data-tag="${childNodeName}"]`, this.$el) as HTMLElement)
    }

    this._headerSwitchHandler = (): void => {
      if (this.$el.classList.contains(classNameFadeIn)) {
        this.hide()
      } else {
        this.show()
      }
    }
  }

  _initChildEl(editorOptions: EditorOptions): void {
    const { textColor, childNodeName } = editorOptions
    const { textStyleTitle, textStyleHeadLeftBtnText, textStyleColors } = this.options
    // header
    const header = createElement('div', { class: `${rootClassName}__header` }, textStyleTitle)
    const headerLeft = createElement('div', { class: '__left' }, textStyleHeadLeftBtnText)
    const headerSwitch = createElement('div', { class: '__switch' })
    header.append(headerLeft, headerSwitch)
    // body
    const panelBodyChild: VirtualNode[] = [STYLE_NODE_DATA]
    const colors = Array.isArray(textStyleColors) ? textStyleColors : DEF_COLORS
    if (colors.length) {
      // If the editor `options.textColor` does not exist in the `colors`, add it to the `colors`
      // Warning `#333` is not equal `#333333`
      if (textColor && !colors.includes(textColor)) {
        colors.unshift(textColor)
      }
      const colorsNode = {
        tag: 'dl',
        attrs: {
          class: '__color-wrapper border-bottom',
        },
        child: createColorVNode(colors),
      }
      panelBodyChild.push(colorsNode)
    }

    // check tags
    const tags = {
      ...TAG_NODE_DATA,
      child: [...(TAG_NODE_DATA.child as VirtualNode[])],
    }

    const editorChildNodeName = childNodeName!.toLowerCase()

    tags.child.forEach((child) => {
      const dataTag = child.attrs!['data-tag']
      // default childNodeName of editor
      if (dataTag === 'section' && dataTag !== editorChildNodeName) {
        child.attrs!['data-tag'] = editorChildNodeName
      }
    })
    panelBodyChild.push(tags)

    const body = createNode({
      tag: 'div',
      attrs: {
        class: `${rootClassName}__body`,
      },
      child: panelBodyChild,
    }) as HTMLElement

    // append to el
    this.$el.append(header, body)

    $$('.__style-wrapper dd', body).forEach((item) => {
      item.addEventListener('click', this._styleHandler)
    })
    $$('.__color-wrapper dd', body).forEach((item) => {
      item.addEventListener('click', this._colorHandler)
    })
    $$('.__tag-wrapper dd', body).forEach((item) => {
      item.addEventListener('click', this._tagHandler)
    })

    headerLeft.addEventListener('click', this._headerLeftHandler)

    headerSwitch.addEventListener('click', this._headerSwitchHandler)

    this.$elMap.set(headerLeft, this._headerLeftHandler)
    this.$elMap.set(headerSwitch, this._headerSwitchHandler)
  }

  install(editor: Editor, parentElement?: HTMLElement): void {
    this.editorInstance = editor
    if (parentElement) parentElement.append(this.$el)

    // initialize child elements after install call
    this._initChildEl(editor.options)

    // events of editor
    editor.on('click', () => {
      const { textColor, childNodeName } = editor.options
      // style
      const styles = editor.getStyles()
      this.updateActiveClassName($(`[data-color="${styles.color || textColor}"]`, this.$el) as HTMLElement)
      // node name
      const nodeName = editor.getCursorElement(true).nodeName.toLowerCase()
      this.updateActiveClassName($(`[data-tag="${nodeName || childNodeName}"]`, this.$el) as HTMLElement)
    })
  }

  show(): void {
    this.$el.classList.add(classNameFadeIn)
  }

  hide(): void {
    this.$el.classList.remove(classNameFadeIn)
  }

  updateActiveClassName(el: HTMLElement): boolean {
    // The className of this · is already `active`
    if (el.classList.contains('active')) return false
    // Remove `active` className for sibling element
    $('.active', el.parentElement!)!.classList.remove('active')
    // Add `active` className for this el
    el.classList.add('active')
    return true
  }

  destroy(): void {
    this.$elMap.forEach((fn, el) => {
      el.removeEventListener('click', fn)
    })
  }
}
