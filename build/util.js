/**
 * Created by capricorncd 7/21/2018
 * https://github.com/capricorncd
 */
function formatDate (date, formatString) {
  if (typeof formatString === 'undefined' && typeof date === 'string') {
    formatString = date
    date = new Date()
  }

  if (!date || date === 'Invalid Date' || !(date instanceof Date)) return date
  if (/(y+)/i.test(formatString)) {
    formatString = formatString.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let obj = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let key in obj) {
    if (new RegExp(`(${key})`).test(formatString)) {
      let str = obj[key] + ''
      formatString = formatString.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : doubleDigit(str))
    }
  }
  return formatString
}

function doubleDigit (n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatDate
}
