/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/07/24 16:07:35 (GMT+0900)
 */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const { afterBuild } = require('@zx-editor/helpers-nodejs')
const pkg = require('../package.json')

afterBuild(path.resolve(__dirname, '../dist'), pkg)
