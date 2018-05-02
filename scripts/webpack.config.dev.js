
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
  mode: "development",

  // devtool: "cheap-module-source-map", // 报错的时候在控制台输出哪一行报错
  devtool: 'inline-source-map',

  context: appDirectory, // entry 和 module.rules.loader 选项相对于此目录开始解析


  entry: {
    app: [
      require.resolve('./polyfills'),
      './src/index.js'
    ]
  },


  output: {
    pathinfo: true,
    filename: "static/js/[name].[hash:8].js",
    chunkFilename: 'static/js/[name].chunk.js',
    publicPath: "/"
  },


  resolve: {
    extensions: [
      ".ts", ".tsx",
      '.js', '.jsx', '.mjs',
      '.json',
    ],

    modules: [
      'node_modules',
    ],

    alias: {
      '@': resolve('src')
    }
  },


  module: {
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        enforce: 'pre',
        loader: "eslint-loader",
        include: resolve('src'),
        exclude: /^(node_modules|bower_components)$/,
      },

      {
        oneOf: [
          // 
          // React ES6
          // 
          {
            test: /\.(js|jsx|mjs)$/,
            use: { loader: "babel-loader", options: { cacheDirectory: true, plugins: [ 'react-hot-loader/babel' ], }, },
            exclude: /^(node_modules|bower_components)$/,
          },

          //
          // React TS
          //
          {
            test: /\.(ts|tsx)$/,
            use: [ "ts-loader", ],
            exclude: /^node_modules$/,
          },


          //
          // Cascading Style Sheets
          //
          {
            test: /\.css$/,
            use: [
              { loader: "style-loader", options: { "sourceMap": true, } },
              { loader: "css-loader", options: { "sourceMap": true, modules: true } },
              { loader: "postcss-loader", options: { "sourceMap": true, } },
            ],
            exclude: /^node_modules$/,
          },

          //
          // PostCSS
          //
          {
            test: /\.postcss$/,
            "use": [
              { loader: "style-loader", options: { "sourceMap": true, } },
              { loader: "css-loader", options: { "sourceMap": true } },
              { loader: "postcss-loader", options: { "sourceMap": true } }
            ]
          },

          //
          // Stylus
          //
          {
            test: /\.(stylus|styl)$/,
            "use": [
              { loader: "style-loader", options: { "sourceMap": true, } },
              { loader: "css-loader", options: { "sourceMap": true } },
              { loader: "postcss-loader", options: { "sourceMap": true } },
              { loader: "stylus-loader", options: { "sourceMap": true } }
            ]
          },

          //
          // Sass
          // 
          {
            test: /\.s[a|c]ss$/,
            use: [
              { loader: "style-loader", options: { "sourceMap": true, } },
              { loader: "css-loader", options: { "sourceMap": true, modules: true } },
              { loader: "postcss-loader", options: { "sourceMap": true, } },
              { loader: "sass-loader", options: { "sourceMap": true, } },
            ],
            exclude: /^node_modules$/,
          },

          //
          // Less
          //
          {
            test: /\.less$/,
            use: [
              { loader: "style-loader", options: { "sourceMap": true, } },
              { loader: "css-loader", options: { "sourceMap": true, modules: true } },
              { loader: "postcss-loader", options: { "sourceMap": true, } },
              { loader: "less-loader", options: { "sourceMap": true, } },
            ],
            exclude: /^node_modules$/,
          },
          //
          // Images
          // 
          {
            test: /\.(png|jpe|jpeg|gif|svg)(\?.*)?$/,
            loader: "url-loader",
            options: { limit: 10000, name: "assets/img/[name].[hash:7].[ext]" }
          },

          //
          // Video
          //
          {
            test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
            loader: "url-loader",
            options: { limit: 10000, name: "media/[name].[hash:7].[ext]" }
          },

          //
          // Fonts
          //
          {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: "url-loader",
            options: { limit: 10000, name: "fonts/[name].[hash:7].[ext]" }
          },
        ]
      },

    ]
  },


  plugins: [
    new CleanWebpackPlugin('dist'),

    new webpack.NamedModulesPlugin(),

    new webpack.HotModuleReplacementPlugin(),

    // new ExtractTextPlugin('[name].css'),

    new webpack.ProvidePlugin({ //下载Jquery库
      $: 'jquery'
    }),

    new HtmlWebpackPlugin({
      inject: true,
      filename: 'index.html',
      template: "./public/index.html",
      favicon: "./public/favicon.ico",
      hash: false, // 为静态资源生成hash值
      minify: {
        removeComments: true, //移除HTML中的注释
        collapseWhitespace: false //删除空白符与换行符
      }
    }),
  ],

  optimization: {},

  devServer: {
    historyApiFallback: true,
    host: "localhost",
    port: 8888,
    hot: true,
    inline: true,
    open: true
  },
}
