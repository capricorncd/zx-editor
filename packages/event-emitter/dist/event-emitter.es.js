/*!
 * @zx-editor/event-emitter version 1.0.0
 * Author: Capricorncd
 * Released under the MIT License
 * Repository: https://github.com/capricorncd/zx-editor
 * Released on: 2022-07-27 21:13:07 (GMT+0900)
 * Copyright © 2018-present, Capricorncd
 */
class EventEmitter {
  constructor() {
    this._events = {};
  }
  on(eventName, fn) {
    if (!eventName || !fn || typeof fn !== "function")
      return this;
    if (!this._events[eventName])
      this._events[eventName] = [];
    this._events[eventName].push(fn);
    return this;
  }
  once(eventName, fn) {
    const onceFn = (...args) => {
      fn.apply(this, args);
      this.off(eventName, onceFn);
    };
    return this.on(eventName, onceFn);
  }
  emit(eventName, ...args) {
    const fnList = this._events[eventName];
    if (!fnList)
      return this;
    for (let i = 0; i < fnList.length; i++) {
      try {
        fnList[i].apply(this, args);
      } catch (e) {
        this.emit("error", e, "emit");
      }
    }
    return this;
  }
  off(eventName, fn) {
    if (!this._events[eventName])
      return this;
    const events = this._events[eventName];
    if (typeof fn === "function") {
      const index = events.findIndex((item) => item === fn);
      if (index >= 0)
        events.splice(index, 1);
    } else {
      this._events[eventName].length = 0;
    }
    this._removeEmpty(eventName);
    return this;
  }
  _removeEmpty(eventName) {
    if (!this._events[eventName].length) {
      delete this._events[eventName];
    }
  }
  removeAllListeners() {
    Object.keys(this._events).forEach((key) => this.off(key));
  }
}
export { EventEmitter };
