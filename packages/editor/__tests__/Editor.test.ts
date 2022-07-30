/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/05/15 17:09:47 (GMT+0900)
 */
import { JSDOM } from 'jsdom'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { $ } from 'zx-sml'
import { Editor, EditorPlugin } from '../src'

describe('Editor', () => {
  let editor: Editor

  beforeEach(() => {
    const { window } = new JSDOM('<!doctype html><html><body><div id="app"></div></body></html>')
    vi.stubGlobal('document', window.document)
    editor = new Editor({
      container: '#app',
    })
  })

  it('实例化成功', () => {
    // 实例化完成，能成功获取版本
    expect(editor.version).toBe('__VERSION__')
    // 初始情况下，获取到的编辑器内容为空字符串
    expect(editor.getHtml()).toBe('')
  })

  it('验证change事件是否被触发', () => {
    // 监听change事件被
    const onChange = vi.fn()
    editor.on('change', onChange)
    // 未调用
    expect(onChange).not.toBeCalled()
    // 向编辑器中插入一张图片
    editor.insert('<img />')
    // 再插入文本
    editor.insert('Text')
    // change事件被触发
    expect(onChange).toBeCalled()
    expect(onChange).toBeCalledTimes(2)
  })

  // changeNodeName
  it('changeNodeName', () => {
    editor.insert('Text')
    editor.changeNodeName('UL')
    expect(editor.getHtml()).toBe('<ul><li>Text</li></ul>')
  })

  // changeStyles
  it('changeStyles', () => {
    editor.insert('Text')
    editor.changeStyles('color', 'red')
    expect(editor.getHtml()).toBe('<section style="color:red">Text</section>')
    editor.changeStyles({ color: 'blue', fontSize: '20px' })
    expect(editor.getHtml()).toBe('<section style="color:blue;font-size:20px">Text</section>')
  })

  // getCurrentNode
  it('getCurrentNode', () => {
    editor.insert('Text')
    const currentNode = editor.$editor.children[0]

    expect(editor.getCurrentNode()?.innerHTML).toBe(currentNode.innerHTML)

    editor.changeNodeName('UL')

    expect(editor.getCurrentNode()).toBe($('li', editor.$editor))
    expect(editor.getCurrentNode(true)).toBe($('ul', editor.$editor))
  })

  it('getHtml', () => {
    editor.insert('Text')
    expect(editor.getHtml()).toBe('<section>Text</section>')
    editor.insert('<img src="http://a.com/test.jpg" />')
    expect(editor.getHtml()).toBe('<section>Text</section><section><img src="http://a.com/test.jpg"></section>')
  })

  it('getStyles', () => {
    expect(editor.getStyles()).toEqual({})
    editor.insert('<div style="font-style: italic">Hello world</div>')
    expect(editor.getStyles()).toEqual({ fontStyle: 'italic' })
  })

  it('insert', () => {
    const editorInsert = vi.spyOn(editor, 'insert')
    expect(editorInsert).not.toHaveBeenCalled()
    // 向编辑器中插入一张图片
    editor.insert('<img />')
    // 再插入文本
    editor.insert('Text')
    expect(editorInsert).toHaveBeenCalled()
    expect(editorInsert).toBeCalledTimes(2)

    expect(editor.getHtml()).toBe('<section><img></section><section>Text</section>')
  })

  it('setHtml', () => {
    editor.setHtml('<img />Text')
    expect(editor.getHtml()).toBe('<section><img></section><section>Text</section>')
  })

  it('use', () => {
    class TestUse implements EditorPlugin {
      private editor: Editor | null = null
      install(e: Editor) {
        this.editor = e
      }
    }
    const testUse = new TestUse()

    const pluginInstall = vi.spyOn(testUse, 'install')
    expect(pluginInstall).not.toHaveBeenCalled()

    editor.use(testUse)
    expect(pluginInstall).toHaveBeenCalled()
  })
})
