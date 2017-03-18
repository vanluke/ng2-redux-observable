require('babel-core/register');
require('babel-polyfill');

process.env.TEST = true;

const loaders = require('./dev-configs/webpack-loaders');
const plugins = require('./dev-configs/webpack-plugins');

module.exports = (config) => {
  const coverage = config.singleRun ? ['coverage'] : [];
  config.set({
    frameworks: [
      'jasmine'
    ],

    plugins: [
      'karma-jasmine',
      'karma-sourcemap-writer',
      'karma-sourcemap-loader',
      'karma-webpack',
      'karma-coverage',
      'karma-phantomjs-launcher',
      'karma-spec-reporter',
      'karma-chrome-launcher',
      'karma-firefox-launcher'
    ],

    files: [
      './src/tests.entry.ts',
      {
        pattern: '**/*.map',
        served: true,
        included: false,
        watched: true
      }
    ],

    preprocessors: {
      './src/tests.entry.ts': [
        'webpack',
        'sourcemap'
      ],
      './src/**/!(*.test|tests.*).(ts|js)': [
        'sourcemap'
      ].concat(coverage)
    },

    webpack: {
      plugins,
      entry: './src/tests.entry.ts',
      devtool: 'inline-source-map',
      verbose: false,
      resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
      },
      module: {
        loaders: combinedLoaders(),
        postLoaders: config.singleRun
        ? [ loaders.istanbulInstrumenter ]
        : [ ]
      },
      stats: { colors: true, reasons: true },
      debug: false
    },

    webpackServer: {
      noInfo: true
    },

    reporters: ['spec'].concat(coverage),

    coverageReporter: {
      reporters: [
        { type: 'json' }
      ],
      dir: './coverage/',
      subdir: (browser) => {
        return browser.toLowerCase().split(/[ /-]/)[0]; // returns 'chrome'
      }
    },

    port: 9999,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome', 'Firefox'], // Alternatively: 'PhantomJS'
    captureTimeout: 6000,
    singleRun: false,
    concurrency: Infinity,
    noResolve: false
  });
};

function combinedLoaders() {
  return Object.keys(loaders).reduce(function reduce(aggregate, k) {
    switch (k) {
    case 'istanbulInstrumenter':
    case 'tslint':
      return aggregate;
    case 'html': return aggregate;
    case 'ts':
    case 'tsTest':
      return aggregate.concat([ // force inline source maps
        Object.assign(loaders[k],
          { query: { babelOptions: { sourceMaps: 'both' } } })]);
    default:
      return aggregate.concat([loaders[k]]);
    } }, []);
}
