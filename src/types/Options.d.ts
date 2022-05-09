/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/05/05 11:34:18 (GMT+0900)
 */
import { CSSProperties } from './Editor'
export interface Options {
  // container: Selector;
  editable?: boolean
  placeholder?: string
  placeholderColor?: string
  lineHeight?: string | number
  minHeight?: string | number
  // allowed node names
  allowedNodeNames?: string[]
  // paragraph tail spacing, default 10px
  // paragraphTailSpacing?: string | number;
  // 光标颜色
  caretColor?: string
  textColor?: string
  // iphone会自动移动，难控制
  // 光标所在行距页面顶部的距离30px
  cursorOffsetTop?: number
  // 自定义粘贴处理函数
  customPasteHandler?: () => void
  styles?: CSSProperties
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
  /**
   * ******************************
   * image options
   * ******************************
   */
  // customize Picture Handler
  customPictureHandler?: () => void
  // image max width
  imageMaxWidth?: number
  // image max size, unit Kib, default 20M
  imageMaxSize?: number
  // template
  imageSectionTemp?: string
  // GIF pictures are not processed
  ignoreGif?: boolean
  // Force the width/height of the picture, even if the width/height of the picture
  // is smaller than the target width/height
  forceImageResize?: boolean
  /**
   * ******************************
   * text style options
   * ******************************
   */
  // text style, value ['#333', '#f00', ...]
  textStyleColors?: string[]
  textStyleTitle?: string
  textStyleHeadLeftBtnText?: string
  textStyleHeadAlign?: string
  /**
   * ******************************
   * color options
   * ******************************
   */
  mainColor?: string
  // border color
  borderColor?: string
}
