/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/05/05 10:41:45 (GMT+0900)
 */
import { Editor } from '../index'
import { CSSProperties } from './Common'

export interface EditorPlugin {
  install: (e: Editor, parentElement?: HTMLElement) => void
}

export interface EditorOptions {
  // 编辑器外容器，默认为`.zx-editor`
  container: HTMLElement
  // 内容是否可编辑，默认为`true`
  editable?: boolean
  // 编辑器内容为空是的提示内容，默认为`请在此输入内容..`
  placeholder?: string
  // 提示内容的颜色，默认为`#999`
  placeholderColor?: string
  // 编辑器内容行高，默认为`1.5`
  lineHeight?: string | number
  // 编辑器内容区域最小高度，默认`50vh`
  minHeight?: string | number
  // 允许使用的编辑器子元素节点名称，
  // 默认为`['SECTION', 'H1', 'H2', 'H3', 'H4', 'H5', 'BLOCKQUOTE', 'UL', 'OL']`
  // allowed node names
  allowedNodeNames?: string[]
  // paragraph tail spacing, default 10px
  // paragraphTailSpacing?: string | number;
  // 光标颜色
  caretColor?: string
  // 编辑器文本默认颜色
  textColor?: string
  // 自定义用户粘贴处理函数
  customPasteHandler?: () => void
  // 编辑器自定义样式
  styles?: CSSProperties
}
