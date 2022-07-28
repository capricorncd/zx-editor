/*!
 * @zx-editor/event-emitter version 1.0.0
 * Author: Capricorncd
 * Released under the MIT License
 * Repository: https://github.com/capricorncd/zx-editor
 * Released on: 2022-07-28 21:55:39 (GMT+0900)
 * Copyright © 2018-present, Capricorncd
 */
class r {
  constructor() {
    this._events = {};
  }
  on(t, s) {
    return !t || !s || typeof s != "function" ? this : (this._events[t] || (this._events[t] = []), this._events[t].push(s), this);
  }
  once(t, s) {
    const i = (...e) => {
      s.apply(this, e), this.off(t, i);
    };
    return this.on(t, i);
  }
  emit(t, ...s) {
    const i = this._events[t];
    if (!i)
      return this;
    for (let e = 0; e < i.length; e++)
      try {
        i[e].apply(this, s);
      } catch (n) {
        this.emit("error", n, "emit");
      }
    return this;
  }
  off(t, s) {
    if (!this._events[t])
      return this;
    const i = this._events[t];
    if (typeof s == "function") {
      const e = i.findIndex((n) => n === s);
      e >= 0 && i.splice(e, 1);
    } else
      this._events[t].length = 0;
    return this._removeEmpty(t), this;
  }
  _removeEmpty(t) {
    this._events[t].length || delete this._events[t];
  }
  removeAllListeners() {
    Object.keys(this._events).forEach((t) => this.off(t));
  }
}
export {
  r as EventEmitter
};
