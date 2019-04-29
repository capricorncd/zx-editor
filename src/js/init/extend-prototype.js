/**
 * Created by Capricorncd.
 * User: https://github.com/capricorncd
 * Date: 2019/04/16 20:28
 */
import { emit, off, on } from '../custom-events'
import { getPasteText } from '../events/paste'
import { base64ToBlobData, blobToUrl, fileToBase64 } from '../image-handler/index'
import util from '../util/index'
import { createElement, createVdom } from '../dom-class/helper'

export function extendPrototypes (ZxEditor) {
  // custom events
  ZxEditor.prototype.on = on
  ZxEditor.prototype.emit = emit
  ZxEditor.prototype.off = off
  // static method
  ZxEditor.prototype.getPasteText = getPasteText
  // static utils
  for (let key in util) {
    if (util.hasOwnProperty(key)) {
      ZxEditor.prototype[key] = util[key]
    }
  }
  ZxEditor.prototype.blobToUrl = blobToUrl
  ZxEditor.prototype.base64ToBlobData = base64ToBlobData
  ZxEditor.prototype.fileToBase64 = fileToBase64
  // dom
  ZxEditor.prototype.createElement = createElement
  ZxEditor.prototype.createVdom = createVdom
}
