'use strict';

let webpack = require('webpack');
let config = require('../webpack/webpack.config.dev');
let sharedConfig = require('../webpack/webpack.config.shared');


let compiler = webpack(config);

module.exports = function(app) {
    app.use(require('webpack-dev-middleware')(compiler, {
        noInfo: true,
        publicPath: sharedConfig.output.publicPath
    }));

    app.use(require('webpack-hot-middleware')(compiler));
};

