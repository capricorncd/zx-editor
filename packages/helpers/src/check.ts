/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/06/18 18:25:48 (GMT+0900)
 */
// navigator
const USER_AGENT = window.navigator.userAgent
const PLATFORM = window.navigator.platform

export function isIPhone() {
  return /iphone/i.test(USER_AGENT) && /iphone/.test(PLATFORM)
}
