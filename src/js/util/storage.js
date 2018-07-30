class ZxStorage {
  constructor (prefix) {
    this.prefix = (prefix || 'zxEditor') + '_'
  }

  set (key, data, isSession) {
    // check key
    if (!key) return false
    key = this.prefix + key
    // check data
    if (data && typeof data === 'object') {
      data = JSON.stringify(data)
    }
    // check isSession
    if (typeof isSession !== 'boolean') {
      isSession = false
    }
    if (!data || data === '{}' || data === '[]') {
      this.remove(key)
      return false
    }
    const storage = isSession ? sessionStorage : localStorage
    // 存储
    try {
      storage.setItem(key, data)
    } catch (e) {
      console.dir(e)
      return false
    }
    return true
  }

  get (key, isSession) {
    // check key
    if (!key) return null
    key = this.prefix + key
    // check isSession
    if (typeof isSession !== 'boolean') {
      isSession = false
    }
    const storage = isSession ? sessionStorage : localStorage
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
    if (!key) return
    key = this.prefix + key
    // check isSession
    if (typeof isSession !== 'boolean') {
      isSession = false
    }
    const storage = isSession ? sessionStorage : localStorage
    storage.removeItem(key)
  }
}

export default ZxStorage
