# SpEditor

<p>
  <a href="https://npmcharts.com/compare/sp-editor?minimal=true"><img src="https://img.shields.io/npm/dm/sp-editor.svg?sanitize=true" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/sp-editor"><img src="https://img.shields.io/npm/v/sp-editor.svg?sanitize=true" alt="Version"></a>
  <a href="https://www.npmjs.com/package/sp-editor"><img src="https://img.shields.io/npm/l/sp-editor.svg?sanitize=true" alt="License"></a>
</p>

移动端 HTML 文档（富文本）编辑器，支持图文混排、引用、大标题、无序列表，字体颜色、加粗、斜体。

[SpEditor](./docs/SpEditor.md) is a HTML5 rich text editor in smartphone browsers, and it's extends [Editor](./docs/Editor.md).

> 目前在安卓手机上测试正常，苹果手机无法正确获取光标所在元素。
> At present, the test on the Android phone is normal, and the Apple phone cannot correctly obtain the element where the cursor is located.

## Build Setup

```bash
# 安装依赖
npm i

# http://localhost:9001
npm run dev

# build files
npm run build
```

## 使用 Use

```
# npm
npm i sp-editor

# pnpm
pnpm i sp-editor

# yarn
yarn add sp-editor
```

#### # ES6+

```javascript
import { SpEditor } from 'sp-editor'
import 'sp-editor/css'
const spEditor = new SpEditor({
  // container: document.querySelector('#app'),
  // or
  container: '#app'
})
```

#### # browser

```html
<link rel="stylesheet" href="./dist/sp-editor.min.css">
<div id="editorContainer">
  <!-- 编辑器容器 -->
</div>
<script src="./dist/sp-editor.umd.js"></script>
<script>
  // 初始化ZX编辑器
  const spEditor = new SpEditor('#editorContainer', {
    placeholder: '请输入内容',
  })
  console.log(spEditor)
</script>
```

## Preview

https://capricorncd.github.io/zx-editor/demo/

![sp-editor Preview](./qr.png)

## Docs

- [SpEditor](./docs/SpEditor.md)

- [Editor](./docs/Editor.md)

- [EventEmitter](./docs/EventEmitter.md)

- [Other](./docs)

## Copyright and license

Code and documentation copyright 2018-Present. capricorncd. Code released under the MIT License.
