/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/07/10 18:14:29 (GMT+0900)
 */
import { CSSProperties } from '@sp-editor/types'

/**
 * @type ToolbarOptions
 * toolbar options
 */
export interface ToolbarOptions {
  // Has the toolbar been fixed. default `true`
  toolbarBeenFixed?: boolean
  // toolbar height. default `50px`
  toolbarHeight?: number | string
  // buttons name, and order. default `['choose-picture', 'text-style']`.
  // Button click events can be listener `editor.on('toolbarButtonOnClick, ('button-name') => { ... })`
  toolbarButtons?: string[]
}

/**
 * @type ButtonOptions
 * button options, use by add button to toolbar
 */
export interface ButtonOptions {
  // button name, returned when button is clicked
  name: string
  // class='name'
  className?: string
  // inner html, Element or Node
  innerHtml?: string | HTMLElement | Node
  // style
  style?: CSSProperties
}

/**
 * default options
 */
export const DEF_OPTIONS: ToolbarOptions = {
  toolbarBeenFixed: true,
  toolbarHeight: '50px',
  // buttons name, and order
  toolbarButtons: ['choose-picture', 'text-style'],
}
