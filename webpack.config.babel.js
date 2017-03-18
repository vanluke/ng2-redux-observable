import path from 'path';
import { loaders, tslint } from './dev-configs/webpack-loaders';
import plugins from './dev-configs/webpack-plugins';

export default {
  entry: [
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:3000',
    './src/index.ts'
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js',
    publicPath: '/',
    sourceMapFilename: '[name].[hash].js.map',
    chunkFilename: '[id].chunk.js'
  },
  devtool: process.env.NODE_ENV === 'production'
    ? 'source-map'
    : 'inline-source-map',
  resolve: { extensions: ['', '.webpack.babel.js', '.web.js', '.ts', '.js'] },
  plugins: plugins,
  devServer: {
    contentBase: './public',
    quite: false,
    noInfo: false,
    stats: {
      colors: true,
      timings: true
    },
    hot: true,
    historyApiFallback: { index: '/' }
  },
  module: {
    preLoaders: [
      tslint
    ],
    loaders: loaders,
    noParse: [ /zone\.js\/dist\/.+/, /angular2\/bundles\/.+/ ]
  }
};
