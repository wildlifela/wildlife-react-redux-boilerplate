'use strict'

let dotenv = require('dotenv')
dotenv.load()

let ExtractTextPlugin = require('extract-text-webpack-plugin')

let webpack = require('webpack')
let shared = require('./webpack.config.shared')

module.exports = {
    entry: shared.entry,
    output: shared.output,
    externals: shared.external,
    module: {
        rules: [
            ...shared.rules,
            { test: /\.s?css$/, loader: ExtractTextPlugin.extract({fallbackLoader: 'style-loader', loader: 'css-loader!postcss-loader!sass-loader' }) }
        ]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            postcss: shared.postCSS
        }),
        new ExtractTextPlugin({filename: '[name].css',disable: false, allChunks: true}),
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            sourceMap: true,
            compress: {
                drop_console: true,
                warnings: false
            }
        })
    ],
    target: 'web',
    node: shared.node
}
