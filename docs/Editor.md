# Editor

`class` Editor, extends [EventEmitter](./EventEmitter.md)

 ```js
 const editor = new Editor({
   container: `#container`
 })
 ```

## Methods

### changeNodeName(nodeName)

修改光标所在元素的标签
Replace the tag of the element under the cursor

- @param nodeName `string` For example: `UL`, `SECTION` ...

- @returns `boolean`

### changeStyles(styles)

修改光标所在元素的样式
Change the style of the element where the cursor is located

- @param styles `CSSProperties | string`
- @param value `any`

- @returns `void`

### destroy()

销毁事件
destroy events

- @returns `void`

### getCurrentNode(isOnlyContentChild?)

获取光标所在的元素
Get the element where the cursor is located

- @param isOnlyContentChild `boolean` Must be a child element of editor content. For example: when it is `false`, the `li` element is returned in `ul/ol`, and when it is `true`, the `ul/ol` element is returned.

- @returns `HTMLElement | null`

### getHtml()

获取编辑器中的HTML代码，会自动去除结尾处的空行
get html string from content element
remove last line that `<section><br></section>`

- @returns `string`

### getStyles()

获取光标所在的元素的`style`对象
Get the `style` object of the element where the cursor is located

- @returns `CSSProperties`

### insert(input)

向编辑器中插入内容/HTML代码/元素等
insert html or element to content element

- @param input `string | HTMLElement`

- @returns `void`

### setHtml(html)

设置编辑器内容，会覆盖之前内容
set html to the content element

- @param html `string`

- @returns `void`

### use(plugin, parentElement?)

extension, 扩展插件

- @param plugin `EditorPlugin`
- @param parentElement `HTMLElement`

- @returns `void`

## Types

### EditorPlugin

```ts
interface EditorPlugin {
  install: (e: Editor, parentElement?: HTMLElement) => void
}
```

## License

MIT License © 2018-Present [Capricorncd](https://github.com/capricorncd).