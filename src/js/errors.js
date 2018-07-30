const errors = {
  1: '只支持在正文中插入链接，获取光标位置异常！'
}

let errObj = {}

let key, val
for (key in errors) {
  val = errors[key]
  errObj[key] = {
    code: key,
    msg: val
  }
}

/**
 * 创建错误通知数据
 * @param code
 * @param content
 * @returns {{code: *, msg: (string|XML|*|void)}}
 */
export function createErrmsg (code, params) {
  let content = errors[code]
  return {
    code: code,
    msg: params ? content.replace('{content}', params) : content
  }
}
