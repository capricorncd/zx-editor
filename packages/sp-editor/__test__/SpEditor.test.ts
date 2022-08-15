/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/05/07 22:08:45 (GMT+0900)
 */
import { describe, it, expect, beforeEach } from 'vitest'
import { createElement } from 'zx-sml'
import { SpEditor } from '../src'

describe('SpEditor', () => {
  let spEditor: SpEditor

  beforeEach(() => {
    const container = createElement('div')
    spEditor = new SpEditor(container, {})
  })

  it('实例化成功', () => {
    // 实例化完成，能成功获取版本
    expect(spEditor.version).toBe('__VERSION__')
  })
})
