/**
 * Created by Capricorncd.
 * User: https://github.com/capricorncd
 * Date: 2019/04/24 21:37
 */
import { document } from 'ssr-window'
import util from "../util";

export function getImageInfo (base64, file, opts, callback) {
  let img = document.createElement('img')
  img.src = base64
  img.setAttribute('alt', file.name)
  // 加载图片
  img.onload = function () {
    let defaultData = {
      element: img,
      base64,
      width: img.naturalWidth || img.width,
      height: img.naturalHeight || img.height,
      type: file.type,
      size: file.size,
      name: file.name,
      file
    }
    callback(null, opts.orientation > 1 ? rotateAndToBase64(defaultData, opts.orientation) : defaultData)
  }

  img.onerror = callback
}

/**
 * Decide whether the picture is rotated or not according to 'opts.orientation' value
 * @param raw
 * @param type
 * @returns {Object}
 */
function rotateAndToBase64 (raw, orientation) {
  let canvas = document.createElement('canvas')
  let ctx = canvas.getContext('2d')
  let img = raw.element
  let imgWidth = raw.width
  let imgHeight = raw.height
  canvas.width = imgWidth
  canvas.height = imgHeight
  // rotate image
  switch(orientation) {
    // 90deg
    case 6:
      canvas.width = imgHeight
      canvas.height = imgWidth
      ctx.rotate(Math.PI / 2)
      // (0, -imgHeight)
      ctx.drawImage(img, 0, -imgHeight, imgWidth, imgHeight)
      break
    // 180deg
    case 3:
      ctx.rotate(Math.PI)
      ctx.drawImage(img, -imgWidth, -imgHeight, imgWidth, imgHeight)
      break;
    // -90(270)deg
    case 8:
      canvas.width = imgHeight
      canvas.height = imgWidth
      ctx.rotate(3 * Math.PI / 2)
      ctx.drawImage(img, -imgWidth, 0, imgWidth, imgHeight)
      break
    default:
      ctx.drawImage(img, 0, 0, imgWidth, imgHeight)
  }
  let base64 = canvas.toDataURL(raw.type)
  img.src = base64

  return Object.assign(raw, {
    element: canvas,
    base64,
    width: canvas.width,
    height: canvas.height
  })
}

/**
 * 创建Canvas
 * @param el Image object or Canvas element
 * @param p clip options
 * @returns {Element}
 */
export function createCanvas (el, p) {
  const canvas = document.createElement('canvas')
  canvas.width = p.cw
  canvas.height = p.ch
  const ctx = canvas.getContext('2d')
  // 操作过于频繁，iPhone部分手机会获取不到ctx，is null
  // 下面代码会抛出异常
  ctx.drawImage(el, p.sx, p.sy, p.sw, p.sh, 0, 0, canvas.width, canvas.height)
  return canvas
}

/**
 * 缩放比列
 * @param {Number} numerator
 * @param {Number} denominator
 */
function ratio (numerator, denominator) {
  return parseInt(numerator / denominator * 10000) / 10000
}

/**
 * Calculate the position and size of the generated image clipping
 * @param {Number} iw // image width
 * @param {Number} ih // image height
 * @param {Object} opts
 */
export function computeCropInfo (iw, ih, opts) {
  // target image width, height
  let targetWidth = util.int(opts.width)
  let targetHeight = util.int(opts.height)

  // image width or height, less than target width or height
  // don't resize
  if (!opts.forceImageResize && (targetWidth > 0 && iw < targetWidth)
    && (targetHeight > 0 && ih < targetHeight)) {
    return {
      sx: 0,
      sy: 0,
      sw: iw,
      sh: ih,
      scaling: 1,
      cw: iw,
      ch: ih
    }
  }

  // scaling
  let scaling = 1

  // Pictures begin to crop in x, y coordinates
  let sx = 0
  let sy = 0
  // canvas
  let canvasWidth = iw
  let canvasHieght = ih
  // Picture Size after Equal Ratio Scaling
  let sw = 0
  let sh = 0

  // Scale to the right size, then cut in the middle
  if (targetWidth > 0 && targetHeight > 0) {
    // The size of canvas is to set the size for cutting
    canvasWidth = targetWidth
    canvasHieght = targetHeight

    // Adjust the size of the picture according to the target width: the width of the picture equals the width of the clipping frame
    sw = targetWidth
    sh = Math.floor(targetWidth * ih / iw)

    scaling = ratio(iw, targetWidth)

    // Picture height beyond the clipping box, can be normal clipping
    if (sh >= targetHeight) {
      sx = 0
      sy = util.int((sh - targetHeight) / 2 * scaling)
    }
    // To satisfy the clipping requirement, we need to resize: image height === clipping frame height
    else {
      scaling = ratio(ih, targetHeight)
      sw = Math.floor(targetHeight * iw / ih)
      sh = targetHeight
      sx = util.int((sw - targetWidth) / 2 * scaling)
      sy = 0
    }

  }
  // Zoom Picture Code **********************************
  // Only width is set
  else if (targetWidth > 0) {
    scaling = ratio(iw, targetWidth)
    canvasWidth = targetWidth
    canvasHieght = Math.floor(targetWidth * ih / iw)
  }
  // Only height is set
  else if (targetHeight > 0) {
    scaling = ratio(ih, targetHeight)
    canvasWidth = Math.floor(targetHeight * iw / ih)
    canvasHieght = targetHeight
  }

  return {
    sx: sx,
    sy: sy,
    sw: util.int(canvasWidth * scaling),
    sh: util.int(canvasHieght * scaling),
    scaling: scaling,
    cw: canvasWidth,
    ch: canvasHieght
  }
}
