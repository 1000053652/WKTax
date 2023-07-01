module.exports = {
  plugins: ['@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
  },
  root: true,
  env: {
    jest: true,
  },
  settings: {
    'import/resolver': {
      typescript: {
        tsconfigRootDir: __dirname,
        project: './tsconfig.json',
      },
    },
  },
  extends: ['plugin:@typescript-eslint/recommended', 'prettier'],
  ignorePatterns: ['./node_static_modules/*'],
  rules: {
    camelcase: 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-misused-promises': [
      'error',
      {
        checksVoidReturn: false,
      },
    ],
  },
}
