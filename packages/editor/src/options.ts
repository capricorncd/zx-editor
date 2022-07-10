/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/07/10 15:42:54 (GMT+0900)
 */
import { CSSProperties } from 'types'
import { ALLOWED_NODE_NAMES } from './const'

export interface EditorOptions {
  // 编辑器外容器，默认为`.zx-editor`
  container?: string | HTMLElement
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

export const DEF_OPTIONS: EditorOptions = {
  // 内容是否可以被编辑
  editable: true,
  // 编辑器输入内容绝对定位
  // fixed: false,
  // editor min height
  minHeight: '50vh',
  // style
  placeholder: '请在此输入内容..',
  placeholderColor: '#999',
  lineHeight: 1.5,
  allowedNodeNames: ALLOWED_NODE_NAMES,
  // paragraph tail spacing, default 10px
  // paragraphTailSpacing: '',
  caretColor: '',
  textColor: '',
  // iphone会自动移动，难控制
  // 光标所在行距页面顶部的距离30px
  // cursorOffsetTop: 30,
  // 自定义粘贴处理函数
  customPasteHandler: undefined,
  // /**
  //  * ******************************
  //  * toolbar options
  //  * ******************************
  //  */
  // // Has the toolbar been fixed?
  // toolbarBeenFixed: true,
  // toolbarHeight: 50,
  // // buttons name, and order
  // toolbarButtons: ['select-picture', 'text-style'],
  // /**
  //  * ******************************
  //  * image options
  //  * ******************************
  //  */
  // // customize Picture Handler
  // // customPictureHandler: undefined,
  // // image max width
  // imageMaxWidth: 720,
  // // image max size, unit Kib, default 20M
  // imageMaxSize: 20480,
  // // template
  // imageSectionTemp:
  //   '<section class="child-is-picture"><img src="{url}" loading="lazy"></section>',
  // // GIF pictures are not processed
  // ignoreGif: true,
  // // Force the width/height of the picture, even if the width/height of the picture
  // // is smaller than the target width/height
  // forceImageResize: false,
  // /**
  //  * ******************************
  //  * text style options
  //  * ******************************
  //  */
  // // text style, value ['#333', '#f00', ...]
  // // textStyleColors: undefined,
  // textStyleTitle: 'Set Style',
  // textStyleHeadLeftBtnText: 'Clear style',
  // textStyleHeadAlign: 'center',
  // /**
  //  * ******************************
  //  * color options
  //  * ******************************
  //  */
  // mainColor: '',
  // // border color
  // borderColor: '',
}
