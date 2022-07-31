/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/07/10 15:42:54 (GMT+0900)
 */
import { CSSProperties } from '@zx-editor/types'
import { ALLOWED_NODE_NAMES } from './const'

/**
 * @type EditorOptions
 * Editor initialization parameters
 */
export interface EditorOptions {
  // container that Editor parent HTMLElement
  container?: string | HTMLElement
  // The `contenteditable` global attribute is an enumerated attribute indicating if the element should be editable by the user. If so, the browser modifies its widget to allow editing. default `true`.
  editable?: boolean
  // 编辑器内容为空是的提示内容，default `请在此输入内容..`
  placeholder?: string
  // placeholder color, default `#999`
  placeholderColor?: string
  // 编辑器内容行高，default `1.5`
  lineHeight?: string | number
  // min height, default `50vh`
  minHeight?: string | number
  // 允许使用的编辑器子元素节点名称，
  // default `['SECTION', 'H1', 'H2', 'H3', 'H4', 'H5', 'BLOCKQUOTE', 'UL', 'OL']`
  // allowed Node names
  allowedNodeNames?: string[]
  // paragraph tail spacing, default 10px
  paragraphTailSpacing?: string | number
  // 光标颜色
  caretColor?: string
  // 编辑器文本默认颜色
  textColor?: string
  // 自定义用户粘贴处理函数
  customPasteHandler?: (e: ClipboardEvent) => void
  // 编辑器自定义样式
  styles?: CSSProperties
  // insert text to new paragraph, default `false`
  insertTextToNewParagraph?: boolean
}

/**
 * default options
 */
export const DEF_OPTIONS: EditorOptions = {
  // 内容是否可以被编辑
  editable: true,
  // 编辑器输入内容绝对定位
  // editor min height
  minHeight: '50vh',
  // style
  placeholder: '请在此输入内容..',
  placeholderColor: '#999',
  lineHeight: 1.5,
  allowedNodeNames: ALLOWED_NODE_NAMES,
  // paragraph tail spacing, default 10px
  paragraphTailSpacing: '10px',
  caretColor: '',
  textColor: '',
  // 自定义粘贴处理函数
  customPasteHandler: undefined,
  insertTextToNewParagraph: false,
}
