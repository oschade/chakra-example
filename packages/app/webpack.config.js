const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

module.exports = {
    mode: 'development',
    stats: 'errors-warnings',
    devtool: 'eval-cheap-source-map',
    plugins: [
      new webpack.HotModuleReplacementPlugin(), // enable HMR globally
      new ReactRefreshPlugin({
        overlay: {
          sockIntegration: 'whm',
        },
      }),
    ],
    entry: {
        //main: ['webpack-hot-middleware/client', './src/index.tsx'],
        app: path.join(__dirname, 'src', 'index.tsx')
    },
    target: 'web',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        modules: [
            'node_modules',
            path.resolve(`${__dirname}/../../../node_modules`), // utils dir
            path.resolve(`${__dirname}/../../../../../node_modules`), // monorepo root
          ],
    },
    resolveLoader: {
    // maybe needed a fallback in the future
    // https://github.com/webpack/webpack/issues/1482
        modules: [
            'node_modules',
            path.resolve(`${__dirname}/../../../node_modules`), // utils dir
            path.resolve(`${__dirname}/../../../../../node_modules`), // monorepo root
        ],
    },
    context: path.resolve(__dirname, './src'),
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: '/node_modules/'
            }
        ],
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'index.html')
        })
    ]
}
