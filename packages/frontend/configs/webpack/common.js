// shared config (dev and prod)
const { resolve } = require('path')
const { BASE_DIR } = require('utils')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const babelConfig = require('./babelConfig')

module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: resolve(__dirname, '../../tsconfig.json'),
      }),
    ],
    alias: {
      home: resolve(BASE_DIR),
    },
    modules: ['node_modules', resolve(`${BASE_DIR}/node_modules`)],
  },
  // context: resolve(__dirname, '../../src'),
  // module: {
  //   rules: [
  //     {
  //       test: /\.js$/,
  //       use: [
  //         { loader: 'babel-loader', options: babelConfig },
  //         { loader: 'source-map-loader' },
  //       ],
  //       exclude: /node_modules/,
  //     },
  //     {
  //       test: /\.tsx?$/,
  //       use: [
  //         { loader: 'babel-loader', options: babelConfig },
  //         // { loader: 'ts-loader' },
  //       ],
  //     },
  //     {
  //       test: /\.css$/,
  //       use: [
  //         'style-loader',
  //         { loader: 'css-loader', options: { importLoaders: 1 } },
  //       ],
  //     },
  //     {
  //       test: /\.(jpe?g|png|gif|svg)$/i,
  //       use: [
  //         {
  //           loader: 'file-loader?hash=sha512&digest=hex&name=img/[hash].[ext]',
  //         },
  //         {
  //           loader:
  //             'image-webpack-loader?bypassOnDebug&optipng.optimizationLevel=7&gifsicle.interlaced=false',
  //         },
  //       ],
  //     },
  //     {
  //       test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
  //       use: [
  //         {
  //           loader: 'file-loader',
  //           options: {
  //             name: '[name].[ext]',
  //             outputPath: 'fonts/',
  //           },
  //         },
  //       ],
  //     },
  //   ],
  // },
  // plugins: [new HtmlWebpackPlugin({ template: 'index.html.ejs' })],
  // externals: {},
  // performance: {
  //   hints: false,
  // },
  // output: {
  //   filename: '[name].bundle.js',
  //   path: resolve(__dirname, 'dist'),
  //   publicPath: '/',
  // },
}
