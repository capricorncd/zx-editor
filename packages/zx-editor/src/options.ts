/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/07/10 14:47:59 (GMT+0900)
 */
import { EditorOptions } from 'editor'
import { StylePanelOptions } from 'style-panel'
import { ToolbarOptions } from 'toolbar'

export interface ZxEditorOptions extends EditorOptions, StylePanelOptions, ToolbarOptions {
  container?: string | HTMLElement
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
   * color options
   * ******************************
   */
  mainColor?: string
  // border color
  borderColor?: string
}
