/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/05/14 23:09:20 (GMT+0900)
 */
import { Editor } from '@/editor'
import { $, $$, createElement, createNode, getStyles } from '@/helpers'
import { createColorVNode } from './helpers'
import { DEF_COLORS, DEF_OPTIONS, STYLE_NODE_DATA, TAG_NODE_DATA } from './const'
import { VirtualNode, StylePanelOptions, EditorPlugin } from '@/types'
import './style-panel.scss'

const rootClassName = 'zx-editor-style-panel'
const classNameFadeIn = `${rootClassName}__fade-in`

export class StylePanel implements EditorPlugin {
  private editorInstance: Editor | null = null
  private $el: HTMLElement
  private readonly _headerSwitchHandler: () => void
  private $elMap: Map<'headerSwitch', HTMLElement>
  private readonly _styleHandler: (e: MouseEvent) => void
  private readonly _colorHandler: (e: MouseEvent) => void
  private readonly _tagHandler: (e: MouseEvent) => void

  constructor(_options: StylePanelOptions) {
    const options = {
      ...DEF_OPTIONS,
      ..._options,
    }
    // ...'
    this.$el = createElement('div', { class: `${rootClassName} border-top` })

    // header
    const header = createElement('div', { class: `${rootClassName}__header` }, options.textStyleTitle)
    const headerLeft = createElement(
      'div',
      { class: `${rootClassName}__header__left` },
      options.textStyleHeadLeftBtnText
    )
    const headerSwitch = createElement('div', { class: `${rootClassName}__header__switch` })
    header.append(headerLeft, headerSwitch)
    // body
    const panelBodyChild: VirtualNode[] = [STYLE_NODE_DATA]
    const COLORS = Array.isArray(options.textStyleColors) ? options.textStyleColors : DEF_COLORS
    if (COLORS.length) {
      const colorsNode = {
        tag: 'dl',
        attrs: {
          class: '__color-wrapper border-bottom',
        },
        child: createColorVNode(COLORS),
      }
      panelBodyChild.push(colorsNode)
    }
    panelBodyChild.push(TAG_NODE_DATA)

    const body = createNode({
      tag: 'div',
      attrs: {
        class: `${rootClassName}__body`,
      },
      child: panelBodyChild,
    }) as HTMLElement

    // append to el
    this.$el.append(header, body)

    this.$elMap = new Map([
      // ['header', header],
      ['headerSwitch', headerSwitch],
    ])

    // events
    this._headerSwitchHandler = (): void => {
      if (this.$el.classList.contains(classNameFadeIn)) {
        this.hide()
      } else {
        this.show()
      }
    }

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
      if (el.classList.contains('active')) return
      $('.active', el.parentElement!)!.classList.remove('active')
      el.classList.add('active')
      const editor = this.editorInstance as Editor
      const color = el.getAttribute('data-color')
      editor.changeStyles({ color })
    }

    this._tagHandler = (e: MouseEvent): void => {
      const el = e.currentTarget as HTMLElement
      if (el.classList.contains('active')) return
      $('.active', el.parentElement!)!.classList.remove('active')
      el.classList.add('active')
      const editor = this.editorInstance as Editor
      const tag = el.getAttribute('data-tag') as string
      editor.changeNodeName(tag)
    }

    headerSwitch.addEventListener('click', this._headerSwitchHandler)
    $$('.__style-wrapper dd', body).forEach((item) => {
      item.addEventListener('click', this._styleHandler)
    })
    $$('.__color-wrapper dd', body).forEach((item) => {
      item.addEventListener('click', this._colorHandler)
    })
    $$('.__tag-wrapper dd', body).forEach((item) => {
      item.addEventListener('click', this._tagHandler)
    })
  }

  install(editor: Editor, parentElement?: HTMLElement): void {
    this.editorInstance = editor
    if (parentElement) parentElement.append(this.$el)
  }

  show(): void {
    this.$el.classList.add(classNameFadeIn)
  }

  hide(): void {
    this.$el.classList.remove(classNameFadeIn)
  }

  destroy(): void {
    this.$elMap.get('headerSwitch')?.removeEventListener('click', this._headerSwitchHandler)
  }
}
