/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/07/10 18:13:26 (GMT+0900)
 */
import { DEF_COLORS } from './const'
/**
 * @type StylePanelOptions
 */
export interface StylePanelOptions {
  // colors array of style panel, default `['#333333', '#d0d0d0', '#ff583d', '#fdaa25', '#44c67b', '#14b2e0', '#b065e2']`.
  textStyleColors?: string[]
  // title of style panel, default `Set Style`.
  textStyleTitle?: string
  // text of button that style panel's left, default `Clear`.
  textStyleHeadLeftBtnText?: string
}

/**
 * default options
 */
export const DEF_OPTIONS: StylePanelOptions = {
  textStyleColors: [...DEF_COLORS],
  textStyleTitle: 'Set Style',
  textStyleHeadLeftBtnText: 'Clear',
}
