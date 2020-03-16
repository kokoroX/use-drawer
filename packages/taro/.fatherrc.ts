const extraBabelPlugins = [['babel-plugin-module-resolver', { root: ['.'], alias: { 'react': '@tarojs/taro', '@use-dura/core': '@use-dura/taro' } }]];

export default {
  runtimeHelpers: false,
  extraBabelPlugins,
}