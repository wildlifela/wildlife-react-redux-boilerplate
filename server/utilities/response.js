'use strict';

let env = require('../config/env');

const sillyMessages = [
    'Something went wrong, please contact your higher power',
    'The server is having an existential crisis',
    'Error exists between keyboard and chair',
    'What if this is right and you are wrong? Nope this is wrong.'
];

module.exports = {

    view(res, view, data) {
        res.render(view, data);
    },
    success(res, data, status) {
        status = status || 200;
        res.status(status).json(data);
    },
    error(res, error, status) {
        status = status || 500;
        let silly = sillyMessages[ Math.round(Math.random() * (sillyMessages.length - 1)) ];
        let data = {message: silly };
        if (env.NODE_ENV !== 'production') {
            error = error || {};
            data.stack = error.stack || 'No Data';
            data.message = error.message || silly;
        }
        res.status(status).json(data);
    }

};