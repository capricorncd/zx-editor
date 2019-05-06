/**
 * Created by Capricorncd.
 * User: https://github.com/capricorncd
 * Date: 2019/04/24 21:13
 */
import { window } from 'ssr-window'
import { getImageInfo, computeCropInfo, createCanvas } from './helper'

const DEF_OPTIONS = {
  width: 0,
  heigth: 0,
  imageMaxSize: null,
  ignoreGif: true,
  forceResize: false
}

/**
 * base64 data to Blob
 * @param base64Data
 * @return {Blob}
 */
function base64ToBlobData (base64Data) {
  // base64数据格式:
  // "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAkGB+wgHBgkIBwgKCgkLDRYPDQw//9k="
  let type, onlyData
  if (/^data:(\w+\/\w+);base64,(.+)/.test(base64Data)) {
    type = RegExp.$1
    onlyData = RegExp.$2
  } else {
    throw new TypeError(`base64ToBlobData(base64Data), base64Data non-base64 data!`)
  }

  let data = window.atob(onlyData)
  let ia = new Uint8Array(data.length)
  for (let i = 0; i < data.length; i++) {
    ia[i] = data.charCodeAt(i)
  }
  return new Blob([ia], {type: type})
}

/**
 * file to base64 data
 * @param file
 * @param opts
 * @return {Promise<any>}
 */
function fileToBase64 (file, opts) {
  return new Promise((resolve, reject) => {
    if (!file || !file instanceof File) {
      throw new TypeError(`file is not a File object`)
    }

    let options = Object.assign({}, DEF_OPTIONS, opts)

    // check file type
    if (!/image\/.*/i.test(file.type)) {
      reject(new TypeError(`"${file.name}" is not Image File!`))
      return
    }

    // rotate image
    if (typeof window.EXIF === 'undefined') {
      options.orientation = 0
      handleFile(file, options).then(resolve).catch(reject)
    } else {
      window.EXIF.getData(file, function () {
        let info = window.EXIF.getAllTags(this) || {}
        // Shooting direction
        options.orientation = info.Orientation
        handleFile(file, options).then(resolve).catch(reject)
      })
    }
  })
}

/**
 * to blob url
 * @param blob Blob数据
 * @returns {*}
 */
function blobToUrl (blob) {
  return window.URL.createObjectURL(blob)
}

function handleFile (file, opts) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function () {
      // get image info
      getImageInfo(this.result, file, opts, (e, raw) => {
        if (e) {
          reject(e)
          return
        }
        // check gif
        if (file.type === 'image/gif' && opts.ignoreGif) {
          raw.data = file
          raw.url = blobToUrl(file)
          raw.raw = raw
          resolve(raw)
          return
        }
        let result = handleImageData(raw, opts)
        // check file size
        if (opts.imageMaxSize > 0 && result.size / 1024 > opts.imageMaxSize) {
          reject(new RangeError(`File size "${result.size / 1024}" out of range, limit is ${opts.imageMaxSize}Kib`))
          return
        }
        resolve(result)
      })
    }

    reader.onerror = reject
  })
}

/**
 * Processing picture data, clipping and compression
 * @param raw
 * @param opts
 * @private
 */
function handleImageData (raw, opts) {
  // file type
  let dataType = raw.type || raw.file.type

  // Calculate the position and size of zooming or clipping pictures
  let res = computeCropInfo(raw.width, raw.height, opts)

  // image or canvas
  let el = raw.element

  let scaling = 2
  let sw = res.sw
  let sh = res.sh
  let sx = res.sx
  let sy = res.sy

  if (res.scaling > scaling) {
    scaling = res.scaling
    while (scaling > 2) {
      el = createCanvas(el, {
        cw: res.cw * scaling,
        ch: res.ch * scaling,
        sx: sx,
        sy: sy,
        sw: sw,
        sh: sh
      })
      sw = el.width
      sh = el.height
      sx = sy = 0
      scaling -= 1
    }
  }
  el = createCanvas(el, {
    cw: res.cw,
    ch: res.ch,
    sx: sx,
    sy: sy,
    sw: sw,
    sh: sh
  })

  let base64 = el.toDataURL(dataType)
  let blob = base64ToBlobData(base64)

  return {
    element: el,
    type: dataType,
    width: res.cw,
    height: res.ch,
    data: blob,
    base64,
    size: blob.size,
    url: blobToUrl(blob),
    // 原始图片数据
    raw
  }
}

export {
  fileToBase64,
  blobToUrl,
  base64ToBlobData
}
