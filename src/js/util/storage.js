const DEFAULT_OPTS = {
  // onSet () {},
  prefix: 'zxEditor'
}

class ZxStorage {
  constructor (opts) {
    this.opts = Object.assign({}, DEFAULT_OPTS, opts)
  }

  _key (key) {
    return key ? this.opts.prefix + '_' + key : null
  }

  set (key, data, isSession) {
    // check key
    key = this._key(key)
    if (!key) return false
    // check data
    if (data && typeof data === 'object') {
      data = JSON.stringify(data)
    }
    if (!data || data === '{}' || data === '[]') {
      this.remove(key)
      return false
    }
    const storage = getStorage(isSession)
    // 存储
    try {
      storage.setItem(key, data)
    } catch (e) {
      // this.opts.onSet({
      //   code: 1,
      //   msg: 'set error',
      //   data: e
      // })
      return false
    }
    return true
  }

  get (key, isSession) {
    // check key
    key = this._key(key)
    if (!key) return null
    const storage = getStorage(isSession)
    let data = storage.getItem(key)
    if (data) {
      try {
        data = JSON.parse(data)
      } catch (e) {}
      return data
    }
    return null
  }

  remove (key, isSession) {
    // check key
    key = this._key(key)
    if (!key) return
    const storage = getStorage(isSession)
    storage.removeItem(key)
  }
}

function getStorage (isSession) {
  // check isSession
  if (typeof isSession !== 'boolean') {
    isSession = false
  }
  return isSession ? sessionStorage : localStorage
}

export default ZxStorage
