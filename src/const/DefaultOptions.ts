/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/05/05 11:56:04 (GMT+0900)
 */
import * as Types from '../types'

export const ALLOWED_NODE_NAMES = [
  'SECTION',
  'H1',
  'H2',
  'H3',
  'H4',
  'H5',
  'BLOCKQUOTE',
  'UL',
  'OL',
]

export const REPLACE_NODE_LIST = [
  'DIV',
  'P',
  'ARTICLE',
  'ASIDE',
  'DETAILS',
  'SUMMARY',
  'FOOTER',
  'HEADER',
  'MAIN',
  'NAV',
  'SECTION',
  'H1',
  'H2',
  'H3',
  'H4',
  'H5',
  'H6',
  'BLOCKQUOTE',
]

export const DEF_OPTIONS: Types.Options = {
  // 内容是否可以被编辑
  editable: true,
  // 编辑器输入内容绝对定位
  // fixed: false,
  // editor min height
  minHeight: '50vh',
  // style
  placeholder: 'Enter...',
  placeholderColor: '',
  lineHeight: 1.5,
  allowedNodeNames: ALLOWED_NODE_NAMES,
  // paragraph tail spacing, default 10px
  // paragraphTailSpacing: '',
  caretColor: '',
  textColor: '',
  // iphone会自动移动，难控制
  // 光标所在行距页面顶部的距离30px
  cursorOffsetTop: 30,
  // 自定义粘贴处理函数
  customPasteHandler: undefined,
  /**
   * ******************************
   * toolbar options
   * ******************************
   */
  // Has the toolbar been fixed?
  toolbarBeenFixed: true,
  toolbarHeight: 50,
  // buttons name, and order
  toolbarButtons: ['select-picture', 'text-style'],
  /**
   * ******************************
   * image options
   * ******************************
   */
  // customize Picture Handler
  // customPictureHandler: undefined,
  // image max width
  imageMaxWidth: 720,
  // image max size, unit Kib, default 20M
  imageMaxSize: 20480,
  // template
  imageSectionTemp:
    '<section class="child-is-picture"><img src="{url}" loading="lazy"></section>',
  // GIF pictures are not processed
  ignoreGif: true,
  // Force the width/height of the picture, even if the width/height of the picture
  // is smaller than the target width/height
  forceImageResize: false,
  /**
   * ******************************
   * text style options
   * ******************************
   */
  // text style, value ['#333', '#f00', ...]
  // textStyleColors: undefined,
  textStyleTitle: 'Set Style',
  textStyleHeadLeftBtnText: 'Clear style',
  textStyleHeadAlign: 'center',
  /**
   * ******************************
   * color options
   * ******************************
   */
  mainColor: '',
  // border color
  borderColor: '',
}
