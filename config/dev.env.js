var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // API_ROOT: '"http://192.168.1.244:8088"',
  // IMG_SERVER: '"http://192.168.1.244:8090"',

    API_ROOT: '"http://192.168.1.42:8088"',
    IMG_SERVER: '"http://192.168.1.42:8088"',
  port: 8000,
  apis: {
    '^/apis': ''
  }
})

