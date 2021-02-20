module.exports = {
  root: true,
  extends: '@react-native-community',
  plugins: ['import'],
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        alias: {
          _assets: './src/assets',
          _components: './src/components',
          _navigations: './src/navigations',
          _screens: './src/screens',
          _data: './src/data',
          _styles: './src/styles',
          _helpers: './src/utilities/helpers',
          _constants: './src/utilities/constants',
        },
      },
    },
  },
};
