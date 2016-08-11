
const shared = require('./webpack.config.shared.js');
const config = require('./webpack.config.dev.js');
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const compiler = webpack(config);

const server = new webpackDevServer(compiler, {
    publicPath: shared.output.publicPath,
    hot: true,
    inline: true,
    contentBase: 'public/',
    historyApiFallback: true
});


server.listen(shared.devPort, 'localhost', (err) => {
    if(err) {
        throw new Error(err);
    }

    console.info(`WILDLIFE dev server running on http://localhost:${shared.devPort}`);
});
