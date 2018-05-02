
const path = require('path');
const fs = require('fs');

const webpack = require('webpack');

const autoprefixer = require('autoprefixer');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

const appDirectory = fs.realpathSync(process.cwd());

const resolve = (relative) => {
  return path.resolve(appDirectory, relative);
}

const resolveOwn = (relative) => {
  return path.resolve(__dirname, '..', relative);
};

module.exports = {
  // mode option
  // value: development or production
  mode: "production",

  // 报错的时候在控制台输出哪一行报错
  devtool: "cheap-module-source-map", 

  context: appDirectory, // entry 和 module.rules.loader 选项相对于此目录开始解析

  entry: {
    app: [
      require.resolve('./polyfills'),
      './src/index.js'
    ],
    react: ['react', 'react-dom', 'react-router', 'react-router-dom']
  },
  
  output: {},
  
  resolve: {
    // 免后缀
    extensions: [
      ".ts", ".tsx",
      '.js', '.jsx', '.mjs',
      '.json',
    ],

    // 别名
    alias: {
      '@': resolve('src')
    },

    modules: [
      'node_modules',
    ],
  },
 
  optimization: {
    //拆分公共包
    splitChunks: {
      cacheGroups: {
        // 第三方组件
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,

          chunks: "initial",
          name: "vendors",
          enforce: true
        },

        // 指定组件
        react: {
          test: "react",
          priority: 1,
          chunks: "initial",
          name: "react",
          enforce: true
        }

      }
    }
  },

  devServer: {},

  module: {
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        exclude: /^(node_modules|bower_components)$/,
        enforce: 'pre',
        loader: "eslint-loader",
      },


      {
        oneOf: [
                    // 
          // React ES6
          // 
          {
            test: /\.(js|jsx|mjs)$/,
            exclude: /^(node_modules|bower_components)$/,
            use: {
              loader: "babel-loader",
              options: {
                compact: true,
              },
            }
          },

          //
          // Sass
          // 
          {
            test: /\.(sass|scss)$/,
            exclude: /^node_modules$/,
            use: ExtractTextPlugin.extract({
              fallback: "style-loader",
              use: [
                "css-loader",
                "postcss-loader",
                "sass-loader"
              ],
            })
          },

        ]
      }
    ]
  },
  
  plugins: [
    new ExtractTextPlugin('[name].css'),

    new webpack.ProvidePlugin({ //下载Jquery库
      $: 'jquery'
    }),
  ],
  

}
