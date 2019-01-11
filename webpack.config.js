const path = require('path');
const env = require('yargs').argv.mode;
// const webpack = require('webpack');
const WebpackBarPlugin = require('webpackbar');
const ExportsFixPlugin = require('babel-plugin-add-module-exports');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');

const projectRoot = path.resolve(__dirname, '/');

function nodeModule(pathUrl) {
  return path.resolve(__dirname, `node_modules/${pathUrl || ''}`);
}

const libraryName = 'framely';

const plugins = [];
let outputFile;
const optimization = {};
const entry = [];

console.log(`-------------------- Building Framely ${env} mode -------------------`);

if (env === 'production') {
  optimization.minimizer = [
    // we specify a custom UglifyJsPlugin here to get source maps in production
    // new UglifyJsPlugin({
    //   cache: true,
    //   parallel: true,
    //   uglifyOptions: {
    //     compress: false,
    //     ecma: 6,
    //     mangle: true
    //   },
    //   sourceMap: true
    // })
  ];

  entry.push(`${__dirname}/src/index.js`);
  outputFile = `${libraryName}.min.js`;
} else {
  entry.push(`${__dirname}/src/examples/example-proxy.js`);
  entry.push(`${__dirname}/src/examples/example-host.js`);
  outputFile = `${libraryName}.js`;
}

const config = {
  entry,
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 9000
  },
  devtool: 'inline-source-map',
  output: {
    path: `${__dirname}/dist`,
    filename: outputFile,
    library: 'framely',
    libraryTarget: 'umd'
  },
  optimization,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                'env',
                {
                  targets: {
                    // The % refers to the global coverage of users from browserslist
                    browsers: [
                      'Chrome >= 55',
                      'Firefox >= 53',
                      'Edge >= 15',
                      'Opera >= 48',
                      'Safari >= 10.1'
                    ]
                  }
                }
              ]
            ],
            plugins: [
              ExportsFixPlugin,
              require('babel-plugin-syntax-object-rest-spread'),
              require('babel-plugin-transform-runtime')
            ],
            babelrc: false
          }
        }
      },
      {
        test: /(\.js)$/,
        loader: 'eslint-loader',
        include: projectRoot,
        exclude: /(node_modules|bower_components)/,
        enforce: 'pre'
      }
    ]
  },
  resolve: {
    modules: [path.resolve('./node_modules')],
    extensions: ['.js'],
    alias: {
      lodash: nodeModule('lodash'),
      rxjs: nodeModule('rxjs')
    }
  },
  plugins: [
    ...plugins,
    new WebpackBarPlugin({
      profile: true
    }),
    new HtmlWebpackPlugin(),
    new ServiceWorkerWebpackPlugin({
      entry: path.join(__dirname, 'src/js/service-workers/frame-data-fetcher.js')
    })
  ]
};

module.exports = config;
