# ZxEditor

extends [Editor](./Editor.md)

## Methods

### destroy()

destroy events

- @returns `void`

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

### ZxEditorOptions

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
interface ZxEditorOptions extends EditorOptions, StylePanelOptions, ToolbarOptions {
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

## License

MIT License © 2018-Present [Capricorncd](https://github.com/capricorncd).