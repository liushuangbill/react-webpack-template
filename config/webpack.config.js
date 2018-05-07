const path = require('path')
const webpack = require("webpack");
const HTMLPlugin = require("html-webpack-plugin")
const ExtractTextPlugin = require("extract-text-webpack-plugin")

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    app: resolve("src/index.js")
  },
  output: {
    path: resolve("dist"),
    filename: "bundle.[hash].js"
  },
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      "@": resolve("src")
    }
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        loader: "babel-loader",
        exclude: [resolve("node_modules")]
      },
      {
        test: /\.css$/,
        // 分离css与js
        loader: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "postcss-loader"]
        })
      },
      //配置file-loader，加载图片，字体资源
      {
        test: /\.(gif|jpg|png|woff|svg|eot|ttf)$/,
        loader: "file-loader?limit=50000&name=[path][name].[ext]"
      }
    ]
  },
  plugins: [
    new HTMLPlugin({
      template: resolve("index.html")
    }),
    // 自动加载模块，而不必到处 import 或 require 。
    new webpack.ProvidePlugin({
      React: "react",
      PropTypes: "prop-types"
    }),
    // 打包的css文件名
    new ExtractTextPlugin("main.css"),
    // 模块热替换插件
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    port: 8080,
    contentBase: resolve("dist"),
    hot: true,
    inline: true,
    host: "0.0.0.0",
    open: true,
    progress: false
  }
};