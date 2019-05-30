/**
 * Created by Capricorncd.
 * User: https://github.com/capricorncd
 * Date: 2019/05/04 00:09
 */
import { styleExpansionPanel } from './style-expansion-panel'

export function textStyle () {
  this.toolbar.addButton(styleExpansionPanel.call(this, this.options))
}
