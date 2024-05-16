/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
  ],
  // parser: '@typescript-eslint/parser',
  parser: "vue-eslint-parser",
  plugins: ["@html-eslint"],
  overrides: [
    {
      files: ['e2e/**/*.{test,spec}.{js,ts,jsx,tsx}'],
      extends: ['plugin:playwright/recommended']
    },
    {
      files: ["*.html"],
      parser: "@html-eslint/parser",
      extends: ["plugin:@html-eslint/recommended"],
    },
  ],
  rules: {
    "@html-eslint/indent": ["error", 2],
    "@html-eslint/element-newline": "error",
    "@html-eslint/lowercase": "error",
  },
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: 'latest'
  }
}
