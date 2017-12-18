// // 引入配置文件信息模块
// var config = require('../config')
// // 引入nodejs的path模块，进行一些路径的操作，详情可以查看node官方的api
// var path = require('path')
// // 引入nodejs的一个框架express,可以帮助我们快速搭建一个node服务 github https://github.com/expressjs/express
// var express = require('express')
// // 一个可以设置帮助我们进行服务器转发代理的中间件 https://github.com/chimurai/http-proxy-middleware
// // var proxyMiddleware = require('http-proxy-middleware')
// // 端口号的设置
// var port = config.build.port
// // 获取需要代理的服务api
// // var proxyTable = config.build.proxyTable
// // 启动一个express服务
// var app = express()
//
// var log = require('./log');
// log.use(app);
//
// // 遍历代理的配置信息,并且使用中间件加载进去
// // Object.keys(proxyTable).forEach(function (context) {
// //   var options = proxyTable[context]
// //   options.target = options.target.replace(/\"/g,'')
// //   if (typeof options === 'string') {
// //     options = { target: options }
// //   }
// //   app.use(proxyMiddleware(context, options))
// // })
// // 当访问找不到的页面的时候，该中间件指定了一个默认的页面返回https://github.com/bripkens/connect-history-api-fallback
// app.use(require('connect-history-api-fallback')())
// // 根据配置信息拼接一个目录路径，然后将该路径下的文件交给express的静态目录管理
// app.use(express.static(path.join(__dirname, '../dist')))
//
// module.exports = app.listen(port, function (err) {
//   if (err) {
//     console.log(err)
//     return
//   } else {
//     console.log('Listening to: ' + port)
//   }
// })
