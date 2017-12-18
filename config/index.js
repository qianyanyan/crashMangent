var path = require('path')
var prodConfig = require('./prod.env')
var devConfig = require('./dev.env')
module.exports = {
  build: {
    port: prodConfig.port,
    API_ROOT: prodConfig.API_ROOT,
    env: prodConfig,
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',
    productionSourceMap: true,
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: process.env.npm_config_report,
    proxyTable: {
      '/apis': {
        target: prodConfig.API_ROOT,
        changeOrigin: true,
        pathRewrite: prodConfig.apis
      }
    },
  },
  dev: {
    env: devConfig,
    port: devConfig.port,
    API_ROOT: devConfig.API_ROOT,
    autoOpenBrowser: false,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/apis': {
        target: devConfig.API_ROOT,
        changeOrigin: true,
        pathRewrite: devConfig.apis
      }
    },
    cssSourceMap: false
  }
}
