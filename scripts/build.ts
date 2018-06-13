// 路径处理
// import { appDirectory, resolve, resolveOwn } from './paths';

// webpack
import webpack, { ProvidePlugin } from 'webpack';

// 配置合并
import merge from 'webpack-merge';

// // HTML
// import HtmlPlugin from 'html-webpack-plugin';
// import AddAssetHtmlPlugin from 'add-asset-html-webpack-plugin';

// // 清理目录
// import CleanPlugin from 'clean-webpack-plugin';

// // 复制
// import CopyPlugin from 'copy-webpack-plugin';

// // CSS 抽取
// import MiniCssExtractPlugin from 'mini-css-extract-plugin';
// import ExtractTextPlugin from 'extract-text-webpack-plugin';

// // 代码优化
// import UglifyjsPlugin from 'uglifyjs-webpack-plugin';
// import OptimizeCSSPlugin from 'optimize-css-assets-webpack-plugin';

// 基础配置
import baseConfig from './base';

// (<string[]> (<webpack.Entry> baseConfig.entry).app).unshift('@babel/polyfill');

// 编译配置
const buildConfig: webpack.Configuration = merge(baseConfig, {
  // 模式
  mode: 'production',

  // 入口
  entry: {
    react: ['react', 'react-dom', 'react-router', 'react-router-dom', 'redux', 'react-redux', 'mobx', 'mobx-react']
  },

  // // 外部组件
  externals: {
    // jquery: 'jQuery'
  },

  // 插件
  plugins: [
    new ProvidePlugin({
      // //下载Jquery库
      // $: 'jquery'
    })
  ],

  // 优化
  optimization: {
    // 切割 webpack 运行时代码
    runtimeChunk: true,

    // 切割代码
    splitChunks: {
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
  }
});

export default buildConfig;
