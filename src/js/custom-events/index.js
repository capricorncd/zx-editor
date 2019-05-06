/**
 * Create by capricorncd
 * 2018/5/30 0030.
 */
/**
 * on
 * @param notifyName
 * @param fn
 */
function on (notifyName, fn) {
  if (!notifyName
    || typeof notifyName !== 'string'
    || !fn
    || typeof fn !== 'function') return
  if (!this.customEvents[notifyName]) {
    this.customEvents[notifyName] = []
  }
  this.customEvents[notifyName].push(fn)
}

/**
 * emit
 * @param notifyName
 */
function emit (notifyName) {
  let notifyArr = this.customEvents[notifyName]
  if (!notifyArr) return
  let args = Array.prototype.slice.call(arguments, 1)
  for (let i = 0; i < notifyArr.length; i++) {
    try {
      notifyArr[i].apply(null, args)
    } catch (e) {
      this.emit('error', e, 'emit')
    }
  }
}

/**
 * off
 * @param notifyName
 */
function off (notifyName, fn) {
  if (this.customEvents[notifyName]) {
    if (typeof fn === 'function' && this.customEvents[notifyName]) {
      let index = this.customEvents[notifyName].findIndex(item => item === fn)
      if (index >= 0) this.customEvents[notifyName].splice(index, 1)
    } else {
      this.customEvents[notifyName] = null
      delete this.customEvents[notifyName]
    }
  }
}

export {
  on,
  emit,
  off
}
