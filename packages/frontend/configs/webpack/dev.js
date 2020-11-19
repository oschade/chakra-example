// development config
const { merge } = require('webpack-merge')
const webpack = require('webpack')
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const commonConfig = require('./common')

module.exports = merge(commonConfig, {
  // mode: 'development',
  // entry: {
  //   main: ['webpack-hot-middleware/client', './index.tsx'],
  // },
  // devtool: 'eval-cheap-source-map',
  // plugins: [
  //   new webpack.HotModuleReplacementPlugin(), // enable HMR globally
  //   new ReactRefreshPlugin({
  //     overlay: {
  //       sockIntegration: 'whm',
  //     },
  //   }),
  // ],
})
