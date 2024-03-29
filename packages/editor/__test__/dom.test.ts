import { describe, test, expect } from 'vitest'
import { createElement, $ } from 'zx-sml'
import { ROOT_CLASS_NAME } from '../src/const'
import { initContentDom, changeNodeName, toggleIsEmptyClassName, getCursorElement } from '../src/dom'

describe('dom', () => {
  test('initContentDom', () => {
    const el = initContentDom(
      {
        minHeight: '200px',
      },
      '<section><br></section>',
    )

    expect(el.innerHTML).toBe('<section><br></section>')
    expect(el.className).toBe(`${ROOT_CLASS_NAME} is-empty`)

    expect(el.getAttribute('contenteditable')).toBeFalsy()

    expect(el.getAttribute('style')).toBe('min-height:200px')
    expect(el.style.minHeight).toBe('200px')
  })

  test('initContentDom contenteditable', () => {
    const el = initContentDom(
      {
        editable: true,
      },
      '<section><br></section>',
    )

    expect(el.getAttribute('contenteditable')).toBeTruthy()
  })

  test('changeNodeName', () => {
    const el = createElement('div', {}, '<span><br></span>')

    expect(changeNodeName($('span', el), 'span')).toBeNull()

    changeNodeName($('span', el), 'section')!
    expect(el.innerHTML).toBe('<section><br></section>')

    changeNodeName($('section', el), 'ul')
    expect(el.innerHTML).toBe('<ul><li><br></li></ul>')

    changeNodeName($('ul', el), 'section')
    expect(el.innerHTML).toBe('<section><br></section>')
  })

  test('toggleIsEmptyClassName', () => {
    const div = createElement('div')
    toggleIsEmptyClassName(div)
    expect(div.classList.contains('is-empty')).toBeTruthy()
  })

  test('getCursorElement', () => {
    const section = createElement('section', {}, '<br>')
    const editor = createElement('div', {}, section)
    expect(getCursorElement(null, editor)).toBe(section)
    expect(getCursorElement(null, editor, true)).toBe(section)
    expect(getCursorElement(section, editor, true)).toBe(section)
    expect(getCursorElement(section.children[0] as HTMLBRElement, editor, true)).toBe(section)
  })
})
