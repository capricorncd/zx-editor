/**
 * Created by zx1984 2018/3/21
 * https://github.com/zx1984
 */
import util from '../util/index'
export default {
  /**
   * 滚动值底部
   * 将$el scrollTop设为最大值
   * @param $el
   * @param offset 偏移量
   */
  toBottom ($el, offset = 0) {
    $el.scrollTop = $el.scrollHeight - util.int(offset)
  },
  top () {
    return (window.pageYOffset !== undefined)
      ? window.pageYOffset
      : (document.documentElement.scrollTop || document.body.scrollTop)
  },

  height () {
    return (document.documentElement || document.body).scrollHeight
  },

  to (x, y) {
    (document.documentElement || document.body.parentNode || document.body).scrollTo(x, y)
  },

  left () {
    return (window.pageXOffset !== undefined)
      ? window.pageXOffset
      : (document.documentElement || document.body.parentNode || document.body).scrollLeft
  }
}
