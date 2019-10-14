let path = require('path');
const glob = require('glob');
const chokidar = require('chokidar');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 将css提取到单独的文件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // 将css文件压缩体积
const PurgecssPlugin = require('purgecss-webpack-plugin')
const VueLoaderPlugin = require('vue-loader').VueLoaderPlugin;
const inProduction = process.env.NODE_ENV === 'production';
const PATHS = {
  src: path.join(__dirname, 'src')
}

module.exports = {

  mode: process.env.NODE_ENV,

  entry: {
    index: ['./src/index.js', ]
  }, // 入口文件

  output: {
    path: path.resolve(__dirname, './dist'), // 目标文件路径
    filename: '[name].js', // 目标文件名
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
    new VueLoaderPlugin(),

    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),

    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }],
        autoprefixer: true,
      },
      canPrint: true
    }),

    new PurgecssPlugin({
      paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true })
    }),
  ],

  optimization: {
    minimize: inProduction
  }
}
