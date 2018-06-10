// 路径处理
const { appDirectory, resolve, resolveOwn } = require('./paths');

// Webpack
const webpack = require('webpack');
const { NamedModulesPlugin, HotModuleReplacementPlugin, DllReferencePlugin, DllPlugin, ProvidePlugin } = webpack;

// 配置合并
const merge = require('webpack-merge');

// 清理目录
const CleanPlugin = require('clean-webpack-plugin');

// 复制
const CopyPlugin = require('copy-webpack-plugin');

// HTML
const HtmlPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

// CSS
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// 导入基础配置
const baseConfig = require('./base');

// 获取端口
const PORT = process.env.PORT || 8000;

// 入口二次处理
baseConfig.entry.app = [].concat(
  [
    'babel-polyfill',
    // `webpack-dev-server/client?http://localhost:${PORT}/`,
    'webpack/hot/dev-server',
  ],
  [resolve('src/index.tsx')]
);

// 开发配置
const devConfig = merge(baseConfig, {
  // 模式
  mode: "development",

  // 控制台报错
  devtool: 'inline-source-map',

  // 出口
  output: { publicPath: '', },

  // 优化
  optimization: { minimize: false, },

  module: {
    rules: [
      // PostCSS and CSS
      {
        test: /\.(css|postcss)$/,
        use: [
          { loader: "style-loader", options: { "sourceMap": true, } },
          { loader: "css-loader", options: { "sourceMap": true, modules: false, camelCase: false, localIdentName: '[name]__[local]--[hash:base64:5]', importLoaders: 1, } },
          { loader: "postcss-loader", options: { "sourceMap": true, } },
        ],
        exclude: /^node_modules$/,
      },

      // Stylus
      {
        test: /\.(stylus|styl)$/,
        "use": [
          { loader: "style-loader", options: { "sourceMap": true, } },
          { loader: "css-loader", options: { "sourceMap": true, modules: false, camelCase: false, localIdentName: '[name]__[local]--[hash:base64:5]', importLoaders: 2, } },
          { loader: "postcss-loader", options: { "sourceMap": true } },
          { loader: "stylus-loader", options: { "sourceMap": true } }
        ]
      },


      // Sass
      {
        test: /\.(sass|scss)$/,
        use: [
          { loader: "style-loader", options: { "sourceMap": true, } },
          { loader: "css-loader", options: { "sourceMap": true, modules: false, camelCase: false, localIdentName: '[name]__[local]--[hash:base64:5]', importLoaders: 2, } },
          { loader: "postcss-loader", options: { "sourceMap": true, } },
          { loader: "sass-loader", options: { "sourceMap": true, } },
        ],
        exclude: /^node_modules$/,
      },


      // Less
      {
        test: /\.less$/,
        use: [
          { loader: "style-loader", options: { "sourceMap": true, } },
          { loader: "css-loader", options: { "sourceMap": true, modules: false, camelCase: false, localIdentName: '[name]__[local]--[hash:base64:5]', importLoaders: 2, } },
          { loader: "postcss-loader", options: { "sourceMap": true, } },
          { loader: "less-loader", options: { "sourceMap": true, } },
        ],
        exclude: /^node_modules$/,
      },
    ],
  },

  // 插件
  plugins: [
    new HtmlPlugin({
      inject: true,
      title: 'React App',
      filename: 'index.html',
      template: resolve('public/index.html'),
      favicon: resolve('public/favicon.ico'),
      hash: false, // 为静态资源生成hash值
      cache: true,
      minify: {
        removeComments: false, //移除HTML中的注释
        collapseWhitespace: false //删除空白符与换行符
      },
    }),

    new NamedModulesPlugin(),

    new HotModuleReplacementPlugin(),

    new ProvidePlugin({
      $: 'jquery' //下载Jquery库
    }),
  ],

  // 开发服务器
  devServer: {
    // 打开浏览器
    open: true,

    // 不跳转
    historyApiFallback: true,

    // 热更新
    hot: true,

    // 自动刷新
    inline: true,

    // 统计
    stats: {
      colors: true,
    },

    // 信息显示
    noInfo: false,

    // 端口
    port: PORT,

    // 主机
    host: '0.0.0.0',
  },
});

module.exports = devConfig;
