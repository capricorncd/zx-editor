# Editor

Editor extends [EventEmitter](./EventEmitter.md). The parameter of `Editor` is [EditorOptions](#EditorOptions)

instance `new Editor(EditorOptions)`

For example:

```js
const editor = new Editor({
  container: `#container`
})
```

use Editor css

```js
import 'sp-editor/editor/css'
```

## Property

### version

获取版本号

- @returns `string`

## Methods

### changeNodeName(nodeName)

修改光标所在元素的标签
Replace the tag of the element under the cursor

Param|Types|Required|Description
:--|:--:|:--:|:--
nodeName|`string`|no|allowed element names, `UL`, `SECTION` etc. If `undefined`, use the default `options.childNodeName`.

- @returns `boolean`

### changeStyles(styles, value)

修改光标所在元素的样式
Change the style of the element where the cursor is located

Param|Types|Required|Description
:--|:--:|:--:|:--
styles|`CSSProperties`/`string`|no|When it's `undefined` or null, all styles will be removed.
value|`any`|no|-

- @returns `void`

### destroy()

销毁事件
destroy events

- @returns `void`

### getCursorElement(isOnlyEditorChild)

获取光标所在的元素
Get the element where the cursor is located

Param|Types|Required|Description
:--|:--:|:--:|:--
isOnlyEditorChild|`boolean`|no|Must be a child element of editor `HTMLElement`. For example: when it is `false`, the `li` element is returned in `ul/ol`, and when it is `true`, the `ul/ol` element is returned.

- @returns `HTMLElement`

### getHtml(retainLastBlankLines)

获取编辑器中的HTML代码，会自动去除结尾处的空行。
get html string from content element.

Param|Types|Required|Description
:--|:--:|:--:|:--
retainLastBlankLines|`boolean`|no|Retain last blank lines, If `true` the last `<section><br></section>` not will be removed.

- @returns `string`

### getStyles()

获取光标所在的元素的`style`对象
Get the `style` object of the element where the cursor is located

- @returns `CSSProperties`

### insert(input, toNewParagraph)

向编辑器中插入内容/HTML代码/元素等
insert html or element to content element

Param|Types|Required|Description
:--|:--:|:--:|:--
input|`string`/`HTMLElement`|yes|-
toNewParagraph|`boolean`|no|Insert `text` in a new paragraph, only `textNode` is valid. Defaults to `false`.

- @returns `void`

### setHtml(html)

设置编辑器内容，会覆盖之前内容
set html to the content element

Param|Types|Required|Description
:--|:--:|:--:|:--
html|`string`|yes|-

- @returns `void`

### use(plugin, parentElement)

extension, 扩展插件

Param|Types|Required|Description
:--|:--:|:--:|:--
plugin|`EditorPlugin`|yes|-
parentElement|`HTMLElement`|no|-

- @returns `void`

## Types

### EditorOptions

Editor initialization parameters

Prop|Types|Required|Description
:--|:--:|:--:|:--
container|`string`/`HTMLElement`|no|container that Editor parent HTMLElement
editable|`boolean`|no|The `contenteditable` global attribute is an enumerated attribute indicating if the element should be editable by the user. If so, the browser modifies its widget to allow editing. default `true`.
placeholder|`string`|no|编辑器内容为空是的提示内容，default `请在此输入内容..`
placeholderColor|`string`|no|placeholder color, default `#999`
lineHeight|`string`/`number`|no|编辑器内容行高，default `1.5`
minHeight|`string`/`number`|no|min height, default `50vh`
paddingBottom|`string`/`number`|no|Set paddingBottom to avoid being obscured by toolbar or style panel, default `50vh`
childNodeName|`string`|no|Editor's child node name, default `section`
allowedNodeNames|`string[]`|no|允许使用的编辑器子元素节点名称， default `['SECTION', 'H1', 'H2', 'H3', 'H4', 'H5', 'BLOCKQUOTE', 'UL', 'OL']` allowed Node names
paragraphTailSpacing|`string`/`number`|no|paragraph tail spacing, default 10px
caretColor|`string`|no|光标颜色
textColor|`string`|no|编辑器文本默认颜色 default color of editor text, default `#333333`
customPasteHandler|`(e: ClipboardEvent) => void`|no|自定义用户粘贴处理函数
styles|`CSSProperties`|no|编辑器自定义样式
insertTextToNewParagraph|`boolean`|no|Insert text to new paragraph, only `textNode` is valid. default `false`

<details>
<summary>Source Code</summary>

```ts
interface EditorOptions {
  // container that Editor parent HTMLElement
  container?: string | HTMLElement
  // The `contenteditable` global attribute is an enumerated attribute indicating
  // if the element should be editable by the user.
  // If so, the browser modifies its widget to allow editing. default `true`.
  editable?: boolean
  // 编辑器内容为空是的提示内容，default `请在此输入内容..`
  placeholder?: string
  // placeholder color, default `#999`
  placeholderColor?: string
  // 编辑器内容行高，default `1.5`
  lineHeight?: string | number
  // min height, default `50vh`
  minHeight?: string | number
  // Set paddingBottom to avoid being obscured by toolbar or style panel, default `50vh`
  paddingBottom?: string | number
  // Editor's child node name, default `section`
  childNodeName?: string
  // 允许使用的编辑器子元素节点名称，
  // default `['SECTION', 'H1', 'H2', 'H3', 'H4', 'H5', 'BLOCKQUOTE', 'UL', 'OL']`
  // allowed Node names
  allowedNodeNames?: string[]
  // paragraph tail spacing, default 10px
  paragraphTailSpacing?: string | number
  // 光标颜色
  caretColor?: string
  // 编辑器文本默认颜色 default color of editor text, default `#333333`
  textColor?: string
  // 自定义用户粘贴处理函数
  customPasteHandler?: (e: ClipboardEvent) => void
  // 编辑器自定义样式
  styles?: CSSProperties
  // Insert text to new paragraph, only `textNode` is valid. default `false`
  insertTextToNewParagraph?: boolean
}
```

</details>

### EditorPlugin

Prop|Types|Required|Description
:--|:--:|:--:|:--
install|`(e: Editor, parentElement?: HTMLElement) => void`|yes|-

<details>
<summary>Source Code</summary>

```ts
interface EditorPlugin {
  install: (e: Editor, parentElement?: HTMLElement) => void
}
```

</details>

## Other Docs

Docs|Description|Url
:--|:--|:--
Editor|class Editor documentation, main module of SpEditor.|[/docs/Editor.md](./Editor.md)
EventEmitter|class EventEmitter documentation.|[/docs/EventEmitter.md](./EventEmitter.md)
SpEditor|class SpEditor documentation.|[/docs/SpEditor.md](./SpEditor.md)
nodejs-helpers|nodejs-helpers documentation.|[/docs/nodejs-helpers.md](./nodejs-helpers.md)
Others|Other documentations.|[/docs](./)

## License

MIT License © 2018-Present [Capricorncd](https://github.com/capricorncd).
