/**
 * Created by capricorncd 8/1/2018
 * https://github.com/capricorncd
 */
import dom from './util/dom-core'
import util from './util/index'

export function initLink (_this) {
  /**
   * ***************************************************
   * init
   * ***************************************************
   */
  // 添加链接容器内容
  const linkChildVnode = [
    {
      attrs: {
        class: 'linkinput-wrapper'
      },
      child: [
        {
          attrs: {
            class: 'linkinput-title'
          },
          child: '添加链接'
        },
        {
          attrs: {
            class: 'linkinput-group'
          },
          child: [
            {
              tag: 'input',
              attrs: {
                type: 'text',
                class: 'link-input',
                placeholder: 'http(s)://'
              }
            },
            {
              tag: 'input',
              attrs: {
                type: 'text',
                class: 'link-input',
                placeholder: '链接名称(选填)'
              }
            }
          ]
        },
        {
          attrs: {
            class: 'linkinput-footer'
          },
          child: [
            {
              tag: 'button',
              attrs: {
                class: 'cancel-hook'
              },
              child: '取消'
            },
            {
              tag: 'button',
              attrs: {
                class: 'submit-hook disabled'
              },
              child: '确定'
            }
          ]
        }
      ]
    }
  ]

  // 连接地址输入容器
  const linkVnode = {
    tag: 'div',
    attrs: {
      class: 'zxeditor-linkinput-wrapper',
      style: 'display:none;'
    },
    child: linkChildVnode
  }

  _this.$link = dom.createVdom(linkVnode)
  _this.$editor.appendChild(_this.$link)

  /**
   * ***************************************************
   * 输入处理
   * ***************************************************
   */

  // 链接：输入容器按钮
  const $submitBtn = dom.query('.submit-hook', _this.$link)
  const $cancelBtn = dom.query('.cancel-hook', _this.$link)
  const $linkInputs = dom.queryAll('input', _this.$link)
  // 确定
  dom.addEvent($submitBtn, 'click', e => {
    const $el = e.currentTarget
    // const className = el.className
    if (dom.hasClass('disabled', $el)) return
    // 创建url，并添加至焦点出
    let url = $linkInputs[0].value
    let title = $linkInputs[1].value
    if (url) {
      _this.addLink(url, title)
      _this.$link.style.display = 'none'
    }
  }, false)

  // 取消
  dom.addEvent($cancelBtn, 'click', e => {
    _this.$link.style.display = 'none'
  }, false)

  // 链接输入框
  dom.addEvent($linkInputs[0], 'keyup', e => {
    let val = $linkInputs[0].value
    if (util.isHttpUrl(val)) {
      if (dom.hasClass('disabled', $submitBtn)) {
        dom.removeClass('disabled', $submitBtn)
      }
    }
  }, false)
}
