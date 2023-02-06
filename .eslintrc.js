module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'react-hooks'],
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended', 'react-app'],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js', '*.css', '*.scss', '*.less', '*.sass', '*.svg', '*.png', '*.jpg', '*.jpeg'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    'no-console': 'warn',
    'no-useless-constructor': 'off',
    'prettier/prettier': ['error', {endOfLine: 'auto'}],
    'no-restricted-imports': 'off',
  },
};
