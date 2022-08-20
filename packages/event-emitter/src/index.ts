/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/05/05 16:08:30 (GMT+0900)
 *
 * @document EventEmitter
 * This module, in particular, offers the EventEmitter class, which we'll use to handle our events.
 * ```js
 * import { EventEmitter } from 'sp-editor/event-emitter';
 * // For example, let's create a start event, and as a matter of providing a sample,
 * // we react to that by just logging to the console:
 * const eventEmitter = new EventEmitter()
 *
 * eventEmitter.on('start', () => {
 *   console.log('started')
 * })
 *
 * // When we run
 * eventEmitter.emit('start')
 * // the event handler function is triggered, and we get the console log.
 * ```
 */
/**
 * @type EventEmitterCallback
 */
export type EventEmitterCallback = (...args: any[]) => void

/**
 * EventEmitter
 */
export class EventEmitter {
  protected readonly _events: Record<string, EventEmitterCallback[]>

  constructor() {
    this._events = {}
  }

  /**
   * @method on(eventName, fn)
   * `on` is used to add a callback function that's going to be executed when the event is triggered.
   * @param eventName `string` custom event name.
   * @param fn `Function` callback function.
   * @returns `EventEmitter`
   */
  on(eventName: string, fn: EventEmitterCallback): EventEmitter {
    if (!eventName || !fn || typeof fn !== 'function') return this
    if (!this._events[eventName]) this._events[eventName] = []
    this._events[eventName].push(fn)
    return this
  }

  /**
   * @method once(eventName, fn)
   * `once` add a one-time listener.
   * @param eventName `string` custom event name.
   * @param fn `Function` callback function.
   * @returns `EventEmitter`
   */
  once(eventName: string, fn: EventEmitterCallback): EventEmitter {
    const onceFn = (...args: any[]) => {
      fn.apply(this, args)
      this.off(eventName, onceFn)
    }
    return this.on(eventName, onceFn)
  }

  /**
   * @method emit(eventName, arg1, arg2, ..., argN)
   * `emit` is used to trigger an event.
   * @param eventName `string`
   * @param args `any`
   * @returns `EventEmitter`
   */
  emit(eventName: string, ...args: any[]): EventEmitter {
    const fnList = this._events[eventName]
    if (!fnList) return this
    for (let i = 0; i < fnList.length; i++) {
      try {
        fnList[i].apply(this, args)
      } catch (e) {
        this.emit('error', e, 'emit')
      }
    }
    return this
  }

  /**
   * @method off(eventName, fn)
   * remove an event listener from an event.
   * @param eventName `string` custom event name.
   * @param fn? `Function` callback function. When `fn` is not a function, all monitoring functions of `eventName` will be removed.
   * @returns `EventEmitter`
   */
  off(eventName: string, fn?: EventEmitterCallback): EventEmitter {
    if (!this._events[eventName]) return this

    const events = this._events[eventName]
    if (typeof fn === 'function') {
      const index = events.findIndex((item) => item === fn)
      if (index >= 0) events.splice(index, 1)
    } else {
      this._events[eventName].length = 0
    }
    this._removeEmpty(eventName)
    return this
  }

  /**
   * _removeEmpty(eventName)
   * remove empty event list
   * @param eventName `string`
   * @private
   * @returns `void`
   */
  private _removeEmpty(eventName: string): void {
    if (!this._events[eventName].length) {
      delete this._events[eventName]
    }
  }

  /**
   * @method destroyEventEmitter()
   * remove all listeners for an event.
   * @returns `void`
   */
  removeAllListeners(): void {
    Object.keys(this._events).forEach((key) => this.off(key))
  }
}
