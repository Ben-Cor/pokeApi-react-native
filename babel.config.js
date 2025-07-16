module.exports = function(api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'react' }],
    ],
    plugins: [
      'react-native-reanimated/plugin',
    ],
  };
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
};
