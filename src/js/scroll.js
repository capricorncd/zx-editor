/**
 * Created by zx1984 2018/3/21
 * https://github.com/zx1984
 */
export default {
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
