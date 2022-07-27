/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/05/07 21:42:38 (GMT+0900)
 */
import { describe, it, expect } from 'vitest'
import { isBrSection, createElement } from '../src'

describe('dom', () => {
  it('isBrSection', () => {
    expect(isBrSection(createElement('section', {}, '<br>'))).toBeTruthy()
    expect(isBrSection(createElement('section', {}, '<br/>'))).toBeTruthy()
    expect(isBrSection(createElement('section', {}, '<br />'))).toBeTruthy()
    expect(isBrSection(createElement('section', {}, '<BR>'))).toBeTruthy()
  })
})
