module.exports = {
  plugins: ['@typescript-eslint', 'jest', 'unused-imports'],
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true,
  },
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@next/next/recommended',
    'airbnb',
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:jest/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    'import/resolver': {
      typescript: {},
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
    react: {
      version: 'detect',
    },
  },
  rules: {
    // React Rules
    'react/jsx-key': 'warn',
    'react/no-deprecated': 'warn',
    'react/no-access-state-in-setstate': 'warn',
    'react/prop-types': 'off',
    'react/jsx-props-no-spreading': 'warn',
    'react/jsx-curly-brace-presence': 'warn',
    'react/react-in-jsx-scope': 'off', // Next.js 不需要引入 React
    'react/require-default-props': 'warn',
    'react/no-children-prop': 'warn',
    'react/destructuring-assignment': 'warn',
    'react/no-array-index-key': 'warn',
    'react-hooks/exhaustive-deps': 'warn',

    // Import/Export Rules
    'import/prefer-default-export': 'warn',
    'import/no-extraneous-dependencies': 'warn',
    'import/no-cycle': 'warn',
    'no-restricted-exports': 'warn',
    'import/no-duplicates': 'warn',
    'import/newline-after-import': 'warn',
    'import/order': [
      'warn',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling'],
          'index',
          'object',
          'type',
        ],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
          {
            pattern: 'next/**',
            group: 'external',
            position: 'before',
          },
          {
            pattern: 'react-dom/**',
            group: 'external',
            position: 'after',
          },
          {
            pattern: '@emotion/**',
            group: 'external',
            position: 'after',
          },
          {
            pattern: '@mui/**',
            group: 'external',
            position: 'after',
          },
          {
            pattern: '@eGroupAI/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: 'interfaces/**',
            group: 'type',
            position: 'after',
          },
          {
            pattern: 'utils/**',
            group: 'internal',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['react', 'next', 'react-dom'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],

    // TypeScript Rules
    '@typescript-eslint/array-type': ['warn', { default: 'array' }],
    '@typescript-eslint/no-shadow': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-use-before-define': 'warn',
    '@typescript-eslint/naming-convention': [
      'warn',
      {
        selector: 'interface',
        format: ['PascalCase'],
      },
      {
        selector: 'typeAlias',
        format: ['PascalCase'],
      },
    ],
    '@typescript-eslint/no-inferrable-types': 'warn',
    '@typescript-eslint/consistent-type-assertions': 'warn',
    '@typescript-eslint/no-unused-vars': 'off',

    // JavaScript Style Rules
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'consistent-return': 'warn',
    'no-delete-var': 'warn',
    'no-param-reassign': ['warn', { props: false }],
    'no-var': 'warn',
    'array-callback-return': 'warn',
    'no-unsafe-optional-chaining': 'warn',
    'no-eval': 'warn',
    'prefer-promise-reject-errors': 'warn',
    'max-len': [
      'warn',
      {
        code: 120,
        ignoreComments: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      },
    ],
    'no-plusplus': 'warn',
    'no-underscore-dangle': 'warn',
    'func-names': 'warn',

    // JSX Accessibility Rules
    'jsx-a11y/alt-text': 'warn',
    'jsx-a11y/no-static-element-interactions': 'warn',
    'jsx-a11y/interactive-supports-focus': 'warn',
    'jsx-a11y/anchor-is-valid': 'warn',
    'jsx-a11y/click-events-have-key-events': 'warn',

    // Unused Imports Rules
    'unused-imports/no-unused-imports': 'warn',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],

    // Restricted Syntax Rules
    'no-restricted-syntax': [
      'warn',
      {
        selector: 'Comment[regex=/eslint-disable/]',
        message: 'Disabling eslint rules is not allowed in this project.',
      },
    ],
  },
  overrides: [
    {
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:testing-library/react'],
      rules: {
        'import/no-extraneous-dependencies': 'warn',
        'jest/no-disabled-tests': 'warn',
        'jest/no-focused-tests': 'warn',
        'jest/no-identical-title': 'warn',
        'jest/prefer-to-have-length': 'warn',
        'jest/valid-expect': 'warn',
      },
    },
  ],
};
