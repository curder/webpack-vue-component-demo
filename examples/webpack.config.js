let path = require('path');
const glob = require('glob');
const chokidar = require('chokidar');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 将css提取到单独的文件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // 将css文件压缩体积
const PurgecssPlugin = require('purgecss-webpack-plugin')
const VueLoaderPlugin = require('vue-loader').VueLoaderPlugin;
const inProduction = process.env.NODE_ENV === 'production';

module.exports = {

  mode: process.env.NODE_ENV,

  entry: {
    index: [
      './examples/index.js',
      './examples/assets/sass/index.scss',
    ]
  }, // 入口文件

  resolve: {
    alias: {
      '~': path.resolve(__dirname),
    }
  },

  output: {
    path: path.resolve(__dirname, '..', 'docs'), // 目标文件路径
    filename: '[name].js', // 目标文件名
  },

  devServer: {
    clientLogLevel: 'error',
    compress: true,
    hot: true,
    hotOnly: true,
    open: true,
    inline: true,
    stats: {
      children: false,
      modules: false,
      chunks: false,
    },
    before(app, server) {
      chokidar.watch([
        './*.html',
        './**/*.scss'
      ]).on('all', function() {
        server.sockWrite(server.sockets, 'content-changed');
      });
    }

  },

  module: {
    rules: [
      { test: /\.vue$/, loader: 'vue-loader' },
      { test: /\.s?css$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'] },
      { test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader'] },
      { test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/, loader: 'file-loader', options: { name: 'images/[name].[hash].[ext]' } },
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
    ]
  },

  plugins: [

    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html'),
      inject: true
    }),

    new VueLoaderPlugin(),

    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),

  ],

  optimization: {
    minimize: inProduction
  }
}
