/**
 * Created by Capricorncd.
 * User: https://github.com/capricorncd
 * Date: 2019/04/23 22:44
 */
import Toolbar from '../toolbar/index'
import { selectPictureBtn } from './select-picture-btn'
import { styleExpansionPanel } from '../text-style/style-expansion-panel'

export function initToolbar (options) {
  // toolbar
  this.toolbar = new Toolbar(options, this)

  // Add buttons sequentially
  options.toolbarBtns.forEach(name => {
    if (name === 'select-picture') {
      this.toolbar.addButton(selectPictureBtn.call(this, options))
    } else if (name === 'text-style') {
      this.toolbar.addButton(styleExpansionPanel.call(this, options))
    }
  })
}
