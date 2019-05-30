/**
 * Created by Capricorncd.
 * User: https://github.com/capricorncd
 * Date: 2019/04/15 21:52
 */
import util from '../util'

/**
 * 获取剪切文本内容
 * @param e event
 * @return {Promise<any>}
 */
export function getPasteText (e) {
  return new Promise(resolve => {
    let clipboardData = e.clipboardData
    let pasteStr = ''
    if (!clipboardData) {
      resolve('')
      return
    }
    let items = clipboardData.items
    // console.log(e)
    // console.log(clipboardData)
    // console.log(items)
    if (items && items.length > 0) {
      let len = items.length
      let count = 0
      let i, item
      for (i = 0; i < len; i++) {
        item = items[i]
        // 获取文本内容
        if (/^text\/plain/.test(item.type)) {
          item.getAsString(str => {
            pasteStr += str
            counter(count, len)
          })
        } else {
          counter(count, len)
        }
      }
    } else {
      resolve('')
    }

    /**
     * 计数
     * @param count
     * @param len
     */
    function counter(count, len) {
      count++
      if (count === len) resolve(util.strip(pasteStr))
    }
  })
}
