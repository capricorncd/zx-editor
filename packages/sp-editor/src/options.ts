/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/07/10 14:47:59 (GMT+0900)
 */
import { EditorOptions } from '@sp-editor/editor'
import { StylePanelOptions } from '@sp-editor/style-panel'
import { ToolbarOptions } from '@sp-editor/toolbar'

/**
 * @type SpEditorOptions
 * extends [EditorOptions](./editor.md#EditorOptions), [StylePanelOptions](#StylePanelOptions) and [ToolbarOptions](#ToolbarOptions)
 */
export interface SpEditorOptions extends EditorOptions, StylePanelOptions, ToolbarOptions {
  // image options
  // customize Picture Handler
  customPictureHandler?: () => void
  // image max width, default `750`
  imageMaxWidth?: number
  // GIF pictures are not processed, default `true`.
  ignoreGif?: boolean
  // Force the width/height of the picture, even if the width/height of the picture
  // is smaller than the target width/height. default `false`.
  forceImageResize?: boolean
  // When the `multiple` Boolean attribute is specified, the file input allows the user to select more than one file. default `true`.
  chooseFileMultiple?: boolean
  // mimeType, for example `image/jpeg`, default `image/*`
  chooseFileAccept?: string
}

/**
 * default options
 */
export const DEF_OPTIONS: Partial<SpEditorOptions> = {
  imageMaxWidth: 750,
  ignoreGif: true,
  forceImageResize: false,
  chooseFileMultiple: true,
  chooseFileAccept: 'image/*',
}
