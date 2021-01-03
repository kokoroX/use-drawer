const extraBabelPlugins = [['babel-plugin-module-resolver', { root: ['.'], alias: { 'react': 'adapter-taro', '@use-dura/core': '@use-dura/taro' } }]];

export default {
  runtimeHelpers: false,
  extraBabelPlugins,
}