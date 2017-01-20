'use strict'
const dotenv = require('dotenv')
dotenv.load()
const path = require('path')
const webpack = require('webpack')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')

const ENVIRONMENT = require('./webpack.config.env.js')
const cwd = process.cwd()
const autoprefixer = require('autoprefixer')


const CONFIG = {
    devPort: process.env.PORT || 3000,
    rules: [
        {
            test: /\.jsx?$/i,
            exclude: /node_modules/,
            use: ['babel-loader'],
        },
        {
            test: /\.(woff|ttf|eot|png|jpg|svg)(\?.*)?/,
            use: ['file-loader'],
            exclude: /\/svg/
        },
        {
            test: /\.svg$/,
            use: [ 'babel-loader!react-svg-loader?' + JSON.stringify({
                svgo: {
                    plugins: [
                        {removeTitle: true},
                        {removeMetadata: true},
                        {removeDesc: true},
                        {cleanupAttrs: true},
                        {cleanupIDs: false},
                    ]
                }
            })],
            exclude: /\/fonts/

        }
    ],
    entry: {
        app: [path.normalize(`${cwd}/src/js/app.js`)],

    },
    output: {
        path: path.normalize(`${cwd}/public/assets`),
        publicPath: '/assets/',
        filename: '[name].js',
        chunkFilename: '[name].[id].js'
    },
    plugins: [
        new webpack.DefinePlugin(ENVIRONMENT),
        new webpack.DllReferencePlugin({
            context: path.normalize(`${cwd}/src/js/`),
            manifest: require(`${cwd}/config/generated/vendor-manifest.json`)
        }),
        new LodashModuleReplacementPlugin({
            collections: true,
            shorthands: true
        })
    ],
    node: {
        net: 'empty',
        tls: 'empty',
        dns: 'empty',
        fs: 'empty'
    }
}

module.exports = CONFIG
