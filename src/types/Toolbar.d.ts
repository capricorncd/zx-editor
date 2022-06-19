import { CSSProperties } from '@/types/Common'

/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/06/18 18:18:43 (GMT+0900)
 */
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
  el?: HTMLElement
  name?: string
  className?: string
  innerHtml?: string | HTMLElement | Node
  style?: CSSProperties
  events: AddButtonOptionEvent | AddButtonOptionEvent[]
}
