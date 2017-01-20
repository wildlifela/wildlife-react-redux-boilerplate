const path = require('path')
const webpack = require('webpack')
const cwd = process.cwd()
const ENVIRONMENT = require('./webpack.config.env.js')


const isDev = process.env.NODE_ENV === 'development'

let plugins = [
    new webpack.LoaderOptionsPlugin({
        debug: isDev
    }),
    new webpack.DefinePlugin(ENVIRONMENT),
    new webpack.DllPlugin({
        // The manifest we will use to reference the libraries
        path: path.normalize(`${cwd}/config/generated/[name]-manifest.json`),
        name: '[name]',
        context: path.normalize(`${cwd}/src/js/`)
    })
]

if(!isDev) plugins.push(new webpack.optimize.UglifyJsPlugin({
    minimize: true,
    compress: {
        drop_console: false
    }
}))


module.exports = {
    devtool: isDev ? 'source-map' : false,
    entry: {
        // The entrypoint is our vendor file
        vendor: [path.normalize(`${cwd}/src/js/vendor.js`)],
    },
    output: {
        path: path.normalize(`${cwd}/public/assets`),
        publicPath: '/assets/',
        filename: 'app.[name].js',
        library: '[name]'
    },
    plugins,
    resolve: {
        modules: [
            path.normalize(`${cwd}/src/js/`),
            'node_modules'
        ]
    }
}
