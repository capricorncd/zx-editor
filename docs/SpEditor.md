# SpEditor

SpEditor is a HTML5 rich text editor in smartphone browsers, and it's extends [Editor](./Editor.md).

## Methods

More methods please see [Editor](./Editor.md#methods) methods documentation.

### addToolbarButton(params, index)

Add a custom button to `toolbar`.

Param|Types|Required|Description
:--|:--|:--|:--
params|`ButtonOptions`|yes|[ButtonOptions](#ButtonOptions)
index|`number`|no|New button insertion index.

- @returns `void`

```js
// Add a button named 'custom-button-name' for toolbar.
editor.addToolbarButton({
  name: 'custom-button-name',
})

// when the button is clicked
editor.on('toolbarButtonOnClick', (name) => {
  if (name === 'custom-button-name') {
    // do something ...
  }
})
```

### destroy()

destroy events

- @returns `void`

### handleImageFile(files)

Image files handler.

Param|Types|Required|Description
:--|:--|:--|:--
files|`FileList`/`File[]`/`Blob[]`/`null`|yes|Image files.

- @returns `Promise<MediaFileHandlerData[]` [MediaFileHandlerData](https://github.com/capricorncd/image-process-tools#returns)

## Types

### ButtonOptions

button options, use by add button to toolbar

Prop|Types|Required|Description
:--|:--|:--|:--
name|`string`|yes|button name, returned when button is clicked
className|`string`|no|class='name'
innerHtml|`string`/`HTMLElement`/`Node`|no|inner html, Element or Node
style|`CSSProperties`|no|style

<details>
<summary>Source Code</summary>

```ts
interface ButtonOptions {
  // button name, returned when button is clicked
  name: string
  // class='name'
  className?: string
  // inner html, Element or Node
  innerHtml?: string | HTMLElement | Node
  // style
  style?: CSSProperties
}
```

</details>

### SpEditorOptions

extends [EditorOptions](./editor.md#EditorOptions), [StylePanelOptions](#StylePanelOptions) and [ToolbarOptions](#ToolbarOptions)

Prop|Types|Required|Description
:--|:--|:--|:--
textStyleColors|`string[]`|no|colors array of style panel, default `['#333333', '#d0d0d0', '#ff583d', '#fdaa25', '#44c67b', '#14b2e0', '#b065e2']`.
textStyleTitle|`string`|no|title of style panel, default `Set Style`.
textStyleHeadLeftBtnText|`string`|no|text of button that style panel's left, default `Clear`.
toolbarBeenFixed|`boolean`|no|Has the toolbar been fixed. default `true`
toolbarHeight|`number`/`string`|no|toolbar height. default `50px`
toolbarButtons|`string[]`|no|buttons name, and order. default `['choose-picture', 'text-style']`. Button click events can be listener `editor.on('toolbarButtonOnClick, ('button-name') => { ... })`
customPictureHandler|`() => void`|no|image options customize Picture Handler
imageMaxWidth|`number`|no|image max width, default `750`
ignoreGif|`boolean`|no|GIF pictures are not processed, default `true`.
forceImageResize|`boolean`|no|Force the width/height of the picture, even if the width/height of the picture is smaller than the target width/height. default `false`.
chooseFileMultiple|`boolean`|no|When the `multiple` Boolean attribute is specified, the file input allows the user to select more than one file. default `true`.
chooseFileAccept|`string`|no|mimeType, for example `image/jpeg`, default `image/*`

<details>
<summary>Source Code</summary>

```ts
interface SpEditorOptions extends EditorOptions, StylePanelOptions, ToolbarOptions {
  // image options
  // customize Picture Handler
  customPictureHandler?: () => void
  // image max width, default `750`
  imageMaxWidth?: number
  // GIF pictures are not processed, default `true`.
  ignoreGif?: boolean
  // Force the width/height of the picture, even if the width/height of the picture
  // is smaller than the target width/height. default `false`.
  forceImageResize?: boolean
  // When the `multiple` Boolean attribute is specified, the file input allows the user to select more than one file. default `true`.
  chooseFileMultiple?: boolean
  // mimeType, for example `image/jpeg`, default `image/*`
  chooseFileAccept?: string
}
```

</details>

### StylePanelOptions

Prop|Types|Required|Description
:--|:--|:--|:--
textStyleColors|`string[]`|no|colors array of style panel, default `['#333333', '#d0d0d0', '#ff583d', '#fdaa25', '#44c67b', '#14b2e0', '#b065e2']`.
textStyleTitle|`string`|no|title of style panel, default `Set Style`.
textStyleHeadLeftBtnText|`string`|no|text of button that style panel's left, default `Clear`.

<details>
<summary>Source Code</summary>

```ts
interface StylePanelOptions {
  // colors array of style panel, default `['#333333', '#d0d0d0', '#ff583d', '#fdaa25', '#44c67b', '#14b2e0', '#b065e2']`.
  textStyleColors?: string[]
  // title of style panel, default `Set Style`.
  textStyleTitle?: string
  // text of button that style panel's left, default `Clear`.
  textStyleHeadLeftBtnText?: string
}
```

</details>

### ToolbarOptions

toolbar options

Prop|Types|Required|Description
:--|:--|:--|:--
toolbarBeenFixed|`boolean`|no|Has the toolbar been fixed. default `true`
toolbarHeight|`number`/`string`|no|toolbar height. default `50px`
toolbarButtons|`string[]`|no|buttons name, and order. default `['choose-picture', 'text-style']`. Button click events can be listener `editor.on('toolbarButtonOnClick, ('button-name') => { ... })`

<details>
<summary>Source Code</summary>

```ts
interface ToolbarOptions {
  // Has the toolbar been fixed. default `true`
  toolbarBeenFixed?: boolean
  // toolbar height. default `50px`
  toolbarHeight?: number | string
  // buttons name, and order. default `['choose-picture', 'text-style']`.
  // Button click events can be listener `editor.on('toolbarButtonOnClick, ('button-name') => { ... })`
  toolbarButtons?: string[]
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
