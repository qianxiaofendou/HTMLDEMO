'use strict';

const webpack = require("webpack");
const uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

module.exports = {
  context: __dirname + "/js",
  // entry: {city_func:['babel-polyfill','./city_func.js']},
  entry: {city_func:['core-js/fn/string/includes','core-js/fn/array/includes','./city_func.js']},  //如果只用到了几个es6的新特性，没必要引入全部的，可以引入单个需要的即可
  output: {
    path: __dirname + "/dist/js",
    filename: "[name].js",
  },
  plugins: [
    new uglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ],
  module: {
    loaders:[
      { test: /\.js$/,exclude:/node_modules/, loader: 'babel-loader', query:{presets:['es2015']}},
    ]
  }
};


/**
 * loaders——用于配置对应后缀的文件使用何种加载器进行处理
 *    test——使用正则表达式来指定某种特定的文件类型
 *    exclude——排除某个文件夹下的文件进行处理
 *    loader——指定相应的加载器，多个加载器使用 ! 进行连接，每个 loader 都可以省略其后缀，如 babel-loader 可以写成 babel(这里省略了好像编译会出差)
 *    query——指定加载器的配置信息，也可以使用 ? 直接连接在 loader 后面
 */