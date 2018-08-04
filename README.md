# ZxEditor

移动端HTML文档（富文本）编辑器，支持图文混排、引用、大标题、无序列表，字体颜色、加粗、斜体。

![ZxEditor](resource/preview.jpg)

手机端预览

![ZxEditor](resource/qrcode.png)

## Build Setup

* 安装项目依赖

``` bash
# install dependencies
npm install
```

* Development 开发模式

``` bash
npm run dev
```

  通过 `http://localhost:9001` 可以访问

* Production 生成项目文件

``` bash
npm run build
```

## USE

* npm

```bash
  npm install zx-editor --save-dev
```

* html

```html
<div id="editorContainer">
  <!-- 编辑器容器 -->
</div>
<script src="./dist/zx-editor.js"></script>
<script>
  // 初始化ZX编辑器
  var zxEditor = new ZxEditor('#editorContainer', {
    // 开启debug模式
    debug: true
  })
  // 详见index.html文件
  // 判断照片方向，并自动旋转需要依赖插件 exif.js
</script>
```

* ES6+

```javascript
import { ZxEditor } from 'zx-editor'
// import { ZxEditor } from './src/js/zx-editor/index.js'
```

## API

* addFooterButton(option)

  底部工具栏添加按钮，`option`: `Object|Array`

  ```
  // 底部工具栏添加一个“导语”按钮
  zxEditor.addFooterButton({
    title: '导语',
    // 按钮外容器样式
    class: 'demo-summary-button',
    // 按钮内i元素样式名
    icon: '',
    // 需要注册的监听事件名
    on: 'summary-button'
  })
  ```

* addImage(src|base64)

  向正文焦点处添加一张图片，支持图片url地址或base64数据

* getBase64Images()

  获取正文中所有base64数据的图片，返回一个数组

  @return array

  ```
    [
      {
        id: 'zxEditor_img_1500001511111',
        base64: 'data:image/jpeg;base64,/9j4AAQSkZJDAAkGB+wgH....',
        blob: 'Blob数据，可以用于直接上传，或通过方法toBlobData(base64)转换'
      }
    ]
  ```

* toBlobData(base64)

  将图片base64转换为原始数据类型Blob()，该数据和表单中提交上传的数据同类型，故可以直接上传

  @return new Blob() 返回Blob()数据

* setImageSrc(imgId, imgUrl)

  将ID为imgId的图片base64地址，替换为新的imgUrl

  @return boolean

* getContent(isInnerText)

  获取正文内容html。

  @params 'isInnerText'可选，默认为`false`，获取编辑器innerHTML。否则获取innerText。

## Copyright and license

Code and documentation copyright 2018. zx1984. Code released under the MIT License.



