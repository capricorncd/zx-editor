/**
 * Created by Capricorncd.
 * User: https://github.com/capricorncd
 * Date: 2019/04/27 21:19
 */
import $ from '../dom-class/index'

export function selectPictureBtn (options) {
  const _this = this
  /**
   * *******************************************
   * select picture
   * image file handler
   * *******************************************
   */
    // select picture
  let $selectPictureLabel = $('<label class="toolbar-icon-pic" style="position:absolute;top:0;left:0;width:100%;height:100%;"></label>')
  let $selectPictrueInput = $('<input type="file" accept="image/*" style="display:none">')
  $selectPictureLabel.append($selectPictrueInput)
  let input = $selectPictrueInput[0]

  // register selectPictureInputClick
  this.$eventHandlers['selectPictureInputClick'] = {
    $target: $selectPictrueInput,
    type: 'click',
    handler () {
      input.value = ''
    },
    capture: false
  }

  // image section template
  let imageSectionTemplate = /^<section\b.*<\/section>$/.test(options.imageSectionTemp) ? options.imageSectionTemp : `<section><img src="{url}"></section>`

  // register selectPictureInputChange
  let imageOptions = {
    imageMaxSize: options.imageMaxSize,
    width: options.imageMaxWidth
  }
  this.$eventHandlers['selectPictureInputChange'] = {
    $target: $selectPictrueInput,
    type: 'change',
    handler (e) {
      let file = input.files[0]
      _this.emit('selectPictureInputChange', file, e, _this)

      // customize Picture Handler
      if (options.customizePictureHandler) return

      // handler picture
      _this.fileToBase64(file, imageOptions).then(res => {
        let $el = $(imageSectionTemplate.replace('{url}', res.base64))
        // set attribute
        $el.find('img').attr({
          id: 'zxEditor_img_' + (+new Date()),
          alt: file.name
        })
        // insert to $content
        _this.insertElm($el)
      }).catch(e => {
        _this.emit('error', e, 'handlePictureFile')
      })
    },
    capture: false
  }

  return {
    name: 'select-picture',
    el: $selectPictureLabel
  }
}
