module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        root: ['./'],
        alias: {
          '@src': './src',
          '@components': './src/components',
          '@designSystem': './src/components/designSystem',
          '@utils': './src/utils',
          '@helpers': 'src/helpers'
        },
      },
    ],
    "@babel/plugin-transform-export-namespace-from",
    'react-native-reanimated/plugin',
  ],
};
