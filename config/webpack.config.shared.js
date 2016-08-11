'use strict';
const dotenv = require('dotenv');
dotenv.load();
let path = require('path');
let autoprefixer = require('autoprefixer');
let precss = require('precss');


let cwd = process.cwd();
console.log(__dirname);

const vendors =  [
    'babel-polyfill',
    'classnames',
    'react',
    'react-dom',
    'react-redux',
    'react-router',
    'react-tap-event-plugin',
    'redux',
    'redux-thunk',
    'whatwg-fetch',
    'promise-polyfill'
];

const CONFIG = {
    devPort: process.env.PORT || 3000,
    vendors: vendors,
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
            test: /\.(woff|ttf|eot|svg|png)(\?.*)?/,
            loader: 'url-loader'
        }
    ],
    entry: {
        app: [path.normalize(`${cwd}/src/js/app.js`)],
        vendor: vendors

    },
    output: {
        path: path.normalize(`${cwd}/public/js`),
        publicPath: '/js/',
        filename: '[name].js',
        chunkFilename: '[name].[id].js'
    },
    external: {
        TweenLite: 'TweenLite'
    },
    postCSS: function() {
        return [autoprefixer, precss];
    },
    node: {
        net: 'empty',
        tls: 'empty',
        dns: 'empty',
        fs: 'empty'
    }
};

module.exports = CONFIG;
