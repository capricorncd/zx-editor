/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/07/10 18:14:29 (GMT+0900)
 */
import { CSSProperties } from 'types'

export interface ToolbarOptions {
  /**
   * ******************************
   * toolbar options
   * ******************************
   */
  // Has the toolbar been fixed?
  toolbarBeenFixed?: boolean
  toolbarHeight?: number
  // buttons name, and order
  toolbarButtons?: string[]
}

export interface AddButtonOptionEvent {
  type: string
  handler: () => void
  capture?: boolean
}

export interface AddButtonOptions {
  name: string
  className?: string
  innerHtml?: string | HTMLElement | Node
  style?: CSSProperties
}
