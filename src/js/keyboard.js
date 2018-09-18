/**
 * Created by Capricorncd
 * https://github.com/capricorncd
 * 2018-09-18 22:58
 */
import util from './util/index'
import broadcast from './broadcast/index'
export function initKeyboard (_this) {
  /**
   * ***************************************************
   * keyboard
   * ***************************************************
   */
  _this.keyboard = {
    height: 0
  }

  _this.setKeyboard = function (params) {
    let isUpdate = false
    if (util.isObject(params)) {
      for (let key in params) {
        if (params.hasOwnProperty(key)) {
          _this.keyboard[key] = params[key]
          isUpdate = true
        }
      }
    }
    if (isUpdate) {
      _this.resetContentPostion( _this.keyboard.height, _this.toolbarHeight)
      broadcast.emit('message', {
        msg: 'Property keyboard has been updated!'
      })
    }
  }
}
