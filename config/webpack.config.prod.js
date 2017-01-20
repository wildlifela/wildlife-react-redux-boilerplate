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
        postLoaders: shared.postLoaders,
        loaders: [
            ...shared.loaders,
            { test: /\.s?css$/, loader: ExtractTextPlugin.extract('style', 'css-loader!postcss-loader!sass-loader') }
        ]
    },
    postcss: shared.postCSS,
    plugins: [
        new ExtractTextPlugin('[name].css', {allChunks: true}),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            sourceMap: true,
            compress: {
                drop_console: true
            }
        })
    ],
    target: 'web',
    node: shared.node
}
