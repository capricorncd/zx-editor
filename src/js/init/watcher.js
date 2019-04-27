/**
 * Created by Capricorncd.
 * User: https://github.com/capricorncd
 * Date: 2019/04/25 21:29
 */
export function onWatcher () {
  /**
   * *********************************
   * toolbar change
   * *********************************
   */
  this.on('toolbarShow', toolbar => {
    this.$content.css('padding-bottom', toolbar.height + 'px')
  })
  this.on('toolbarHide', () => {
    this.$content.css('padding-bottom', 0)
  })
}
