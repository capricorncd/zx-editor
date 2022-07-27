/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/05/05 18:14:25 (GMT+0900)
 */
module.exports = {
  root: true,
  env: {
    node: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier', 'import'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  rules: {
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': ['off'], // 先忽略，但是尽量少用 any
    'array-bracket-spacing': 2,
    'no-var': 2,
    'no-eval': 2,
    'arrow-spacing': 2,
    'block-spacing': 2,
    'key-spacing': 2,
    // if else换行
    'brace-style': 'off',
    // 'brace-style': 2,
    camelcase: 2,
    'comma-dangle': [2, 'always-multiline'],
    eqeqeq: [2, 'always', { null: 'ignore' }],
    'object-curly-spacing': [2, 'always'],
    'nonblock-statement-body-position': 2, // if 语句后必须跟大括号
    // 设置typescript-eslint规则
    // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin/docs/rules
    '@typescript-eslint/member-delimiter-style': [
      2,
      {
        multiline: {
          delimiter: 'none', // 'none' or 'semi' or 'comma'
          requireLast: true,
        },
        singleline: {
          delimiter: 'semi', // 'semi' or 'comma'
          requireLast: false,
        },
      },
    ],
    quotes: [2, 'single'],
    semi: [2, 'never'],
    // '@typescript-eslint/interface-name-prefix': [2, { prefixWithI: 'always' }],
    '@typescript-eslint/explicit-function-return-type': ['off'],
    // `var!`
    '@typescript-eslint/no-non-null-assertion': ['off'],
    // allow async-await
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
    // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/order.md
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', ['parent', 'sibling'], 'object', 'type', 'index'],
        'newlines-between': 'never',
        pathGroupsExcludedImportTypes: ['builtin'],
        alphabetize: { order: 'asc', caseInsensitive: true }, // 大文字小文字関係なくアルファベット順にしたい
        pathGroups: [
          // { "pattern": "assets/**", "group": "internal", "position": "before" },
        ],
      },
    ],
  },
}
