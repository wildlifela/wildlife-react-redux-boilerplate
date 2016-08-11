'use strict';

let dotenv = require('dotenv');
dotenv.load();

let ExtractTextPlugin = require('extract-text-webpack-plugin');

let webpack = require('webpack');
let shared = require('./webpack.config.shared');

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
        new ExtractTextPlugin('../css/[name].css', {allChunks: true}),
        new webpack.optimize.CommonsChunkPlugin(/* chunkName= */'vendor', /* filename= */'app.vendor.js'),
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            drop_console: true,
            sourceMap: true,
            mangle: {
                except: shared.vendors
            }}
        )
    ],
    target: 'web',
    node: shared.node
};
