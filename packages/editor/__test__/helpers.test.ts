import { describe, test, expect } from 'vitest'
import { createElement } from 'zx-sml'
import {
  replaceHtmlTag,
  removeLiTags,
  isUlElement,
  isOnlyBrInChildren,
  isPairedTags,
  isSpecialPairedTags,
  hasSpecialTag,
} from '../src/helpers'

describe('helpers', () => {
  test('replaceHtmlTag', () => {
    const input = '<div class="test">Hello <i>World!</i></div>'
    const output = '<section class="test">Hello <i>World!</i></section>'
    expect(replaceHtmlTag(input, 'div', 'section')).toBe(output)
    expect(replaceHtmlTag(input, 'DIV', 'section')).toBe(output)
    expect(replaceHtmlTag(input, 'div', 'SECTION')).toBe(output)
    expect(replaceHtmlTag(input, 'DIV', 'SECTION')).toBe(output)
  })

  test('removeLiTags', () => {
    const input = '<li style="">Text Content</li>'
    const output = 'Text Content'
    expect(removeLiTags(input)).toBe(output)
  })

  test('isUlElement', () => {
    expect(isUlElement('UL')).toBeTruthy()
    expect(isUlElement('OL')).toBeTruthy()
    expect(isUlElement(createElement('ul'))).toBeTruthy()
    expect(isUlElement(createElement('ol'))).toBeTruthy()

    expect(isUlElement('')).toBeFalsy()
  })

  test('isOnlyBrInChildren', () => {
    expect(isOnlyBrInChildren(createElement('div', {}, '<br>'))).toBeTruthy()
    expect(isOnlyBrInChildren(createElement('section', {}, '<br>'))).toBeTruthy()
    expect(isOnlyBrInChildren(createElement('section', {}, '<br><br>'))).toBeTruthy()

    expect(isOnlyBrInChildren(null)).toBeFalsy()
    expect(isOnlyBrInChildren(createElement('br'))).toBeFalsy()
    expect(isOnlyBrInChildren(createElement('div'))).toBeFalsy()
    expect(isOnlyBrInChildren(createElement('div', {}, '<br>Text'))).toBeFalsy()
  })

  test('isPairedTags', () => {
    const el = createElement('img', {
      minHeight: '200px',
    })

    expect(isPairedTags(el)).toBeFalsy()
    expect(isPairedTags('<div></div>')).toBeTruthy()
    expect(isPairedTags('<section><img src="" /></section>')).toBeTruthy()
  })

  test('isSpecialPairedTags', () => {
    expect(isSpecialPairedTags(createElement('canvas'))).toBeTruthy()
    expect(isSpecialPairedTags(createElement('picture'))).toBeTruthy()
    expect(isSpecialPairedTags(createElement('video'))).toBeTruthy()
    expect(isSpecialPairedTags(createElement('audio'))).toBeTruthy()

    expect(isSpecialPairedTags(createElement('div'))).toBeFalsy()
    expect(isSpecialPairedTags(createElement('div', {}, '<canvas></canvas>'))).toBeFalsy()
  })

  test('hasSpecialTag', () => {
    expect(hasSpecialTag(createElement('div', {}, '<canvas></canvas>'))).toBeTruthy()
    expect(hasSpecialTag(createElement('div', {}, '<audio></audio>'))).toBeTruthy()
    expect(hasSpecialTag(createElement('div', {}, '<video></video>'))).toBeTruthy()
    expect(hasSpecialTag(createElement('div', {}, '<picture></picture>'))).toBeTruthy()
    expect(hasSpecialTag(createElement('div', {}, '<img />'))).toBeTruthy()

    expect(hasSpecialTag(createElement('div'))).toBeFalsy()
    expect(hasSpecialTag(createElement('div', {}, 'span'))).toBeFalsy()
    expect(hasSpecialTag(createElement('div', {}, '<input />'))).toBeFalsy()
    expect(hasSpecialTag(createElement('div', {}, '<i></i>'))).toBeFalsy()
  })
})
