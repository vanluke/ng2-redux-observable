import ExtractTextPlugin from 'extract-text-webpack-plugin';

const makeFileLoader = function(pattern) {
  return {
    test: pattern,
    loader: 'file',
    exclude: /node_modules/
  };
};

export const istanbulInstrumenter = {
  test: /^(.(?!\.test))*\.ts$/,
  loader: 'istanbul-instrumenter-loader'
};

export const tslint = {
  test: /\.ts$/,
  loader: 'tslint',
  exclude: /node_modules/
};

export const ts = {
  test: /\.ts$/,
  loader: 'awesome-typescript-loader',
  exclude: /node_modules/
};

export const html = {
  test: /\.html$/,
  loader: 'html-loader',
  exclude: /node_modules/
};

export const scss = {
  test: /\.scss/,
  loader: ExtractTextPlugin.extract('style', 'css!sass'),
  exclude: /node_modules/
};

export const css = {
  test: /\.css$/,
  loader: 'style-loader!css-loader',
  exclude: /node_modules/
};

export const json = {
  test: /\.json?$/,
  exclude: /node_modules/,
  loader: 'json'
};

export const svgLoader = makeFileLoader(/\.svg$/);
export const eotLoader = makeFileLoader(/\.eot$/);
export const woffLoader = makeFileLoader(/\.woff$/);
export const woff2Loader = makeFileLoader(/\.woff2$/);
export const ttfLoader = makeFileLoader(/\.ttf$/);

export const loaders = [
  ts, html, scss, css, json
];
