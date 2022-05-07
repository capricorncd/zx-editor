/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/05/07 10:33:02 (GMT+0900)
 */
export class CursorClass {
  private readonly rootElement: HTMLDivElement
  private readonly selection: Selection | null
  private range: Range
  private timer: number | null

  constructor(rootElement: HTMLDivElement) {
    this.rootElement = rootElement
    this.selection = window.getSelection()
    this.range = this.selection ? this.selection.getRangeAt(0) : new Range()
    this.timer = null
    
    // init range
    const el = rootElement.lastElementChild as HTMLElement
    if (el) {
      this.setRange(el, el.textContent?.length)
    }
  }

  setRange(el: HTMLElement, offset = 0) {
    // remove all range object
    if (this.selection) this.selection.removeAllRanges()

      // el: '<section>inner text.</section>'
      let targetNode = el.childNodes[el.childNodes.length - 1] || el
      // check img/video/audio
      // console.log(targetNode.nodeName, this.offset)
      if (/IMG|VIDEO|AUDIO/.test(targetNode.nodeName)) {
        offset = 1
        // get parentNode, can't set offset = 1 of IMG node.
        targetNode = targetNode.parentNode as HTMLElement
      }
      this.range.setStart(targetNode, offset)
    // cursor start and end position is collapse
    this.range.collapse(true)

    this._clearTimeout()
    // 延时执行，键盘自动收起后再触发focus
    this.timer = setTimeout(() => {
      // 插入新的光标对象
      this.selection?.addRange(this.range)
    }, 100)
  }

  private _clearTimeout() {
    if (this.timer) {
      clearTimeout(this.timer)
      this.timer = null
    }
  }

  getCurrentNode(): HTMLElement | null {
    this.range = this.selection ? this.selection.getRangeAt(0) : new Range()
    let currentNode = this.range.endContainer
    while (this.rootElement !== currentNode) {
      if (currentNode.parentElement === this.rootElement) {
        return currentNode as HTMLElement
      } else {
        currentNode = currentNode.parentNode as Node
      }
    }
    return this.rootElement.lastElementChild as HTMLElement
  }
}