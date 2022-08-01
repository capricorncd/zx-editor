/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/05/07 21:42:38 (GMT+0900)
 */
import { describe, it, expect } from 'vitest'
import { createElement } from 'zx-sml'
import { getStyles } from '../src'

describe('dom', () => {
  it('getStyles', () => {
    expect(getStyles(createElement('section', { style: 'font-size:12px' }, 'Hello world'))).toEqual({
      fontSize: '12px',
    })
  })
})
