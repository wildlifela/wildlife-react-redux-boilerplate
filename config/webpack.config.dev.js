'use strict';

let webpack = require('webpack');
let shared = require('./webpack.config.shared');

let devEntry = () => {
    let entry = Object.assign({},shared.entry);
    entry.app.unshift(`webpack-dev-server/client?http://localhost:${shared.devPort}`, 'webpack/hot/only-dev-server');
    return entry;
};

module.exports = {
    devtool: 'eval-cheap-module-source-map',
    debug: true,
    entry: devEntry(),
    output: shared.output,
    externals: shared.external,
    module: {
        postLoaders: shared.postLoaders,
        loaders: [
            ...shared.loaders,
            { test: /\.scss$/, loader: 'style-loader!css-loader!postcss-loader!sass-loader'}
        ]
    },
    postcss: shared.postCSS,
    plugins: [
        new webpack.optimize.CommonsChunkPlugin(/* chunkName= */'vendor', /* filename= */'app.vendor.js'),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
    ],
    target: 'web',
    watch: true,
    node: shared.node
};

