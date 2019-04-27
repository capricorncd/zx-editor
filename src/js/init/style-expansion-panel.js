/**
 * Created by Capricorncd.
 * User: https://github.com/capricorncd
 * Date: 2019/04/27 21:11
 */
import ExpansionPanel from '../expansion-panel/index'
import $ from '../dom-class'

// COLOR
const DEF_COLORS = {
  black: '#333',
  gray: '#d0d0d0',
  red: '#ff583d',
  yellow: '#fdaa25',
  green: '#44c67b',
  blue: '#14b2e0',
  purple: '#b065e2'
}

export function styleExpansionPanel (options) {

  const COLORS = Object.assign({}, DEF_COLORS, options.textStyleColors)

  let styleWrapper = `<dl class="__style-wrapper border-bottom"><dd class="text-bold" data-style="fontWeight:800">B</dd><dd class="text-italic" data-style="fontStyle:italic">I</dd><dd class="through-line" data-style="textDecoration:line-through">abc</dd></dl>`
  let colorWrapper = `<dl class="__color-wrapper border-bottom"><dd class="active __black" data-color=""></dd><dd class="__gray" data-color="${COLORS.gray}"></dd><dd class="__red" data-color="${COLORS.red}"></dd><dd class="__yellow" data-color="${COLORS.yellow}"></dd><dd class="__green" data-color="${COLORS.green}"></dd><dd class="__blue" data-color="${COLORS.blue}"></dd><dd class="__purple" data-color="${COLORS.purple}"></dd></dl>`
  let tagWrapper = `<dl class="__tag-wrapper"><dd class="__h2" data-tag="h2">大标题<i></i></dd><dd class="__h4" data-tag="h4">小标题<i></i></dd><dd class="__p" data-tag="p">正文<i class="checked"></i></dd><dd class="__blockquote" data-tag="blockquote"><b></b>引用<i></i></dd><dd class="__ul" data-tag="ul"><b></b>无序列表<i></i></dd></dl>`

  let panelBody = `<div class="text-style-outer-wrapper">${styleWrapper + colorWrapper + tagWrapper}</div>`

  // text style
  let textStylePanelParams = {
    headTitle: 'Text Style',
    body: $(panelBody)
  }
  this.textStylePanel = new ExpansionPanel(textStylePanelParams, this)

  // handle events
  // ...

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
