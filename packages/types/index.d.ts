/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/07/10 14:04:24 (GMT+0900)
 */
export type CSSProperties = Record<string, any>

export interface VirtualNode {
  tag: string
  attrs?: Record<string, any>
  child?: (VirtualNode | string)[] | string
}
