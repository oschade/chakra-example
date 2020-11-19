/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express')
const webpack = require('webpack')
const path = require('path')
const webpackDevMiddleware = require('webpack-dev-middleware')
const { devServer } = require('utils')
const webpackConfig = require('./configs/webpack/dev')

const server = devServer({
  dev: true,
  context: path.resolve(__dirname, 'src'),
  webpackConfig,
})

module.exports = server
