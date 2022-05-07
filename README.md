# ZxEditor

<p>
  <a href="https://npmcharts.com/compare/zx-editor?minimal=true"><img src="https://img.shields.io/npm/dm/zx-editor.svg?sanitize=true" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/zx-editor"><img src="https://img.shields.io/npm/v/zx-editor.svg?sanitize=true" alt="Version"></a>
  <a href="https://www.npmjs.com/package/zx-editor"><img src="https://img.shields.io/npm/l/zx-editor.svg?sanitize=true" alt="License"></a>
</p>

移动端HTML文档（富文本）编辑器，支持图文混排、引用、大标题、无序列表，字体颜色、加粗、斜体。

可用于独立web项目开发，也可以用于与原生App混合(hybrid)开发。

旧版请见：[v2.x.x](https://github.com/capricorncd/zx-editor/tree/v2.x.x)

## 本地运行 Build Setup

``` bash
# 安装依赖
yarn

# http://localhost:9001
yarn dev

# build files
yarn build
```

## 使用 Use

```
# npm
npm i zx-editor

# yarn
yarn add zx-editor
```

#### # browser

```html
<link rel="stylesheet" href="./dist/css/zx-editor.min.css">
<div id="editorContainer">
  <!-- 编辑器容器 -->
</div>
<script src="./dist/js/zx-editor.min.js"></script>
<script>
  // 初始化ZX编辑器
  const zxEditor = new ZxEditor('#editorContainer', {
    placeholder: '请输入内容'
  })
  console.log(zxEditor)
</script>
```

注意：添加照片时，判断照片方向，并自动旋转需要依赖插件 exif.js

#### # ES6+

```javascript
import { ZxEditor } from 'zx-editor'
// import { ZxEditor } from './src/js/zx-editor/index.js'
// import css
import 'zx-editor/dist/css/zx-editor.min.css'
```

## Options

```ts
{
  editable?: boolean
  placeholder?: string
  placeholderColor?: string
  lineHeight?: string | number
  minHeight?: string | number
  // paragraph tail spacing, default 10px
  // paragraphTailSpacing?: string | number;
  // 光标颜色
  caretColor?: string
  textColor?: string
  // iphone会自动移动，难控制
  // 光标所在行距页面顶部的距离30px
  cursorOffsetTop?: number
  // 自定义粘贴处理函数
  customPasteHandler?: () => void
  styles?: Record<string, any>
}
```

## Methods

### `insert(input: string | HTMLElement): void`
### `setHtml(html: string): void`
### `getHtml(): string`

### use(plugin: Types.Plugin): void

## Copyright and license

Code and documentation copyright 2018. capricorncd. Code released under the MIT License.



