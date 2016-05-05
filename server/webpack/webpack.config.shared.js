'use strict';

let path = require('path');
let autoprefixer = require('autoprefixer');
let precss = require('precss');

let cwd = process.cwd();

const vendors =  [
    'babel-polyfill',
    'classnames',
    'moment',
    'react',
    'react-addons-update',
    'react-dom',
    'react-pure-render',
    'react-redux',
    'react-router',
    'react-static-container',
    'react-tap-event-plugin',
    'redux',
    'redux-thunk',
    'whatwg-fetch',
    'promise-polyfill'
];

const CONFIG = {
    vendors: vendors,
    postLoaders: [
        {
            loader: 'transform?envify'
        }
    ],
    loaders: [

        {
            test: /isotope\-|fizzy\-ui\-utils/,
            loader: 'imports?define=>false&this=>window'
        },
        {
            test: /unipointer/,
            loader: 'imports?define=>false&this=>window'
        },
        {
            test: /\.js$|\.jsx$/i,
            //exclude: /node_modules/,
            loader: 'babel',
            include: [
                path.normalize(`${cwd}/src/js/`),
                path.normalize(`${cwd}/node_modules/joi/`),
                path.normalize(`${cwd}/node_modules/isemail/`),
                path.normalize(`${cwd}/node_modules/topo/`),

            ]
        },
        {
            test: /\.scss$/,
            loader: 'style-loader!css-loader!autoprefixer-loader!sass-loader'
        },
        {
            test: /\.css$/,
            loader: 'style-loader!css-loader!postcss-loader'
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
        TweenLite : 'TweenLite'
    },
    postCSS: function () {
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
