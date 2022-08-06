# nodejs-helpers

Some tool functions used in the Nodejs environment

```js
const path = require('path')
const { afterBuild } = require('@zx-editor/helpers-nodejs')
const pkg = require('../package.json')

afterBuild(path.resolve(__dirname, '../dist'), pkg, true)
```

## Methods

### afterBuild(distDir, pkg, needMoveToDist?)

Handler function after build

- @param distDir `string` The directory where the processed files are located.
- @param pkg `object` package.json
- @param needMoveToDist `boolean` optional parameter. It's true, will be move build files to the root dist directory.

- @returns `void`

## Types

### StringObject

```ts
type StringObject = Record<string, string | StringObject>
```

## License

MIT License © 2018-Present [Capricorncd](https://github.com/capricorncd).