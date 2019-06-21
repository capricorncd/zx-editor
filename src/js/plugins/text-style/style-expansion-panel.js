/**
 * Created by Capricorncd.
 * User: https://github.com/capricorncd
 * Date: 2019/04/27 21:11
 */
import $ from '../../dom-class'
import { createVdom } from '../../dom-class/helper'
import { changeTag } from './helper'
import { IPHONEX_BOTTOM_OFFSET_HEIGHT } from '../../config'

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
  let arr = []
  colors.forEach((color, i) => {
    if (/^#\w{3,6}$/.test(color)) {
      arr.push({
        tag: 'dd',
        attrs: {
          class: i === 0 ? 'active' : '',
          'data-color': formatColorHexadecimal(color.toLowerCase())
        },
        child: [
          {
            tag: 'i',
            attrs: {
              style: `background:${color}`
            }
          }
        ]
      })
    }
  })
  return arr
}

function formatColorHexadecimal (hex) {
  let len = hex.length
  return len === 7 ? hex : `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`
}

/**
 * text style panel
 * @param options
 * @return {{name: string, className: string, events: {type: string, handler: events.handler}}}
 */
export function styleExpansionPanel (options) {

  const zxEditor = this

  // dom structure
  let panelBodyChild = []

  let styleNode = {
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
      },
      {
        tag: 'dd',
        attrs: {
          style: '',
          'data-style': 'textAlign:left',
          class: 'text-align--l'
        }
      },
      {
        tag: 'dd',
        attrs: {
          style: '',
          'data-style': 'textAlign:center',
          class: 'text-align--c'
        }
      },
      {
        tag: 'dd',
        attrs: {
          style: '',
          'data-style': 'textAlign:right',
          class: 'text-align--r'
        }
      }
    ]
  }

  panelBodyChild.push(styleNode)

  const COLORS = Array.isArray(options.textStyleColors) ? options.textStyleColors : DEF_COLORS

  if (COLORS.length) {
    let colorsNode = {
      tag: 'dl',
      attrs: {
        class: '__color-wrapper border-bottom'
      },
      child: createColorVNode(COLORS)
    }
    panelBodyChild.push(colorsNode)
  }

  let tagNode = {
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
          class: '__section active',
          'data-tag': 'section'
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

  panelBodyChild.push(tagNode)


  let panelBody = createVdom({
    tag: 'div',
    attrs: {
      class: 'text-style-outer-wrapper'
    },
    child: panelBodyChild
  })

  let $panelBody = $(panelBody)

  // instance text style
  this.textStylePanel = new this.ExpansionPanel({
    headLeftBtnText: options.textStyleHeadLeftBtnText,
    headTitle: options.textStyleTitle,
    headAlign: options.textStyleHeadAlign,
    body: $panelBody,
    onHeadClick: handleHeadClick
  }, this)

  // handle events
  // style
  const $styles = $panelBody.find('.__style-wrapper').children()
  $styles.on('click', function () {
    let style = $(this).data('style').split(':')
    let key = style[0]
    let cursorNode = zxEditor.$cursorNode[0]
    cursorNode.style[key] = cursorNode.style[key] === style[1] ? '' : style[1]
    zxEditor.cursor.setRange()
  })

  // color
  const $colorsParent = $panelBody.find('.__color-wrapper')
  const $colors = $colorsParent.children()
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
    zxEditor.cursor.setRange()
  })

  // tag
  const $tagsParent = $panelBody.find('.__tag-wrapper')
  const $tags = $tagsParent.children()
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

  if (this.isIPhoneX) {
    $tagsParent.css('margin-bottom', IPHONEX_BOTTOM_OFFSET_HEIGHT + 'px')
  }

  // extend method
  /**
   * reset active state
   * when content onClick and onKeyup code === 13
   */
  this.textStylePanel.resetActiveState = () => {
    let $cursorNode = this.cursor.getCurrentNode()

    // check tag
    let tag = $cursorNode.nodeName()
    setTagInPanel(tag)

    // check color
    let color = this.rgbToHex($cursorNode.css('color'))
    setColorInPanel(color)
  }

  /**
   * set tag in panel
   * @param tag
   */
  function setTagInPanel (tag) {
    let $activeTag = $tagsParent.find('.active')
    if ($activeTag.data('tag') !== tag) {
      $activeTag.removeClass('active')
      $tagsParent.find(`.__${tag}`).addClass('active')
    }
  }

  /**
   * set color in panel
   * @param color
   */
  function setColorInPanel (color) {
    let $activeColor = $colorsParent.find('.active')
    if ($activeColor.data('color') !== color) {

      $activeColor.removeClass('active')

      let $tmp
      for (let i = 0; i < $colors.length; i++) {
        $tmp = $($colors[i])
        if ($tmp.data('color') === color) {
          $tmp.addClass('active')
          break
        }
      }
    }
  }

  /**
   * handle head click
   * @param type
   */
  function handleHeadClick (type) {
    // clear style
    if (type === 'left-button') {
      // clear style
      let currentNode = zxEditor.$cursorNode[0]
      currentNode.className = ''
      currentNode.setAttribute('style', '')
      if (currentNode.nodeName !== 'SECTION') {
        zxEditor.$cursorNode = $(zxEditor.changeNodeName(currentNode, 'section'))
      }
      // reset text style expansion
      setColorInPanel(COLORS[0])
      setTagInPanel('section')
      // set Range
      zxEditor.cursor.setRange(zxEditor.$cursorNode)
    }
  }

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
