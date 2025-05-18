module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'jsx-a11y', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended', // disables conflicting ESLint rules
  ],
  rules: {
    'prettier/prettier': ['error'],
    'react/react-in-jsx-scope': 'off', // for React 17+
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
