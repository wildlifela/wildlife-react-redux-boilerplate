'use strict'

let webpack = require('webpack')
let shared = require('./webpack.config.shared')

let devEntry = () => {
    let entry = Object.assign({},shared.entry)
    entry.app.unshift(`webpack-dev-server/client?http://localhost:${shared.devPort}`, 'webpack/hot/only-dev-server')
    return entry
}

module.exports = {
    devtool: 'source-map',
    entry: devEntry(),
    output: shared.output,
    externals: shared.external,
    module: {
        rules: [
            ...shared.rules,
            { test: /\.scss$/, use: [{loader: 'style-loader'},{loader: 'css-loader'},{loader: 'postcss-loader'}, {loader: 'sass-loader'}]}
        ]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            debug: true

        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
    ],
    target: 'web',
    watch: true,
    node: shared.node
}

