/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/05/07 22:08:45 (GMT+0900)
 */
import { createElement } from '@zx-editor/helpers'
import { describe, it, expect, beforeEach } from 'vitest'
import { ZxEditor } from '../src'

describe('ZxEditor', () => {
  let zxEditor: ZxEditor

  beforeEach(() => {
    const container = createElement('div')
    zxEditor = new ZxEditor(container, {})
  })

  it('实例化成功', () => {
    // 实例化完成，能成功获取版本
    expect(zxEditor.version).toBe('__VERSION__')
  })
})
