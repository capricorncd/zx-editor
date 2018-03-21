/**
 * Created by zx1984 2018/3/21
 * https://github.com/zx1984
 */

export function log () {
  for (let i = 0; i < arguments.length; i++) {
    console.log(arguments[i])
  }
}

export function error () {
  for (let i = 0; i < arguments.length; i++) {
    console.error(arguments[i])
  }
}

