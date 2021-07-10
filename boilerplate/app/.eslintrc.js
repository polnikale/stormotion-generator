module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react-native'],
  rules: {
    'prettier/prettier': 'warn',
    'no-catch-shadow': 'off',
    'no-shadow': 'off',
    'no-spaced-func': 'off',
    'no-unused-vars': 'warn',
    'react-native/no-unused-styles': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
    'react/jsx-sort-props': 'warn',
    'no-restricted-imports': [
      'warn',
      {
        paths: [
          {
            name: 'react-native-gesture-handler',
            importNames: [
              'TouchableOpacity',
              'TouchableNativeFeedback',
              'TouchableHighlight',
              'FlatList',
            ],
            message:
              "Please import it from 'react-native' to avoid unexpected errors.",
          },
        ],
      },
    ],
  },
};
