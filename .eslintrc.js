module.exports = {
  'env': {
    'browser': false,
    'es2021': true,
    'node': true,
  },
  'extends': [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 13,
    'sourceType': 'module',
  },
  'plugins': [
    '@typescript-eslint',
    'unused-imports',
    'import',
  ],
  'rules': {
    'indent': [
      'error',
      2,
    ],
    'quotes': [
      'error',
      'single',
    ],
    'semi': [
      'error',
      'never',
    ],
    'no-multiple-empty-lines': ['error', {
      'max': 2,
      'maxEOF': 0,
    }],
    'eol-last': [
      'error',
      'always',
    ],
    'object-curly-spacing': ['error', 'always'],
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'comma-dangle': ['error', 'always-multiline'],
    'sort-imports': [
      'error',
      {
        'ignoreCase': true,
        'ignoreDeclarationSort': true,
      },
    ],
    'import/order': [
      'error', {
        'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
        'pathGroups': [
          {
            'pattern': '#/**',
            'group': 'internal',
            'position': 'after',
          },
        ],
        'newlines-between': 'always',
      },
    ],
    'import/no-unresolved': 'error',
  },
  'settings': {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts'],
    },
    'import/resolver': {
      'typescript': {
        'alwaysTryTypes': true,
      },
    },
  },
}
