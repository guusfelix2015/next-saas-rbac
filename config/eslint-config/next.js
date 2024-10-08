/** @type {import("eslint").Linter.Config} */

module.exports = {
  extends: ['@rocketseat/eslint-config/nextjs'],
  plugins: ['simple-import-sort'],
  rules: {
    'simple-import-sort/imports': 'error',
  },
}
