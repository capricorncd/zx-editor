/* eslint-disable @typescript-eslint/no-var-requires */
const { execSync } = require('child_process')
const { writeFileSync, readFileSync } = require('fs')
const {
  createPromptModule,
  ui: { Prompt },
} = require('inquirer')

const COMMIT_TYPES = {
  '新增功能(feat)': 'feat',
  '修复BUG(fix)': 'fix',
  '合并代码(merge)': 'merge',
  '代码格式化(lint)': 'lint',
  '测试(test)': 'test',
  '构建(build)': 'build',
  '修改CSS样式(style)': 'style',
  '代码整形(lint)': 'lint',
  '重构(refactor)': 'refactor',
  '文档修改(docs)': 'docs',
  '回滚提交(revert)': 'revert',
  '性能优化(perf)': 'perf',
  '其他(chore)': 'chore',
}

function main() {
  return new Promise((resolve, reject) => {
    // 获取commit消息，并去除结尾的换行符
    const msg = readFileSync(process.env.GIT_PARAMS, 'utf-8').replace(/(\r|\n)$/, '')

    const stdout = execSync('git branch --contains=HEAD').toString()
    const branch = stdout.match(/^\*? +([^\s]+)/, '')[1]
    const mergeReg = new RegExp(`Merge branch '.+' into ${branch}`, 'g')
    if (msg.match(mergeReg)) return Promise.resolve()

    const branchName = execSync('git branch --show-current').toString()
    const ticketNo = branchName ? `${branchName.replace(/\r?\n/g, '')}`.split('/') : ['']
    // Ctrl+C中断事件处理
    const promptModule = createPromptModule()
    const ui = new Prompt(promptModule.prompts, {})
    const handleCtrlC = () => {
      ui.rl.off('SIGINT', handleCtrlC)
      ui.close()
      reject(new Error('Commit处理已终止', ui))
    }
    ui.rl.on('SIGINT', handleCtrlC)

    const stores = [
      {
        type: 'message',
        name: 'branch',
        message: '请确定分支名称',
        default: ticketNo[ticketNo.length - 1],
      },
      {
        type: 'list',
        name: 'commitType',
        message: '请选择提交的分类',
        choices: Object.keys(COMMIT_TYPES),
      },
      {
        name: 'message',
        message: '消息确认（可以在此重新输入新的内容）',
        default: msg,
      },
    ]

    ui.run(stores)
      .then(({ branch, commitType, message }) => {
        writeFileSync(process.env.GIT_PARAMS, `${COMMIT_TYPES[commitType]}: ${message}(${branch})`)
        resolve()
      })
      .catch(reject)
  })
}

main()
