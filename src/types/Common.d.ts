/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/05/14 23:25:56 (GMT+0900)
 */
export type Selector = string | HTMLElement
export type CSSProperties = Record<string, unknown>
export type EventEmitterFn = (...args: any[]) => void

export interface VirtualNode {
  tag: string
  attrs?: Record<string, any>
  child?: (VirtualNode | string)[] | string
}
