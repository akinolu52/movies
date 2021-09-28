module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    'react-native/react-native': true,
  },
  root: true,
  extends: ['eslint:recommended', '@react-native-community'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'react-native'],
  rules: {
    indent: ['error', 2],
    // indent: [2, 2, { SwitchCase: 1}],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'comma-dangle': [
      'error', 'always'
    ]
  },
  'jsx-runtime': {
    plugins: [
      'react'
    ],
    parserOptions: {
      ecmaFeatures: {
        jsx: true
      }
    },
    rules: {
      'react/react-in-jsx-scope': 0,
      'react/jsx-uses-react': 0
    }
  }
};
