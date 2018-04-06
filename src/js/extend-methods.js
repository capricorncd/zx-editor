/**
 * Created by zx1984 2018/4/6
 * https://github.com/zx1984
 */
import { log, error } from './debug'
/**
 * 将image base64数据，转化为Bolb原始文件数
 * @param base64Data
 * @returns {*} Blob数据
 */
export function toBlobData (base64Data) {
  // base64数据格式:
  // "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAkGB+wgHBgkIBwgKCgkLDRYPDQw//9k="
  let type, onlyData
  if (/^data:(\w+\/\w+);base64,(.+)/.test(base64Data)) {
    type = RegExp.$1
    onlyData = RegExp.$2
  } else {
    error('toBlobData(data), params\'data is not base64 data!')
    return null
  }

  let data = window.atob(onlyData)
  let ia = new Uint8Array(data.length)
  for (let i = 0; i < data.length; i++) {
    ia[i] = data.charCodeAt(i)
  }
  return new Blob([ia], {type: type})
}
