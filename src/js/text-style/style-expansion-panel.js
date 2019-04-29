/**
 * Created by Capricorncd.
 * User: https://github.com/capricorncd
 * Date: 2019/04/27 21:11
 */
import ExpansionPanel from '../expansion-panel/index'
import $ from '../dom-class'
import { createVdom } from '../dom-class/helper'
import { changeTag } from './helper'

// COLOR
const DEF_COLORS = [
  '#333',
  '#d0d0d0',
  '#ff583d',
  '#fdaa25',
  '#44c67b',
  '#14b2e0',
  '#b065e2'
]

/**
 * create color vnode
 * @param colors
 * @return Object
 */
function createColorVNode (colors) {
  return colors.map((color, i) => {
    return {
      tag: 'dd',
      attrs: {
        class: i === 0 ? 'active' : '',
        'data-color': color
      },
      child: [
        {
          tag: 'i',
          attrs: {
            style: `background:${color}`
          }
        }
      ]
    }
  })
}

/**
 * text style panel
 * @param options
 * @return {{name: string, className: string, events: {type: string, handler: events.handler}}}
 */
export function styleExpansionPanel (options) {

  const zxEditor = this

  const COLORS = options.textStyleColors.length ? options.textStyleColors : DEF_COLORS

  // dom structure
  let panelBodyChild = [
    // style
    {
      tag: 'dl',
      attrs: {
        class: '__style-wrapper border-bottom'
      },
      child: [
        {
          tag: 'dd',
          attrs: {
            style: 'font-weight: 800;',
            'data-style': 'fontWeight:800'
          },
          child: ['B']
        },
        {
          tag: 'dd',
          attrs: {
            style: 'font-style: italic;',
            'data-style': 'fontStyle:italic'
          },
          child: ['I']
        },
        {
          tag: 'dd',
          attrs: {
            style: 'text-decoration: line-through;',
            'data-style': 'textDecoration:line-through'
          },
          child: ['abc']
        }
      ]
    },
    // color
    {
      tag: 'dl',
      attrs: {
        class: '__color-wrapper border-bottom'
      },
      child: createColorVNode(COLORS)
    },
    // tag
    {
      tag: 'dl',
      attrs: {
        class: '__tag-wrapper'
      },
      child: [
        {
          tag: 'dd',
          attrs: {
            class: '__h2',
            'data-tag': 'h2'
          },
          child: ['大标题', { tag: 'i' }]
        },
        {
          tag: 'dd',
          attrs: {
            class: '__h4',
            'data-tag': 'h4'
          },
          child: ['小标题', { tag: 'i' }]
        },
        {
          tag: 'dd',
          attrs: {
            class: '__p active',
            'data-tag': 'p'
          },
          child: ['正文', { tag: 'i' }]
        },
        {
          tag: 'dd',
          attrs: {
            class: '__blockquote',
            'data-tag': 'blockquote'
          },
          child: ['引用', { tag: 'i' }]
        },
        {
          tag: 'dd',
          attrs: {
            class: '__ul',
            'data-tag': 'ul'
          },
          child: ['无序列表', { tag: 'i' }]
        }
      ]
    }
  ]


  let panelBody = createVdom({
    tag: 'div',
    attrs: {
      class: 'text-style-outer-wrapper'
    },
    child: panelBodyChild
  })

  let $panelBody = $(panelBody)

  // text style
  let textStylePanelParams = {
    headTitle: 'Text Style',
    body: $panelBody
  }
  this.textStylePanel = new ExpansionPanel(textStylePanelParams, this)

  // handle events
  // style
  const $styles = $panelBody.find('.__style-wrapper').children()
  $styles.on('click', function () {
    let style = $(this).data('style').split(':')
    let key = style[0]
    let cursorNode = zxEditor.$cursorNode[0]
    cursorNode.style[key] = cursorNode.style[key] === style[1] ? '' : style[1]
  })

  // color
  const $colors = $panelBody.find('.__color-wrapper').children()
  $colors.on('click', function () {
    let $el
    for (let i = 0; i < $colors.length; i++) {
      $el = $($colors[i])
      if ($el[0] === this && !$el.hasClass('active')) {
        $el.addClass('active')
        zxEditor.$cursorNode.css('color', $el.data('color'))
      } else if ($el.hasClass('active')) {
        $el.removeClass('active')
      }
    }
  })

  // tag
  const $tags = $panelBody.find('.__tag-wrapper').children()
  $tags.on('click', function () {
    if ($(this).hasClass('active')) return
    let tag = $(this).data('tag')
    let $el
    for (let i = 0; i < $tags.length; i++) {
      $el = $($tags[i])
      if ($el[0] === this) {
        // add active class name
        $el.addClass('active')
        // change tag
        changeTag.call(zxEditor, tag)
      } else if ($el.hasClass('active')) {
        $el.removeClass('active')
      }
    }
  })

  // review


  return {
    name: 'text-style',
    className: 'text-style-btn',
    events: {
      type: 'click',
      handler: () => {
        this.textStylePanel.show()
      }
    }
  }
}
