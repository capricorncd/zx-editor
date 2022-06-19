/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/05/07 10:33:02 (GMT+0900)
 */
export class CursorClass {
  private readonly rootElement: HTMLDivElement
  private timer: number | null
  private selection: Selection | null
  private range: Range = new Range()

  constructor(rootElement: HTMLDivElement) {
    this.rootElement = rootElement
    this.timer = null

    this.selection = window.getSelection()

    // init range
    const el = rootElement.lastElementChild as HTMLElement
    if (el) this.setRange(el, el.textContent?.length)
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

  setRange(el?: HTMLElement, offset?: number) {
    if (!this.selection) {
      this.selection = window.getSelection()
      try {
        // @ts-ignore
        this.range = this.selection?.getRangeAt(0)
      } catch (e) {
        this.range = new Range()
      }
    } else {
      // remove all range object
      this.selection.removeAllRanges()
    }
    let targetNode: Node
    if (el) {
      targetNode = this._getLastNode(el)
    } else {
      targetNode = this.range.endContainer
    }

    // el: '<section>inner text.</section>'
    // let targetNode = el.childNodes[el.childNodes.length - 1] || el
    // // check img/video/audio
    // if (/IMG|VIDEO|AUDIO/.test(targetNode.nodeName)) {
    //   offset = 1
    //   // get parentNode, can't set offset = 1 of IMG node.
    //   targetNode = targetNode.parentNode as HTMLElement
    // }
    console.log(targetNode)
    if (typeof offset === 'undefined') {
      offset = targetNode.textContent?.length ?? 0
    }
    this.range.setStart(targetNode, offset)
    // cursor start and end position is collapse
    this.range.collapse(true)

    this._clearTimeout()
    // 延时执行，键盘自动收起后再触发focus
    // @ts-ignore
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

  getCurrentNode(isOnlyContentChild = false): HTMLElement | null {
    let currentNode = this.range.endContainer
    while (currentNode && this.rootElement !== currentNode) {
      // li元素判断
      if (
        !isOnlyContentChild &&
        currentNode.nodeName === 'LI' &&
        currentNode.parentElement?.parentElement === this.rootElement
      ) {
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
