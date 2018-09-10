import dom from '../util/dom-core'
import BottomModal from '../util/bottom-modal'
import EMOJI_CODE from './code'

export function initEmoji (_this) {
  let bodyChildVnode = []
  EMOJI_CODE.forEach(item => {
    bodyChildVnode.push({
      tag: 'i',
      child: item
    })
  })
  const emojiModal = new BottomModal({
    headTitle: 'Emoji',
    headSwitch: '完成',
    $parent: _this.$editor,
    bodyChildVnode: [
      {
        attrs: {
          class: 'zxeditor-emoji-wrapper'
        },
        child: bodyChildVnode
      }
    ],
    onError (err) {
      _this.emit('error', err)
    },
    onShow () {
      _this.emit('bottom-modal', {
        type: 'emoji',
        show: true,
        height: emojiModal.height
      })
      _this.resetContentPostion(emojiModal.height)
      _this.checkCursorPosition()
    },
    onHide () {
      _this.emit('bottom-modal', {
        type: 'emoji',
        show: false,
        height: 0
      })
      _this.resetContentPostion(_this.toolbarHeight)
      _this.checkCursorPosition()
    }
  })

  _this.emojiModal = emojiModal

    // 事件处理
  dom.addEvent(emojiModal.$body, 'click', e => {
    const $el =  e.target
    if ($el.nodeName === 'I') {
      const emojiCode = $el.innerText
      addEmoji(emojiCode)
    }
  })

  /**
   * 添加emoji表情到正文
   * @param emojiCode
   */
  function addEmoji (emojiCode) {
    let offset = _this.cursor.offset
    try {
      _this.$cursorElm.innerHTML = dom.insertStr(_this.$cursorElm.innerText, emojiCode, offset)
      _this.cursor.setRange(_this.$cursorElm, offset + 2)
      _this.checkCursorPosition()
    } catch (e) {
      _this.emit('error', {
        msg: 'addEmoji error',
        data: e})
    }
  }

  // 隐藏emojiModal
  dom.addEvent(emojiModal.$switch, 'click', _ => {
    emojiModal.hide()
  })
}
