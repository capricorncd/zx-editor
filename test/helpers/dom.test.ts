/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/05/07 21:42:38 (GMT+0900)
 */
import { describe, it, expect } from 'vitest'
import { $, createElement, createStyles, changeNodeName, isBrSection } from '../../src/helpers/dom'

describe('dom', () => {
  it('$', () => {
    const el = createElement('div', {}, '<p>1</p><span>2</span>')
    expect($('p', el)?.textContent).toBe('1')
    expect($('span', el)?.textContent).toBe('2')
  })

  it('createElement', () => {
    const el = createElement('section')
    el.innerHTML = '<p>1</p><span>2</span>'
    expect(el.childNodes.length).toBe(2)
    expect(el.childNodes[1]).toHaveProperty('nodeName', 'SPAN')
  })

  it('createStyles', () => {
    const styles = {
      lineHeight: 1.5,
      alignItems: 'center',
    }
    expect(createStyles(styles)).toBe('line-height:1.5;align-items:center')
  })

  it('changeNodeName', () => {
    const el = createElement('div', { class: 'test' }, '1')
    expect(changeNodeName(el).nodeName).toBe('SECTION')
    expect(changeNodeName(el, 'p').nodeName).toBe('P')
    expect(changeNodeName(el, 'span').nodeName).toBe('SPAN')
  })

  it('isBrSection', () => {
    expect(isBrSection(createElement('section', {}, '<br>'))).toBeTruthy()
    expect(isBrSection(createElement('section', {}, '<br/>'))).toBeTruthy()
    expect(isBrSection(createElement('section', {}, '<br />'))).toBeTruthy()
    expect(isBrSection(createElement('section', {}, '<BR>'))).toBeTruthy()
  })
})