// import js from '@eslint/js'
// import pluginVue from 'eslint-plugin-vue'
// import globals from 'globals'

// export default [
//   {
//     name: 'app/files-to-lint',
//     files: ['**/*.{js,mjs,jsx,vue}'],
//   },

//   {
//     name: 'app/files-to-ignore',
//     ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
//   },

//   {
//     languageOptions: {
//       globals: {
//         ...globals.browser,
//       },
//     },
//   },

//   js.configs.recommended,
//   ...pluginVue.configs['flat/essential'],
  
// ]
import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import globals from 'globals'
import tsParser from '@typescript-eslint/parser'
import tsPlugin from '@typescript-eslint/eslint-plugin'

export default [
  // 指定需要检查的文件
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,jsx,vue,ts,tsx}'],
  },

  // 忽略某些目录
  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },

  // 全局变量配置
  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },

  // JavaScript 推荐配置
  js.configs.recommended,

  // Vue 推荐配置
  ...pluginVue.configs['flat/essential'],

  // 新增 TypeScript 配置，只作用于 .ts 和 .tsx 文件
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
    },
  },
]
