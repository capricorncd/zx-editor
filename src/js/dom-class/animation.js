/**
 * Created by Capricorncd.
 * User: https://github.com/capricorncd
 * Date: 2019/04/17 23:29
 */
import { window } from 'ssr-window'

export const requestAnimationFrame = window.requestAnimationFrame
  || window.webkitRequestAnimationFrame
  || function (callback) {
    return window.setTimeout(callback, 1000 / 60)
  }

export const cancelAnimationFrame = window.cancelAnimationFrame
  || window.webkitCancelAnimationFrame
  || window.clearTimeout
