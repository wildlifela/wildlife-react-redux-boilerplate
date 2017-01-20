'use strict'
const dotenv = require('dotenv')
dotenv.load()
const path = require('path')
const autoprefixer = require('autoprefixer')
const precss = require('precss')
const webpack = require('webpack')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')

const ENVIRONMENT = require('./webpack.config.env.js')
const cwd = process.cwd()

const CONFIG = {
    devPort: process.env.PORT || 3000,
    postLoaders: [
        {
            loader: 'transform?envify'
        }
    ],
    loaders: [
        {
            test: /\.jsx?$/i,
            exclude: /node_modules/,
            loaders: ['babel'],
        },
        {
            test: /\.(woff|ttf|eot|png|jpg|svg)(\?.*)?/,
            loader: 'file-loader',
            exclude: /\/svg/
        },
        {
            test: /\.svg$/,
            loader: 'babel!react-svg?' + JSON.stringify({
                svgo: {
                    plugins: [
                        {removeTitle: true},
                        {removeMetadata: true},
                        {removeDesc: true},
                        {cleanupAttrs: true},
                        {cleanupIDs: false},
                    ]
                }
            }),
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
    postCSS: function() {
        return [autoprefixer, precss]
    },
    node: {
        net: 'empty',
        tls: 'empty',
        dns: 'empty',
        fs: 'empty'
    }
}

module.exports = CONFIG
