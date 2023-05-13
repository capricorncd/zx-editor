# nodejs-helpers

Some tool functions used in the Nodejs environment.

```js
const path = require('path')
const { afterBuild } = require('sp-editor/nodejs-helpers')
const pkg = require('../package.json')

afterBuild(path.resolve(__dirname, '../dist'), pkg, true)
```

## Methods

### afterBuild(distDir, pkg, needMoveToDist)

Handler function after build

Param|Types|Required|Description
:--|:--:|:--:|:--
distDir|`string`|yes|The directory where the processed files are located.
pkg|`object`|yes|package.json
needMoveToDist|`boolean`|no|optional parameter. It's true, will be move build files to the root dist directory.

- @returns `void`

## Types

### StringObject

```ts
type StringObject = Record<string, string | StringObject>
```

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
