/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/05/15 19:26:50 (GMT+0900)
 */
import { VirtualNode } from '@zx-editor/types'
import { StylePanelOptions } from './options'

export const DEF_OPTIONS: StylePanelOptions = {
  textStyleTitle: 'Set Style',
  textStyleHeadLeftBtnText: 'Clear style',
}

// COLOR
export const DEF_COLORS = ['#333333', '#d0d0d0', '#ff583d', '#fdaa25', '#44c67b', '#14b2e0', '#b065e2']

export const STYLE_NODE_DATA: VirtualNode = {
  tag: 'dl',
  attrs: {
    class: '__style-wrapper border-bottom',
  },
  child: [
    {
      tag: 'dd',
      attrs: {
        style: 'font-weight: 800;',
        'data-style': 'fontWeight:800',
      },
      child: ['B'],
    },
    {
      tag: 'dd',
      attrs: {
        style: 'font-style: italic;',
        'data-style': 'fontStyle:italic',
      },
      child: ['I'],
    },
    {
      tag: 'dd',
      attrs: {
        style: 'text-decoration: line-through;',
        'data-style': 'textDecoration:line-through',
      },
      child: ['abc'],
    },
    {
      tag: 'dd',
      attrs: {
        style: '',
        'data-style': 'textAlign:left',
        class: 'text-align--l',
      },
    },
    {
      tag: 'dd',
      attrs: {
        style: '',
        'data-style': 'textAlign:center',
        class: 'text-align--c',
      },
    },
    {
      tag: 'dd',
      attrs: {
        style: '',
        'data-style': 'textAlign:right',
        class: 'text-align--r',
      },
    },
  ],
}

export const TAG_NODE_DATA: VirtualNode = {
  tag: 'dl',
  attrs: {
    class: '__tag-wrapper',
  },
  child: [
    {
      tag: 'dd',
      attrs: {
        class: '__h2',
        'data-tag': 'h2',
      },
      child: ['大标题', { tag: 'i' }],
    },
    {
      tag: 'dd',
      attrs: {
        class: '__h4',
        'data-tag': 'h4',
      },
      child: ['小标题', { tag: 'i' }],
    },
    {
      tag: 'dd',
      attrs: {
        class: '__section active',
        'data-tag': 'section',
      },
      child: ['正文', { tag: 'i' }],
    },
    {
      tag: 'dd',
      attrs: {
        class: '__blockquote',
        'data-tag': 'blockquote',
      },
      child: ['引用', { tag: 'i' }],
    },
    {
      tag: 'dd',
      attrs: {
        class: '__ul',
        'data-tag': 'ul',
      },
      child: ['无序列表', { tag: 'i' }],
    },
  ],
}
