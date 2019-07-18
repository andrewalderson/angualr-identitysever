var WebpackNotifierPlugin = require('webpack-notifier');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var path = require('path');

var isProd = process.env.NODE_ENV === 'production';

module.exports = [{
    mode: process.env.NODE_ENV,
    entry: './Styles/site.scss',
    output: {
        // This is necessary for webpack to compile
        // But we never use style-bundle.js
        path: path.join(__dirname, "./wwwroot/dist"),
        filename: 'style-bundle.js'
    },
    plugins: [
        new WebpackNotifierPlugin()
    ],
    module: {
        rules: [{
            test: /\.scss$/,
            use: [
              {
                  loader: 'file-loader',
                    options: {
                        name: isProd ? 'site.min.css' : 'site.css'
                  }
              },
                { loader: 'extract-loader' },
                { loader: 'css-loader' },
                { loader: 'postcss-loader' },
                { loader: 'sass-loader',
                  options: {
                      includePaths: ['./node_modules']
                  }
              }
            ]
        }]
    }
},
{
    mode: process.env.NODE_ENV,
    entry: "./Scripts/site.js",
    output: {
        path: path.join(__dirname, "./wwwroot/dist"),
        filename: isProd ? 'site.min.js' : 'site.js'
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    output: {
                        comments: false
                    }
                }
            })
        ]
    },
    plugins: [
        new WebpackNotifierPlugin()
    ],
    module: {
        rules: [{
            test: /\.js$/,
            use: [
                {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            ]

        }]
    }
}];
