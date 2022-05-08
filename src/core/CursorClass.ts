/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/05/07 10:33:02 (GMT+0900)
 */
export class CursorClass {
  private readonly rootElement: HTMLDivElement
  private timer: number | null

  constructor(rootElement: HTMLDivElement) {
    this.rootElement = rootElement
    this.timer = null

    // init range
    const el = rootElement.lastElementChild as HTMLElement
    if (el) this.setRange(el, el.textContent?.length)
  }

  getRange(): Range {
    try {
      // @ts-ignore
      return window.getSelection()?.getRangeAt(0)
    } catch (e) {
      // ..
    }
    return new Range()
  }

  /**
   * 获取当前元素的最后一个无子节点的节点
   * @param el
   * @private
   */
  private _getLastNode(el: HTMLElement | Node): Node {
    let node = el
    while (node.lastChild) {
      node = node.lastChild
    }
    return node
  }

  setRange(el: HTMLElement, offset?: number) {
    const range = this.getRange()
    // remove all range object
    const selection = window.getSelection()
    if (selection) selection.removeAllRanges()

    // el: '<section>inner text.</section>'
    // let targetNode = el.childNodes[el.childNodes.length - 1] || el
    // // check img/video/audio
    // if (/IMG|VIDEO|AUDIO/.test(targetNode.nodeName)) {
    //   offset = 1
    //   // get parentNode, can't set offset = 1 of IMG node.
    //   targetNode = targetNode.parentNode as HTMLElement
    // }
    const targetNode = this._getLastNode(el)
    if (typeof offset === 'undefined') {
      offset = targetNode.textContent?.length ?? 0
    }
    range.setStart(targetNode, offset)
    // cursor start and end position is collapse
    range.collapse(true)

    this._clearTimeout()
    // 延时执行，键盘自动收起后再触发focus
    // @ts-ignore
    this.timer = setTimeout(() => {
      // 插入新的光标对象
      selection?.addRange(range)
    }, 100)
  }

  private _clearTimeout() {
    if (this.timer) {
      clearTimeout(this.timer)
      this.timer = null
    }
  }

  getCurrentNode(): HTMLElement | null {
    const range = this.getRange()
    let currentNode = range.endContainer
    while (currentNode && this.rootElement !== currentNode) {
      // li元素判断
      if (currentNode.nodeName === 'LI' && currentNode.parentElement?.parentElement === this.rootElement) {
        return currentNode as HTMLElement
      }
      if (currentNode.parentElement === this.rootElement) {
        return currentNode as HTMLElement
      } else {
        currentNode = currentNode.parentNode as Node
      }
    }
    return this.rootElement.lastElementChild as HTMLElement
  }
}
