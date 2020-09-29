// 路径处理
import { resolve } from './paths';

// Webpack
import webpack, {
  // DllReferencePlugin, DllPlugin,
  NamedModulesPlugin, 
  HotModuleReplacementPlugin, ProvidePlugin
} from 'webpack';

// 配置合并
import merge from 'webpack-merge';

// // 清理目录
// import CleanPlugin from 'clean-webpack-plugin';

// // 复制
// import CopyPlugin from 'copy-webpack-plugin';

// HTML
import HtmlPlugin from 'html-webpack-plugin';
// import AddAssetHtmlPlugin from 'add-asset-html-webpack-plugin';

// // CSS 抽取
// import MiniCssExtractPlugin from 'mini-css-extract-plugin';
// import ExtractTextPlugin from 'extract-text-webpack-plugin';

// // 代码优化
// import UglifyjsPlugin from 'uglifyjs-webpack-plugin';
// import OptimizeCSSPlugin from 'optimize-css-assets-webpack-plugin';

// 基础配置
import baseConfig from './base';

// 入口二次处理
const appEntry: string[] = [];
(<webpack.Entry> baseConfig.entry).app = appEntry.concat([], (<string[]> (<webpack.Entry> baseConfig.entry).app));

// 开发配置
const devConfig: webpack.Configuration & any = merge(baseConfig, {
  // 模式
  mode: 'development',

  // 控制台报错
  devtool: 'inline-source-map',

  // 出口
  output: { 
    publicPath: '' 
  },

  // 优化
  optimization: { 
    minimize: false,
    namedModules: true
  },

  // 模块
  module: {
    // 规则
    rules: [
      // PostCSS and CSS
      {
        test: /\.(css|postcss)$/,
        use: [
          { 
            loader: 'style-loader', 
            options: { 
              sourceMap: true
             } 
          },
          {
            loader: 'css-loader',
            options: { 
              sourceMap: true, 
              modules: false, 
              localIdentName: '[name]__[local]--[hash:base64:5]', 
              importLoaders: 1 
            }
          },
          { 
            loader: 'postcss-loader', 
            options: { 
              sourceMap: true
            } 
          }
        ],
        // exclude: /^node_modules$/
      },

      // Stylus
      {
        test: /\.(stylus|styl)$/,
        use: [
          { 
            loader: 'style-loader', 
            options: { 
              sourceMap: true 
            } 
          },
          {
            loader: 'css-loader',
            options: { sourceMap: true, modules: false, localIdentName: '[name]__[local]--[hash:base64:5]', importLoaders: 1 }
          },
          { 
            loader: 'postcss-loader', 
            options: { 
              sourceMap: true 
            } 
          },
          { 
            loader: 'stylus-loader', 
            options: { 
              sourceMap: true 
            } 
          }
        ]
      },

      // Sass
      {
        test: /\.(sass|scss)$/,
        use: [
          { 
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: { 
              sourceMap: true, 
              modules: false, 
              // localIdentName: '[name]__[local]--[hash:base64:5]', 
              importLoaders: 1 
            }
          },
          { 
            loader: 'postcss-loader', 
            options: { 
              sourceMap: true 
            } 
          },
          { 
            loader: 'sass-loader', 
            options: { 
              sourceMap: true 
            } 
          }
        ],
        // exclude: /^node_modules$/
      },

      // Less
      {
        test: /\.less$/,
        use: [
          { 
            loader: 'style-loader', 
            options: { 
              sourceMap: true 
            } 
          },
          {
            loader: 'css-loader',
            options: { 
              sourceMap: true, 
              modules: false, 
              localIdentName: '[name]__[local]--[hash:base64:5]', 
              importLoaders: 1 
            }
          },
          { 
            loader: 'postcss-loader', 
            options: { 
              sourceMap: true 
            } 
          },
          { 
            loader: 'less-loader', 
            options: { 
              sourceMap: true 
            } 
          }
        ],
        // exclude: /^node_modules$/
      }
    ]
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
      }
    }),

    new NamedModulesPlugin(),

    new HotModuleReplacementPlugin(),

    new ProvidePlugin({
      //下载Jquery库
      // $: 'jquery'
    })
  ],

  // 开发用 Server
  devServer: {
    host: '127.0.0.1',
    port: (process.env.PORT ?? 8000) as number,

    // bundle目录
    publicPath: '/',

    // 静态目录
    contentBase: resolve('public'),

    // 不跳转
    historyApiFallback: true,

    // 热加载
    hot: true,

    // 内联样式
    inline: true,

    // 打开浏览器
    open: true,

    // 代理
    proxy: {
      '/api/*': {
        target: '//c.y.qq.com',
        pathRewrite: {
          '^/api/recommend': '/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg',
          '^/api/vkey': '/base/fcgi-bin/fcg_music_express_mobile3.fcg',
          '^/api/search': '/soso/fcgi-bin/search_for_qq_cp',
          '^/api/hot': '/splcloud/fcgi-bin/gethotkey.fcg'
        },
        secure: false,
        changeOrigin: true
      },
      '/api/client/*': {
        target: '//u.y.qq.com',
        pathRewrite: {
          '^/api/music': '/cgi-bin/musicu.fcg'
        },
        secure: false,
        changeOrigin: true
      }
    }
  }
});

module.exports = devConfig;
