/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/05/05 16:08:30 (GMT+0900)
 */
import { EventEmitterFn } from '@/types'

export class EventEmitter {
  protected readonly eventList: Record<string, EventEmitterFn[]>

  constructor() {
    this.eventList = {}
  }

  /**
   * on
   * @param eventName
   * @param fn
   */
  on(eventName: string, fn: EventEmitterFn): void {
    if (!eventName || !fn || typeof fn !== 'function') return
    if (!this.eventList[eventName]) {
      this.eventList[eventName] = []
    }
    this.eventList[eventName].push(fn)
  }

  /**
   * emit
   * @param eventName
   * @param args
   */
  emit(eventName: string, ...args: any[]): void {
    const fnList = this.eventList[eventName]
    if (!fnList) return
    for (let i = 0; i < fnList.length; i++) {
      try {
        fnList[i].apply(null, args)
      } catch (e) {
        this.emit('error', e, 'emit')
      }
    }
  }

  /**
   * off
   * @param eventName
   * @param fn
   */
  off(eventName: string, fn?: EventEmitterFn): void {
    if (!this.eventList[eventName]) return

    const eventList = this.eventList[eventName]
    if (typeof fn === 'function') {
      const index = eventList.findIndex((item) => item === fn)
      if (index >= 0) eventList.splice(index, 1)
    } else {
      this.eventList[eventName].length = 0
    }
    this._removeEmpty(eventName)
  }

  /**
   * remove empty event list
   * @param eventName
   * @private
   */
  private _removeEmpty(eventName: string): void {
    if (!this.eventList[eventName].length) {
      delete this.eventList[eventName]
    }
  }

  destroyEventEmitter(): void {
    Object.keys(this.eventList).forEach((key) => this.off(key))
  }
}
