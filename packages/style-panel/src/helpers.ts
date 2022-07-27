/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/05/15 19:31:10 (GMT+0900)
 */
import { VirtualNode } from '@zx-editor/types'
/**
 * create color vnode
 * @param colors
 * @return Object
 */
export const createColorVNode = (colors: string[]): VirtualNode[] => {
  const arr: VirtualNode[] = []
  colors.forEach((color, i) => {
    if (/^#\w{3,6}$/.test(color)) {
      arr.push({
        tag: 'dd',
        attrs: {
          class: i === 0 ? 'active' : '',
          'data-color': formatColorHexadecimal(color.toLowerCase()),
        },
        child: [
          {
            tag: 'i',
            attrs: {
              style: `background:${color}`,
            },
          },
        ],
      })
    }
  })
  return arr
}

const formatColorHexadecimal = (hex: string): string => {
  const len = hex.length
  return len === 7 ? hex : `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`
}
