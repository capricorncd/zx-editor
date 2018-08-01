/**
 * Created by zx1984 8/1/2018
 * https://github.com/zx1984
 */
import dom from './util/dom-core'

export function initLink (_this) {
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
}
