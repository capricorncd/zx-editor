# ZxEditor

移动端HTML文档（富文本）编辑器，支持图文混排、引用、大标题、无序列表，字体颜色、加粗、斜体。

可用于独立web项目开发，也可以用于与原生App混合(hybrid)开发。

## 本地运行 Build Setup

``` bash
# 安装依赖
npm i

# http://localhost:9001
npm run dev

# build files
npm run build
```

## 使用 Use

#### # npm

```bash
npm install zx-editor --save-dev
```

#### # browser

```html
<div id="editorContainer">
  <!-- 编辑器容器 -->
</div>
<script src="./dist/js/zx-editor.min.js"></script>
<script>
  // 初始化ZX编辑器
  var zxEditor = new ZxEditor('#editorContainer', {
    // 内容是否可以被编辑
    editable: true,
    // editor height
    height: null,
    // fixed editor height
    fixedHeight: false,
    // style
    placeholder: '',
    placeholderColor: '',
    lineHeight: 1.5,
    // paragraph spacing
    padding: '',
    cursorColor: '',
    // Has the toolbar been fixed?
    toolbarBeenFixed: true,
    toolbarHeight: 50,
    toolbarBtns: ['select-picture', 'text-style'],
    // customize Picture Handler
    customizePictureHandler: false,
    // image max width piexl
    imageMaxWidth: 720,
    // image max size, unit Kib
    imageMaxSize: 10240,
    // template
    imageSectionTemp: `<section><img src="{url}"></section>`,
    // text style
    textStyleColors: {},
    // border color
    borderColor: ''
  })
</script>
```

注意：添加照片时，判断照片方向，并自动旋转需要依赖插件 exif.js

#### # ES6+

```javascript
import { ZxEditor } from 'zx-editor'
// import { ZxEditor } from './src/js/zx-editor/index.js'
```

## 参数 options

...

## 属性 property

...

## 通知 notify

* contentChange

```
// 编辑器内容改变
zxEditor.on('contentChange', function (zxeditorInstance) {
 // zxeditor 编辑器实例
  console.log(zxeditorInstance)
})
```

* error, 错误异常通知


## 方法 methods

```javascript
// use methodName()
zxEditor.methodName(options)
```

#### toolbar.addButton(option)

底部工具栏添加按钮，`option`: `Object|Array`

```javascript
zxEditor.toolbar.addButton({
  name: 'text-style',
  el: null,
  className: 'text-style-btn',
  events: {
    type: 'click',
    handler: () => {
      this.textStylePanel.show()
    }
  }
})
```

#### destroy()

移除通过on方法监听的事件；移除编辑器dom元素。

#### # fileToBase64(files, opts)

图片文件数据转为base64/blob

|参数|类型|说明|
|:--|:--|:--|
|file|文件类型|文件|
|opts|`Object`|图片压缩或裁剪参数`{width:100,height:100}`|


#### # getBase64Images()

获取正文中所有base64数据的图片，返回一个数组

@return array

```javascript
  [
    {
      id: 'zxEditor_img_1500001511111',
      base64: 'data:image/jpeg;base64,/9j4AAQSkZJDAAkGB+wgH....',
      blob: 'Blob数据，可以用于直接上传，或通过方法toBlobData(base64)转换'
    }
  ]
```

#### getHtml()

获取正文内容html。

@params 'isInnerText'可选，默认为`false`，获取编辑器innerHTML。否则获取innerText。

#### getText()

#### # insertElm($el)

向正文焦点处添加任意dom元素$el

$el: `HTMLElement` or string


#### on(notifyName, callback)

监听编辑器内部通知。详见"通知Notify"！

#### # removeHtmlTags(htmlStr)

去除html标签

#### # setHtml(innerHTML)

设置编辑器内容，可用于初始化编辑器数据。

#### # setImageSrc(imgId, imgUrl)

将ID为imgId的图片base64地址，替换为新的imgUrl。需配合`getBase64Images()`方法使用。

@return boolean

#### # base64ToBlobData(base64)

将图片base64转换为原始数据类型Blob()，该数据和表单中提交上传的数据同类型，故可以直接上传

@return new Blob() 返回Blob()数据

## Copyright and license

Code and documentation copyright 2018. capricorncd. Code released under the MIT License.



