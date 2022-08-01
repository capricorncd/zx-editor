/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/07/10 18:14:29 (GMT+0900)
 */
import { CSSProperties } from '@zx-editor/types'

/**
 * @type ToolbarOptions
 * toolbar options
 */
export interface ToolbarOptions {
  // Has the toolbar been fixed. default `true`
  toolbarBeenFixed: boolean
  // toolbar height. default `50`
  toolbarHeight: number
  // buttons name, and order. default `['choose-picture', 'text-style']`
  toolbarButtons: string[]
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
  innerHtml?: string | HTMLElement | Node
  style?: CSSProperties
}
