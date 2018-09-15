/**
 * Create by capricorncd
 * 2018/5/30 0030.
 */
export default {
  /**
   * BroadCast
   */
  broadcast: {},

  /**
   * on
   * @param notifyName
   * @param fn
   */
  on (notifyName, fn) {
    if (!notifyName
      || typeof notifyName !== 'string'
      || !fn
      || typeof fn !== 'function') return
    if (!this.broadcast[notifyName]) {
      this.broadcast[notifyName] = []
    }
    this.broadcast[notifyName].push(fn)
  },

  /**
   * emit
   * @param notifyName
   */
  emit (notifyName) {
    let notifyArr = this.broadcast[notifyName]
    if (!notifyArr) return
    let args = Array.prototype.slice.call(arguments, 1)
    for (let i = 0; i < notifyArr.length; i++) {
      try {
        notifyArr[i].apply(null, args)
      } catch (e) {
        this.emit('error', {
          code: 1,
          msg: `emit(${notifyName}): ${e.message}`,
          data: e
        })
      }
    }
  },

  /**
   * off
   * @param notifyName
   */
  off (notifyName) {
    if (this.broadcast[notifyName]) {
      this.broadcast[notifyName] = null
      delete this.broadcast[notifyName]
    }
  }
}
