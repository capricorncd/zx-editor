/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/05/07 21:29:54 (GMT+0900)
 */
import { describe, assert, it, expect } from 'vitest'
import { toSnakeCase, toCamelCase, slice } from '../../src/helpers/format'

describe('format', () => {
  it('toSnakeCase', () => {
    assert.equal(toSnakeCase('helloWorld'), 'hello-world')
    assert.equal(toSnakeCase('helloWorld', '_'), 'hello_world')
    assert.equal(toSnakeCase('helloWorld', ' '), 'hello world')
    assert.equal(toSnakeCase('helloWorld', '@'), 'hello@world')
  })

  it('toCamelCase', () => {
    assert.equal(toCamelCase('hello-world'), 'helloWorld')
    assert.equal(toCamelCase('hello_world'), 'helloWorld')
    assert.equal(toCamelCase('hello world'), 'helloWorld')
  })

  it('slice', () => {
    const el = document.createElement('div')
    el.innerHTML = '<p>1</p><p>2</p><p>3</p><p>4</p><p>5</p>'
    expect(slice(el.childNodes).length).toBe(5)
    expect(slice(el.childNodes, 1).length).toBe(4)
  })
})
