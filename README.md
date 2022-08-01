# ZxEditor

<p>
  <a href="https://npmcharts.com/compare/zx-editor?minimal=true"><img src="https://img.shields.io/npm/dm/zx-editor.svg?sanitize=true" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/zx-editor"><img src="https://img.shields.io/npm/v/zx-editor.svg?sanitize=true" alt="Version"></a>
  <a href="https://www.npmjs.com/package/zx-editor"><img src="https://img.shields.io/npm/l/zx-editor.svg?sanitize=true" alt="License"></a>
</p>

移动端 HTML 文档（富文本）编辑器，支持图文混排、引用、大标题、无序列表，字体颜色、加粗、斜体。

## Build Setup

```bash
# 安装依赖
pnpm i

cd packages/zx-editor
# http://localhost:9001
pnpm dev

# build files
pnpm build
```

## 使用 Use

```
# npm
npm i zx-editor

# pnpm
pnpm i zx-editor

# yarn
yarn add zx-editor
```

#### # browser

```html
<!--<link rel="stylesheet" href="./dist/zx-editor.min.css">-->
<div id="editorContainer">
  <!-- 编辑器容器 -->
</div>
<script src="./dist/zx-editor.umd.js"></script>
<script>
  // 初始化ZX编辑器
  const zxEditor = new ZxEditor('#editorContainer', {
    placeholder: '请输入内容',
  })
  console.log(zxEditor)
</script>
```

#### # ES6+

```javascript
import { ZxEditor } from 'zx-editor'
// import { ZxEditor } from './src/js/zx-editor/index.js'
// import css
// import 'zx-editor/dist/zx-editor.min.css'
const zxEditor = new ZxEditor({
  // container: document.querySelector('#app'),
  // or
  container: '#app'
})
```

## Docs

- [Editor](./docs/Editor.md)

- [EventEmitter](./docs/EventEmitter.md)

- [Other](./docs)

## Copyright and license

Code and documentation copyright 2018-2022. capricorncd. Code released under the MIT License.
