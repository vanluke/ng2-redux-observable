import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import Split from 'webpack-split-by-path';
import Copy from 'copy-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const sourceMap = process.env.TEST
? [new webpack.SourceMapDevToolPlugin({ filename: null, test: /\.ts$/ })]
: [ ];

const basePlugins = [
  new webpack.DefinePlugin({
    dev: process.env.NODE_ENV !== 'production',
    production: process.env.NODE_ENV === 'production',
    test: JSON.stringify(process.env.TEST || false),
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  }),
  new Split([
    { name: 'vendor', path: [__dirname + '/node_modules/'] }
  ]),
  new HtmlWebpackPlugin({
    template: './public/index.html',
    inject: 'body',
    minify: false
  }),
  new webpack.NoErrorsPlugin(),
  new Copy([
    { from: 'src/assets', to: 'assets' }
  ]),
  new ExtractTextPlugin('bundle.css')
].concat(sourceMap);

// const prodPlugins = [
//   new webpack.optimize.OccurenceOrderPlugin(),
//   new webpack.optimize.DedupePlugin(),
//   new webpack.optimize.UglifyJsPlugin({
//     mangle: true,
//     compress: {
//       warnings: false
//     }
//   })
// ];
const definedPlugins = basePlugins;

export default definedPlugins;
