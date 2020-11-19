/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require('webpack')
const config = require('./configs/webpack/prod.js')

const compiler = webpack(config)

compiler.run((callback) => {
  console.log('compiling ready')
  console.log('callback:', callback)
})
