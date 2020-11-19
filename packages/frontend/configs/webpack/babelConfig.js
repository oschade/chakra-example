const isDev = require('isdev')

const plugins = []

if (isDev) {
  plugins.push(require.resolve('react-refresh/babel'))
}

module.exports = {
  presets: [
    ['@babel/preset-env', { modules: false }],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
  plugins,
  env: {
    production: {
      presets: ['minify'],
    },
    test: {
      presets: ['@babel/preset-env', '@babel/preset-react'],
    },
  },
}
