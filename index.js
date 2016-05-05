'use strict';

let express = require('express');
let env = require('./server/config/env');
let http = require('http');
let config = require('./server/config/config');
let routes = require('./server/config/routes');

let app = express();
http = http.Server(app);

config(app);
routes(app);

let server = http.listen( env.PORT, () => {
    let h = server.address().address;
    let p = server.address().port;

    console.info('Hyundai Admin - listening at http://%s:%s', h, p );
});


