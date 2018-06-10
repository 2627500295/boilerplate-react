// 路径处理
const { appDirectory, resolve, resolveOwn } = require('./paths');

// Webpack
const webpack = require('webpack');

// 配置合并
const merge = require('webpack-merge');

// 压缩代码
const UglifyJS = require('uglifyjs-webpack-plugin');
const OptimizeCSS = require('optimize-css-assets-webpack-plugin');

// 基础配置
const baseConfig = merge({}, {
  // 上下文, entry 和 module.rules.loader 选项相对于此目录开始解析
  context: appDirectory,

  // 入口
  entry: {
    app: ['src']
  },

  // 出口
  output: {
    pathinfo: true,
    filename: "assets/scripts/[name].[hash:5].js",
    chunkFilename: 'assets/scripts/[name].[chunkhash:5].js',

    // CDN 地址替换, 请修改此处
    // https://blog.csdn.net/wlchn/article/details/78468586
    publicPath: ""
  },

  // 优化
  optimization: {
    // 代码压缩
    minimizer: [
      // JavaScript 压缩
      new UglifyJS({ uglifyOptions: { output: { comments: false, }, }, }),

      // CSS 压缩
      new OptimizeCSS({ cssProcessorOptions: { autoprefixer: false, sourcemap: true, discardComments: true, safe: true, }, }),
    ],
  },

  // resolve
  resolve: {
    // 自动识别后缀, 使用import时可以忽略后缀
    extensions: [".ts", ".tsx", '.js', '.jsx', '.mjs', '.vue', '.json',],

    // 别名
    alias: {
      '@': resolve('src'),
      '': resolve('src/')
    },

    // 模块目录
    modules: ['node_modules',],
  },

  // 模块
  module: {
    // 规则
    rules: [
      // ESLint
      {
        test: /\.(js|mjs|jsx|vue)$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        include: resolve('src'),
        exclude: /^(node_modules|bower_components)$/,
      },

      // TSLint
      {
        test: /\.(ts|tsx)$/,
        enforce: 'pre',
        loader: 'tslint-loader',
        include: resolve('src'),
        exclude: /^(node_modules|bower_components)$/,
      },

      {
        oneOf: [
          // TypeScript
          {
            test: /\.(ts|tsx)$/,
            loader: "ts-loader",
            options: {},
            exclude: /^node_modules$/,
          },

          // JavaScript
          {
            test: /\.(js|jsx|mjs)$/,
            loader: "babel-loader",
            options: { cacheDirectory: true, compact: true, },
            exclude: /^(node_modules|bower_components)$/,
          },

          // 字体处理
          {
            test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
            loader: 'url-loader',
            options: { limit: 10000, name: 'assets/fonts/[name].[hash:7].[ext]', },
          },

          // 图片处理
          {
            test: /\.(png|jpe|jpeg|gif)(\?.*)?$/,
            loader: 'url-loader',
            options: { limit: 10000, name: 'assets/images/[name].[hash:7].[ext]', },
          },

          // 媒体文件
          {
            test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
            loader: 'url-loader',
            options: { limit: 10000, name: 'assets/media/[name].[hash:7].[ext]', },
          },
        ],
      },
    ],
  },
  // 插件
  plugins: [],
});



const prodConfig = merge(baseConfig, {
  // 模式
  mode: "production",

  // 控制台报错
  devtool: '#@eval',

  entry: {
    // 抽取react
    react: ['react', 'react-dom', 'react-router', 'react-router-dom', 'mobx', 'mobx-react'],
  },

  optimization: {
    // 拆分公共包
    // https://webpack.js.org/plugins/split-chunks-plugin/
    cacheGroups: {
      // 抽取所有CSS为一个文件
      // https://webpack.js.org/plugins/mini-css-extract-plugin/#extracting-all-css-in-a-single-file
      styles: { name: 'styles', test: /\.css$/, chunks: 'all', enforce: true },

      // 第三方组件
      vendors: { test: /[\\/]node_modules[\\/]/, priority: -10, chunks: 'initial', name: 'vendors', enforce: true },

      // 指定组件
      react: { test: 'react', priority: 1, chunks: 'initial', name: 'react', enforce: true }
    }
  }
});


module.exports = baseConfig;

