// 路径处理
import { resolve } from './paths';

// webpack
import webpack, {} from 'webpack';

// 配置合并
import merge from 'webpack-merge';

// // 清理目录
// import CleanPlugin from 'clean-webpack-plugin';

// // 复制
// import CopyPlugin from 'copy-webpack-plugin';

// // HTML
// import HtmlPlugin from 'html-webpack-plugin';
// import AddAssetHtmlPlugin from 'add-asset-html-webpack-plugin';

// // CSS 抽取
// import MiniCssExtractPlugin from 'mini-css-extract-plugin';
// import ExtractTextPlugin from 'extract-text-webpack-plugin';

// 代码优化
import UglifyjsPlugin from 'uglifyjs-webpack-plugin';
import OptimizeCSSPlugin from 'optimize-css-assets-webpack-plugin';

// 基础配置
const baseConfig: webpack.Configuration = merge({}, {
  // 模式
  mode: 'none',

  // 目标
  target: 'web',

  // 控制台提示
  devtool: 'cheap-module-source-map',

  // 上下文
  context: resolve(),

  // 插件
  plugins: [],

  // 外部资源
  externals: {},

  // 优化
  optimization: {
    minimize: false,
    minimizer: [
      // JavaScript 压缩
      new UglifyjsPlugin({uglifyOptions: { output: { comments: false } }}),

      // CSS 压缩
      new OptimizeCSSPlugin({cssProcessorOptions: { autoprefixer: false, sourcemap: true, discardComments: true, safe: true }})
    ]
  },

  // 解析
  resolve: {
    // webpack 解析模块时应该搜索的目录
    modules: ['node_modules'],

    // 自动解析确定的扩展
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.mjs', '.json'],

    // 创建 import 或 require 的别名
    alias: {
      '@': resolve('src'),
      '@app': resolve('src')
    }
  },

  // 入口
  entry: {
    app: ['./src']
  },

  // 出口
  output: {
    path: resolve('dist'),
    filename: 'assets/scripts/[name].[hash:5].js',
    chunkFilename: 'assets/scripts/[name].[chunkhash:5].js',

    // CDN 地址替换, 请修改此处
    // https://blog.csdn.net/wlchn/article/details/78468586
    publicPath: ''
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
        exclude: /^(node_modules|bower_components)$/
      },

      // TSLint
      {
        test: /\.(ts|tsx)$/,
        enforce: 'pre',
        loader: 'tslint-loader',
        include: resolve('src'),
        exclude: ['node_modules', 'bower_components']
      },
      {
        oneOf: [
          // TypeScript
          {
            test: /\.(ts|tsx)$/,
            loader: 'ts-loader',
            options: {},
            exclude: /^node_modules$/
          },

          // JavaScript
          {
            test: /\.(js|jsx|mjs)$/,
            loader: 'babel-loader',
            options: { cacheDirectory: true, compact: true},
            exclude: /^(node_modules|bower_components)$/
          },

          // 字体处理
          {
            test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
            loader: 'url-loader',
            options: { limit: 10000, name: 'assets/fonts/[name].[hash:7].[ext]'}
          },

          // 图片处理
          {
            test: /\.(png|jpe|jpeg|gif)(\?.*)?$/,
            loader: 'url-loader',
            options: { limit: 10000, name: 'assets/images/[name].[hash:7].[ext]'}
          },

          // 媒体文件
          {
            test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
            loader: 'url-loader',
            options: { limit: 10000, name: 'assets/media/[name].[hash:7].[ext]' }
          }
        ]
      }
    ]
  }
});

export default baseConfig;
