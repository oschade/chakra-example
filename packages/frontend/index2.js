/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackConfig = require('./configs/webpack/dev')

const server = express()
const portNumber = 3000

const compiler = webpack(webpackConfig)

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
server.use(
  webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: 'errors-warnings',
  })
)

server.use(
  require(`webpack-hot-middleware`)(compiler, {
    log: false,
    path: `/__webpack_hmr`,
    heartbeat: 10 * 1000,
  })
)

server.use(express.static('public'))

module.exports = server

// server.listen(portNumber, () => {
//   console.log(`Express web server started: http://localhost:${portNumber}`)
//   console.log(`Serving content from /${sourceDir}/`)
// })
