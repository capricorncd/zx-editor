/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/05/04 23:07:37 (GMT+0900)
 */
import { ZxEditor } from '../src'
import VConsole from 'vconsole'

// const app = document.querySelector<HTMLDivElement>('#app')!
//
// app.innerHTML = `
//   <h1>Hello Vite!</h1>
//   <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>`

// 实例化 VConsole
new VConsole()

const zxEditor = new ZxEditor('#app', {
  // caretColor: 'blue',
  // textColor: 'red',
})
// @ts-ignore
window.zxEditor = zxEditor
console.log(zxEditor)

zxEditor.on('change', e => {
  console.log('change', e)
})

zxEditor.insert('Text<p>p</p>')
